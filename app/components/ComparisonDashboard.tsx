import { useState, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';
import type { AnalysisResult } from '~/routes/_index';

interface CompetitorApp {
  url: string;
  name: string;
  icon?: string;
  data?: AnalysisResult;
  error?: string;
}

interface ComparisonData {
  metrics: {
    [key: string]: {
      mainApp: number;
      competitors: { [url: string]: number };
      percentageDiffs?: { [url: string]: number };
      significance?: { [url: string]: boolean };
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
  featureGaps?: {
    mainApp: {
      feature: string;
      presentIn: string[];
    }[];
    competitors: {
      [url: string]: {
        feature: string;
        presentIn: string[];
      }[];
    };
  };
}

export default function ComparisonDashboard() {
  const [mainApp, setMainApp] = useState<CompetitorApp>({ url: '', name: '' });
  const [competitors, setCompetitors] = useState<CompetitorApp[]>([
    { url: '', name: '' },
    { url: '', name: '' },
    { url: '', name: '' }
  ]);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('json');
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  
  const fetcher = useFetcher<ComparisonData>();

  // Update comparison data when fetcher data changes
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      setComparisonData(fetcher.data);
      setIsComparing(false);
    }
  }, [fetcher.state, fetcher.data]);

  const validatePlayStoreUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes('play.google.com');
    } catch {
      return false;
    }
  };

  const handleCompare = async () => {
    if (!validatePlayStoreUrl(mainApp.url)) {
      setMainApp(prev => ({ ...prev, error: 'Please enter a valid Play Store URL' }));
      return;
    }

    const validCompetitors = competitors.filter(comp => comp.url && validatePlayStoreUrl(comp.url));
    if (validCompetitors.length === 0) {
      setCompetitors(prev => prev.map(comp => 
        comp.url ? { ...comp, error: 'Please enter a valid Play Store URL' } : comp
      ));
      return;
    }

    setIsComparing(true);

    try {
      // Fetch data for main app and competitors
      const formData = new FormData();
      formData.append('mainAppUrl', mainApp.url);
      formData.append('competitorUrls', JSON.stringify(validCompetitors.map(c => c.url)));

      fetcher.submit(formData, {
        method: 'POST',
        action: '/api/compare',
      });
    } catch (error) {
      console.error('Comparison error:', error);
    }
  };

  const getAppNameFromUrl = (url: string): string => {
    try {
      const appId = url.split('id=')[1]?.split('&')[0];
      return appId || 'Unknown App';
    } catch {
      return 'Unknown App';
    }
  };

  const handleUrlChange = (url: string, index: number) => {
    if (index === -1) {
      // Main app
      setMainApp({
        url,
        name: getAppNameFromUrl(url),
        error: undefined
      });
    } else {
      // Competitor
      setCompetitors(prev => prev.map((comp, i) => 
        i === index ? {
          url,
          name: getAppNameFromUrl(url),
          error: undefined
        } : comp
      ));
    }
  };

  const handleExport = () => {
    if (!comparisonData) return;

    const data = {
      metrics: comparisonData.metrics,
      sharedKeywords: comparisonData.sharedKeywords,
      featureRequests: comparisonData.featureRequests,
      bugReports: comparisonData.bugReports,
      featureGaps: comparisonData.featureGaps
    };

    if (exportFormat === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'comparison-data.json';
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // Convert to CSV
      const csvRows = [
        ['Metric', mainApp.name, ...competitors.filter(c => c.url).map(c => c.name)],
        ...Object.entries(data.metrics).map(([metric, values]) => [
          metric,
          values.mainApp,
          ...Object.values(values.competitors)
        ])
      ];
      const csvContent = csvRows.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'comparison-data.csv';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your App
            </label>
            <div className="flex space-x-4">
              <input
                type="url"
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  mainApp.error 
                    ? 'border-red-300 dark:border-red-600' 
                    : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="https://play.google.com/store/apps/details?id=..."
                value={mainApp.url}
                onChange={(e) => handleUrlChange(e.target.value, -1)}
              />
            </div>
            {mainApp.error && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{mainApp.error}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Competitor Apps (up to 3)
            </label>
            <div className="space-y-3">
              {competitors.map((competitor, index) => (
                <div key={index} className="flex space-x-4">
                  <input
                    type="url"
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      competitor.error 
                        ? 'border-red-300 dark:border-red-600' 
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder={`Competitor ${index + 1} Play Store URL`}
                    value={competitor.url}
                    onChange={(e) => handleUrlChange(e.target.value, index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleCompare}
              disabled={isComparing || !mainApp.url}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg inline-flex items-center"
            >
              {isComparing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Comparing...
                </>
              ) : (
                'Compare Apps'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Results */}
      {comparisonData && (
        <div className="space-y-6">
          {/* App Headers */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center space-x-4">
              <img 
                src={mainApp.icon || `https://www.google.com/s2/favicons?domain=${mainApp.url}&sz=64`}
                alt={mainApp.name}
                className="w-16 h-16 rounded-lg"
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{mainApp.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Main App</p>
              </div>
            </div>
            {competitors.filter(c => c.url).map((competitor, index) => (
              <div key={competitor.url} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center space-x-4">
                <img 
                  src={competitor.icon || `https://www.google.com/s2/favicons?domain=${competitor.url}&sz=64`}
                  alt={competitor.name}
                  className="w-16 h-16 rounded-lg"
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{competitor.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Competitor {index + 1}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Metrics Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Key Metrics Comparison</h2>
              <div className="relative">
                <button
                  onClick={() => setShowExportDropdown(!showExportDropdown)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2"
                >
                  <span>Export</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showExportDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setExportFormat('json');
                          handleExport();
                          setShowExportDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Export as JSON
                      </button>
                      <button
                        onClick={() => {
                          setExportFormat('csv');
                          handleExport();
                          setShowExportDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Export as CSV
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={Object.entries(comparisonData.metrics).map(([metric, data]) => ({
                    name: metric,
                    mainApp: data.mainApp,
                    ...data.competitors,
                    ...Object.entries(data.competitors).reduce((acc, [url, value]) => ({
                      ...acc,
                      [`${url}_diff`]: ((value - data.mainApp) / data.mainApp * 100).toFixed(1) + '%'
                    }), {})
                  }))}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow">
                            <p className="font-medium">{label}</p>
                            {payload.map((entry, index) => {
                              const dataKey = entry.dataKey as string;
                              if (!dataKey || !dataKey.includes('_diff')) {
                                const diffKey = `${dataKey}_diff`;
                                const diff = payload.find(p => p.dataKey === diffKey);
                                return (
                                  <div key={index} className="text-sm">
                                    <span style={{ color: entry.color }}>{entry.name}: {entry.value}</span>
                                    {diff && dataKey !== 'mainApp' && label && (
                                      <span className="ml-2 text-xs">
                                        ({diff.value})
                                        {comparisonData?.metrics[label]?.significance?.[dataKey] && 
                                          <span className="ml-1 text-yellow-500">*</span>
                                        }
                                      </span>
                                    )}
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="mainApp" fill="#3B82F6" name={mainApp.name}>
                    {Object.entries(comparisonData.metrics).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#3B82F6" />
                    ))}
                  </Bar>
                  {competitors.filter(c => c.url).map((competitor, index) => (
                    <Bar 
                      key={competitor.url} 
                      dataKey={competitor.url} 
                      fill={['#10B981', '#8B5CF6', '#F97316'][index]}
                      name={competitor.name}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Shared Keyword Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Keyword Analysis</h2>
            
            {/* Common Keywords */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Common Keywords</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {comparisonData.sharedKeywords.map((keyword, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{keyword.word}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        keyword.sentiment.mainApp === 'positive' ? 'bg-green-100 text-green-800' :
                        keyword.sentiment.mainApp === 'negative' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {keyword.sentiment.mainApp}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{mainApp.name}</span>
                        <span>{keyword.mainApp}</span>
                      </div>
                      {Object.entries(keyword.competitors).map(([url, count]) => (
                        <div key={url} className="flex justify-between text-sm">
                          <span>{competitors.find(c => c.url === url)?.name}</span>
                          <span>{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unique Keywords */}
            <div>
              <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Unique Keywords</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">{mainApp.name}</h4>
                  <div className="space-y-1">
                    {comparisonData.uniqueKeywords.mainApp.map((keyword, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{keyword.word}</span>
                        <span>{keyword.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {Object.entries(comparisonData.uniqueKeywords.competitors).map(([url, keywords]) => (
                  <div key={url} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-medium mb-2">{competitors.find(c => c.url === url)?.name}</h4>
                    <div className="space-y-1">
                      {keywords.map((keyword, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{keyword.word}</span>
                          <span>{keyword.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Requests and Bug Reports */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Feature Requests */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Feature Requests</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">{mainApp.name}</h3>
                  <div className="space-y-2">
                    {comparisonData.featureRequests.mainApp.map((feature, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span>{feature.feature}</span>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
                          {feature.count} requests
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {Object.entries(comparisonData.featureRequests.competitors).map(([url, features]) => (
                  <div key={url}>
                    <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {competitors.find(c => c.url === url)?.name}
                    </h3>
                    <div className="space-y-2">
                      {features.map((feature, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <span>{feature.feature}</span>
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
                            {feature.count} requests
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bug Reports */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bug Reports</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">{mainApp.name}</h3>
                  <div className="space-y-2">
                    {comparisonData.bugReports.mainApp.map((bug, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span>{bug.bug}</span>
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-sm">
                          {bug.count} reports
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {Object.entries(comparisonData.bugReports.competitors).map(([url, bugs]) => (
                  <div key={url}>
                    <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {competitors.find(c => c.url === url)?.name}
                    </h3>
                    <div className="space-y-2">
                      {bugs.map((bug, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <span>{bug.bug}</span>
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-sm">
                            {bug.count} reports
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Gaps Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Feature Gaps Analysis</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Features Missing in {mainApp.name}
                </h3>
                <div className="space-y-2">
                  {comparisonData.featureGaps?.mainApp.map((gap, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{gap.feature}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Present in {gap.presentIn.length} competitor{gap.presentIn.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {gap.presentIn.map((appUrl) => (
                          <span key={appUrl} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
                            {competitors.find(c => c.url === appUrl)?.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {Object.entries(comparisonData.featureGaps?.competitors || {}).map(([url, gaps]) => (
                <div key={url}>
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Features Missing in {competitors.find(c => c.url === url)?.name}
                  </h3>
                  <div className="space-y-2">
                    {gaps.map((gap, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{gap.feature}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Present in {gap.presentIn.length} app{gap.presentIn.length > 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {gap.presentIn.map((appUrl) => (
                            <span key={appUrl} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
                              {appUrl === mainApp.url ? mainApp.name : competitors.find(c => c.url === appUrl)?.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 