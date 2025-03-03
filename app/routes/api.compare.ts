import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { AnalysisResult } from "~/routes/_index";
import natural from "natural";

interface ComparisonResult {
  metrics: {
    [key: string]: {
      mainApp: number;
      competitors: { [url: string]: number };
      percentageDiffs: { [url: string]: number };
      significance: { [url: string]: boolean };
    };
  };
  sharedKeywords: {
    word: string;
    mainApp: number;
    competitors: { [url: string]: number };
    sentiment: {
      mainApp: 'positive' | 'negative' | 'neutral';
      competitors: { [url: string]: 'positive' | 'negative' | 'neutral' };
    };
  }[];
  uniqueKeywords: {
    mainApp: { word: string; count: number }[];
    competitors: {
      [url: string]: { word: string; count: number }[];
    };
  };
  featureRequests: {
    mainApp: { feature: string; count: number }[];
    competitors: {
      [url: string]: { feature: string; count: number }[];
    };
  };
  bugReports: {
    mainApp: { bug: string; count: number }[];
    competitors: {
      [url: string]: { bug: string; count: number }[];
    };
  };
  featureGaps: {
    mainApp: { feature: string; presentIn: string[] }[];
    competitors: {
      [url: string]: { feature: string; presentIn: string[] }[];
    };
  };
}

async function fetchAndAnalyzeApp(url: string): Promise<AnalysisResult> {
  // This would be your existing logic to fetch and analyze comments
  // For now, we'll return mock data
  return {
    comments: [
      {
        id: '1',
        userName: 'User1',
        content: 'Great app, love the features!',
        score: 5,
        thumbsUp: 10,
        date: '2024-03-15',
        year: 2024,
        sentiment: 'positive'
      },
      // Add more mock comments...
    ],
    sentiment: {
      positive: 0.7,
      negative: 0.2,
      neutral: 0.1
    },
    keywords: [
      { word: 'feature', count: 5 },
      { word: 'bug', count: 2 },
      { word: 'great', count: 8 }
    ],
    intentions: {
      feature_request: [],
      bug_report: [],
      praise: [],
      complaint: []
    }
  };
}

function calculateStatisticalSignificance(mainAppValue: number, competitorValue: number, sampleSize: number): boolean {
  // Using a simple z-test for proportions
  // This is a basic implementation - in a real app, you'd want a more sophisticated approach
  const pooledProportion = (mainAppValue + competitorValue) / 2;
  const standardError = Math.sqrt(pooledProportion * (1 - pooledProportion) * (2 / sampleSize));
  const zScore = Math.abs(mainAppValue - competitorValue) / standardError;
  return zScore > 1.96; // 95% confidence level
}

function analyzeFeatureGaps(mainAppData: AnalysisResult, competitorData: { [url: string]: AnalysisResult }): ComparisonResult['featureGaps'] {
  const allFeatures = new Set([
    ...(mainAppData.intentions?.feature_request.map(c => c.content.toLowerCase()) || []),
    ...Object.values(competitorData).flatMap(data => 
      data.intentions?.feature_request.map(c => c.content.toLowerCase()) || []
    )
  ]);

  // Find features missing in main app but present in competitors
  const mainAppMissing = Array.from(allFeatures)
    .filter(feature => {
      const isInMainApp = mainAppData.intentions?.feature_request
        .some(c => c.content.toLowerCase() === feature);
      const presentInCompetitors = Object.entries(competitorData)
        .filter(([, data]) => data.intentions?.feature_request
          .some(c => c.content.toLowerCase() === feature));
      return !isInMainApp && presentInCompetitors.length > 0;
    })
    .map(feature => ({
      feature,
      presentIn: Object.entries(competitorData)
        .filter(([, data]) => data.intentions?.feature_request
          .some(c => c.content.toLowerCase() === feature))
        .map(([url]) => url)
    }));

  // Find features missing in each competitor but present in main app or other competitors
  const competitorsMissing = Object.fromEntries(
    Object.entries(competitorData).map(([url, data]) => [
      url,
      Array.from(allFeatures)
        .filter(feature => {
          const isInCompetitor = data.intentions?.feature_request
            .some(c => c.content.toLowerCase() === feature);
          const isInMainApp = mainAppData.intentions?.feature_request
            .some(c => c.content.toLowerCase() === feature);
          const isInOtherCompetitors = Object.entries(competitorData)
            .filter(([otherUrl]) => otherUrl !== url)
            .some(([, otherData]) => otherData.intentions?.feature_request
              .some(c => c.content.toLowerCase() === feature));
          return !isInCompetitor && (isInMainApp || isInOtherCompetitors);
        })
        .map(feature => ({
          feature,
          presentIn: [
            ...(mainAppData.intentions?.feature_request
              .some(c => c.content.toLowerCase() === feature) ? ['mainApp'] : []),
            ...Object.entries(competitorData)
              .filter(([otherUrl, otherData]) => 
                otherUrl !== url && 
                otherData.intentions?.feature_request
                  .some(c => c.content.toLowerCase() === feature))
              .map(([otherUrl]) => otherUrl)
          ]
        }))
    ])
  );

  return {
    mainApp: mainAppMissing,
    competitors: competitorsMissing
  };
}

