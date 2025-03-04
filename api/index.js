var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 51,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 101,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  Layout: () => Layout,
  default: () => App,
  links: () => links
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import { Flowbite } from "flowbite-react";

// app/components/common/Navbar.tsx
import { DarkThemeToggle } from "flowbite-react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
function Navbar() {
  return /* @__PURE__ */ jsxDEV2("nav", { className: "fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700", children: /* @__PURE__ */ jsxDEV2("div", { className: "px-3 py-3 lg:px-5 lg:pl-3", children: /* @__PURE__ */ jsxDEV2("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDEV2("div", { className: "flex items-center justify-start", children: [
      /* @__PURE__ */ jsxDEV2(
        "button",
        {
          "data-drawer-target": "logo-sidebar",
          "data-drawer-toggle": "logo-sidebar",
          "aria-controls": "logo-sidebar",
          type: "button",
          className: "inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
          children: [
            /* @__PURE__ */ jsxDEV2("span", { className: "sr-only", children: "Open sidebar" }, void 0, !1, {
              fileName: "app/components/common/Navbar.tsx",
              lineNumber: 17,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV2(Bars3Icon, { className: "w-6 h-6" }, void 0, !1, {
              fileName: "app/components/common/Navbar.tsx",
              lineNumber: 18,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/common/Navbar.tsx",
          lineNumber: 10,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV2("div", { className: "flex ms-2 md:me-24", children: /* @__PURE__ */ jsxDEV2("span", { className: "self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white", children: "UX Tools" }, void 0, !1, {
        fileName: "app/components/common/Navbar.tsx",
        lineNumber: 21,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/components/common/Navbar.tsx",
        lineNumber: 20,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/common/Navbar.tsx",
      lineNumber: 9,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV2("div", { className: "flex items-center", children: /* @__PURE__ */ jsxDEV2(DarkThemeToggle, { className: "rounded-full p-2.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700" }, void 0, !1, {
      fileName: "app/components/common/Navbar.tsx",
      lineNumber: 27,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/common/Navbar.tsx",
      lineNumber: 26,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/common/Navbar.tsx",
    lineNumber: 8,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/components/common/Navbar.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/common/Navbar.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

// app/lib/theme.ts
var theme = {
  sidebar: {
    root: {
      base: "h-full",
      inner: "h-full overflow-y-auto overflow-x-hidden bg-white/50 dark:bg-gray-900/50 py-4 px-3"
    },
    item: {
      base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
      active: "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
      icon: {
        base: "h-5 w-5 flex-shrink-0 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white",
        active: "text-blue-600 dark:text-blue-400"
      }
    }
  },
  button: {
    base: "group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none transition-all duration-200",
    pill: {
      off: "rounded-lg",
      on: "rounded-full"
    }
  },
  navbar: {
    root: {
      base: "fixed z-30 w-full border-b border-gray-200 bg-white/50 dark:border-gray-700 dark:bg-gray-900/50 backdrop-blur-xl"
    }
  },
  avatar: {
    root: {
      base: "flex justify-center items-center space-x-4 rounded-full",
      bordered: "p-1 ring-2",
      img: {
        off: "rounded-full",
        on: "rounded-full"
      },
      size: {
        xs: "w-6 h-6",
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-20 h-20",
        xl: "w-36 h-36"
      }
    }
  }
};

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-YXLR4I5T.css";

// app/root.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", href: tailwind_default },
  ...void 0 ? [{ rel: "stylesheet", href: void 0 }] : [],
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxDEV3("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV3("head", { children: [
      /* @__PURE__ */ jsxDEV3("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 38,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 39,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 35,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("body", { children: [
      children,
      /* @__PURE__ */ jsxDEV3(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 43,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 44,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 41,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 34,
    columnNumber: 5
  }, this);
}
function App() {
  return /* @__PURE__ */ jsxDEV3("html", { lang: "en", className: "h-full", children: [
    /* @__PURE__ */ jsxDEV3("head", { children: [
      /* @__PURE__ */ jsxDEV3("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 58,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 54,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("body", { className: "h-full bg-gray-50 dark:bg-gray-900", children: /* @__PURE__ */ jsxDEV3(Flowbite, { theme: { theme }, children: [
      /* @__PURE__ */ jsxDEV3(Navbar, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 62,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV3(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 63,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV3(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 64,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV3(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 65,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV3(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 66,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV3(Analytics, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 67,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 61,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 53,
    columnNumber: 5
  }, this);
}

// app/routes/api.comments.ts
var api_comments_exports = {};
__export(api_comments_exports, {
  action: () => action
});
import { json } from "@remix-run/node";
import gplay from "google-play-scraper";
import natural from "natural";
var action = async ({ request }) => {
  console.log("API endpoint called with method:", request.method);
  let headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  if (request.method === "OPTIONS")
    return console.log("Handling OPTIONS request"), new Response(null, { headers });
  if (request.method !== "POST")
    return console.log("Invalid method:", request.method), json(
      { error: "Method not allowed" },
      { status: 405, headers }
    );
  try {
    let formData = await request.formData(), url = formData.get("url"), year = formData.get("year"), searchTerm = formData.get("searchTerm");
    if (console.log("Received form data:", { url, year, searchTerm }), !url)
      return console.log("URL is missing"), json(
        { error: "URL is required" },
        { status: 400, headers }
      );
    let appId = url.split("id=")[1]?.split("&")[0];
    if (!appId)
      return console.log("Invalid Play Store URL:", url), json(
        { error: "Invalid Play Store URL" },
        { status: 400, headers }
      );
    console.log("Fetching reviews for app ID:", appId);
    let allReviews = [], nextPaginationToken, maxReviews = 5e3, batchNumber = 0, reachedEnd = !1;
    console.log("Starting to fetch reviews (target limit:", maxReviews, ")");
    do {
      batchNumber++, console.log(`Fetching batch #${batchNumber}...`);
      try {
        let reviewBatch = await gplay.reviews({
          appId,
          sort: gplay.sort.NEWEST,
          num: 150,
          // Increased batch size to 150
          paginate: !0,
          nextPaginationToken
        });
        if (!reviewBatch || !reviewBatch.data || reviewBatch.data.length === 0) {
          console.log("No more reviews available in this batch"), reachedEnd = !0;
          break;
        }
        allReviews = allReviews.concat(reviewBatch.data), nextPaginationToken = reviewBatch.nextPaginationToken;
        let progress = Math.min(allReviews.length / maxReviews * 100, 100).toFixed(1);
        if (console.log(`Batch #${batchNumber}: Got ${reviewBatch.data.length} reviews. Total: ${allReviews.length} (${progress}%)`), console.log("Has next page token:", !!nextPaginationToken), allReviews.length >= maxReviews) {
          console.log(`Reached maximum review limit of ${maxReviews}`);
          break;
        }
        if (!nextPaginationToken) {
          console.log("No next page token available - reached end of reviews"), reachedEnd = !0;
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Error in batch #${batchNumber}:`, error), reachedEnd = !0;
        break;
      }
    } while (!reachedEnd);
    if (allReviews.length === 0)
      throw console.log("No reviews found for app ID:", appId), new Error("No reviews found");
    console.log(`Completed fetching reviews. Total retrieved: ${allReviews.length}`), reachedEnd && console.log("Reached natural end of available reviews");
    let processedComments = allReviews.map((comment) => {
      let reviewDate = new Date(comment.date || /* @__PURE__ */ new Date()), content = comment.text || "", sentimentScore = new natural.SentimentAnalyzer("English", natural.PorterStemmer, "afinn").getSentiment(content.split(" ")), sentiment3 = sentimentScore > 0 ? "positive" : sentimentScore < 0 ? "negative" : "neutral";
      return {
        id: comment.id || String(Math.random()),
        userName: comment.userName || "Anonymous",
        content,
        score: comment.score || 0,
        thumbsUp: comment.thumbsUp || 0,
        date: reviewDate.toISOString(),
        year: reviewDate.getFullYear(),
        sentiment: sentiment3
      };
    }).filter((comment) => {
      let matchesYear = year === "all" || comment.year.toString() === year, matchesSearch = !searchTerm || comment.content.toLowerCase().includes(searchTerm.toLowerCase());
      return console.log(`Comment from year ${comment.year}, matches year filter: ${matchesYear}, matches search: ${matchesSearch}`), matchesYear && matchesSearch;
    });
    console.log(`After filtering: ${processedComments.length} comments match criteria`);
    let sentiment2 = {
      positive: processedComments.filter((c) => c.sentiment === "positive").length,
      negative: processedComments.filter((c) => c.sentiment === "negative").length,
      neutral: processedComments.filter((c) => c.sentiment === "neutral").length
    }, TfIdf = natural.TfIdf, tfidf = new TfIdf();
    processedComments.forEach((comment) => {
      tfidf.addDocument(comment.content);
    });
    let keywords = /* @__PURE__ */ new Set(), keywordCounts = {};
    processedComments.forEach((comment) => {
      comment.content.toLowerCase().split(/\W+/).forEach((word) => {
        word.length > 3 && (keywords.add(word), keywordCounts[word] = (keywordCounts[word] || 0) + 1);
      });
    });
    let sortedKeywords = Array.from(keywords).map((word) => ({
      word,
      count: keywordCounts[word]
    })).sort((a, b) => b.count - a.count).slice(0, 10), intentions = {
      feature_request: [],
      bug_report: [],
      praise: [],
      complaint: []
    }, intentionKeywords = {
      feature_request: ["add", "would be nice", "should have", "need", "missing"],
      bug_report: ["bug", "crash", "error", "issue", "problem", "not working"],
      praise: ["great", "awesome", "love", "excellent", "perfect", "amazing"],
      complaint: ["bad", "terrible", "poor", "waste", "disappointed", "awful"]
    };
    return processedComments.forEach((comment) => {
      let content = comment.content.toLowerCase();
      for (let [intention, keywords2] of Object.entries(intentionKeywords))
        keywords2.some((keyword) => content.includes(keyword)) && intentions[intention].push(comment);
    }), json({
      comments: processedComments,
      sentiment: sentiment2,
      keywords: sortedKeywords,
      intentions
    }, { headers });
  } catch (error) {
    return console.error("Error analyzing comments:", error), json(
      { error: error instanceof Error ? error.message : "Failed to analyze comments" },
      { status: 500, headers }
    );
  }
};

// app/routes/api.compare.ts
var api_compare_exports = {};
__export(api_compare_exports, {
  action: () => action2
});
import { json as json2 } from "@remix-run/node";
import gplay2 from "google-play-scraper";

// app/lib/sentiment.ts
import natural2 from "natural";
function sentiment(text) {
  let score = new natural2.SentimentAnalyzer("English", natural2.PorterStemmer, "afinn").getSentiment(text.split(" "));
  return score > 0.1 ? "positive" : score < -0.1 ? "negative" : "neutral";
}

// app/lib/keywords.ts
function extractKeywords(text) {
  let words = text.toLowerCase().split(/\W+/), stopwords = /* @__PURE__ */ new Set([
    "the",
    "be",
    "to",
    "of",
    "and",
    "a",
    "in",
    "that",
    "have",
    "i",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "his",
    "by",
    "from",
    "they",
    "we",
    "say",
    "her",
    "she",
    "or",
    "an",
    "will",
    "my",
    "one",
    "all",
    "would",
    "there",
    "their",
    "what",
    "so",
    "up",
    "out",
    "if",
    "about",
    "who",
    "get",
    "which",
    "go",
    "me",
    "app",
    "apps",
    "use",
    "using",
    "used",
    "just",
    "can",
    "like",
    "good",
    "bad"
  ]), filteredWords = words.filter(
    (word) => word.length > 3 && !stopwords.has(word) && /^[a-z]+$/.test(word)
  ), wordCounts = /* @__PURE__ */ new Map();
  for (let word of filteredWords)
    wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
  return Array.from(wordCounts.entries()).map(([word, count]) => ({ word, count })).sort((a, b) => b.count - a.count).slice(0, 50);
}

// app/lib/trends.ts
function groupByMonth(reviews) {
  let monthlyData = /* @__PURE__ */ new Map();
  return reviews.forEach((review) => {
    let date = new Date(review.date), monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthlyData.has(monthKey) || monthlyData.set(monthKey, {
      date: monthKey,
      positive: 0,
      negative: 0,
      neutral: 0,
      total: 0
    });
    let data = monthlyData.get(monthKey);
    data[review.sentiment]++, data.total++;
  }), Array.from(monthlyData.values()).sort((a, b) => a.date.localeCompare(b.date));
}

// app/routes/api.compare.ts
async function fetchWithRetry(fn, maxRetries = 3, delay = 2e3) {
  for (let i = 0; i < maxRetries; i++)
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1)
        throw error;
      await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  throw new Error("Max retries exceeded");
}
async function fetchAndAnalyzeApp(url, year) {
  let appId = url.split("id=")[1]?.split("&")[0];
  if (!appId)
    throw new Error(`Invalid Play Store URL: ${url}`);
  let appInfo = await fetchWithRetry(() => gplay2.app({ appId })), startDate = new Date(year, 0, 1), endDate = new Date(year + 1, 0, 1), allReviews = [], batchNum = 0, batchSize = 100;
  for (; ; ) {
    let batch = await fetchWithRetry(
      () => gplay2.reviews({
        appId,
        sort: gplay2.sort.NEWEST,
        num: batchSize,
        paginate: !0,
        nextPaginationToken: batchNum > 0 ? String(batchNum) : void 0
      })
    );
    if (!batch.data || batch.data.length === 0)
      break;
    let filteredReviews = batch.data.filter((review) => {
      let reviewDate = new Date(review.date);
      return reviewDate >= startDate && reviewDate < endDate;
    });
    if (filteredReviews.length === 0 || (allReviews.push(...filteredReviews), !batch.nextPaginationToken || allReviews.length >= 1e3))
      break;
    batchNum++, await new Promise((resolve) => setTimeout(resolve, 1e3));
  }
  let sentimentResults = allReviews.map((review) => sentiment(review.text)), sentimentCounts = sentimentResults.reduce(
    (acc, result) => (acc[result]++, acc),
    { positive: 0, neutral: 0, negative: 0 }
  ), keywords = extractKeywords(
    allReviews.map((review) => review.text).join(" ")
  ), trends = groupByMonth(allReviews.map((review, index) => ({
    date: review.date,
    sentiment: sentimentResults[index]
  })));
  return {
    appInfo,
    comments: allReviews.map((review) => ({
      id: review.id,
      userName: review.userName,
      userImage: review.userImage || "",
      content: review.text,
      score: review.score,
      thumbsUpCount: review.thumbsUp,
      reviewCreatedVersion: review.version || "",
      at: review.date,
      replyContent: review.replyText || "",
      repliedAt: review.replyDate || ""
    })),
    sentiment: sentimentCounts,
    keywords,
    trends
  };
}
async function action2({ request }) {
  if (request.method !== "POST")
    return json2({ error: "Method not allowed" }, { status: 405 });
  try {
    let formData = await request.formData(), urlsJson = formData.get("urls"), yearStr = formData.get("year");
    if (!urlsJson || !yearStr)
      return json2(
        { error: "Missing required parameters: urls and year" },
        { status: 400 }
      );
    let urls = JSON.parse(urlsJson), year = parseInt(yearStr, 10);
    if (!Array.isArray(urls) || urls.length === 0)
      return json2({ error: "Invalid URLs parameter" }, { status: 400 });
    if (isNaN(year) || year < 2010 || year > (/* @__PURE__ */ new Date()).getFullYear())
      return json2({ error: "Invalid year parameter" }, { status: 400 });
    let results = {};
    for (let url of urls)
      try {
        results[url] = await fetchAndAnalyzeApp(url, year), urls.indexOf(url) < urls.length - 1 && await new Promise((resolve) => setTimeout(resolve, 2e3));
      } catch (error) {
        return console.error(`Error analyzing app ${url}:`, error), json2(
          {
            error: `Failed to analyze app: ${url}. ${error instanceof Error ? error.message : "Unknown error"}`
          },
          { status: 500 }
        );
      }
    let allKeywords = Object.values(results).map((result) => result.keywords), sharedKeywords = allKeywords[0].filter(
      (keyword) => allKeywords.slice(1).every(
        (keywords) => keywords.some((k) => k.word === keyword.word)
      )
    );
    return json2({
      success: !0,
      results,
      sharedKeywords
    });
  } catch (error) {
    return console.error("Comparison error:", error), json2(
      {
        error: `Failed to compare apps: ${error instanceof Error ? error.message : "Unknown error"}`
      },
      { status: 500 }
    );
  }
}

// app/routes/comparison.tsx
var comparison_exports = {};
__export(comparison_exports, {
  default: () => Comparison,
  meta: () => meta
});

// app/components/common/Sidebar.tsx
import { Link, useLocation } from "@remix-run/react";
import { HomeIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
function Sidebar() {
  let location = useLocation(), isActive = (path) => location.pathname === path;
  return /* @__PURE__ */ jsxDEV4(
    "aside",
    {
      id: "logo-sidebar",
      className: "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700",
      "aria-label": "Sidebar",
      children: /* @__PURE__ */ jsxDEV4("div", { className: "h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800", children: /* @__PURE__ */ jsxDEV4("ul", { className: "space-y-2 font-medium", children: [
        { path: "/", icon: HomeIcon, label: "Dashboard" },
        { path: "/comparison", icon: ChartBarIcon, label: "App Comparison" }
      ].map((item) => /* @__PURE__ */ jsxDEV4("li", { children: /* @__PURE__ */ jsxDEV4(
        Link,
        {
          to: item.path,
          className: `flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${isActive(item.path) ? "bg-gray-100 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"} group`,
          children: [
            /* @__PURE__ */ jsxDEV4(item.icon, { className: "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" }, void 0, !1, {
              fileName: "app/components/common/Sidebar.tsx",
              lineNumber: 29,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV4("span", { className: "ms-3", children: item.label }, void 0, !1, {
              fileName: "app/components/common/Sidebar.tsx",
              lineNumber: 30,
              columnNumber: 17
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/common/Sidebar.tsx",
          lineNumber: 21,
          columnNumber: 15
        },
        this
      ) }, item.path, !1, {
        fileName: "app/components/common/Sidebar.tsx",
        lineNumber: 20,
        columnNumber: 13
      }, this)) }, void 0, !1, {
        fileName: "app/components/common/Sidebar.tsx",
        lineNumber: 15,
        columnNumber: 9
      }, this) }, void 0, !1, {
        fileName: "app/components/common/Sidebar.tsx",
        lineNumber: 14,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/common/Sidebar.tsx",
      lineNumber: 9,
      columnNumber: 5
    },
    this
  );
}

// app/components/comparison/ComparisonDashboard.tsx
import { useState as useState2 } from "react";
import { Card as Card6, Spinner, Alert } from "flowbite-react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

// app/components/comparison/AppComparisonForm.tsx
import { useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
function AppComparisonForm({ onSubmit }) {
  let [competitorUrls, setCompetitorUrls] = useState(["", ""]), [selectedYear, setSelectedYear] = useState((/* @__PURE__ */ new Date()).getFullYear());
  return /* @__PURE__ */ jsxDEV5("form", { onSubmit: (e) => {
    e.preventDefault();
    let validUrls = competitorUrls.filter((url) => url.trim() !== "");
    validUrls.length > 0 && onSubmit(validUrls, selectedYear);
  }, className: "space-y-4", children: [
    /* @__PURE__ */ jsxDEV5("div", { className: "grid gap-4", children: competitorUrls.map((url, index) => /* @__PURE__ */ jsxDEV5("div", { children: [
      /* @__PURE__ */ jsxDEV5("div", { className: "mb-2", children: /* @__PURE__ */ jsxDEV5(Label, { htmlFor: `app-${index}`, children: index === 0 ? "Main App URL" : `Competitor ${index} URL` }, void 0, !1, {
        fileName: "app/components/comparison/AppComparisonForm.tsx",
        lineNumber: 31,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/components/comparison/AppComparisonForm.tsx",
        lineNumber: 30,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV5(
        TextInput,
        {
          id: `app-${index}`,
          type: "url",
          placeholder: "https://play.google.com/store/apps/details?id=...",
          value: url,
          onChange: (e) => {
            let newUrls = [...competitorUrls];
            newUrls[index] = e.target.value, setCompetitorUrls(newUrls);
          },
          required: index === 0,
          color: "gray",
          helperText: index === 0 ? "Enter your app's Play Store URL" : "Enter competitor's Play Store URL"
        },
        void 0,
        !1,
        {
          fileName: "app/components/comparison/AppComparisonForm.tsx",
          lineNumber: 35,
          columnNumber: 13
        },
        this
      )
    ] }, index, !0, {
      fileName: "app/components/comparison/AppComparisonForm.tsx",
      lineNumber: 29,
      columnNumber: 11
    }, this)) }, void 0, !1, {
      fileName: "app/components/comparison/AppComparisonForm.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxDEV5("div", { children: [
        /* @__PURE__ */ jsxDEV5("div", { className: "mb-2", children: /* @__PURE__ */ jsxDEV5(Label, { htmlFor: "year", children: "Filter by Year" }, void 0, !1, {
          fileName: "app/components/comparison/AppComparisonForm.tsx",
          lineNumber: 56,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/components/comparison/AppComparisonForm.tsx",
          lineNumber: 55,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV5(
          Select,
          {
            id: "year",
            value: selectedYear,
            onChange: (e) => setSelectedYear(Number(e.target.value)),
            children: [
              /* @__PURE__ */ jsxDEV5("option", { value: 2024, children: "2024" }, void 0, !1, {
                fileName: "app/components/comparison/AppComparisonForm.tsx",
                lineNumber: 63,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV5("option", { value: 2023, children: "2023" }, void 0, !1, {
                fileName: "app/components/comparison/AppComparisonForm.tsx",
                lineNumber: 64,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV5("option", { value: 2022, children: "2022" }, void 0, !1, {
                fileName: "app/components/comparison/AppComparisonForm.tsx",
                lineNumber: 65,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV5("option", { value: 2021, children: "2021" }, void 0, !1, {
                fileName: "app/components/comparison/AppComparisonForm.tsx",
                lineNumber: 66,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/comparison/AppComparisonForm.tsx",
            lineNumber: 58,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/comparison/AppComparisonForm.tsx",
        lineNumber: 54,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV5("div", { className: "flex items-end", children: /* @__PURE__ */ jsxDEV5(Button, { type: "submit", color: "blue", className: "h-[42px]", children: "Compare Apps" }, void 0, !1, {
        fileName: "app/components/comparison/AppComparisonForm.tsx",
        lineNumber: 70,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/comparison/AppComparisonForm.tsx",
        lineNumber: 69,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/comparison/AppComparisonForm.tsx",
      lineNumber: 53,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/comparison/AppComparisonForm.tsx",
    lineNumber: 26,
    columnNumber: 5
  }, this);
}

// app/components/comparison/MetricsComparison.tsx
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import { Card as Card2, Button as Button2 } from "flowbite-react";
import { XMarkIcon } from "@heroicons/react/24/solid";

// app/components/comparison/SentimentDistributionCard.tsx
import { Card, Progress } from "flowbite-react";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var formatDiff = (diff) => diff == null ? "" : `${diff > 0 ? "+" : ""}${diff.toFixed(1)}%`, getDiffColorClass = (diff, isNegativeGood = !1) => {
  if (diff == null)
    return "";
  let isPositive = diff > 0;
  return (isNegativeGood ? !isPositive : isPositive) ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";
};
function SentimentDistributionCard({ apps, percentageDiffs }) {
  return /* @__PURE__ */ jsxDEV6(Card, { className: "mt-6", children: [
    /* @__PURE__ */ jsxDEV6("h3", { className: "text-lg font-medium mb-4 text-gray-800 dark:text-white", children: "Sentiment Distribution" }, void 0, !1, {
      fileName: "app/components/comparison/SentimentDistributionCard.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: apps.map((app, index) => /* @__PURE__ */ jsxDEV6(Card, { className: "bg-gray-50 dark:bg-gray-700", children: [
      /* @__PURE__ */ jsxDEV6("div", { className: "flex justify-between items-center mb-3", children: [
        /* @__PURE__ */ jsxDEV6("h4", { className: "font-medium text-gray-800 dark:text-white", children: app.name }, void 0, !1, {
          fileName: "app/components/comparison/SentimentDistributionCard.tsx",
          lineNumber: 35,
          columnNumber: 15
        }, this),
        index === 0 && /* @__PURE__ */ jsxDEV6("span", { className: "inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full", children: "Your App" }, void 0, !1, {
          fileName: "app/components/comparison/SentimentDistributionCard.tsx",
          lineNumber: 39,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/comparison/SentimentDistributionCard.tsx",
        lineNumber: 34,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV6("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxDEV6("div", { children: [
          /* @__PURE__ */ jsxDEV6("div", { className: "flex justify-between text-sm mb-1", children: [
            /* @__PURE__ */ jsxDEV6("span", { className: "text-gray-700 dark:text-gray-300", children: "Positive" }, void 0, !1, {
              fileName: "app/components/comparison/SentimentDistributionCard.tsx",
              lineNumber: 49,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV6("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxDEV6("span", { className: "text-gray-700 dark:text-gray-300", children: [
                app.metrics.sentimentDistribution.positive,
                "%"
              ] }, void 0, !0, {
                fileName: "app/components/comparison/SentimentDistributionCard.tsx",
                lineNumber: 51,
                columnNumber: 21
              }, this),
              index > 0 && /* @__PURE__ */ jsxDEV6("span", { className: `ml-1 text-xs ${getDiffColorClass(percentageDiffs[index]?.sentimentPositive)}`, children: [
                "(",
                formatDiff(percentageDiffs[index]?.sentimentPositive),
                ")"
              ] }, void 0, !0, {
                fileName: "app/components/comparison/SentimentDistributionCard.tsx",
                lineNumber: 53,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/comparison/SentimentDistributionCard.tsx",
              lineNumber: 50,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/comparison/SentimentDistributionCard.tsx",
            lineNumber: 48,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV6(
            Progress,
            {
              progress: app.metrics.sentimentDistribution.positive,
              color: "success",
              size: "sm"
            },
            void 0,
            !1,
            {
              fileName: "app/components/comparison/SentimentDistributionCard.tsx",
              lineNumber: 59,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/comparison/SentimentDistributionCard.tsx",
          lineNumber: 47,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV6("div", { children: [
          /* @__PURE__ */ jsxDEV6("div", { className: "flex justify-between text-sm mb-1", children: [
            /* @__PURE__ */ jsxDEV6("span", { className: "text-gray-700 dark:text-gray-300", children: "Neutral" }, void 0, !1, {
              fileName: "app/components/comparison/SentimentDistributionCard.tsx",
              lineNumber: 67,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV6("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxDEV6("span", { className: "text-gray-700 dark:text-gray-300", children: [
                app.metrics.sentimentDistribution.neutral,
                "%"
              ] }, void 0, !0, {
                fileName: "app/components/comparison/SentimentDistributionCard.tsx",
                lineNumber: 69,
                columnNumber: 21
              }, this),
              index > 0 && /* @__PURE__ */ jsxDEV6("span", { className: `ml-1 text-xs ${getDiffColorClass(percentageDiffs[index]?.sentimentNeutral)}`, children: [
                "(",
                formatDiff(percentageDiffs[index]?.sentimentNeutral),
                ")"
              ] }, void 0, !0, {
                fileName: "app/components/comparison/SentimentDistributionCard.tsx",
                lineNumber: 71,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/comparison/SentimentDistributionCard.tsx",
              lineNumber: 68,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/comparison/SentimentDistributionCard.tsx",
            lineNumber: 66,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV6(
            Progress,
            {
              progress: app.metrics.sentimentDistribution.neutral,
              color: "warning",
              size: "sm"
            },
            void 0,
            !1,
            {
              fileName: "app/components/comparison/SentimentDistributionCard.tsx",
              lineNumber: 77,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/comparison/SentimentDistributionCard.tsx",
          lineNumber: 65,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV6("div", { children: [
          /* @__PURE__ */ jsxDEV6("div", { className: "flex justify-between text-sm mb-1", children: [
            /* @__PURE__ */ jsxDEV6("span", { className: "text-gray-700 dark:text-gray-300", children: "Negative" }, void 0, !1, {
              fileName: "app/components/comparison/SentimentDistributionCard.tsx",
              lineNumber: 85,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV6("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxDEV6("span", { className: "text-gray-700 dark:text-gray-300", children: [
                app.metrics.sentimentDistribution.negative,
                "%"
              ] }, void 0, !0, {
                fileName: "app/components/comparison/SentimentDistributionCard.tsx",
                lineNumber: 87,
                columnNumber: 21
              }, this),
              index > 0 && /* @__PURE__ */ jsxDEV6("span", { className: `ml-1 text-xs ${getDiffColorClass(percentageDiffs[index]?.sentimentNegative, !0)}`, children: [
                "(",
                formatDiff(percentageDiffs[index]?.sentimentNegative),
                ")"
              ] }, void 0, !0, {
                fileName: "app/components/comparison/SentimentDistributionCard.tsx",
                lineNumber: 89,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/comparison/SentimentDistributionCard.tsx",
              lineNumber: 86,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/comparison/SentimentDistributionCard.tsx",
            lineNumber: 84,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV6(
            Progress,
            {
              progress: app.metrics.sentimentDistribution.negative,
              color: "failure",
              size: "sm"
            },
            void 0,
            !1,
            {
              fileName: "app/components/comparison/SentimentDistributionCard.tsx",
              lineNumber: 95,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/comparison/SentimentDistributionCard.tsx",
          lineNumber: 83,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/comparison/SentimentDistributionCard.tsx",
        lineNumber: 46,
        columnNumber: 13
      }, this)
    ] }, `sentiment-${app.id}`, !0, {
      fileName: "app/components/comparison/SentimentDistributionCard.tsx",
      lineNumber: 33,
      columnNumber: 11
    }, this)) }, void 0, !1, {
      fileName: "app/components/comparison/SentimentDistributionCard.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/comparison/SentimentDistributionCard.tsx",
    lineNumber: 29,
    columnNumber: 5
  }, this);
}

// app/components/comparison/MetricsComparison.tsx
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
function MetricsComparison({ apps, onRemoveApp }) {
  let primaryApp = apps[0], percentageDiffs = useMemo(() => apps.map((app) => app.id === primaryApp.id ? null : {
    averageRating: (app.metrics.averageRating - primaryApp.metrics.averageRating) / primaryApp.metrics.averageRating * 100,
    totalReviews: (app.metrics.totalReviews - primaryApp.metrics.totalReviews) / primaryApp.metrics.totalReviews * 100,
    sentimentPositive: (app.sentiments.positive - primaryApp.sentiments.positive) / primaryApp.sentiments.positive * 100,
    sentimentNeutral: (app.sentiments.neutral - primaryApp.sentiments.neutral) / primaryApp.sentiments.neutral * 100,
    sentimentNegative: (app.sentiments.negative - primaryApp.sentiments.negative) / primaryApp.sentiments.negative * 100
  }), [apps, primaryApp]), formatDiff2 = (diff) => diff == null ? "" : `${diff > 0 ? "+" : ""}${diff.toFixed(1)}%`, getDiffColorClass2 = (diff, isNegativeGood = !1) => {
    if (diff == null)
      return "";
    let isPositive = diff > 0;
    return (isNegativeGood ? !isPositive : isPositive) ? "text-green-600" : "text-red-600";
  }, chartData = useMemo(() => ({
    ratings: apps.map((app) => ({
      name: app.name,
      rating: app.metrics.averageRating,
      color: app.id === primaryApp.id ? "#3B82F6" : "#10B981",
      diff: app.id === primaryApp.id ? 0 : (app.metrics.averageRating - primaryApp.metrics.averageRating) / primaryApp.metrics.averageRating * 100
    })),
    reviews: apps.map((app) => ({
      name: app.name,
      reviews: app.metrics.totalReviews,
      color: app.id === primaryApp.id ? "#3B82F6" : "#10B981",
      diff: app.id === primaryApp.id ? 0 : (app.metrics.totalReviews - primaryApp.metrics.totalReviews) / primaryApp.metrics.totalReviews * 100
    }))
  }), [apps, primaryApp]), appColors = useMemo(() => {
    let colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];
    return apps.reduce((acc, app, index) => (acc[app.id] = colors[index % colors.length], acc), {});
  }, [apps]);
  return /* @__PURE__ */ jsxDEV7(Card2, { children: [
    /* @__PURE__ */ jsxDEV7("div", { className: "border-b border-gray-200 dark:border-gray-700 pb-4", children: [
      /* @__PURE__ */ jsxDEV7("h2", { className: "text-xl font-semibold text-gray-800 dark:text-white", children: "Metrics Comparison" }, void 0, !1, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV7("p", { className: "text-gray-600 dark:text-gray-400 text-sm", children: "Compare key metrics between apps" }, void 0, !1, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 82,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/comparison/MetricsComparison.tsx",
      lineNumber: 78,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: apps.map((app, index) => /* @__PURE__ */ jsxDEV7(Card2, { className: index === 0 ? "bg-blue-50 dark:bg-blue-900/30" : "bg-gray-50 dark:bg-gray-700/30", children: /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxDEV7("div", { className: "relative", children: [
        /* @__PURE__ */ jsxDEV7(
          "img",
          {
            src: app.icon,
            alt: `${app.name} icon`,
            className: "w-16 h-16 rounded-lg shadow-sm"
          },
          void 0,
          !1,
          {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 93,
            columnNumber: 17
          },
          this
        ),
        index > 0 && /* @__PURE__ */ jsxDEV7(
          Button2,
          {
            onClick: () => onRemoveApp(app.id),
            className: "absolute -top-2 -right-2 !p-1",
            color: "failure",
            pill: !0,
            size: "xs",
            children: /* @__PURE__ */ jsxDEV7(XMarkIcon, { className: "w-3 h-3" }, void 0, !1, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 106,
              columnNumber: 21
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 99,
            columnNumber: 19
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 92,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV7("h3", { className: "mt-3 font-medium text-center text-gray-800 dark:text-white truncate max-w-full", children: app.name }, void 0, !1, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 110,
        columnNumber: 15
      }, this),
      index === 0 && /* @__PURE__ */ jsxDEV7("span", { className: "mt-1 inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full", children: "Your App" }, void 0, !1, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 114,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/comparison/MetricsComparison.tsx",
      lineNumber: 91,
      columnNumber: 13
    }, this) }, app.id, !1, {
      fileName: "app/components/comparison/MetricsComparison.tsx",
      lineNumber: 90,
      columnNumber: 11
    }, this)) }, void 0, !1, {
      fileName: "app/components/comparison/MetricsComparison.tsx",
      lineNumber: 88,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7(Card2, { className: "mt-6", children: [
      /* @__PURE__ */ jsxDEV7("h3", { className: "text-lg font-medium mb-4 text-gray-800 dark:text-white", children: "Average Rating" }, void 0, !1, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 125,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "h-64", children: /* @__PURE__ */ jsxDEV7(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV7(
        BarChart,
        {
          data: chartData.ratings,
          margin: { top: 20, right: 30, left: 20, bottom: 5 },
          children: [
            /* @__PURE__ */ jsxDEV7(CartesianGrid, { strokeDasharray: "3 3" }, void 0, !1, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 132,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV7(XAxis, { dataKey: "name" }, void 0, !1, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 133,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV7(YAxis, { domain: [0, 5] }, void 0, !1, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 134,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV7(
              Tooltip,
              {
                formatter: (value, name) => name === "rating" ? [`${value} \u2605`, "Rating"] : [value, name],
                labelFormatter: (name) => `App: ${name}`
              },
              void 0,
              !1,
              {
                fileName: "app/components/comparison/MetricsComparison.tsx",
                lineNumber: 135,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV7(Legend, {}, void 0, !1, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 144,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV7(Bar, { dataKey: "rating", name: "Rating", radius: [4, 4, 0, 0], children: chartData.ratings.map((entry2, index) => /* @__PURE__ */ jsxDEV7(Cell, { fill: entry2.color }, `cell-${index}`, !1, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 147,
              columnNumber: 19
            }, this)) }, void 0, !1, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 145,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 128,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 127,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 126,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "mt-4 overflow-x-auto", children: /* @__PURE__ */ jsxDEV7("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsxDEV7("thead", { children: /* @__PURE__ */ jsxDEV7("tr", { children: [
          /* @__PURE__ */ jsxDEV7("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "App" }, void 0, !1, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 159,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Rating" }, void 0, !1, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 162,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Difference" }, void 0, !1, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 165,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 158,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 157,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: chartData.ratings.map((app, index) => /* @__PURE__ */ jsxDEV7("tr", { children: [
          /* @__PURE__ */ jsxDEV7("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white", children: [
            app.name,
            " ",
            index === 0 && /* @__PURE__ */ jsxDEV7("span", { className: "ml-2 text-xs text-blue-600", children: "(Your App)" }, void 0, !1, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 174,
              columnNumber: 48
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 173,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV7("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: [
            app.rating.toFixed(1),
            " \u2605"
          ] }, void 0, !0, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 176,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV7("td", { className: "px-6 py-4 whitespace-nowrap text-sm", children: index === 0 ? /* @__PURE__ */ jsxDEV7("span", { className: "text-gray-400", children: "-" }, void 0, !1, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 181,
            columnNumber: 23
          }, this) : /* @__PURE__ */ jsxDEV7("span", { className: getDiffColorClass2(app.diff), children: formatDiff2(app.diff) }, void 0, !1, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 183,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 179,
            columnNumber: 19
          }, this)
        ] }, `rating-${app.name}`, !0, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 172,
          columnNumber: 17
        }, this)) }, void 0, !1, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 170,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 156,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 155,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/comparison/MetricsComparison.tsx",
      lineNumber: 124,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7(Card2, { className: "mt-6", children: [
      /* @__PURE__ */ jsxDEV7("h3", { className: "text-lg font-medium mb-4 text-gray-800 dark:text-white", children: "Total Reviews" }, void 0, !1, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 197,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "h-64", children: /* @__PURE__ */ jsxDEV7(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV7(
        BarChart,
        {
          data: chartData.reviews,
          margin: { top: 20, right: 30, left: 20, bottom: 5 },
          children: [
            /* @__PURE__ */ jsxDEV7(CartesianGrid, { strokeDasharray: "3 3" }, void 0, !1, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 204,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV7(XAxis, { dataKey: "name" }, void 0, !1, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 205,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV7(YAxis, {}, void 0, !1, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 206,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV7(
              Tooltip,
              {
                formatter: (value) => [value.toLocaleString(), "Reviews"],
                labelFormatter: (name) => `App: ${name}`
              },
              void 0,
              !1,
              {
                fileName: "app/components/comparison/MetricsComparison.tsx",
                lineNumber: 207,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV7(Legend, {}, void 0, !1, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 211,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV7(Bar, { dataKey: "reviews", name: "Reviews", radius: [4, 4, 0, 0], children: chartData.reviews.map((entry2, index) => /* @__PURE__ */ jsxDEV7(Cell, { fill: entry2.color }, `cell-${index}`, !1, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 214,
              columnNumber: 19
            }, this)) }, void 0, !1, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 212,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 200,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 199,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 198,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "mt-4 overflow-x-auto", children: /* @__PURE__ */ jsxDEV7("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsxDEV7("thead", { children: /* @__PURE__ */ jsxDEV7("tr", { children: [
          /* @__PURE__ */ jsxDEV7("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "App" }, void 0, !1, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 226,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Total Reviews" }, void 0, !1, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 229,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Difference" }, void 0, !1, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 232,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 225,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 224,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: chartData.reviews.map((app, index) => /* @__PURE__ */ jsxDEV7("tr", { children: [
          /* @__PURE__ */ jsxDEV7("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white", children: [
            app.name,
            " ",
            index === 0 && /* @__PURE__ */ jsxDEV7("span", { className: "ml-2 text-xs text-blue-600", children: "(Your App)" }, void 0, !1, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 241,
              columnNumber: 48
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 240,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV7("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: app.reviews.toLocaleString() }, void 0, !1, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 243,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV7("td", { className: "px-6 py-4 whitespace-nowrap text-sm", children: index === 0 ? /* @__PURE__ */ jsxDEV7("span", { className: "text-gray-400", children: "-" }, void 0, !1, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 248,
            columnNumber: 23
          }, this) : /* @__PURE__ */ jsxDEV7("span", { className: getDiffColorClass2(app.diff), children: formatDiff2(app.diff) }, void 0, !1, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 250,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 246,
            columnNumber: 19
          }, this)
        ] }, `reviews-${app.name}`, !0, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 239,
          columnNumber: 17
        }, this)) }, void 0, !1, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 237,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 223,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 222,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/comparison/MetricsComparison.tsx",
      lineNumber: 196,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7(SentimentDistributionCard, { apps, percentageDiffs }, void 0, !1, {
      fileName: "app/components/comparison/MetricsComparison.tsx",
      lineNumber: 263,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/comparison/MetricsComparison.tsx",
    lineNumber: 77,
    columnNumber: 5
  }, this);
}

// app/components/comparison/KeywordsComparison.tsx
import { Card as Card3, Badge } from "flowbite-react";
import { useMemo as useMemo2 } from "react";
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
function KeywordsComparison({ apps }) {
  let sharedKeywords = useMemo2(() => {
    let keywordMap = /* @__PURE__ */ new Map();
    return apps.forEach((app) => {
      app.keywords.forEach(({ word, count }) => {
        keywordMap.has(word) || keywordMap.set(word, { word, counts: {} }), keywordMap.get(word).counts[app.id] = count;
      });
    }), Array.from(keywordMap.values()).filter((keyword) => Object.keys(keyword.counts).length >= 2).sort((a, b) => {
      let totalA = Object.values(a.counts).reduce((sum, count) => sum + count, 0);
      return Object.values(b.counts).reduce((sum, count) => sum + count, 0) - totalA;
    });
  }, [apps]);
  return !apps?.length || !sharedKeywords.length ? null : /* @__PURE__ */ jsxDEV8(Card3, { children: /* @__PURE__ */ jsxDEV8("div", { children: [
    /* @__PURE__ */ jsxDEV8("h3", { className: "text-lg font-medium mb-1 text-gray-900", children: "Top Keywords" }, void 0, !1, {
      fileName: "app/components/comparison/KeywordsComparison.tsx",
      lineNumber: 40,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV8("p", { className: "text-sm text-gray-500 mb-6", children: "Common keywords across all apps" }, void 0, !1, {
      fileName: "app/components/comparison/KeywordsComparison.tsx",
      lineNumber: 43,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV8("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: sharedKeywords.map((keyword) => /* @__PURE__ */ jsxDEV8(Card3, { className: "bg-gray-50", children: /* @__PURE__ */ jsxDEV8("div", { children: [
      /* @__PURE__ */ jsxDEV8(Badge, { color: "info", size: "lg", className: "mb-4", children: keyword.word }, void 0, !1, {
        fileName: "app/components/comparison/KeywordsComparison.tsx",
        lineNumber: 51,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV8("div", { className: "space-y-3", children: apps.map((app) => keyword.counts[app.id] ? /* @__PURE__ */ jsxDEV8("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV8("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV8(
            "img",
            {
              src: app.icon,
              alt: `${app.name} icon`,
              className: "w-6 h-6 rounded"
            },
            void 0,
            !1,
            {
              fileName: "app/components/comparison/KeywordsComparison.tsx",
              lineNumber: 59,
              columnNumber: 27
            },
            this
          ),
          /* @__PURE__ */ jsxDEV8("span", { className: "text-sm text-gray-600 truncate max-w-[200px]", children: app.name }, void 0, !1, {
            fileName: "app/components/comparison/KeywordsComparison.tsx",
            lineNumber: 64,
            columnNumber: 27
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/comparison/KeywordsComparison.tsx",
          lineNumber: 58,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV8("span", { className: "text-sm font-medium text-gray-900", children: keyword.counts[app.id].toLocaleString() }, void 0, !1, {
          fileName: "app/components/comparison/KeywordsComparison.tsx",
          lineNumber: 68,
          columnNumber: 25
        }, this)
      ] }, app.id, !0, {
        fileName: "app/components/comparison/KeywordsComparison.tsx",
        lineNumber: 57,
        columnNumber: 23
      }, this) : null) }, void 0, !1, {
        fileName: "app/components/comparison/KeywordsComparison.tsx",
        lineNumber: 54,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/comparison/KeywordsComparison.tsx",
      lineNumber: 50,
      columnNumber: 15
    }, this) }, keyword.word, !1, {
      fileName: "app/components/comparison/KeywordsComparison.tsx",
      lineNumber: 49,
      columnNumber: 13
    }, this)) }, void 0, !1, {
      fileName: "app/components/comparison/KeywordsComparison.tsx",
      lineNumber: 47,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/comparison/KeywordsComparison.tsx",
    lineNumber: 39,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/comparison/KeywordsComparison.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
}

// app/components/comparison/SentimentDistribution.tsx
import { Bar as Bar2 } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as Tooltip2,
  Legend as Legend2
} from "chart.js";
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip2,
  Legend2
);
var chartColors = [
  { bar: "rgb(37, 99, 235)", hover: "rgb(29, 78, 216)" },
  // Blue
  { bar: "rgb(234, 88, 12)", hover: "rgb(194, 65, 12)" },
  // Orange
  { bar: "rgb(22, 163, 74)", hover: "rgb(21, 128, 61)" },
  // Green
  { bar: "rgb(217, 70, 239)", hover: "rgb(192, 38, 211)" }
  // Purple
];
function SentimentDistribution({ apps }) {
  let chartData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: apps.map((app, index) => ({
      label: app.name,
      data: [
        app.sentiments.positive,
        app.sentiments.neutral,
        app.sentiments.negative
      ],
      backgroundColor: chartColors[index].bar,
      hoverBackgroundColor: chartColors[index].hover,
      borderRadius: 4,
      borderSkipped: !1,
      barPercentage: 0.7,
      categoryPercentage: 0.8
    }))
  };
  return /* @__PURE__ */ jsxDEV9("div", { children: [
    /* @__PURE__ */ jsxDEV9("h3", { className: "text-lg font-medium mb-1 text-gray-900", children: "Sentiment Distribution" }, void 0, !1, {
      fileName: "app/components/comparison/SentimentDistribution.tsx",
      lineNumber: 117,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9("p", { className: "text-sm text-gray-500 mb-6", children: "Compare sentiment distribution across apps" }, void 0, !1, {
      fileName: "app/components/comparison/SentimentDistribution.tsx",
      lineNumber: 120,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9("div", { className: "h-[400px]", children: /* @__PURE__ */ jsxDEV9(Bar2, { data: chartData, options: {
      responsive: !0,
      maintainAspectRatio: !1,
      interaction: {
        mode: "index",
        intersect: !1
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            padding: 20,
            usePointStyle: !0,
            pointStyle: "circle"
          }
        },
        title: {
          display: !1
        },
        tooltip: {
          backgroundColor: "white",
          titleColor: "#111827",
          bodyColor: "#111827",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: !0,
          callbacks: {
            label: (context) => ` ${context.dataset.label}: ${context.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: !1
          },
          ticks: {
            padding: 10
          }
        },
        y: {
          beginAtZero: !0,
          border: {
            display: !1
          },
          grid: {
            color: "#e5e7eb"
          },
          ticks: {
            padding: 10,
            callback: function(value) {
              return value.toLocaleString();
            }
          }
        }
      }
    } }, void 0, !1, {
      fileName: "app/components/comparison/SentimentDistribution.tsx",
      lineNumber: 125,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/comparison/SentimentDistribution.tsx",
      lineNumber: 124,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/comparison/SentimentDistribution.tsx",
    lineNumber: 116,
    columnNumber: 5
  }, this);
}

// app/components/comparison/TrendAnalysis.tsx
import { Card as Card4 } from "flowbite-react";
import { Line as Line2 } from "react-chartjs-2";
import {
  Chart as ChartJS2,
  CategoryScale as CategoryScale2,
  LinearScale as LinearScale2,
  PointElement,
  LineElement,
  Title as Title2,
  Tooltip as Tooltip3,
  Legend as Legend3,
  Filler
} from "chart.js";
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
ChartJS2.register(
  CategoryScale2,
  LinearScale2,
  PointElement,
  LineElement,
  Title2,
  Tooltip3,
  Legend3,
  Filler
);
var chartColors2 = [
  { line: "rgb(37, 99, 235)", fill: "rgba(37, 99, 235, 0.1)" },
  // Blue
  { line: "rgb(234, 88, 12)", fill: "rgba(234, 88, 12, 0.1)" },
  // Orange
  { line: "rgb(22, 163, 74)", fill: "rgba(22, 163, 74, 0.1)" },
  // Green
  { line: "rgb(217, 70, 239)", fill: "rgba(217, 70, 239, 0.1)" }
  // Purple
];
function TrendAnalysis({ apps }) {
  let chartData = {
    labels: apps[0]?.trends.map((trend) => new Date(trend.date).toLocaleDateString()) || [],
    datasets: apps.map((app, index) => ({
      label: app.name,
      data: app.trends.map((trend) => trend.total),
      borderColor: chartColors2[index].line,
      backgroundColor: chartColors2[index].fill,
      tension: 0.4,
      fill: !0,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: chartColors2[index].line,
      pointBorderColor: "white",
      pointBorderWidth: 2,
      borderWidth: 2
    }))
  };
  return /* @__PURE__ */ jsxDEV10(Card4, { className: "mt-6", children: /* @__PURE__ */ jsxDEV10("div", { children: [
    /* @__PURE__ */ jsxDEV10("h3", { className: "text-lg font-medium mb-1 text-gray-800 dark:text-white", children: "Trend Analysis" }, void 0, !1, {
      fileName: "app/components/comparison/TrendAnalysis.tsx",
      lineNumber: 122,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV10("p", { className: "text-sm text-gray-600 dark:text-gray-400 mb-4", children: "Review volume trends over time" }, void 0, !1, {
      fileName: "app/components/comparison/TrendAnalysis.tsx",
      lineNumber: 125,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV10("div", { className: "h-[400px]", children: /* @__PURE__ */ jsxDEV10(Line2, { data: chartData, options: {
      responsive: !0,
      maintainAspectRatio: !1,
      interaction: {
        mode: "index",
        intersect: !1
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            padding: 20,
            usePointStyle: !0,
            pointStyle: "circle"
          }
        },
        title: {
          display: !1
        },
        tooltip: {
          backgroundColor: "white",
          titleColor: "#111827",
          bodyColor: "#111827",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: !0,
          callbacks: {
            label: (context) => ` ${context.dataset.label}: ${context.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: !1
          },
          ticks: {
            padding: 10
          }
        },
        y: {
          beginAtZero: !0,
          border: {
            display: !1
          },
          grid: {
            color: "#e5e7eb"
          },
          ticks: {
            padding: 10,
            callback: function(value) {
              return value.toLocaleString();
            }
          }
        }
      }
    } }, void 0, !1, {
      fileName: "app/components/comparison/TrendAnalysis.tsx",
      lineNumber: 130,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/comparison/TrendAnalysis.tsx",
      lineNumber: 129,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/comparison/TrendAnalysis.tsx",
    lineNumber: 121,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/comparison/TrendAnalysis.tsx",
    lineNumber: 120,
    columnNumber: 5
  }, this);
}

// app/components/comparison/RecentComments.tsx
import { Card as Card5, Badge as Badge2 } from "flowbite-react";
import { useMemo as useMemo3 } from "react";
import { jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
function RecentComments({ apps }) {
  let sortedComments = useMemo3(() => apps.flatMap(
    (app) => app.comments.map((comment) => ({
      ...comment,
      appName: app.name,
      appIcon: app.icon
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10), [apps]);
  if (!apps?.length || !sortedComments.length)
    return null;
  let getSentimentColor = (sentiment2) => {
    switch (sentiment2) {
      case "positive":
        return "success";
      case "negative":
        return "failure";
      default:
        return "gray";
    }
  };
  return /* @__PURE__ */ jsxDEV11(Card5, { children: /* @__PURE__ */ jsxDEV11("div", { children: [
    /* @__PURE__ */ jsxDEV11("h3", { className: "text-lg font-medium mb-1 text-gray-900", children: "Recent Comments" }, void 0, !1, {
      fileName: "app/components/comparison/RecentComments.tsx",
      lineNumber: 42,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV11("p", { className: "text-sm text-gray-500 mb-6", children: "Latest comments from all apps" }, void 0, !1, {
      fileName: "app/components/comparison/RecentComments.tsx",
      lineNumber: 45,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV11("div", { className: "space-y-4", children: sortedComments.map((comment) => /* @__PURE__ */ jsxDEV11(Card5, { className: "bg-gray-50", children: /* @__PURE__ */ jsxDEV11("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxDEV11("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV11("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV11(
            "img",
            {
              src: comment.appIcon,
              alt: `${comment.appName} icon`,
              className: "w-6 h-6 rounded"
            },
            void 0,
            !1,
            {
              fileName: "app/components/comparison/RecentComments.tsx",
              lineNumber: 55,
              columnNumber: 21
            },
            this
          ),
          /* @__PURE__ */ jsxDEV11("span", { className: "text-sm font-medium text-gray-900", children: comment.appName }, void 0, !1, {
            fileName: "app/components/comparison/RecentComments.tsx",
            lineNumber: 60,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/comparison/RecentComments.tsx",
          lineNumber: 54,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV11("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV11(Badge2, { color: getSentimentColor(comment.sentiment), children: comment.sentiment }, void 0, !1, {
            fileName: "app/components/comparison/RecentComments.tsx",
            lineNumber: 65,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV11("span", { className: "text-sm text-gray-500", children: new Date(comment.date).toLocaleDateString() }, void 0, !1, {
            fileName: "app/components/comparison/RecentComments.tsx",
            lineNumber: 68,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/comparison/RecentComments.tsx",
          lineNumber: 64,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/comparison/RecentComments.tsx",
        lineNumber: 53,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV11("div", { children: /* @__PURE__ */ jsxDEV11("p", { className: "text-sm text-gray-600", children: comment.content }, void 0, !1, {
        fileName: "app/components/comparison/RecentComments.tsx",
        lineNumber: 75,
        columnNumber: 19
      }, this) }, void 0, !1, {
        fileName: "app/components/comparison/RecentComments.tsx",
        lineNumber: 74,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV11("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV11("span", { className: "text-sm text-gray-500", children: comment.userName }, void 0, !1, {
          fileName: "app/components/comparison/RecentComments.tsx",
          lineNumber: 81,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV11("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV11("span", { className: "text-sm font-medium text-gray-900", children: comment.score.toFixed(1) }, void 0, !1, {
            fileName: "app/components/comparison/RecentComments.tsx",
            lineNumber: 85,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV11("span", { className: "text-sm text-gray-500", children: "\u2605" }, void 0, !1, {
            fileName: "app/components/comparison/RecentComments.tsx",
            lineNumber: 88,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/comparison/RecentComments.tsx",
          lineNumber: 84,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/comparison/RecentComments.tsx",
        lineNumber: 80,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/comparison/RecentComments.tsx",
      lineNumber: 52,
      columnNumber: 15
    }, this) }, comment.id, !1, {
      fileName: "app/components/comparison/RecentComments.tsx",
      lineNumber: 51,
      columnNumber: 13
    }, this)) }, void 0, !1, {
      fileName: "app/components/comparison/RecentComments.tsx",
      lineNumber: 49,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/comparison/RecentComments.tsx",
    lineNumber: 41,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/comparison/RecentComments.tsx",
    lineNumber: 40,
    columnNumber: 5
  }, this);
}

// app/components/comparison/ExportButton.tsx
import { Button as Button3 } from "flowbite-react";
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
function ExportButton({ apps }) {
  return /* @__PURE__ */ jsxDEV12(Button3, { onClick: () => {
    let exportData = apps.map((app) => ({
      name: app.name,
      metrics: {
        averageRating: app.metrics.averageRating,
        totalReviews: app.metrics.totalReviews
      },
      sentiments: {
        positive: app.sentiments.positive,
        neutral: app.sentiments.neutral,
        negative: app.sentiments.negative
      },
      keywords: app.keywords,
      comments: app.comments,
      trends: app.trends
    })), blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json"
    }), url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url, a.download = "app-comparison-data.json", document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(url);
  }, color: "gray", children: "Export Data" }, void 0, !1, {
    fileName: "app/components/comparison/ExportButton.tsx",
    lineNumber: 41,
    columnNumber: 5
  }, this);
}

// app/components/comparison/ComparisonDashboard.tsx
import { Fragment, jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
function ComparisonDashboard() {
  let [apps, setApps] = useState2([]), [isLoading, setIsLoading] = useState2(!1), [error, setError] = useState2(null), [sharedKeywords, setSharedKeywords] = useState2([]), handleAddApps = async (appUrls, year) => {
    setIsLoading(!0), setError(null);
    try {
      let formData = new FormData();
      formData.append("urls", JSON.stringify(appUrls)), formData.append("year", year.toString());
      let response = await fetch("/api/compare", {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        let errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch comparison data");
      }
      let data = await response.json();
      if (!data.success)
        throw new Error(data.error || "Failed to analyze apps");
      let appsData = Object.entries(data.results).map(([url, result]) => ({
        id: url,
        name: result.appInfo?.title || url.split("id=")[1]?.split("&")[0] || url,
        icon: result.appInfo?.icon || `https://www.google.com/s2/favicons?domain=${url}&sz=64`,
        metrics: {
          averageRating: result.comments?.reduce((acc, c) => acc + c.score, 0) / (result.comments?.length || 1) || 0,
          totalReviews: result.comments?.length || 0
        },
        sentiments: {
          positive: result.sentiment?.positive || 0,
          neutral: result.sentiment?.neutral || 0,
          negative: result.sentiment?.negative || 0
        },
        keywords: result.keywords || [],
        comments: result.comments || [],
        trends: result.trends || []
      }));
      setApps(appsData);
      let transformedSharedKeywords = (data.comparisonResult?.sharedKeywords || data.sharedKeywords || []).map((kw) => ({
        word: kw.word,
        counts: appsData.reduce((acc, app) => (acc[app.id] = kw.counts?.[app.id] || 0, acc), {})
      }));
      setSharedKeywords(transformedSharedKeywords);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch app data"), console.error("Comparison error:", err);
    } finally {
      setIsLoading(!1);
    }
  }, handleRemoveApp = (appId) => {
    setApps((prevApps) => prevApps.filter((app) => app.id !== appId));
  };
  return /* @__PURE__ */ jsxDEV13("div", { className: "space-y-6", children: /* @__PURE__ */ jsxDEV13("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
    /* @__PURE__ */ jsxDEV13(Card6, { className: "lg:col-span-2", children: [
      /* @__PURE__ */ jsxDEV13("div", { className: "flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4", children: [
        /* @__PURE__ */ jsxDEV13("div", { children: [
          /* @__PURE__ */ jsxDEV13("h2", { className: "text-2xl font-bold tracking-tight text-gray-900", children: "Compare Apps" }, void 0, !1, {
            fileName: "app/components/comparison/ComparisonDashboard.tsx",
            lineNumber: 132,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV13("p", { className: "text-base text-gray-500", children: "Enter Play Store URLs to compare apps" }, void 0, !1, {
            fileName: "app/components/comparison/ComparisonDashboard.tsx",
            lineNumber: 135,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/comparison/ComparisonDashboard.tsx",
          lineNumber: 131,
          columnNumber: 13
        }, this),
        apps.length > 0 && /* @__PURE__ */ jsxDEV13(ExportButton, { data: { apps, sharedKeywords } }, void 0, !1, {
          fileName: "app/components/comparison/ComparisonDashboard.tsx",
          lineNumber: 139,
          columnNumber: 33
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/comparison/ComparisonDashboard.tsx",
        lineNumber: 130,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV13(AppComparisonForm, { onSubmit: handleAddApps }, void 0, !1, {
        fileName: "app/components/comparison/ComparisonDashboard.tsx",
        lineNumber: 141,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/comparison/ComparisonDashboard.tsx",
      lineNumber: 129,
      columnNumber: 9
    }, this),
    error && /* @__PURE__ */ jsxDEV13(Alert, { color: "failure", icon: InformationCircleIcon, className: "lg:col-span-2", children: error }, void 0, !1, {
      fileName: "app/components/comparison/ComparisonDashboard.tsx",
      lineNumber: 145,
      columnNumber: 11
    }, this),
    isLoading ? /* @__PURE__ */ jsxDEV13("div", { className: "flex justify-center py-12 lg:col-span-2", children: /* @__PURE__ */ jsxDEV13(Spinner, { size: "xl" }, void 0, !1, {
      fileName: "app/components/comparison/ComparisonDashboard.tsx",
      lineNumber: 152,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/comparison/ComparisonDashboard.tsx",
      lineNumber: 151,
      columnNumber: 11
    }, this) : apps.length > 0 ? /* @__PURE__ */ jsxDEV13(Fragment, { children: [
      /* @__PURE__ */ jsxDEV13(Card6, { className: "lg:col-span-2", children: /* @__PURE__ */ jsxDEV13(MetricsComparison, { apps, onRemoveApp: handleRemoveApp }, void 0, !1, {
        fileName: "app/components/comparison/ComparisonDashboard.tsx",
        lineNumber: 158,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/components/comparison/ComparisonDashboard.tsx",
        lineNumber: 157,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV13(Card6, { children: /* @__PURE__ */ jsxDEV13(TrendAnalysis, { apps }, void 0, !1, {
        fileName: "app/components/comparison/ComparisonDashboard.tsx",
        lineNumber: 163,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/components/comparison/ComparisonDashboard.tsx",
        lineNumber: 162,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV13(Card6, { children: /* @__PURE__ */ jsxDEV13(SentimentDistribution, { apps }, void 0, !1, {
        fileName: "app/components/comparison/ComparisonDashboard.tsx",
        lineNumber: 168,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/components/comparison/ComparisonDashboard.tsx",
        lineNumber: 167,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV13(Card6, { className: "lg:col-span-2", children: /* @__PURE__ */ jsxDEV13(KeywordsComparison, { apps, sharedKeywords }, void 0, !1, {
        fileName: "app/components/comparison/ComparisonDashboard.tsx",
        lineNumber: 173,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/components/comparison/ComparisonDashboard.tsx",
        lineNumber: 172,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV13(Card6, { className: "lg:col-span-2", children: /* @__PURE__ */ jsxDEV13(RecentComments, { apps }, void 0, !1, {
        fileName: "app/components/comparison/ComparisonDashboard.tsx",
        lineNumber: 178,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/components/comparison/ComparisonDashboard.tsx",
        lineNumber: 177,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/comparison/ComparisonDashboard.tsx",
      lineNumber: 155,
      columnNumber: 11
    }, this) : /* @__PURE__ */ jsxDEV13(
      Alert,
      {
        color: "info",
        icon: InformationCircleIcon,
        className: "lg:col-span-2",
        theme: {
          color: {
            info: "border border-blue-500 bg-blue-50 text-blue-900 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
          }
        },
        children: /* @__PURE__ */ jsxDEV13("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxDEV13("h3", { className: "text-lg font-medium", children: "Add app URLs to start comparing" }, void 0, !1, {
            fileName: "app/components/comparison/ComparisonDashboard.tsx",
            lineNumber: 193,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV13("p", { className: "text-sm", children: "You can find app URLs by visiting their Play Store pages and copying the URL from your browser's address bar." }, void 0, !1, {
            fileName: "app/components/comparison/ComparisonDashboard.tsx",
            lineNumber: 196,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/comparison/ComparisonDashboard.tsx",
          lineNumber: 192,
          columnNumber: 13
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/comparison/ComparisonDashboard.tsx",
        lineNumber: 182,
        columnNumber: 11
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/comparison/ComparisonDashboard.tsx",
    lineNumber: 127,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/comparison/ComparisonDashboard.tsx",
    lineNumber: 126,
    columnNumber: 5
  }, this);
}

// app/routes/comparison.tsx
import { jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "App Comparison - Play Store Comment Analyzer" },
  { name: "description", content: "Compare your app with competitors" }
];
function Comparison() {
  return /* @__PURE__ */ jsxDEV14("div", { className: "flex min-h-screen bg-gray-100 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxDEV14(Sidebar, {}, void 0, !1, {
      fileName: "app/routes/comparison.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV14("main", { className: "p-4 sm:ml-64", children: /* @__PURE__ */ jsxDEV14("div", { className: "container mx-auto px-4 py-4 mt-14", children: [
      /* @__PURE__ */ jsxDEV14("div", { className: "flex justify-between items-center mb-8", children: /* @__PURE__ */ jsxDEV14("div", { children: [
        /* @__PURE__ */ jsxDEV14("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "App Comparison" }, void 0, !1, {
          fileName: "app/routes/comparison.tsx",
          lineNumber: 20,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV14("p", { className: "text-gray-600 dark:text-gray-400", children: "Compare your app with competitors" }, void 0, !1, {
          fileName: "app/routes/comparison.tsx",
          lineNumber: 23,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/comparison.tsx",
        lineNumber: 19,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/comparison.tsx",
        lineNumber: 18,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV14(ComparisonDashboard, {}, void 0, !1, {
        fileName: "app/routes/comparison.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/comparison.tsx",
      lineNumber: 17,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/comparison.tsx",
      lineNumber: 16,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/comparison.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  meta: () => meta2
});
import { useState as useState3, useEffect, useRef, useMemo as useMemo4 } from "react";
import { useFetcher, useLocation as useLocation2 } from "@remix-run/react";
import {
  LineChart as LineChart2,
  Line as Line3,
  XAxis as XAxis2,
  YAxis as YAxis2,
  CartesianGrid as CartesianGrid2,
  Tooltip as Tooltip4,
  Legend as Legend4,
  ResponsiveContainer as ResponsiveContainer2,
  ReferenceLine,
  ReferenceArea,
  Brush
} from "recharts";
import { format, parseISO, startOfDay, startOfWeek, startOfMonth, startOfQuarter, isSameDay, isSameWeek, isSameMonth, isSameQuarter } from "date-fns";
import { Label as Label2, TextInput as TextInput2, Select as Select2, Button as Button4 } from "flowbite-react";
import { Fragment as Fragment2, jsxDEV as jsxDEV15 } from "react/jsx-dev-runtime";
function InsightItem({ change, appReleases }) {
  let getMetricLabel = (metric) => {
    switch (metric) {
      case "positive":
        return "positive sentiment";
      case "negative":
        return "negative sentiment";
      case "total":
        return "comment volume";
      case "featureRequests":
        return "feature requests";
      case "bugReports":
        return "bug reports";
    }
  }, changeText = change.isIncrease ? "increase" : "decrease", changeValue = Math.abs(change.change), formattedChange = change.metric === "positive" || change.metric === "negative" ? `${(changeValue * 100).toFixed(1)}%` : `${(changeValue * 100).toFixed(1)}%`, isNearRelease = appReleases.some((release) => {
    let releaseDate = new Date(release.date), periodDate = new Date(change.period), diffTime = Math.abs(periodDate.getTime() - releaseDate.getTime());
    return Math.ceil(diffTime / (1e3 * 60 * 60 * 24)) <= 14;
  });
  return /* @__PURE__ */ jsxDEV15("div", { className: "flex items-start space-x-2", children: [
    /* @__PURE__ */ jsxDEV15("div", { className: `flex-shrink-0 w-4 h-4 mt-0.5 rounded-full ${change.isIncrease ? change.metric === "negative" || change.metric === "bugReports" ? "bg-red-500" : "bg-green-500" : change.metric === "negative" || change.metric === "bugReports" ? "bg-green-500" : "bg-red-500"}` }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 105,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV15("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: [
      /* @__PURE__ */ jsxDEV15("span", { className: "font-medium", children: [
        formattedChange,
        " ",
        changeText
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 111,
        columnNumber: 9
      }, this),
      " in ",
      getMetricLabel(change.metric),
      " during ",
      change.period,
      ".",
      isNearRelease && /* @__PURE__ */ jsxDEV15("span", { className: "ml-1 text-blue-600 dark:text-blue-400", children: "May be related to recent app update." }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 113,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 110,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 104,
    columnNumber: 5
  }, this);
}
var meta2 = () => [
  { title: "Play Store Comment Analyzer" },
  { name: "description", content: "Analyze Play Store comments with ease" }
];
function Index() {
  let location = useLocation2(), [url, setUrl] = useState3(""), [year, setYear] = useState3("all"), [searchTerm, setSearchTerm] = useState3(""), [modalSearchTerm, setModalSearchTerm] = useState3(""), [showAllComments, setShowAllComments] = useState3(!1), [sentimentFilter, setSentimentFilter] = useState3("all"), [ratingFilter, setRatingFilter] = useState3("all"), [showExportDropdown, setShowExportDropdown] = useState3(!1), [isExporting, setIsExporting] = useState3(!1), [exportNotification, setExportNotification] = useState3({ show: !1, message: "" }), [currentPage, setCurrentPage] = useState3(1), [itemsPerPage] = useState3(5), [searchResultsCount, setSearchResultsCount] = useState3(0), [timeGranularity, setTimeGranularity] = useState3("weekly"), [dateRange, setDateRange] = useState3({ start: null, end: null }), [showAllTime, setShowAllTime] = useState3(!0), [visibleMetrics, setVisibleMetrics] = useState3({
    positive: !0,
    negative: !0,
    neutral: !0,
    total: !0,
    featureRequests: !0,
    bugReports: !0
  }), [appReleases, setAppReleases] = useState3([
    // Example releases - in a real app, these would be fetched from an API
    { date: "2023-12-15", version: "2.1.0", notes: "Major UI redesign" },
    { date: "2024-01-30", version: "2.2.0", notes: "New features added" },
    { date: "2024-03-10", version: "2.3.0", notes: "Bug fixes and performance improvements" }
  ]), exportDropdownRef = useRef(null), exportButtonRef = useRef(null), fetcher = useFetcher(), isLoading = fetcher.state !== "idle", hasData = fetcher.data && !("error" in fetcher.data) && fetcher.data.comments, error = fetcher.data?.error || fetcher.data?.message, timeframeOptions = useMemo4(() => [
    {
      label: "Daily",
      value: "daily",
      groupingFn: startOfDay,
      formatFn: (date) => format(date, "MMM d, yyyy"),
      isSamePeriodFn: isSameDay
    },
    {
      label: "Weekly",
      value: "weekly",
      groupingFn: startOfWeek,
      formatFn: (date) => `Week of ${format(date, "MMM d, yyyy")}`,
      isSamePeriodFn: isSameWeek
    },
    {
      label: "Monthly",
      value: "monthly",
      groupingFn: startOfMonth,
      formatFn: (date) => format(date, "MMMM yyyy"),
      isSamePeriodFn: isSameMonth
    },
    {
      label: "Quarterly",
      value: "quarterly",
      groupingFn: startOfQuarter,
      formatFn: (date) => `Q${Math.floor(date.getMonth() / 3) + 1} ${date.getFullYear()}`,
      isSamePeriodFn: isSameQuarter
    }
  ], []), currentTimeframe = useMemo4(
    () => timeframeOptions.find((t) => t.value === timeGranularity) || timeframeOptions[1],
    [timeGranularity, timeframeOptions]
  ), trendData = useMemo4(() => {
    if (!hasData || !fetcher.data?.comments)
      return [];
    let comments = fetcher.data.comments, intentions = fetcher.data.intentions, groupedData = /* @__PURE__ */ new Map();
    return comments.forEach((comment) => {
      let commentDate = parseISO(comment.date), periodStart = currentTimeframe.groupingFn(commentDate), periodKey = format(periodStart, "yyyy-MM-dd");
      groupedData.has(periodKey) || groupedData.set(periodKey, {
        date: currentTimeframe.formatFn(periodStart),
        positive: 0,
        negative: 0,
        neutral: 0,
        total: 0,
        featureRequests: 0,
        bugReports: 0
      });
      let dataPoint = groupedData.get(periodKey);
      dataPoint.total += 1, comment.sentiment === "positive" ? dataPoint.positive += 1 : comment.sentiment === "negative" ? dataPoint.negative += 1 : dataPoint.neutral += 1, intentions?.feature_request.some((c) => c.id === comment.id) && (dataPoint.featureRequests += 1), intentions?.bug_report.some((c) => c.id === comment.id) && (dataPoint.bugReports += 1);
    }), Array.from(groupedData.entries()).map(([key, value]) => ({
      ...value,
      rawDate: key
      // Keep the raw date for sorting
    })).sort((a, b) => a.rawDate.localeCompare(b.rawDate)).map(({ rawDate, ...rest }) => rest);
  }, [hasData, fetcher.data, currentTimeframe]), significantChanges = useMemo4(() => {
    if (trendData.length < 2)
      return [];
    let changes = [], thresholds = {
      positive: 0.2,
      // 20% change
      negative: 0.2,
      total: 0.3,
      // 30% change in volume
      featureRequests: 0.5,
      // 50% change
      bugReports: 0.5
    };
    for (let i = 1; i < trendData.length; i++) {
      let current = trendData[i], previous = trendData[i - 1];
      if (previous.total < 5)
        continue;
      let metrics = ["positive", "negative", "total", "featureRequests", "bugReports"];
      for (let metric of metrics)
        if (metric === "positive" || metric === "negative") {
          let currentPct = current[metric] / current.total, previousPct = previous[metric] / previous.total;
          Math.abs(currentPct - previousPct) >= thresholds[metric] && changes.push({
            period: current.date,
            metric,
            change: currentPct - previousPct,
            isIncrease: currentPct > previousPct
          });
        } else {
          if (previous[metric] === 0)
            continue;
          let relativeChange = (current[metric] - previous[metric]) / previous[metric];
          Math.abs(relativeChange) >= thresholds[metric] && changes.push({
            period: current.date,
            metric,
            change: relativeChange,
            isIncrease: relativeChange > 0
          });
        }
    }
    return changes;
  }, [trendData]);
  useEffect(() => {
    if (exportNotification.show) {
      let timer = setTimeout(() => {
        setExportNotification({ show: !1, message: "" });
      }, 3e3);
      return () => clearTimeout(timer);
    }
  }, [exportNotification.show]), useEffect(() => {
    let handleClickOutside = (event) => {
      showExportDropdown && exportDropdownRef.current && exportButtonRef.current && !exportDropdownRef.current.contains(event.target) && !exportButtonRef.current.contains(event.target) && setShowExportDropdown(!1);
    }, handleKeyDown = (event) => {
      event.key === "Escape" && showExportDropdown && setShowExportDropdown(!1);
    };
    return document.addEventListener("mousedown", handleClickOutside), document.addEventListener("keydown", handleKeyDown), () => {
      document.removeEventListener("mousedown", handleClickOutside), document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showExportDropdown]);
  let getFilteredComments = () => {
    if (!fetcher.data?.comments)
      return { filteredComments: [], totalFiltered: 0 };
    let filtered = fetcher.data.comments.filter((comment) => {
      let matchesSentiment = sentimentFilter === "all" || comment.sentiment === sentimentFilter, matchesRating = ratingFilter === "all" || comment.score === parseInt(ratingFilter), matchesSearch = !modalSearchTerm || comment.content.toLowerCase().includes(modalSearchTerm.toLowerCase()) || comment.userName.toLowerCase().includes(modalSearchTerm.toLowerCase());
      return matchesSentiment && matchesRating && matchesSearch;
    }), indexOfLastItem = currentPage * itemsPerPage, indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return {
      filteredComments: filtered.slice(indexOfFirstItem, indexOfLastItem),
      totalFiltered: filtered.length
    };
  };
  useEffect(() => {
    let { totalFiltered } = getFilteredComments();
    setSearchResultsCount(totalFiltered);
  }, [fetcher.data, modalSearchTerm, sentimentFilter, ratingFilter]);
  let handlePageChange = (pageNumber, e) => {
    e.preventDefault(), setCurrentPage(pageNumber);
  }, totalPages = Math.ceil(searchResultsCount / itemsPerPage), pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1), getPageRange = (currentPage2, totalPages2) => {
    let range = [];
    for (let i = 1; i <= totalPages2; i++)
      i === 1 || // First page
      i === totalPages2 || // Last page
      i >= currentPage2 - 2 && i <= currentPage2 + 2 ? range.push(i) : range[range.length - 1] !== "..." && range.push("...");
    return range;
  }, handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (console.log("Submitting form with URL:", url, "year:", year, "searchTerm:", searchTerm), !new URL(url).hostname.includes("play.google.com"))
        throw new Error("Please enter a valid Play Store URL");
      let formData = new FormData();
      formData.append("url", url), formData.append("year", year), formData.append("searchTerm", searchTerm), console.log("Submitting to API..."), fetcher.submit(formData, {
        method: "POST",
        action: "/api/comments"
      });
    } catch (error2) {
      console.error("Form submission error:", error2), error2 instanceof Error && (fetcher.data = { error: error2.message });
    }
  }, handleExport = (format2, dataType) => {
    if (fetcher.data?.comments) {
      setIsExporting(!0);
      try {
        let dataToExport = dataType === "filtered" ? getFilteredComments().filteredComments : fetcher.data.comments, appNameMatch = url.split("id=")[1]?.split("&")[0] || "play-store-comments", date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0], fileName = `${appNameMatch}-${date}.${format2}`, content = "";
        if (format2 === "json") {
          let exportData = {
            comments: dataToExport,
            sentiment: fetcher.data.sentiment,
            keywords: fetcher.data.keywords,
            intentions: fetcher.data.intentions ? {
              feature_request: dataType === "filtered" && fetcher.data.intentions ? fetcher.data.intentions.feature_request.filter((comment) => dataToExport.some((c) => c.id === comment.id)) : fetcher.data.intentions?.feature_request || [],
              bug_report: dataType === "filtered" && fetcher.data.intentions ? fetcher.data.intentions.bug_report.filter((comment) => dataToExport.some((c) => c.id === comment.id)) : fetcher.data.intentions?.bug_report || [],
              praise: dataType === "filtered" && fetcher.data.intentions ? fetcher.data.intentions.praise.filter((comment) => dataToExport.some((c) => c.id === comment.id)) : fetcher.data.intentions?.praise || [],
              complaint: dataType === "filtered" && fetcher.data.intentions ? fetcher.data.intentions.complaint.filter((comment) => dataToExport.some((c) => c.id === comment.id)) : fetcher.data.intentions?.complaint || []
            } : {}
          };
          content = JSON.stringify(exportData, null, 2);
        } else if (format2 === "csv") {
          let headers = ["ID", "User Name", "Content", "Score", "Thumbs Up", "Date", "Year", "Sentiment", "Category"], commentCategories = /* @__PURE__ */ new Map();
          fetcher.data.intentions && Object.entries(fetcher.data.intentions).forEach(([category, comments]) => {
            comments.forEach((comment) => {
              commentCategories.set(comment.id, category);
            });
          }), content = headers.join(",") + `
`, dataToExport.forEach((comment) => {
            let category = commentCategories.get(comment.id) || "uncategorized", row = [
              comment.id,
              `"${comment.userName.replace(/"/g, '""')}"`,
              `"${comment.content.replace(/"/g, '""')}"`,
              comment.score,
              comment.thumbsUp,
              comment.date,
              comment.year,
              comment.sentiment,
              category
            ];
            content += row.join(",") + `
`;
          });
        }
        let blob = new Blob([content], { type: format2 === "json" ? "application/json" : "text/csv" }), downloadUrl = URL.createObjectURL(blob), a = document.createElement("a");
        a.href = downloadUrl, a.download = fileName, document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(downloadUrl), setShowExportDropdown(!1), setExportNotification({
          show: !0,
          message: `Export complete! ${fileName} has been downloaded.`
        });
      } catch (error2) {
        console.error("Export error:", error2), setExportNotification({
          show: !0,
          message: `Export failed: ${error2 instanceof Error ? error2.message : "Unknown error"}`
        });
      } finally {
        setIsExporting(!1);
      }
    }
  };
  console.log("Fetcher state:", fetcher.state), console.log("Fetcher data:", fetcher.data);
  let totalComments = fetcher.data?.comments?.length ?? 0, positiveCount = fetcher.data?.sentiment?.positive ?? 0, neutralCount = fetcher.data?.sentiment?.neutral ?? 0, negativeCount = fetcher.data?.sentiment?.negative ?? 0, featureRequestCount = fetcher.data?.intentions?.feature_request?.length ?? 0, bugReportCount = fetcher.data?.intentions?.bug_report?.length ?? 0, positivePercentage = totalComments > 0 ? (positiveCount / totalComments * 100).toFixed(1) : "0.0";
  return /* @__PURE__ */ jsxDEV15("div", { className: "flex min-h-screen bg-gray-100 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxDEV15(Sidebar, {}, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 578,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV15("main", { className: "p-4 sm:ml-64", children: /* @__PURE__ */ jsxDEV15("div", { className: "container mx-auto px-4 py-4 mt-14", children: [
      /* @__PURE__ */ jsxDEV15("div", { className: "flex justify-between items-center mb-8", children: [
        /* @__PURE__ */ jsxDEV15("div", { children: [
          /* @__PURE__ */ jsxDEV15("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Overview" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 584,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV15("p", { className: "text-gray-600 dark:text-gray-400", children: "Analyze app reviews and get insights" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 587,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 583,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV15("div", { className: "flex items-center space-x-4", children: hasData && /* @__PURE__ */ jsxDEV15("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDEV15(
            "button",
            {
              ref: exportButtonRef,
              onClick: () => setShowExportDropdown(!showExportDropdown),
              disabled: isExporting,
              className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg inline-flex items-center",
              children: isExporting ? /* @__PURE__ */ jsxDEV15(Fragment2, { children: [
                /* @__PURE__ */ jsxDEV15("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsxDEV15("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 605,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV15("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 606,
                    columnNumber: 27
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 604,
                  columnNumber: 25
                }, this),
                "Exporting..."
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 603,
                columnNumber: 23
              }, this) : /* @__PURE__ */ jsxDEV15(Fragment2, { children: [
                /* @__PURE__ */ jsxDEV15("svg", { className: "w-4 h-4 mr-2", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsxDEV15("path", { fillRule: "evenodd", d: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 101.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z", clipRule: "evenodd" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 613,
                  columnNumber: 27
                }, this) }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 612,
                  columnNumber: 25
                }, this),
                "Export"
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 611,
                columnNumber: 23
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 596,
              columnNumber: 19
            },
            this
          ),
          showExportDropdown && /* @__PURE__ */ jsxDEV15(
            "div",
            {
              ref: exportDropdownRef,
              className: "absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50",
              children: /* @__PURE__ */ jsxDEV15("div", { className: "py-1", role: "menu", "aria-orientation": "vertical", children: [
                /* @__PURE__ */ jsxDEV15("div", { className: "px-4 py-2 text-sm text-gray-700 dark:text-gray-200 font-medium border-b border-gray-200 dark:border-gray-700", children: "Export Format" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 627,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV15(
                  "button",
                  {
                    onClick: () => handleExport("csv", "all"),
                    className: "block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700",
                    role: "menuitem",
                    children: "CSV - All Data"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 630,
                    columnNumber: 25
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV15(
                  "button",
                  {
                    onClick: () => handleExport("csv", "filtered"),
                    className: "block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700",
                    role: "menuitem",
                    children: "CSV - Filtered Data"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 637,
                    columnNumber: 25
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV15(
                  "button",
                  {
                    onClick: () => handleExport("json", "all"),
                    className: "block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700",
                    role: "menuitem",
                    children: "JSON - All Data"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 644,
                    columnNumber: 25
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV15(
                  "button",
                  {
                    onClick: () => handleExport("json", "filtered"),
                    className: "block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700",
                    role: "menuitem",
                    children: "JSON - Filtered Data"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 651,
                    columnNumber: 25
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 626,
                columnNumber: 23
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 622,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 595,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 591,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 582,
        columnNumber: 11
      }, this),
      location.pathname === "/" ? /* @__PURE__ */ jsxDEV15(Fragment2, { children: [
        /* @__PURE__ */ jsxDEV15("form", { onSubmit: handleSubmit, className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8", children: [
          /* @__PURE__ */ jsxDEV15("div", { className: "grid md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxDEV15("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxDEV15(Label2, { htmlFor: "playstore-url", className: "mb-2", children: "Play Store URL" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 673,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV15(
                TextInput2,
                {
                  id: "playstore-url",
                  type: "url",
                  placeholder: "https://play.google.com/store/apps/details?id=...",
                  required: !0,
                  value: url,
                  onChange: (e) => setUrl(e.target.value),
                  color: "gray",
                  helperText: "Enter your app's Play Store URL to analyze comments"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 676,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 672,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV15("div", { children: [
              /* @__PURE__ */ jsxDEV15(Label2, { htmlFor: "year", className: "mb-2", children: "Filter by Year" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 688,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV15(
                Select2,
                {
                  id: "year",
                  value: year,
                  onChange: (e) => setYear(e.target.value),
                  children: [
                    /* @__PURE__ */ jsxDEV15("option", { value: "all", children: "All Years" }, void 0, !1, {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 696,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV15("option", { value: "2024", children: "2024" }, void 0, !1, {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 697,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV15("option", { value: "2023", children: "2023" }, void 0, !1, {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 698,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV15("option", { value: "2022", children: "2022" }, void 0, !1, {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 699,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV15("option", { value: "2021", children: "2021" }, void 0, !1, {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 700,
                      columnNumber: 23
                    }, this)
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 691,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 687,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 671,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV15("div", { className: "mt-6", children: /* @__PURE__ */ jsxDEV15(
            Button4,
            {
              type: "submit",
              disabled: isLoading,
              color: "blue",
              className: "h-[42px]",
              children: isLoading ? /* @__PURE__ */ jsxDEV15(Fragment2, { children: [
                /* @__PURE__ */ jsxDEV15("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsxDEV15("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 714,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV15("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 715,
                    columnNumber: 27
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 713,
                  columnNumber: 25
                }, this),
                "Processing..."
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 712,
                columnNumber: 23
              }, this) : "Analyze Comments"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 705,
              columnNumber: 19
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 704,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 670,
          columnNumber: 15
        }, this),
        error && /* @__PURE__ */ jsxDEV15("div", { className: "bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200 p-4 rounded-lg mb-8", children: /* @__PURE__ */ jsxDEV15("div", { className: "flex", children: [
          /* @__PURE__ */ jsxDEV15("svg", { className: "h-5 w-5 text-red-400 mr-2", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsxDEV15("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 730,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 729,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV15("span", { className: "font-medium", children: "Error!" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 732,
            columnNumber: 21
          }, this),
          "\xA0",
          error
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 728,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 727,
          columnNumber: 17
        }, this),
        hasData && /* @__PURE__ */ jsxDEV15("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxDEV15("div", { className: "grid md:grid-cols-4 gap-6", children: [
            /* @__PURE__ */ jsxDEV15("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
              /* @__PURE__ */ jsxDEV15("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxDEV15("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Total Comments" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 743,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV15("span", { className: "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full", children: "Since last week" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 744,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 742,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV15("div", { className: "flex items-baseline", children: /* @__PURE__ */ jsxDEV15("span", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: totalComments }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 749,
                columnNumber: 25
              }, this) }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 748,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 741,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV15("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
              /* @__PURE__ */ jsxDEV15("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxDEV15("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Positive Sentiment" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 757,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV15("span", { className: "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full", children: [
                  positivePercentage,
                  "%"
                ] }, void 0, !0, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 758,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 756,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV15("div", { className: "flex items-baseline", children: /* @__PURE__ */ jsxDEV15("span", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: positiveCount }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 763,
                columnNumber: 25
              }, this) }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 762,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 755,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV15("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
              /* @__PURE__ */ jsxDEV15("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxDEV15("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Feature Requests" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 771,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV15("span", { className: "text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-200 text-xs font-medium px-2.5 py-0.5 rounded-full", children: "New" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 772,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 770,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV15("div", { className: "flex items-baseline", children: /* @__PURE__ */ jsxDEV15("span", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: featureRequestCount }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 777,
                columnNumber: 25
              }, this) }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 776,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 769,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV15("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
              /* @__PURE__ */ jsxDEV15("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxDEV15("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Bug Reports" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 785,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV15("span", { className: "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200 text-xs font-medium px-2.5 py-0.5 rounded-full", children: "Critical" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 786,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 784,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV15("div", { className: "flex items-baseline", children: /* @__PURE__ */ jsxDEV15("span", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: bugReportCount }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 791,
                columnNumber: 25
              }, this) }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 790,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 783,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 740,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV15("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxDEV15("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
              /* @__PURE__ */ jsxDEV15("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Top Keywords" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 801,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV15("div", { className: "flex flex-wrap gap-2", children: fetcher.data?.keywords?.map(({ word, count }) => /* @__PURE__ */ jsxDEV15(
                "span",
                {
                  className: "px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full dark:bg-blue-900 dark:text-blue-200",
                  children: [
                    word,
                    " (",
                    count,
                    ")"
                  ]
                },
                word,
                !0,
                {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 804,
                  columnNumber: 27
                },
                this
              )) }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 802,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 800,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV15("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
              /* @__PURE__ */ jsxDEV15("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Sentiment Distribution" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 815,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV15("div", { className: "grid grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxDEV15("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxDEV15("div", { className: "text-2xl font-bold text-green-600", children: positiveCount }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 818,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV15("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Positive" }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 821,
                    columnNumber: 27
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 817,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV15("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxDEV15("div", { className: "text-2xl font-bold text-yellow-600", children: neutralCount }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 826,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV15("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Neutral" }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 829,
                    columnNumber: 27
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 825,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV15("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxDEV15("div", { className: "text-2xl font-bold text-red-600", children: negativeCount }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 834,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV15("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Negative" }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 837,
                    columnNumber: 27
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 833,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 816,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 814,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 799,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV15("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6", children: [
            /* @__PURE__ */ jsxDEV15("div", { className: "flex justify-between items-center mb-6", children: [
              /* @__PURE__ */ jsxDEV15("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Trend Analysis" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 848,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV15("div", { className: "flex items-center space-x-4", children: [
                /* @__PURE__ */ jsxDEV15("div", { children: /* @__PURE__ */ jsxDEV15(
                  "select",
                  {
                    className: "px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm",
                    value: timeGranularity,
                    onChange: (e) => setTimeGranularity(e.target.value),
                    children: timeframeOptions.map((option) => /* @__PURE__ */ jsxDEV15("option", { value: option.value, children: option.label }, option.value, !1, {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 858,
                      columnNumber: 31
                    }, this))
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 852,
                    columnNumber: 27
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 851,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV15("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsxDEV15(
                    "input",
                    {
                      type: "date",
                      className: "px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm",
                      value: dateRange.start || "",
                      onChange: (e) => {
                        setDateRange((prev) => ({ ...prev, start: e.target.value })), setShowAllTime(!1);
                      },
                      disabled: showAllTime
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 867,
                      columnNumber: 27
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV15("span", { className: "text-gray-500 dark:text-gray-400", children: "to" }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 877,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV15(
                    "input",
                    {
                      type: "date",
                      className: "px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm",
                      value: dateRange.end || "",
                      onChange: (e) => {
                        setDateRange((prev) => ({ ...prev, end: e.target.value })), setShowAllTime(!1);
                      },
                      disabled: showAllTime
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 878,
                      columnNumber: 27
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV15(
                    "button",
                    {
                      className: `px-3 py-2 rounded-lg text-sm ${showAllTime ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"}`,
                      onClick: () => setShowAllTime(!showAllTime),
                      children: "All Time"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 888,
                      columnNumber: 27
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 866,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 849,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 847,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV15("div", { className: "flex flex-wrap gap-2 mb-4", children: [
              /* @__PURE__ */ jsxDEV15(
                "button",
                {
                  className: `px-3 py-1 rounded-full text-xs font-medium ${visibleMetrics.positive ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`,
                  onClick: () => setVisibleMetrics((prev) => ({ ...prev, positive: !prev.positive })),
                  children: "Positive Sentiment"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 904,
                  columnNumber: 23
                },
                this
              ),
              /* @__PURE__ */ jsxDEV15(
                "button",
                {
                  className: `px-3 py-1 rounded-full text-xs font-medium ${visibleMetrics.negative ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`,
                  onClick: () => setVisibleMetrics((prev) => ({ ...prev, negative: !prev.negative })),
                  children: "Negative Sentiment"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 914,
                  columnNumber: 23
                },
                this
              ),
              /* @__PURE__ */ jsxDEV15(
                "button",
                {
                  className: `px-3 py-1 rounded-full text-xs font-medium ${visibleMetrics.neutral ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`,
                  onClick: () => setVisibleMetrics((prev) => ({ ...prev, neutral: !prev.neutral })),
                  children: "Neutral Sentiment"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 924,
                  columnNumber: 23
                },
                this
              ),
              /* @__PURE__ */ jsxDEV15(
                "button",
                {
                  className: `px-3 py-1 rounded-full text-xs font-medium ${visibleMetrics.total ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`,
                  onClick: () => setVisibleMetrics((prev) => ({ ...prev, total: !prev.total })),
                  children: "Total Comments"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 934,
                  columnNumber: 23
                },
                this
              ),
              /* @__PURE__ */ jsxDEV15(
                "button",
                {
                  className: `px-3 py-1 rounded-full text-xs font-medium ${visibleMetrics.featureRequests ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`,
                  onClick: () => setVisibleMetrics((prev) => ({ ...prev, featureRequests: !prev.featureRequests })),
                  children: "Feature Requests"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 944,
                  columnNumber: 23
                },
                this
              ),
              /* @__PURE__ */ jsxDEV15(
                "button",
                {
                  className: `px-3 py-1 rounded-full text-xs font-medium ${visibleMetrics.bugReports ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`,
                  onClick: () => setVisibleMetrics((prev) => ({ ...prev, bugReports: !prev.bugReports })),
                  children: "Bug Reports"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 954,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 903,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV15("div", { className: "h-80 mt-6", children: trendData.length > 0 ? /* @__PURE__ */ jsxDEV15(ResponsiveContainer2, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV15(
              LineChart2,
              {
                data: trendData,
                margin: { top: 5, right: 30, left: 20, bottom: 5 },
                children: [
                  /* @__PURE__ */ jsxDEV15(CartesianGrid2, { strokeDasharray: "3 3", stroke: "#374151", opacity: 0.1 }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 974,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV15(
                    XAxis2,
                    {
                      dataKey: "date",
                      stroke: "#6B7280",
                      tick: { fill: "#6B7280" }
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 975,
                      columnNumber: 29
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV15(
                    YAxis2,
                    {
                      stroke: "#6B7280",
                      tick: { fill: "#6B7280" }
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 980,
                      columnNumber: 29
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV15(
                    Tooltip4,
                    {
                      contentStyle: {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderColor: "#E5E7EB",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                      },
                      formatter: (value, name) => {
                        let formattedName = {
                          positive: "Positive Sentiment",
                          negative: "Negative Sentiment",
                          neutral: "Neutral Sentiment",
                          total: "Total Comments",
                          featureRequests: "Feature Requests",
                          bugReports: "Bug Reports"
                        }[name] || name;
                        return [value, formattedName];
                      },
                      labelFormatter: (label) => `Period: ${label}`
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 984,
                      columnNumber: 29
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV15(
                    Legend4,
                    {
                      formatter: (value) => /* @__PURE__ */ jsxDEV15("span", { style: { color: "#6B7280" }, children: {
                        positive: "Positive Sentiment",
                        negative: "Negative Sentiment",
                        neutral: "Neutral Sentiment",
                        total: "Total Comments",
                        featureRequests: "Feature Requests",
                        bugReports: "Bug Reports"
                      }[value] || value }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1016,
                        columnNumber: 40
                      }, this)
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 1005,
                      columnNumber: 29
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV15(
                    Brush,
                    {
                      dataKey: "date",
                      height: 30,
                      stroke: "#8884d8",
                      fill: "rgba(136, 132, 216, 0.1)"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 1019,
                      columnNumber: 29
                    },
                    this
                  ),
                  appReleases.map((release, index) => {
                    let releaseDate = parseISO(release.date), closestPoint = null, minDiff = 1 / 0;
                    for (let point of trendData) {
                      let pointDate = new Date(point.date), diff = Math.abs(pointDate.getTime() - releaseDate.getTime());
                      diff < minDiff && (minDiff = diff, closestPoint = point);
                    }
                    return closestPoint ? /* @__PURE__ */ jsxDEV15(
                      ReferenceLine,
                      {
                        x: closestPoint.date,
                        stroke: "#10B981",
                        strokeDasharray: "3 3",
                        label: {
                          value: `v${release.version}`,
                          position: "insideTopRight",
                          fill: "#10B981",
                          fontSize: 12
                        }
                      },
                      index,
                      !1,
                      {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1047,
                        columnNumber: 33
                      },
                      this
                    ) : null;
                  }),
                  significantChanges.map((change, index) => {
                    let point = trendData.find((p) => p.date === change.period);
                    if (!point)
                      return null;
                    let color;
                    return change.metric === "positive" ? color = change.isIncrease ? "#10B981" : "#EF4444" : change.metric === "negative" ? color = change.isIncrease ? "#EF4444" : "#10B981" : change.metric === "total" ? color = "#3B82F6" : change.metric === "featureRequests" ? color = "#8B5CF6" : change.metric === "bugReports" && (color = "#F97316"), /* @__PURE__ */ jsxDEV15(
                      ReferenceArea,
                      {
                        x1: point.date,
                        x2: point.date,
                        strokeOpacity: 0.3,
                        fill: color,
                        fillOpacity: 0.2
                      },
                      `${change.period}-${change.metric}-${index}`,
                      !1,
                      {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1083,
                        columnNumber: 33
                      },
                      this
                    );
                  }),
                  visibleMetrics.positive && /* @__PURE__ */ jsxDEV15(
                    Line3,
                    {
                      type: "monotone",
                      dataKey: "positive",
                      stroke: "#10B981",
                      strokeWidth: 2,
                      dot: { r: 4, fill: "#10B981" },
                      activeDot: { r: 6, fill: "#10B981" }
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 1096,
                      columnNumber: 31
                    },
                    this
                  ),
                  visibleMetrics.negative && /* @__PURE__ */ jsxDEV15(
                    Line3,
                    {
                      type: "monotone",
                      dataKey: "negative",
                      stroke: "#EF4444",
                      strokeWidth: 2,
                      dot: { r: 4, fill: "#EF4444" },
                      activeDot: { r: 6, fill: "#EF4444" }
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 1106,
                      columnNumber: 31
                    },
                    this
                  ),
                  visibleMetrics.neutral && /* @__PURE__ */ jsxDEV15(
                    Line3,
                    {
                      type: "monotone",
                      dataKey: "neutral",
                      stroke: "#F59E0B",
                      strokeWidth: 2,
                      dot: { r: 4, fill: "#F59E0B" },
                      activeDot: { r: 6, fill: "#F59E0B" }
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 1116,
                      columnNumber: 31
                    },
                    this
                  ),
                  visibleMetrics.total && /* @__PURE__ */ jsxDEV15(
                    Line3,
                    {
                      type: "monotone",
                      dataKey: "total",
                      stroke: "#3B82F6",
                      strokeWidth: 2,
                      dot: { r: 4, fill: "#3B82F6" },
                      activeDot: { r: 6, fill: "#3B82F6" }
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 1126,
                      columnNumber: 31
                    },
                    this
                  ),
                  visibleMetrics.featureRequests && /* @__PURE__ */ jsxDEV15(
                    Line3,
                    {
                      type: "monotone",
                      dataKey: "featureRequests",
                      stroke: "#8B5CF6",
                      strokeWidth: 2,
                      dot: { r: 4, fill: "#8B5CF6" },
                      activeDot: { r: 6, fill: "#8B5CF6" }
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 1136,
                      columnNumber: 31
                    },
                    this
                  ),
                  visibleMetrics.bugReports && /* @__PURE__ */ jsxDEV15(
                    Line3,
                    {
                      type: "monotone",
                      dataKey: "bugReports",
                      stroke: "#F97316",
                      strokeWidth: 2,
                      dot: { r: 4, fill: "#F97316" },
                      activeDot: { r: 6, fill: "#F97316" }
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 1146,
                      columnNumber: 31
                    },
                    this
                  )
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 970,
                columnNumber: 27
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 969,
              columnNumber: 25
            }, this) : /* @__PURE__ */ jsxDEV15("div", { className: "h-full flex items-center justify-center", children: /* @__PURE__ */ jsxDEV15("p", { className: "text-gray-500 dark:text-gray-400", children: hasData ? "Not enough data to display trends. Try analyzing more comments." : "Analyze comments to see trend data." }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1159,
              columnNumber: 27
            }, this) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1158,
              columnNumber: 25
            }, this) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 967,
              columnNumber: 21
            }, this),
            trendData.length > 0 && /* @__PURE__ */ jsxDEV15("div", { className: "mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4", children: [
              /* @__PURE__ */ jsxDEV15("h3", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-3", children: "Key Insights" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1171,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV15("div", { className: "space-y-2", children: significantChanges.length > 0 ? significantChanges.slice(0, 3).map((change, index) => /* @__PURE__ */ jsxDEV15(InsightItem, { change, appReleases }, index, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1177,
                columnNumber: 31
              }, this)) : /* @__PURE__ */ jsxDEV15("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "No significant changes detected in the current time period." }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1180,
                columnNumber: 29
              }, this) }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1174,
                columnNumber: 25
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1170,
              columnNumber: 23
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 846,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV15("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: /* @__PURE__ */ jsxDEV15("div", { className: "flex flex-col space-y-4", children: [
            /* @__PURE__ */ jsxDEV15("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsxDEV15("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Recent Comments" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1193,
              columnNumber: 25
            }, this) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1192,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV15("div", { className: "flex flex-col md:flex-row gap-4", children: [
              /* @__PURE__ */ jsxDEV15("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxDEV15("form", { className: "flex items-center", onSubmit: (e) => e.preventDefault(), children: [
                  /* @__PURE__ */ jsxDEV15("label", { htmlFor: "comment-search", className: "sr-only", children: "Search" }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 1200,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV15("div", { className: "relative w-full", children: [
                    /* @__PURE__ */ jsxDEV15("div", { className: "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none", children: /* @__PURE__ */ jsxDEV15("svg", { className: "w-4 h-4 text-gray-500 dark:text-gray-400", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxDEV15("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" }, void 0, !1, {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 1204,
                      columnNumber: 35
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 1203,
                      columnNumber: 33
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 1202,
                      columnNumber: 31
                    }, this),
                    /* @__PURE__ */ jsxDEV15(
                      "input",
                      {
                        type: "text",
                        id: "comment-search",
                        className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                        placeholder: "Search in comments...",
                        value: modalSearchTerm,
                        onChange: (e) => {
                          setModalSearchTerm(e.target.value), setCurrentPage(1);
                        }
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1207,
                        columnNumber: 31
                      },
                      this
                    )
                  ] }, void 0, !0, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 1201,
                    columnNumber: 29
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1199,
                  columnNumber: 27
                }, this),
                modalSearchTerm && /* @__PURE__ */ jsxDEV15("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-400", children: [
                  "Found ",
                  searchResultsCount,
                  " ",
                  searchResultsCount === 1 ? "result" : "results"
                ] }, void 0, !0, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1221,
                  columnNumber: 29
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1198,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV15("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsxDEV15(
                  "select",
                  {
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[42px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    value: sentimentFilter,
                    onChange: (e) => {
                      setSentimentFilter(e.target.value), setCurrentPage(1);
                    },
                    children: [
                      /* @__PURE__ */ jsxDEV15("option", { value: "all", children: "All Sentiments" }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1235,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV15("option", { value: "positive", children: "Positive" }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1236,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV15("option", { value: "neutral", children: "Neutral" }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1237,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV15("option", { value: "negative", children: "Negative" }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1238,
                        columnNumber: 29
                      }, this)
                    ]
                  },
                  void 0,
                  !0,
                  {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 1227,
                    columnNumber: 27
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV15(
                  "select",
                  {
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[42px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    value: ratingFilter,
                    onChange: (e) => {
                      setRatingFilter(e.target.value), setCurrentPage(1);
                    },
                    children: [
                      /* @__PURE__ */ jsxDEV15("option", { value: "all", children: "All Ratings" }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1248,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV15("option", { value: "5", children: "\u2B50\u2B50\u2B50\u2B50\u2B50 (5)" }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1249,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV15("option", { value: "4", children: "\u2B50\u2B50\u2B50\u2B50 (4)" }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1250,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV15("option", { value: "3", children: "\u2B50\u2B50\u2B50 (3)" }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1251,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV15("option", { value: "2", children: "\u2B50\u2B50 (2)" }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1252,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV15("option", { value: "1", children: "\u2B50 (1)" }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1253,
                        columnNumber: 29
                      }, this)
                    ]
                  },
                  void 0,
                  !0,
                  {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 1240,
                    columnNumber: 27
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1226,
                columnNumber: 25
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1197,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV15("div", { className: "relative min-h-[600px] flex flex-col", children: [
              /* @__PURE__ */ jsxDEV15("div", { className: "space-y-4 flex-1 overflow-y-auto pb-16", children: [
                getFilteredComments().filteredComments.map((comment) => /* @__PURE__ */ jsxDEV15(
                  "div",
                  {
                    className: "flex flex-col p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700",
                    children: /* @__PURE__ */ jsxDEV15("div", { className: "flex items-start space-x-4", children: [
                      /* @__PURE__ */ jsxDEV15("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxDEV15("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxDEV15("span", { className: "text-lg font-semibold text-white", children: comment.userName.charAt(0).toUpperCase() }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1269,
                        columnNumber: 37
                      }, this) }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1268,
                        columnNumber: 35
                      }, this) }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1267,
                        columnNumber: 33
                      }, this),
                      /* @__PURE__ */ jsxDEV15("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxDEV15("div", { className: "flex items-start justify-between", children: [
                          /* @__PURE__ */ jsxDEV15("div", { children: [
                            /* @__PURE__ */ jsxDEV15("h3", { className: "text-base font-semibold text-gray-900 dark:text-white mb-1", children: comment.userName }, void 0, !1, {
                              fileName: "app/routes/_index.tsx",
                              lineNumber: 1277,
                              columnNumber: 39
                            }, this),
                            /* @__PURE__ */ jsxDEV15("div", { className: "flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400", children: [
                              /* @__PURE__ */ jsxDEV15("time", { dateTime: comment.date, children: new Date(comment.date).toLocaleDateString(void 0, {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                              }) }, void 0, !1, {
                                fileName: "app/routes/_index.tsx",
                                lineNumber: 1281,
                                columnNumber: 41
                              }, this),
                              /* @__PURE__ */ jsxDEV15("span", { children: "\u2022" }, void 0, !1, {
                                fileName: "app/routes/_index.tsx",
                                lineNumber: 1288,
                                columnNumber: 41
                              }, this),
                              /* @__PURE__ */ jsxDEV15("span", { className: "flex items-center", children: [
                                /* @__PURE__ */ jsxDEV15("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDEV15("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" }, void 0, !1, {
                                  fileName: "app/routes/_index.tsx",
                                  lineNumber: 1291,
                                  columnNumber: 45
                                }, this) }, void 0, !1, {
                                  fileName: "app/routes/_index.tsx",
                                  lineNumber: 1290,
                                  columnNumber: 43
                                }, this),
                                comment.thumbsUp
                              ] }, void 0, !0, {
                                fileName: "app/routes/_index.tsx",
                                lineNumber: 1289,
                                columnNumber: 41
                              }, this)
                            ] }, void 0, !0, {
                              fileName: "app/routes/_index.tsx",
                              lineNumber: 1280,
                              columnNumber: 39
                            }, this)
                          ] }, void 0, !0, {
                            fileName: "app/routes/_index.tsx",
                            lineNumber: 1276,
                            columnNumber: 37
                          }, this),
                          /* @__PURE__ */ jsxDEV15("div", { className: "flex items-center", children: [...Array(5)].map((_, index) => /* @__PURE__ */ jsxDEV15(
                            "svg",
                            {
                              className: `w-5 h-5 ${index < comment.score ? "text-yellow-400" : "text-gray-200 dark:text-gray-700"}`,
                              "aria-hidden": "true",
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "currentColor",
                              viewBox: "0 0 22 20",
                              children: /* @__PURE__ */ jsxDEV15("path", { d: "M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" }, void 0, !1, {
                                fileName: "app/routes/_index.tsx",
                                lineNumber: 1307,
                                columnNumber: 43
                              }, this)
                            },
                            index,
                            !1,
                            {
                              fileName: "app/routes/_index.tsx",
                              lineNumber: 1299,
                              columnNumber: 41
                            },
                            this
                          )) }, void 0, !1, {
                            fileName: "app/routes/_index.tsx",
                            lineNumber: 1297,
                            columnNumber: 37
                          }, this)
                        ] }, void 0, !0, {
                          fileName: "app/routes/_index.tsx",
                          lineNumber: 1275,
                          columnNumber: 35
                        }, this),
                        /* @__PURE__ */ jsxDEV15("div", { className: "mt-4 pl-0", children: /* @__PURE__ */ jsxDEV15("p", { className: "text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-[15px]", children: comment.content }, void 0, !1, {
                          fileName: "app/routes/_index.tsx",
                          lineNumber: 1313,
                          columnNumber: 37
                        }, this) }, void 0, !1, {
                          fileName: "app/routes/_index.tsx",
                          lineNumber: 1312,
                          columnNumber: 35
                        }, this)
                      ] }, void 0, !0, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1274,
                        columnNumber: 33
                      }, this)
                    ] }, void 0, !0, {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 1266,
                      columnNumber: 31
                    }, this)
                  },
                  comment.id,
                  !1,
                  {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 1262,
                    columnNumber: 29
                  },
                  this
                )),
                getFilteredComments().filteredComments.length === 0 && /* @__PURE__ */ jsxDEV15("div", { className: "flex items-center justify-center h-32 text-gray-500 dark:text-gray-400", children: "No comments found matching your criteria" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1322,
                  columnNumber: 29
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1260,
                columnNumber: 25
              }, this),
              searchResultsCount > itemsPerPage && /* @__PURE__ */ jsxDEV15("div", { className: "absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4", children: /* @__PURE__ */ jsxDEV15("nav", { className: "flex justify-center", "aria-label": "Comments pagination", children: /* @__PURE__ */ jsxDEV15("ul", { className: "inline-flex items-center -space-x-px", children: [
                /* @__PURE__ */ jsxDEV15("li", { children: /* @__PURE__ */ jsxDEV15(
                  "button",
                  {
                    onClick: (e) => {
                      e.preventDefault(), currentPage > 1 && handlePageChange(currentPage - 1, e);
                    },
                    disabled: currentPage === 1,
                    className: "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
                    "aria-label": "Previous page",
                    children: [
                      /* @__PURE__ */ jsxDEV15("svg", { className: "w-2.5 h-2.5 rtl:rotate-180", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 6 10", children: /* @__PURE__ */ jsxDEV15("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 1 1 5l4 4" }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1344,
                        columnNumber: 39
                      }, this) }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1343,
                        columnNumber: 37
                      }, this),
                      /* @__PURE__ */ jsxDEV15("span", { className: "sr-only", children: "Previous" }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1346,
                        columnNumber: 37
                      }, this)
                    ]
                  },
                  void 0,
                  !0,
                  {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 1334,
                    columnNumber: 35
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1333,
                  columnNumber: 33
                }, this),
                getPageRange(currentPage, totalPages).map((pageNum, index) => /* @__PURE__ */ jsxDEV15("li", { children: pageNum === "..." ? /* @__PURE__ */ jsxDEV15("span", { className: "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400", children: "..." }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1353,
                  columnNumber: 39
                }, this) : /* @__PURE__ */ jsxDEV15(
                  "button",
                  {
                    onClick: (e) => handlePageChange(pageNum, e),
                    "aria-current": currentPage === pageNum ? "page" : void 0,
                    className: `flex items-center justify-center px-3 h-8 leading-tight ${currentPage === pageNum ? "z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}`,
                    "aria-label": `Page ${pageNum}`,
                    children: pageNum
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 1357,
                    columnNumber: 39
                  },
                  this
                ) }, index, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1351,
                  columnNumber: 35
                }, this)),
                /* @__PURE__ */ jsxDEV15("li", { children: /* @__PURE__ */ jsxDEV15(
                  "button",
                  {
                    onClick: (e) => {
                      e.preventDefault(), currentPage < totalPages && handlePageChange(currentPage + 1, e);
                    },
                    disabled: currentPage === totalPages,
                    className: "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
                    "aria-label": "Next page",
                    children: [
                      /* @__PURE__ */ jsxDEV15("svg", { className: "w-2.5 h-2.5 rtl:rotate-180", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 6 10", children: /* @__PURE__ */ jsxDEV15("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "m1 9 4-4-4-4" }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1384,
                        columnNumber: 39
                      }, this) }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1383,
                        columnNumber: 37
                      }, this),
                      /* @__PURE__ */ jsxDEV15("span", { className: "sr-only", children: "Next" }, void 0, !1, {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 1386,
                        columnNumber: 37
                      }, this)
                    ]
                  },
                  void 0,
                  !0,
                  {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 1374,
                    columnNumber: 35
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1373,
                  columnNumber: 33
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1332,
                columnNumber: 31
              }, this) }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1331,
                columnNumber: 29
              }, this) }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1330,
                columnNumber: 27
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1259,
              columnNumber: 23
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1191,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1190,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 738,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 668,
        columnNumber: 13
      }, this) : location.pathname === "/history" ? /* @__PURE__ */ jsxDEV15("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: /* @__PURE__ */ jsxDEV15("p", { className: "text-gray-600 dark:text-gray-400", children: "History feature coming soon..." }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1401,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1400,
        columnNumber: 13
      }, this) : null
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 580,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 579,
      columnNumber: 7
    }, this),
    showAllComments && hasData && /* @__PURE__ */ jsxDEV15("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV15("div", { className: "bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ jsxDEV15("div", { className: "p-6 border-b border-gray-200 dark:border-gray-700", children: [
        /* @__PURE__ */ jsxDEV15("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxDEV15("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "All Comments" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1413,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV15(
            "button",
            {
              onClick: () => setShowAllComments(!1),
              className: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
              children: /* @__PURE__ */ jsxDEV15("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDEV15("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1419,
                columnNumber: 21
              }, this) }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1418,
                columnNumber: 19
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1414,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1412,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV15("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsxDEV15("div", { className: "flex-1" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1424,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV15(
            "select",
            {
              className: "px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
              value: sentimentFilter,
              onChange: (e) => setSentimentFilter(e.target.value),
              children: [
                /* @__PURE__ */ jsxDEV15("option", { value: "all", children: "All Sentiments" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1431,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV15("option", { value: "positive", children: "Positive" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1432,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV15("option", { value: "neutral", children: "Neutral" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1433,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV15("option", { value: "negative", children: "Negative" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1434,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1426,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV15(
            "select",
            {
              className: "px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
              value: ratingFilter,
              onChange: (e) => setRatingFilter(e.target.value),
              children: [
                /* @__PURE__ */ jsxDEV15("option", { value: "all", children: "All Ratings" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1441,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV15("option", { value: "5", children: "\u2B50\u2B50\u2B50\u2B50\u2B50 (5)" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1442,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV15("option", { value: "4", children: "\u2B50\u2B50\u2B50\u2B50 (4)" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1443,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV15("option", { value: "3", children: "\u2B50\u2B50\u2B50 (3)" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1444,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV15("option", { value: "2", children: "\u2B50\u2B50 (2)" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1445,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV15("option", { value: "1", children: "\u2B50 (1)" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1446,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1436,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1423,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1411,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV15("div", { className: "p-6 overflow-y-auto flex-1", children: /* @__PURE__ */ jsxDEV15("div", { className: "space-y-4", children: getFilteredComments().filteredComments.map((comment) => /* @__PURE__ */ jsxDEV15(
        "div",
        {
          className: "flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50",
          children: [
            /* @__PURE__ */ jsxDEV15("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxDEV15("div", { className: "w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV15("span", { className: "text-blue-600 dark:text-blue-200 font-medium", children: comment.userName.charAt(0) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1459,
              columnNumber: 25
            }, this) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1458,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1457,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV15("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxDEV15("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxDEV15("h3", { className: "text-sm font-medium text-gray-900 dark:text-white", children: comment.userName }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1466,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV15("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsxDEV15("span", { className: "text-yellow-400 mr-1", children: "\u2605" }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 1470,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV15("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: comment.score }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 1471,
                    columnNumber: 27
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1469,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1465,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV15("p", { className: "text-sm text-gray-600 dark:text-gray-400 mb-1", children: comment.content }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1476,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV15("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV15("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: new Date(comment.date).toLocaleDateString() }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1480,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV15("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
                  "\u{1F44D} ",
                  comment.thumbsUp
                ] }, void 0, !0, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1483,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1479,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1464,
              columnNumber: 21
            }, this)
          ]
        },
        comment.id,
        !0,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1453,
          columnNumber: 19
        },
        this
      )) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1451,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1450,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 1410,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 1409,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 577,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-A6KASX4T.js", imports: ["/build/_shared/chunk-4ZNTBH4S.js", "/build/_shared/chunk-BGJAF3OO.js", "/build/_shared/chunk-PTAIRCKJ.js", "/build/_shared/chunk-OPGM6WIO.js", "/build/_shared/chunk-WWEL7QKW.js", "/build/_shared/chunk-2AFRYLX2.js", "/build/_shared/chunk-N4FG5RPV.js", "/build/_shared/chunk-RODUX5XG.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-CGQJLUQI.js", imports: ["/build/_shared/chunk-ZKVZXHCC.js", "/build/_shared/chunk-LYT6NCUF.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-RUBOV3QF.js", imports: ["/build/_shared/chunk-GMLRMA33.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.comments": { id: "routes/api.comments", parentId: "root", path: "api/comments", index: void 0, caseSensitive: void 0, module: "/build/routes/api.comments-P4EJO6UZ.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.compare": { id: "routes/api.compare", parentId: "root", path: "api/compare", index: void 0, caseSensitive: void 0, module: "/build/routes/api.compare-3R23RE63.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/comparison": { id: "routes/comparison", parentId: "root", path: "comparison", index: void 0, caseSensitive: void 0, module: "/build/routes/comparison-AURRQKIE.js", imports: ["/build/_shared/chunk-GMLRMA33.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "4575be17", hmr: { runtime: "/build/_shared/chunk-PTAIRCKJ.js", timestamp: 1741077365641 }, url: "/build/manifest-4575BE17.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !0, v3_relativeSplatPath: !0, v3_throwAbortReason: !0, v3_routeConfig: !1, v3_singleFetch: !0, v3_lazyRouteDiscovery: !0, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/api.comments": {
    id: "routes/api.comments",
    parentId: "root",
    path: "api/comments",
    index: void 0,
    caseSensitive: void 0,
    module: api_comments_exports
  },
  "routes/api.compare": {
    id: "routes/api.compare",
    parentId: "root",
    path: "api/compare",
    index: void 0,
    caseSensitive: void 0,
    module: api_compare_exports
  },
  "routes/comparison": {
    id: "routes/comparison",
    parentId: "root",
    path: "comparison",
    index: void 0,
    caseSensitive: void 0,
    module: comparison_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
