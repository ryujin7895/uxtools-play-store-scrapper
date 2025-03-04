import { ActionFunctionArgs, json } from "@remix-run/node";
import gplay from "google-play-scraper";
import { sentiment } from "~/lib/sentiment";
import { extractKeywords } from "~/lib/keywords";
import { groupByMonth } from "~/lib/trends";

interface PlayStoreAppInfo {
  title: string;
  description: string;
  installs: string;
  score: number;
  ratings: number;
  reviews: number;
  price: string;
  free: boolean;
  currency: string;
  developer: string;
  developerEmail: string;
  developerWebsite: string;
  developerAddress: string;
  privacyPolicy: string;
  genre: string;
  genreId: string;
  familyGenre: string;
  familyGenreId: string;
  icon: string;
  headerImage: string;
  screenshots: string[];
  video: string;
  videoImage: string;
  contentRating: string;
  contentRatingDescription: string;
  adSupported: boolean;
  released: string;
  updated: string;
  version: string;
  recentChanges: string;
  url: string;
}

interface ReviewData {
  id: string;
  userName: string;
  userImage: string;
  content: string;
  score: number;
  thumbsUpCount: number;
  reviewCreatedVersion: string;
  at: string;
  replyContent: string;
  repliedAt: string;
}

interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}

interface TrendData {
  date: string;
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}

interface KeywordData {
  word: string;
  count: number;
}

interface AppAnalysisResult {
  appInfo: PlayStoreAppInfo;
  comments: ReviewData[];
  sentiment: SentimentData;
  keywords: KeywordData[];
  trends: TrendData[];
}

interface PlayStoreReview {
  id: string;
  userName: string;
  userImage: string;
  text: string;
  score: number;
  thumbsUp: number;
  version: string;
  date: string;
  replyText?: string;
  replyDate?: string;
}

async function fetchWithRetry<T>(fn: () => Promise<T>, maxRetries = 3, delay = 2000): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  throw new Error("Max retries exceeded");
}

async function fetchAndAnalyzeApp(url: string, year: number): Promise<AppAnalysisResult> {
  const appId = url.split("id=")[1]?.split("&")[0];
  if (!appId) {
    throw new Error(`Invalid Play Store URL: ${url}`);
  }

  // Fetch app info
  const appInfo = await fetchWithRetry(() => gplay.app({ appId })) as PlayStoreAppInfo;

  // Calculate the date range for the specified year
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year + 1, 0, 1);

  // Fetch reviews with pagination
  const allReviews: PlayStoreReview[] = [];
  let batchNum = 0;
  const batchSize = 100;

  while (true) {
    const batch = await fetchWithRetry(() =>
      gplay.reviews({
        appId,
        sort: gplay.sort.NEWEST,
        num: batchSize,
        paginate: true,
        nextPaginationToken: batchNum > 0 ? String(batchNum) : undefined
      })
    );

    if (!batch.data || batch.data.length === 0) break;

    const filteredReviews = (batch.data as PlayStoreReview[]).filter(review => {
      const reviewDate = new Date(review.date);
      return reviewDate >= startDate && reviewDate < endDate;
    });

    if (filteredReviews.length === 0) break;
    allReviews.push(...filteredReviews);
    
    if (!batch.nextPaginationToken || allReviews.length >= 1000) break;
    batchNum++;
    
    // Add delay between batches
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Analyze sentiment
  const sentimentResults = allReviews.map(review => sentiment(review.text));
  const sentimentCounts = sentimentResults.reduce(
    (acc, result) => {
      acc[result]++;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );

  // Extract keywords
  const keywords = extractKeywords(
    allReviews.map(review => review.text).join(" ")
  );

  // Generate trends
  const trends = groupByMonth(allReviews.map((review, index) => ({
    date: review.date,
    sentiment: sentimentResults[index]
  })));

  return {
    appInfo,
    comments: allReviews.map(review => ({
      id: review.id,
      userName: review.userName,
      userImage: review.userImage || '',
      content: review.text,
      score: review.score,
      thumbsUpCount: review.thumbsUp,
      reviewCreatedVersion: review.version || '',
      at: review.date,
      replyContent: review.replyText || '',
      repliedAt: review.replyDate || ''
    })),
    sentiment: sentimentCounts,
    keywords,
    trends
  };
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const urlsJson = formData.get("urls");
    const yearStr = formData.get("year");

    if (!urlsJson || !yearStr) {
      return json(
        { error: "Missing required parameters: urls and year" },
        { status: 400 }
      );
    }

    const urls = JSON.parse(urlsJson as string);
    const year = parseInt(yearStr as string, 10);

    if (!Array.isArray(urls) || urls.length === 0) {
      return json({ error: "Invalid URLs parameter" }, { status: 400 });
    }

    if (isNaN(year) || year < 2010 || year > new Date().getFullYear()) {
      return json({ error: "Invalid year parameter" }, { status: 400 });
    }

    const results: Record<string, AppAnalysisResult> = {};

    // Process apps sequentially to avoid rate limiting
    for (const url of urls) {
      try {
        results[url] = await fetchAndAnalyzeApp(url, year);
        // Add delay between apps
        if (urls.indexOf(url) < urls.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error(`Error analyzing app ${url}:`, error);
        return json(
          {
            error: `Failed to analyze app: ${url}. ${
              error instanceof Error ? error.message : "Unknown error"
            }`
          },
          { status: 500 }
        );
      }
    }

    // Find shared keywords
    const allKeywords = Object.values(results).map(result => result.keywords);
    const sharedKeywords = allKeywords[0].filter(keyword =>
      allKeywords.slice(1).every(keywords =>
        keywords.some(k => k.word === keyword.word)
      )
    );

    return json({
      success: true,
      results,
      sharedKeywords
    });
  } catch (error) {
    console.error("Comparison error:", error);
    return json(
      {
        error: `Failed to compare apps: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      },
      { status: 500 }
    );
  }
} 