function compareApps(mainAppData: AnalysisResult, competitorData: { [url: string]: AnalysisResult }): ComparisonResult {
  // Calculate metrics with statistical significance and percentage differences
  const metrics: ComparisonResult['metrics'] = {
    'Positive Sentiment': {
      mainApp: mainAppData.sentiment?.positive || 0,
      competitors: Object.fromEntries(
        Object.entries(competitorData).map(([url, data]) => [url, data.sentiment?.positive || 0])
      ),
      percentageDiffs: Object.fromEntries(
        Object.entries(competitorData).map(([url, data]) => [
          url,
          ((((data.sentiment?.positive || 0) - (mainAppData.sentiment?.positive || 0)) / 
            (mainAppData.sentiment?.positive || 1)) * 100)
        ])
      ),
      significance: Object.fromEntries(
        Object.entries(competitorData).map(([url, data]) => [
          url,
          calculateStatisticalSignificance(
            mainAppData.sentiment?.positive || 0,
            data.sentiment?.positive || 0,
            Math.min(mainAppData.comments?.length || 0, data.comments?.length || 0)
          )
        ])
      )
    },
    'Negative Sentiment': {
      mainApp: mainAppData.sentiment?.negative || 0,
      competitors: Object.fromEntries(
        Object.entries(competitorData).map(([url, data]) => [url, data.sentiment?.negative || 0])
      ),
      percentageDiffs: Object.fromEntries(
        Object.entries(competitorData).map(([url, data]) => [
          url,
          ((((data.sentiment?.negative || 0) - (mainAppData.sentiment?.negative || 0)) / 
            (mainAppData.sentiment?.negative || 1)) * 100)
        ])
      ),
      significance: Object.fromEntries(
        Object.entries(competitorData).map(([url, data]) => [
          url,
          calculateStatisticalSignificance(
            mainAppData.sentiment?.negative || 0,
            data.sentiment?.negative || 0,
            Math.min(mainAppData.comments?.length || 0, data.comments?.length || 0)
          )
        ])
      )
    },
    'Average Rating': {
      mainApp: mainAppData.comments?.reduce((acc, c) => acc + c.score, 0) || 0 / (mainAppData.comments?.length || 1),
      competitors: Object.fromEntries(
        Object.entries(competitorData).map(([url, data]) => [
          url,
          data.comments?.reduce((acc, c) => acc + c.score, 0) || 0 / (data.comments?.length || 1)
        ])
      ),
      percentageDiffs: Object.fromEntries(
        Object.entries(competitorData).map(([url, data]) => [
          url,
          ((((data.comments?.reduce((acc, c) => acc + c.score, 0) || 0 / (data.comments?.length || 1)) - 
            (mainAppData.comments?.reduce((acc, c) => acc + c.score, 0) || 0 / (mainAppData.comments?.length || 1))) / 
            (mainAppData.comments?.reduce((acc, c) => acc + c.score, 0) || 0 / (mainAppData.comments?.length || 1))) * 100)
        ])
      ),
      significance: Object.fromEntries(
        Object.entries(competitorData).map(([url, data]) => [
          url,
          calculateStatisticalSignificance(
            mainAppData.comments?.reduce((acc, c) => acc + c.score, 0) || 0 / (mainAppData.comments?.length || 1),
            data.comments?.reduce((acc, c) => acc + c.score, 0) || 0 / (data.comments?.length || 1),
            Math.min(mainAppData.comments?.length || 0, data.comments?.length || 0)
          )
        ])
      )
    },
    'Comment Volume': {
      mainApp: mainAppData.comments?.length || 0,
      competitors: Object.fromEntries(
        Object.entries(competitorData).map(([url, data]) => [url, data.comments?.length || 0])
      ),
      percentageDiffs: Object.fromEntries(
        Object.entries(competitorData).map(([url, data]) => [
          url,
          ((((data.comments?.length || 0) - (mainAppData.comments?.length || 0)) / 
            (mainAppData.comments?.length || 1)) * 100)
        ])
      ),
      significance: Object.fromEntries(
        Object.entries(competitorData).map(([url, data]) => [
          url,
          calculateStatisticalSignificance(
            mainAppData.comments?.length || 0,
            data.comments?.length || 0,
            Math.min(mainAppData.comments?.length || 0, data.comments?.length || 0)
          )
        ])
      )
    }
  };

  // Analyze shared keywords
  const allKeywords = new Set([
    ...(mainAppData.keywords?.map(k => k.word) || []),
    ...Object.values(competitorData).flatMap(data => data.keywords?.map(k => k.word) || [])
  ]);

  const sharedKeywords = Array.from(allKeywords).map(word => {
    const mainAppKeyword = mainAppData.keywords?.find(k => k.word === word);
    const competitorKeywords = Object.fromEntries(
      Object.entries(competitorData).map(([url, data]) => [
        url,
        data.keywords?.find(k => k.word === word)?.count || 0
      ])
    );

    // Determine sentiment for the keyword
    const mainAppSentiment = mainAppData.comments
      ?.filter(c => c.content.toLowerCase().includes(word.toLowerCase()))
      .reduce((acc, c) => {
        acc[c.sentiment] = (acc[c.sentiment] || 0) + 1;
        return acc;
      }, {} as Record<'positive' | 'negative' | 'neutral', number>);

    const competitorSentiments = Object.fromEntries(
      Object.entries(competitorData).map(([url, data]) => [
        url,
        data.comments
          ?.filter(c => c.content.toLowerCase().includes(word.toLowerCase()))
          .reduce((acc, c) => {
            acc[c.sentiment] = (acc[c.sentiment] || 0) + 1;
            return acc;
          }, {} as Record<'positive' | 'negative' | 'neutral', number>)
      ])
    );

    const getDominantSentiment = (sentiments: Record<'positive' | 'negative' | 'neutral', number> | undefined) => {
      if (!sentiments) return 'neutral';
      const max = Math.max(...Object.values(sentiments));
      return Object.entries(sentiments).find(([, count]) => count === max)?.[0] as 'positive' | 'negative' | 'neutral' || 'neutral';
    };

    return {
      word,
      mainApp: mainAppKeyword?.count || 0,
      competitors: competitorKeywords,
      sentiment: {
        mainApp: getDominantSentiment(mainAppSentiment),
        competitors: Object.fromEntries(
          Object.entries(competitorSentiments).map(([url, sentiments]) => [
            url,
            getDominantSentiment(sentiments)
          ])
        )
      }
    };
  });

  // Extract feature requests and bug reports
  const featureRequests = {
    mainApp: mainAppData.intentions?.feature_request.reduce((acc, comment) => {
      const feature = comment.content;
      const existing = acc.find(item => item.feature === feature);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ feature, count: 1 });
      }
      return acc;
    }, [] as { feature: string; count: number }[]) || [],
    competitors: Object.fromEntries(
      Object.entries(competitorData).map(([url, data]) => [
        url,
        data.intentions?.feature_request.reduce((acc, comment) => {
          const feature = comment.content;
          const existing = acc.find(item => item.feature === feature);
          if (existing) {
            existing.count++;
          } else {
            acc.push({ feature, count: 1 });
          }
          return acc;
        }, [] as { feature: string; count: number }[]) || []
      ])
    )
  };

  const bugReports = {
    mainApp: mainAppData.intentions?.bug_report.reduce((acc, comment) => {
      const bug = comment.content;
      const existing = acc.find(item => item.bug === bug);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ bug, count: 1 });
      }
      return acc;
    }, [] as { bug: string; count: number }[]) || [],
    competitors: Object.fromEntries(
      Object.entries(competitorData).map(([url, data]) => [
        url,
        data.intentions?.bug_report.reduce((acc, comment) => {
          const bug = comment.content;
          const existing = acc.find(item => item.bug === bug);
          if (existing) {
            existing.count++;
          } else {
            acc.push({ bug, count: 1 });
          }
          return acc;
        }, [] as { bug: string; count: number }[]) || []
      ])
    )
  };

  // Add feature gaps analysis
  const featureGaps = analyzeFeatureGaps(mainAppData, competitorData);

  return {
    metrics,
    sharedKeywords,
    uniqueKeywords: {
      mainApp: mainAppData.keywords?.filter(k => 
        !Object.values(competitorData).some(data => 
          data.keywords?.some(ck => ck.word === k.word)
        )
      ) || [],
      competitors: Object.fromEntries(
        Object.entries(competitorData).map(([url, data]) => [
          url,
          data.keywords?.filter(k => 
            !mainAppData.keywords?.some(mk => mk.word === k.word) &&
            !Object.entries(competitorData)
              .filter(([otherUrl]) => otherUrl !== url)
              .some(([, otherData]) => 
                otherData.keywords?.some(ok => ok.word === k.word)
              )
          ) || []
        ])
      )
    },
    featureRequests,
    bugReports,
    featureGaps
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const mainAppUrl = formData.get('mainAppUrl') as string;
  const competitorUrls = JSON.parse(formData.get('competitorUrls') as string) as string[];

  try {
    // Fetch and analyze data for all apps
    const mainAppData = await fetchAndAnalyzeApp(mainAppUrl);
    const competitorData = Object.fromEntries(
      await Promise.all(
        competitorUrls.map(async url => [url, await fetchAndAnalyzeApp(url)])
      )
    );

    // Compare the apps
    const comparisonResult = compareApps(mainAppData, competitorData);

    return json(comparisonResult);
  } catch (error) {
    console.error('Comparison error:', error);
    return json({ error: 'Failed to compare apps' }, { status: 500 });
  }
}; 