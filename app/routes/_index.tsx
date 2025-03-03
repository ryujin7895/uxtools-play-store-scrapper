import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { useFetcher } from "@remix-run/react";
import natural from "natural";

interface Comment {
  id: string;
  userName: string;
  content: string;
  score: number;
  thumbsUp: number;
  date: string;
  year: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

interface AnalysisResult {
  comments?: Comment[];
  sentiment?: {
    positive: number;
    negative: number;
    neutral: number;
  };
  keywords?: {
    word: string;
    count: number;
  }[];
  intentions?: {
    feature_request: Comment[];
    bug_report: Comment[];
    praise: Comment[];
    complaint: Comment[];
  };
  error?: string;
  message?: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Play Store Comment Analyzer" },
    { name: "description", content: "Analyze Play Store comments with ease" },
  ];
};

export default function Index() {
  const [url, setUrl] = useState("");
  const [year, setYear] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalSearchTerm, setModalSearchTerm] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [sentimentFilter, setSentimentFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const fetcher = useFetcher<AnalysisResult>();
  const isLoading = fetcher.state !== "idle";
  const hasData = fetcher.data && !('error' in fetcher.data) && fetcher.data.comments;
  const error = fetcher.data?.error || fetcher.data?.message;

  // Update the getFilteredComments function to include all filters
  const getFilteredComments = () => {
    if (!fetcher.data?.comments) return [];
    
    return fetcher.data.comments.filter(comment => {
      const matchesSentiment = sentimentFilter === "all" || comment.sentiment === sentimentFilter;
      const matchesRating = ratingFilter === "all" || comment.score === parseInt(ratingFilter);
      const matchesSearch = !modalSearchTerm || 
        comment.content.toLowerCase().includes(modalSearchTerm.toLowerCase()) ||
        comment.userName.toLowerCase().includes(modalSearchTerm.toLowerCase());
      return matchesSentiment && matchesRating && matchesSearch;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Log the form data being submitted
      console.log('Submitting form with URL:', url, 'year:', year, 'searchTerm:', searchTerm);

      // Validate URL format
      const urlObj = new URL(url);
      if (!urlObj.hostname.includes('play.google.com')) {
        throw new Error('Please enter a valid Play Store URL');
      }

      const formData = new FormData();
      formData.append("url", url);
      formData.append("year", year);
      formData.append("searchTerm", searchTerm);
      
      console.log('Submitting to API...');
      fetcher.submit(formData, {
        method: "POST",
        action: "/api/comments",
      });
    } catch (error) {
      console.error('Form submission error:', error);
      if (error instanceof Error) {
        fetcher.data = { error: error.message } as AnalysisResult;
      }
    }
  };

  // Add fetcher state logging
  console.log('Fetcher state:', fetcher.state);
  console.log('Fetcher data:', fetcher.data);

  // Calculate some values outside of JSX for better readability
  const totalComments = fetcher.data?.comments?.length ?? 0;
  const positiveCount = fetcher.data?.sentiment?.positive ?? 0;
  const neutralCount = fetcher.data?.sentiment?.neutral ?? 0;
  const negativeCount = fetcher.data?.sentiment?.negative ?? 0;
  const featureRequestCount = fetcher.data?.intentions?.feature_request?.length ?? 0;
  const bugReportCount = fetcher.data?.intentions?.bug_report?.length ?? 0;
  const positivePercentage = totalComments > 0 
    ? ((positiveCount / totalComments) * 100).toFixed(1) 
    : "0.0";

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-30">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-8">
              <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
              <span className="text-xl font-bold text-gray-800 dark:text-white">Comment Analyzer</span>
            </div>
            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                <span>Dashboard</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <span>History</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Settings</span>
              </a>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h1>
              <p className="text-gray-600 dark:text-gray-400">Analyze app reviews and get insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="search"
                  className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Search in comments..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (fetcher.data && url) {
                      // Resubmit the form with the new search term
                      const formData = new FormData();
                      formData.append("url", url);
                      formData.append("year", year);
                      formData.append("searchTerm", e.target.value);
                      fetcher.submit(formData, {
                        method: "POST",
                        action: "/api/comments",
                      });
                    }
                  }}
                />
                <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* URL Input Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Play Store URL
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://play.google.com/store/apps/details?id=..."
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Filter by Year
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="all">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg inline-flex items-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Analyze Comments'
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200 p-4 rounded-lg mb-8">
              <div className="flex">
                <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">Error!</span>&nbsp;{error}
              </div>
            </div>
          )}

          {hasData && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Comments</h3>
                    <span className="text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Since last week
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {totalComments}
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Positive Sentiment</h3>
                    <span className="text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {positivePercentage}%
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {positiveCount}
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Feature Requests</h3>
                    <span className="text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      New
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {featureRequestCount}
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Bug Reports</h3>
                    <span className="text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Critical
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {bugReportCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Keywords and Sentiment Analysis */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Keywords</h2>
                  <div className="flex flex-wrap gap-2">
                    {fetcher.data?.keywords?.map(({ word, count }) => (
                      <span
                        key={word}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full dark:bg-blue-900 dark:text-blue-200"
                      >
                        {word} ({count})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sentiment Distribution</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {positiveCount}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Positive
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {neutralCount}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Neutral
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {negativeCount}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Negative
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Comments */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Comments</h2>
                  <button 
                    onClick={() => setShowAllComments(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    View all
                  </button>
                </div>
                <div className="space-y-4">
                  {fetcher.data?.comments?.slice(0, 5).map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-200 font-medium">
                            {comment.userName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {comment.userName}
                          </h3>
                          <div className="flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {comment.score}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                          {comment.content}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* All Comments Modal */}
      {showAllComments && hasData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">All Comments</h2>
                <button
                  onClick={() => setShowAllComments(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="search"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Search in comments..."
                    value={modalSearchTerm}
                    onChange={(e) => setModalSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={sentimentFilter}
                  onChange={(e) => setSentimentFilter(e.target.value)}
                >
                  <option value="all">All Sentiments</option>
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                </select>
                <select
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                >
                  <option value="all">All Ratings</option>
                  <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                  <option value="4">⭐⭐⭐⭐ (4)</option>
                  <option value="3">⭐⭐⭐ (3)</option>
                  <option value="2">⭐⭐ (2)</option>
                  <option value="1">⭐ (1)</option>
                </select>
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                {getFilteredComments().map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-200 font-medium">
                          {comment.userName.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {comment.userName}
                        </h3>
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {comment.score}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        {comment.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          👍 {comment.thumbsUp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
