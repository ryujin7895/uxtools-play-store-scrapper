import { type MetaFunction } from "@remix-run/node";
import { useState, useEffect, useRef, useMemo } from "react";
import { useFetcher, Link, useLocation } from "@remix-run/react";
import natural from "natural";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine, ReferenceArea, Brush
} from "recharts";
import { format, parseISO, startOfDay, startOfWeek, startOfMonth, startOfQuarter, isSameDay, isSameWeek, isSameMonth, isSameQuarter } from "date-fns";
import ComparisonDashboard from "~/components/ComparisonDashboard";
import Sidebar from "~/components/common/Sidebar";
import { Label, TextInput, Select, Button } from "flowbite-react";

export interface Comment {
  id: string;
  userName: string;
  content: string;
  score: number;
  thumbsUp: number;
  date: string;
  year: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface AnalysisResult {
  comments: Comment[];
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
  };
  keywords: { word: string; count: number }[];
  intentions: {
    feature_request: Comment[];
    bug_report: Comment[];
    praise: Comment[];
    complaint: Comment[];
  };
  error?: string;
  message?: string;
}

interface TrendDataPoint {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
  total: number;
  featureRequests: number;
  bugReports: number;
}

interface AppRelease {
  date: string;
  version: string;
  notes?: string;
}

interface TrendTimeframe {
  label: string;
  value: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  groupingFn: (date: Date) => Date;
  formatFn: (date: Date) => string;
  isSamePeriodFn: (date1: Date, date2: Date) => boolean;
}

// InsightItem component for displaying trend insights
interface InsightItemProps {
  change: {
    period: string;
    metric: 'positive' | 'negative' | 'total' | 'featureRequests' | 'bugReports';
    change: number;
    isIncrease: boolean;
  };
  appReleases: AppRelease[];
}

