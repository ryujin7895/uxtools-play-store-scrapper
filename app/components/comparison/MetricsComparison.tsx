import { useMemo } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
  LineChart, Line
} from "recharts";
import type { AppData } from "./ComparisonDashboard";

interface MetricsComparisonProps {
  apps: AppData[];
  onRemoveApp: (appId: string) => void;
}

export default function MetricsComparison({ apps, onRemoveApp }: MetricsComparisonProps) {
  const primaryApp = apps[0];
  
  // Calculate percentage differences from the primary app
  const percentageDiffs = useMemo(() => {
    return apps.map(app => {
      if (app.id === primaryApp.id) return null;
      
      return {
        averageRating: ((app.averageRating - primaryApp.averageRating) / primaryApp.averageRating) * 100,
        totalReviews: ((app.totalReviews - primaryApp.totalReviews) / primaryApp.totalReviews) * 100,
        sentimentPositive: ((app.sentimentDistribution.positive - primaryApp.sentimentDistribution.positive) / primaryApp.sentimentDistribution.positive) * 100,
        sentimentNeutral: ((app.sentimentDistribution.neutral - primaryApp.sentimentDistribution.neutral) / primaryApp.sentimentDistribution.neutral) * 100,
        sentimentNegative: ((app.sentimentDistribution.negative - primaryApp.sentimentDistribution.negative) / primaryApp.sentimentDistribution.negative) * 100,
        commentVolume: ((app.commentVolume.total - primaryApp.commentVolume.total) / primaryApp.commentVolume.total) * 100,
      };
    });
  }, [apps, primaryApp]);

  // Format percentage difference with + or - sign
  const formatDiff = (diff: number | null | undefined) => {
    if (diff === null || diff === undefined) return '';
    return `${diff > 0 ? '+' : ''}${diff.toFixed(1)}%`;
  };

  // Determine color class based on diff value and metric type
  const getDiffColorClass = (diff: number | null | undefined, isNegativeGood = false) => {
    if (diff === null || diff === undefined) return '';
    
    const isPositive = diff > 0;
    const isGood = isNegativeGood ? !isPositive : isPositive;
    
    return isGood ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  // Prepare data for charts
  const chartData = useMemo(() => {
    return {
      ratings: apps.map(app => ({
        name: app.name,
        rating: app.averageRating,
        color: app.id === primaryApp.id ? '#3B82F6' : '#10B981',
        diff: app.id === primaryApp.id ? 0 : ((app.averageRating - primaryApp.averageRating) / primaryApp.averageRating) * 100
      })),
      reviews: apps.map(app => ({
        name: app.name,
        reviews: app.totalReviews,
        color: app.id === primaryApp.id ? '#3B82F6' : '#10B981',
        diff: app.id === primaryApp.id ? 0 : ((app.totalReviews - primaryApp.totalReviews) / primaryApp.totalReviews) * 100
      }))
    };
  }, [apps, primaryApp]);

  // Prepare monthly comment volume data
  const commentTrendData = useMemo(() => {
    return primaryApp.commentVolume.months.map((month, i) => {
      const dataPoint: { name: string, [key: string]: any } = { name: month };
      
      apps.forEach(app => {
        dataPoint[app.id] = app.commentVolume.perMonth[i] || 0;
      });
      
      return dataPoint;
    });
  }, [apps, primaryApp]);

  const appColors = useMemo(() => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
    return apps.reduce((acc, app, index) => {
      acc[app.id] = colors[index % colors.length];
      return acc;
    }, {} as { [key: string]: string });
  }, [apps]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Metrics Comparison
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Compare key metrics between apps
        </p>
      </div>

      {/* App Headers with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {apps.map((app, index) => (
          <div key={app.id} className={`p-4 rounded-lg ${
            index === 0 ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-gray-50 dark:bg-gray-700/30'
          }`}>
            <div className="flex flex-col items-center">
              <div className="relative">
                <img 
                  src={app.icon} 
                  alt={`${app.name} icon`}
                  className="w-16 h-16 rounded-lg shadow-sm" 
                />
                {index > 0 && (
                  <button
                    onClick={() => onRemoveApp(app.id)}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 shadow"
                    aria-label="Remove app"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <h3 className="mt-3 font-medium text-center text-gray-800 dark:text-white truncate max-w-full">
                {app.name}
              </h3>
              {index === 0 && (
                <span className="mt-1 inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
                  Your App
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Ratings Chart */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Average Rating</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData.ratings}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'rating') {
                    return [`${value} ★`, 'Rating'];
                  }
                  return [value, name];
                }}
                labelFormatter={(name) => `App: ${name}`}
              />
              <Legend />
              <Bar dataKey="rating" name="Rating" radius={[4, 4, 0, 0]}>
                {chartData.ratings.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Rating Comparison Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  App
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Difference
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {chartData.ratings.map((app, index) => (
                <tr key={`rating-${app.name}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {app.name} {index === 0 && <span className="ml-2 text-xs text-blue-600">(Your App)</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {app.rating.toFixed(1)} ★
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {index === 0 ? (
                      <span className="text-gray-400">-</span>
                    ) : (
                      <span className={getDiffColorClass(app.diff)}>
                        {formatDiff(app.diff)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reviews Chart */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Total Reviews</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData.reviews}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [value.toLocaleString(), 'Reviews']}
                labelFormatter={(name) => `App: ${name}`}
              />
              <Legend />
              <Bar dataKey="reviews" name="Reviews" radius={[4, 4, 0, 0]}>
                {chartData.reviews.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Reviews Comparison Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  App
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Reviews
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Difference
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {chartData.reviews.map((app, index) => (
                <tr key={`reviews-${app.name}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {app.name} {index === 0 && <span className="ml-2 text-xs text-blue-600">(Your App)</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {app.reviews.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {index === 0 ? (
                      <span className="text-gray-400">-</span>
                    ) : (
                      <span className={getDiffColorClass(app.diff)}>
                        {formatDiff(app.diff)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sentiment Distribution */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Sentiment Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {apps.map((app, index) => (
            <div key={`sentiment-${app.id}`} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-800 dark:text-white">
                  {app.name}
                </h4>
                {index === 0 && (
                  <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
                    Your App
                  </span>
                )}
              </div>
              
              {/* Sentiment Bars */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300">Positive</span>
                    <div className="flex items-center">
                      <span className="text-gray-700 dark:text-gray-300">{app.sentimentDistribution.positive}%</span>
                      {index > 0 && (
                        <span className={`ml-1 text-xs ${getDiffColorClass(percentageDiffs[index]?.sentimentPositive)}`}>
                          ({formatDiff(percentageDiffs[index]?.sentimentPositive)})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${app.sentimentDistribution.positive}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300">Neutral</span>
                    <div className="flex items-center">
                      <span className="text-gray-700 dark:text-gray-300">{app.sentimentDistribution.neutral}%</span>
                      {index > 0 && (
                        <span className={`ml-1 text-xs ${getDiffColorClass(percentageDiffs[index]?.sentimentNeutral)}`}>
                          ({formatDiff(percentageDiffs[index]?.sentimentNeutral)})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${app.sentimentDistribution.neutral}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300">Negative</span>
                    <div className="flex items-center">
                      <span className="text-gray-700 dark:text-gray-300">{app.sentimentDistribution.negative}%</span>
                      {index > 0 && (
                        <span className={`ml-1 text-xs ${getDiffColorClass(percentageDiffs[index]?.sentimentNegative, true)}`}>
                          ({formatDiff(percentageDiffs[index]?.sentimentNegative)})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${app.sentimentDistribution.negative}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Volume Trends */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Comment Volume Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={commentTrendData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {apps.map((app, index) => (
                <Line
                  key={app.id}
                  type="monotone"
                  dataKey={app.id}
                  name={app.name}
                  stroke={appColors[app.id]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Comment Volume Comparison */}
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  App
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Comments
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Avg. Comments/Month
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Difference (Total)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {apps.map((app, index) => {
                const avgPerMonth = Math.round(app.commentVolume.perMonth.reduce((a, b) => a + b, 0) / app.commentVolume.perMonth.length);
                
                return (
                  <tr key={`volume-${app.id}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {app.name} {index === 0 && <span className="ml-2 text-xs text-blue-600">(Your App)</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {app.commentVolume.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {avgPerMonth.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {index === 0 ? (
                        <span className="text-gray-400">-</span>
                      ) : (
                        <span className={getDiffColorClass(percentageDiffs[index]?.commentVolume)}>
                          {formatDiff(percentageDiffs[index]?.commentVolume)}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}