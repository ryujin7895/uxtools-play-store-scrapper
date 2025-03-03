import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect, useRef } from "react";
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
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotification, setExportNotification] = useState<{show: boolean, message: string}>({show: false, message: ''});
  const exportDropdownRef = useRef<HTMLDivElement>(null);
  const exportButtonRef = useRef<HTMLButtonElement>(null);
  const fetcher = useFetcher<AnalysisResult>();
  const isLoading = fetcher.state !== "idle";
  const hasData = fetcher.data && !('error' in fetcher.data) && fetcher.data.comments;
  const error = fetcher.data?.error || fetcher.data?.message;

  // Hide export notification after 3 seconds
  useEffect(() => {
    if (exportNotification.show) {
      const timer = setTimeout(() => {
        setExportNotification({show: false, message: ''});
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [exportNotification.show]);

  // Add click outside handler for export dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showExportDropdown &&
        exportDropdownRef.current &&
        exportButtonRef.current &&
        !exportDropdownRef.current.contains(event.target as Node) &&
        !exportButtonRef.current.contains(event.target as Node)
      ) {
        setShowExportDropdown(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showExportDropdown) {
        setShowExportDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showExportDropdown]);

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

  // Function to handle data export
  const handleExport = (format: 'csv' | 'json', dataType: 'all' | 'filtered') => {
    if (!fetcher.data?.comments) return;
    
    setIsExporting(true);
    
    try {
      // Get the data to export based on the selected option
      const dataToExport = dataType === 'filtered' ? getFilteredComments() : fetcher.data.comments;
      
      // Get app name from URL
      const appNameMatch = url.split('id=')[1]?.split('&')[0] || 'play-store-comments';
      const date = new Date().toISOString().split('T')[0];
      const fileName = `${appNameMatch}-${date}.${format}`;
      
      let content = '';
      
      if (format === 'json') {
        // For JSON export, include all data including sentiment analysis and categorization
        const exportData = {
          comments: dataToExport,
          sentiment: fetcher.data.sentiment,
          keywords: fetcher.data.keywords,
          intentions: fetcher.data.intentions ? {
            feature_request: dataType === 'filtered' && fetcher.data.intentions
              ? fetcher.data.intentions.feature_request.filter(comment => 
                  dataToExport.some(c => c.id === comment.id))
              : fetcher.data.intentions?.feature_request || [],
            bug_report: dataType === 'filtered' && fetcher.data.intentions
              ? fetcher.data.intentions.bug_report.filter(comment => 
                  dataToExport.some(c => c.id === comment.id))
              : fetcher.data.intentions?.bug_report || [],
            praise: dataType === 'filtered' && fetcher.data.intentions
              ? fetcher.data.intentions.praise.filter(comment => 
                  dataToExport.some(c => c.id === comment.id))
              : fetcher.data.intentions?.praise || [],
            complaint: dataType === 'filtered' && fetcher.data.intentions
              ? fetcher.data.intentions.complaint.filter(comment => 
                  dataToExport.some(c => c.id === comment.id))
              : fetcher.data.intentions?.complaint || []
          } : {}
        };
        
        content = JSON.stringify(exportData, null, 2);
      } else if (format === 'csv') {
        // For CSV export, create a header row and then add data rows
        const headers = ['ID', 'User Name', 'Content', 'Score', 'Thumbs Up', 'Date', 'Year', 'Sentiment', 'Category'];
        
        // Create a map of comment IDs to their categories
        const commentCategories = new Map();
        
        if (fetcher.data.intentions) {
          Object.entries(fetcher.data.intentions).forEach(([category, comments]) => {
            (comments as Comment[]).forEach(comment => {
              commentCategories.set(comment.id, category);
            });
          });
        }
        
        // Add header row
        content = headers.join(',') + '\n';
        
        // Add data rows
        dataToExport.forEach(comment => {
          const category = commentCategories.get(comment.id) || 'uncategorized';
          const row = [
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
          content += row.join(',') + '\n';
        });
      }
      
      // Create a blob and download the file
      const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/csv' });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
      
      setShowExportDropdown(false);
      setExportNotification({
        show: true, 
        message: `Export complete! ${fileName} has been downloaded.`
      });
    } catch (error) {
      console.error('Export error:', error);
      setExportNotification({
        show: true, 
        message: `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setIsExporting(false);
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
          {/* Export Notification Toast */}
          {exportNotification.show && (
            <div className="fixed top-4 right-4 z-50 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="flex items-center p-4">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {exportNotification.message}
                  </p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    onClick={() => setExportNotification({show: false, message: ''})}
                    className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

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
              
              {/* Export Button */}
              {hasData && (
                <div className="relative">
                  <button
                    ref={exportButtonRef}
                    onClick={() => setShowExportDropdown(!showExportDropdown)}
                    disabled={isExporting}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg inline-flex items-center"
                  >
                    {isExporting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Exporting...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 101.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Export
                      </>
                    )}
                  </button>
                  
                  {/* Export Dropdown */}
                  {showExportDropdown && (
                    <div 
                      ref={exportDropdownRef}
                      className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 font-medium border-b border-gray-200 dark:border-gray-700">
                          Export Format
                        </div>
                        <button
                          onClick={() => handleExport('csv', 'all')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          CSV - All Data
                        </button>
                        <button
                          onClick={() => handleExport('csv', 'filtered')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          CSV - Filtered Data
                        </button>
                        <button
                          onClick={() => handleExport('json', 'all')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          JSON - All Data
                        </button>
                        <button
                          onClick={() => handleExport('json', 'filtered')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          JSON - Filtered Data
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
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