function InsightItem({ change, appReleases }: InsightItemProps) {
  const getMetricLabel = (metric: 'positive' | 'negative' | 'total' | 'featureRequests' | 'bugReports') => {
    switch (metric) {
      case 'positive': return 'positive sentiment';
      case 'negative': return 'negative sentiment';
      case 'total': return 'comment volume';
      case 'featureRequests': return 'feature requests';
      case 'bugReports': return 'bug reports';
    }
  };
  
  const changeText = change.isIncrease ? 'increase' : 'decrease';
  const changeValue = Math.abs(change.change);
  const formattedChange = change.metric === 'positive' || change.metric === 'negative'
    ? `${(changeValue * 100).toFixed(1)}%`
    : `${(changeValue * 100).toFixed(1)}%`;
  
  const isNearRelease = appReleases.some(release => {
    const releaseDate = new Date(release.date);
    const periodDate = new Date(change.period);
    const diffTime = Math.abs(periodDate.getTime() - releaseDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 14; // Within 2 weeks
  });
  
  return (
    <div className="flex items-start space-x-2">
      <div className={`flex-shrink-0 w-4 h-4 mt-0.5 rounded-full ${
        change.isIncrease 
          ? (change.metric === 'negative' || change.metric === 'bugReports' ? 'bg-red-500' : 'bg-green-500')
          : (change.metric === 'negative' || change.metric === 'bugReports' ? 'bg-green-500' : 'bg-red-500')
      }`} />
      <p className="text-sm text-gray-600 dark:text-gray-300">
        <span className="font-medium">{formattedChange} {changeText}</span> in {getMetricLabel(change.metric)} during {change.period}.
        {isNearRelease && (
          <span className="ml-1 text-blue-600 dark:text-blue-400">
            May be related to recent app update.
          </span>
        )}
      </p>
    </div>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Play Store Comment Analyzer" },
    { name: "description", content: "Analyze Play Store comments with ease" },
  ];
};

export default function Index() {
  const location = useLocation();
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
  
  // Trend analysis state
  const [timeGranularity, setTimeGranularity] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly'>('weekly');
  const [dateRange, setDateRange] = useState<{start: string | null, end: string | null}>({start: null, end: null});
  const [showAllTime, setShowAllTime] = useState(true);
  const [visibleMetrics, setVisibleMetrics] = useState({
    positive: true,
    negative: true,
    neutral: true,
    total: true,
    featureRequests: true,
    bugReports: true
  });
  const [appReleases, setAppReleases] = useState<AppRelease[]>([
    // Example releases - in a real app, these would be fetched from an API
    { date: '2023-12-15', version: '2.1.0', notes: 'Major UI redesign' },
    { date: '2024-01-30', version: '2.2.0', notes: 'New features added' },
    { date: '2024-03-10', version: '2.3.0', notes: 'Bug fixes and performance improvements' }
  ]);
  
  const exportDropdownRef = useRef<HTMLDivElement>(null);
  const exportButtonRef = useRef<HTMLButtonElement>(null);
  const fetcher = useFetcher<AnalysisResult>();
  const isLoading = fetcher.state !== "idle";
  const hasData = fetcher.data && !('error' in fetcher.data) && fetcher.data.comments;
  const error = fetcher.data?.error || fetcher.data?.message;

  // Time granularity options
  const timeframeOptions: TrendTimeframe[] = useMemo(() => [
    { 
      label: 'Daily', 
      value: 'daily', 
      groupingFn: startOfDay,
      formatFn: (date) => format(date, 'MMM d, yyyy'),
      isSamePeriodFn: isSameDay
    },
    { 
      label: 'Weekly', 
      value: 'weekly', 
      groupingFn: startOfWeek,
      formatFn: (date) => `Week of ${format(date, 'MMM d, yyyy')}`,
      isSamePeriodFn: isSameWeek
    },
    { 
      label: 'Monthly', 
      value: 'monthly', 
      groupingFn: startOfMonth,
      formatFn: (date) => format(date, 'MMMM yyyy'),
      isSamePeriodFn: isSameMonth
    },
    { 
      label: 'Quarterly', 
      value: 'quarterly', 
      groupingFn: startOfQuarter,
      formatFn: (date) => `Q${Math.floor(date.getMonth() / 3) + 1} ${date.getFullYear()}`,
      isSamePeriodFn: isSameQuarter
    }
  ], []);

  // Get current timeframe settings
  const currentTimeframe = useMemo(() => 
    timeframeOptions.find(t => t.value === timeGranularity) || timeframeOptions[1], 
    [timeGranularity, timeframeOptions]
  );

  // Process comments data for trend analysis
  const trendData = useMemo(() => {
    if (!hasData || !fetcher.data?.comments) return [];
    
    const comments = fetcher.data.comments;
    const intentions = fetcher.data.intentions;
    
    // Group comments by time period
    const groupedData = new Map<string, TrendDataPoint>();
    
    comments.forEach(comment => {
      const commentDate = parseISO(comment.date);
      const periodStart = currentTimeframe.groupingFn(commentDate);
      const periodKey = format(periodStart, 'yyyy-MM-dd');
      
      if (!groupedData.has(periodKey)) {
        groupedData.set(periodKey, {
          date: currentTimeframe.formatFn(periodStart),
          positive: 0,
          negative: 0,
          neutral: 0,
          total: 0,
          featureRequests: 0,
          bugReports: 0
        });
      }
      
      const dataPoint = groupedData.get(periodKey)!;
      dataPoint.total += 1;
      
      // Count by sentiment
      if (comment.sentiment === 'positive') dataPoint.positive += 1;
      else if (comment.sentiment === 'negative') dataPoint.negative += 1;
      else dataPoint.neutral += 1;
      
      // Count intentions
      if (intentions?.feature_request.some(c => c.id === comment.id)) {
        dataPoint.featureRequests += 1;
      }
      if (intentions?.bug_report.some(c => c.id === comment.id)) {
        dataPoint.bugReports += 1;
      }
    });
    
    // Convert to array and sort by date
    return Array.from(groupedData.entries())
      .map(([key, value]) => ({
        ...value,
        rawDate: key // Keep the raw date for sorting
      }))
      .sort((a, b) => a.rawDate.localeCompare(b.rawDate))
      .map(({ rawDate, ...rest }) => rest); // Remove the rawDate property
  }, [hasData, fetcher.data, currentTimeframe]);

  // Detect significant changes in the trend data
  const significantChanges = useMemo(() => {
    if (trendData.length < 2) return [];
    
    const changes: Array<{
      period: string;
      metric: 'positive' | 'negative' | 'total' | 'featureRequests' | 'bugReports';
      change: number;
      isIncrease: boolean;
    }> = [];
    const thresholds = {
      positive: 0.2, // 20% change
      negative: 0.2,
      total: 0.3,     // 30% change in volume
      featureRequests: 0.5, // 50% change
      bugReports: 0.5
    };
    
    for (let i = 1; i < trendData.length; i++) {
      const current = trendData[i];
      const previous = trendData[i-1];
      
      // Skip periods with very low numbers to avoid false positives
      if (previous.total < 5) continue;
      
      const metrics = ['positive', 'negative', 'total', 'featureRequests', 'bugReports'] as const;
      
      for (const metric of metrics) {
        // For sentiment metrics, calculate the percentage change
        if (metric === 'positive' || metric === 'negative') {
          const currentPct = current[metric] / current.total;
          const previousPct = previous[metric] / previous.total;
          
          if (Math.abs(currentPct - previousPct) >= thresholds[metric]) {
            changes.push({
              period: current.date,
              metric,
              change: currentPct - previousPct,
              isIncrease: currentPct > previousPct
            });
          }
        } 
        // For count metrics, calculate the relative change
        else {
          if (previous[metric] === 0) continue; // Avoid division by zero
          
          const relativeChange = (current[metric] - previous[metric]) / previous[metric];
          
          if (Math.abs(relativeChange) >= thresholds[metric]) {
            changes.push({
              period: current.date,
              metric,
              change: relativeChange,
              isIncrease: relativeChange > 0
            });
          }
        }
      }
    }
    
    return changes;
  }, [trendData]);
  
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
      <Sidebar />
      <main className="p-4 sm:ml-64">
        <div className="container mx-auto px-4 py-4 mt-14">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Overview
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Analyze app reviews and get insights
              </p>
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

          {/* Content based on active tab */}
          {location.pathname === '/' ? (
            <>
              {/* URL Input Form */}
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="col-span-2">
                    <Label htmlFor="playstore-url" className="mb-2">
                      Play Store URL
                    </Label>
                    <TextInput
                      id="playstore-url"
                      type="url"
                      placeholder="https://play.google.com/store/apps/details?id=..."
                      required
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      color="gray"
                      helperText="Enter your app's Play Store URL to analyze comments"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year" className="mb-2">
                      Filter by Year
                    </Label>
                    <Select
                      id="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value="all">All Years</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                    </Select>
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    color="blue"
                    className="h-[42px]"
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
                  </Button>
                </div>
              </form>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200 p-4 rounded-lg mb-8">
                  <div className="flex">
                    <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
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

                  {/* Trend Analysis Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Trend Analysis</h2>
                      <div className="flex items-center space-x-4">
                        {/* Time Granularity Dropdown */}
                        <div>
                          <select
                            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                            value={timeGranularity}
                            onChange={(e) => setTimeGranularity(e.target.value as any)}
                          >
                            {timeframeOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Date Range Controls */}
                        <div className="flex items-center space-x-2">
                          <input
                            type="date"
                            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                            value={dateRange.start || ''}
                            onChange={(e) => {
                              setDateRange(prev => ({ ...prev, start: e.target.value }));
                              setShowAllTime(false);
                            }}
                            disabled={showAllTime}
                          />
                          <span className="text-gray-500 dark:text-gray-400">to</span>
                          <input
                            type="date"
                            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                            value={dateRange.end || ''}
                            onChange={(e) => {
                              setDateRange(prev => ({ ...prev, end: e.target.value }));
                              setShowAllTime(false);
                            }}
                            disabled={showAllTime}
                          />
                          <button
                            className={`px-3 py-2 rounded-lg text-sm ${
                              showAllTime 
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                            }`}
                            onClick={() => setShowAllTime(!showAllTime)}
                          >
                            All Time
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Metrics Toggle */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <button
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          visibleMetrics.positive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                        onClick={() => setVisibleMetrics(prev => ({ ...prev, positive: !prev.positive }))}
                      >
                        Positive Sentiment
                      </button>
                      <button
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          visibleMetrics.negative 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                        onClick={() => setVisibleMetrics(prev => ({ ...prev, negative: !prev.negative }))}
                      >
                        Negative Sentiment
                      </button>
                      <button
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          visibleMetrics.neutral 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                        onClick={() => setVisibleMetrics(prev => ({ ...prev, neutral: !prev.neutral }))}
                      >
                        Neutral Sentiment
                      </button>
                      <button
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          visibleMetrics.total 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                        onClick={() => setVisibleMetrics(prev => ({ ...prev, total: !prev.total }))}
                      >
                        Total Comments
                      </button>
                      <button
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          visibleMetrics.featureRequests 
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                        onClick={() => setVisibleMetrics(prev => ({ ...prev, featureRequests: !prev.featureRequests }))}
                      >
                        Feature Requests
                      </button>
                      <button
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          visibleMetrics.bugReports 
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' 
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                        onClick={() => setVisibleMetrics(prev => ({ ...prev, bugReports: !prev.bugReports }))}
                      >
                        Bug Reports
                      </button>
                    </div>
                    
                    {/* Chart */}
                    <div className="h-80 mt-6">
                      {trendData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={trendData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                            <XAxis 
                              dataKey="date" 
                              stroke="#6B7280"
                              tick={{ fill: '#6B7280' }}
                            />
                            <YAxis 
                              stroke="#6B7280"
                              tick={{ fill: '#6B7280' }}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderColor: '#E5E7EB',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                              }}
                              formatter={(value, name) => {
                                const formattedName = {
                                  positive: 'Positive Sentiment',
                                  negative: 'Negative Sentiment',
                                  neutral: 'Neutral Sentiment',
                                  total: 'Total Comments',
                                  featureRequests: 'Feature Requests',
                                  bugReports: 'Bug Reports'
                                }[name] || name;
                                
                                return [value, formattedName];
                              }}
                              labelFormatter={(label) => `Period: ${label}`}
                            />
                            <Legend 
                              formatter={(value: string) => {
                                const formattedValues: Record<string, string> = {
                                  positive: 'Positive Sentiment',
                                  negative: 'Negative Sentiment',
                                  neutral: 'Neutral Sentiment',
                                  total: 'Total Comments',
                                  featureRequests: 'Feature Requests',
                                  bugReports: 'Bug Reports'
                                };
                                
                                return <span style={{ color: '#6B7280' }}>{formattedValues[value] || value}</span>;
                              }}
                            />
                            <Brush 
                              dataKey="date" 
                              height={30} 
                              stroke="#8884d8"
                              fill="rgba(136, 132, 216, 0.1)"
                            />
                            
                            {/* App Release Reference Lines */}
                            {appReleases.map((release, index) => {
                              // Find the closest data point to this release date
                              const releaseDate = parseISO(release.date);
                              let closestPoint = null;
                              let minDiff = Infinity;
                              
                              for (const point of trendData) {
                                // This is a simplification - in a real app, you'd parse the date properly
                                const pointDate = new Date(point.date);
                                const diff = Math.abs(pointDate.getTime() - releaseDate.getTime());
                                
                                if (diff < minDiff) {
                                  minDiff = diff;
                                  closestPoint = point;
                                }
                              }
                              
                              if (!closestPoint) return null;
                              
                              return (
                                <ReferenceLine
                                  key={index}
                                  x={closestPoint.date}
                                  stroke="#10B981"
                                  strokeDasharray="3 3"
                                  label={{
                                    value: `v${release.version}`,
                                    position: 'insideTopRight',
                                    fill: '#10B981',
                                    fontSize: 12
                                  }}
                                />
                              );
                            })}
                            
                            {/* Significant Changes Highlights */}
                            {significantChanges.map((change, index) => {
                              // Find the data point for this period
                              const point = trendData.find(p => p.date === change.period);
                              if (!point) return null;
                              
                              // Determine color based on metric and direction
                              let color;
                              if (change.metric === 'positive') {
                                color = change.isIncrease ? '#10B981' : '#EF4444';
                              } else if (change.metric === 'negative') {
                                color = change.isIncrease ? '#EF4444' : '#10B981';
                              } else if (change.metric === 'total') {
                                color = '#3B82F6';
                              } else if (change.metric === 'featureRequests') {
                                color = '#8B5CF6';
                              } else if (change.metric === 'bugReports') {
                                color = '#F97316';
                              }
                              
                              return (
                                <ReferenceArea
                                  key={`${change.period}-${change.metric}-${index}`}
                                  x1={point.date}
                                  x2={point.date}
                                  strokeOpacity={0.3}
                                  fill={color}
                                  fillOpacity={0.2}
                                />
                              );
                            })}
                            
                            {/* Chart Lines */}
                            {visibleMetrics.positive && (
                              <Line
                                type="monotone"
                                dataKey="positive"
                                stroke="#10B981"
                                strokeWidth={2}
                                dot={{ r: 4, fill: '#10B981' }}
                                activeDot={{ r: 6, fill: '#10B981' }}
                              />
                            )}
                            {visibleMetrics.negative && (
                              <Line
                                type="monotone"
                                dataKey="negative"
                                stroke="#EF4444"
                                strokeWidth={2}
                                dot={{ r: 4, fill: '#EF4444' }}
                                activeDot={{ r: 6, fill: '#EF4444' }}
                              />
                            )}
                            {visibleMetrics.neutral && (
                              <Line
                                type="monotone"
                                dataKey="neutral"
                                stroke="#F59E0B"
                                strokeWidth={2}
                                dot={{ r: 4, fill: '#F59E0B' }}
                                activeDot={{ r: 6, fill: '#F59E0B' }}
                              />
                            )}
                            {visibleMetrics.total && (
                              <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#3B82F6"
                                strokeWidth={2}
                                dot={{ r: 4, fill: '#3B82F6' }}
                                activeDot={{ r: 6, fill: '#3B82F6' }}
                              />
                            )}
                            {visibleMetrics.featureRequests && (
                              <Line
                                type="monotone"
                                dataKey="featureRequests"
                                stroke="#8B5CF6"
                                strokeWidth={2}
                                dot={{ r: 4, fill: '#8B5CF6' }}
                                activeDot={{ r: 6, fill: '#8B5CF6' }}
                              />
                            )}
                            {visibleMetrics.bugReports && (
                              <Line
                                type="monotone"
                                dataKey="bugReports"
                                stroke="#F97316"
                                strokeWidth={2}
                                dot={{ r: 4, fill: '#F97316' }}
                                activeDot={{ r: 6, fill: '#F97316' }}
                              />
                            )}
                          </LineChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <p className="text-gray-500 dark:text-gray-400">
                            {hasData 
                              ? "Not enough data to display trends. Try analyzing more comments."
                              : "Analyze comments to see trend data."}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Insights Panel */}
                    {trendData.length > 0 && (
                      <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Key Insights
                        </h3>
                        <div className="space-y-2">
                          {significantChanges.length > 0 ? (
                            significantChanges.slice(0, 3).map((change, index) => (
                              <InsightItem key={index} change={change} appReleases={appReleases} />
                            ))
                          ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              No significant changes detected in the current time period.
                            </p>
                          )}
                        </div>
                      </div>
                    )}
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
            </>
          ) : location.pathname === '/history' ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <p className="text-gray-600 dark:text-gray-400">History feature coming soon...</p>
            </div>
          ) : null}
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
