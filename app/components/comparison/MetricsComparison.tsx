import { useMemo } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
  LineChart, Line
} from "recharts";
import { Card, Button } from "flowbite-react";
import { XMarkIcon, StarIcon } from "@heroicons/react/24/solid";
import type { AppData } from "./ComparisonDashboard";
import SentimentDistributionCard from "./SentimentDistributionCard";

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
        averageRating: ((app.metrics.averageRating - primaryApp.metrics.averageRating) / primaryApp.metrics.averageRating) * 100,
        totalReviews: ((app.metrics.totalReviews - primaryApp.metrics.totalReviews) / primaryApp.metrics.totalReviews) * 100,
        sentimentPositive: ((app.sentiments.positive - primaryApp.sentiments.positive) / primaryApp.sentiments.positive) * 100,
        sentimentNeutral: ((app.sentiments.neutral - primaryApp.sentiments.neutral) / primaryApp.sentiments.neutral) * 100,
        sentimentNegative: ((app.sentiments.negative - primaryApp.sentiments.negative) / primaryApp.sentiments.negative) * 100
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
    
    return isGood ? 'text-green-600' : 'text-red-600';
  };

  // Prepare data for charts
  const chartData = useMemo(() => {
    return {
      ratings: apps.map(app => ({
        name: app.name,
        rating: app.metrics.averageRating,
        color: app.id === primaryApp.id ? '#3B82F6' : '#10B981',
        diff: app.id === primaryApp.id ? 0 : ((app.metrics.averageRating - primaryApp.metrics.averageRating) / primaryApp.metrics.averageRating) * 100
      })),
      reviews: apps.map(app => ({
        name: app.name,
        reviews: app.metrics.totalReviews,
        color: app.id === primaryApp.id ? '#3B82F6' : '#10B981',
        diff: app.id === primaryApp.id ? 0 : ((app.metrics.totalReviews - primaryApp.metrics.totalReviews) / primaryApp.metrics.totalReviews) * 100
      }))
    };
  }, [apps, primaryApp]);

  const appColors = useMemo(() => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
    return apps.reduce((acc, app, index) => {
      acc[app.id] = colors[index % colors.length];
      return acc;
    }, {} as { [key: string]: string });
  }, [apps]);

  return (
    <Card>
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Metrics Comparison
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Compare key metrics between apps
        </p>
      </div>

      {/* App Headers with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {apps.map((app, index) => (
          <Card key={app.id} className={index === 0 ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-gray-50 dark:bg-gray-700/30'}>
            <div className="flex flex-col items-center">
              <div className="relative">
                <img 
                  src={app.icon} 
                  alt={`${app.name} icon`}
                  className="w-16 h-16 rounded-lg shadow-sm" 
                />
                {index > 0 && (
                  <Button
                    onClick={() => onRemoveApp(app.id)}
                    className="absolute -top-2 -right-2 !p-1"
                    color="failure"
                    pill
                    size="xs"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </Button>
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
          </Card>
        ))}
      </div>

      {/* Ratings Chart */}
      <Card className="mt-6">
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
      </Card>

      {/* Reviews Chart */}
      <Card className="mt-6">
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
      </Card>

      {/* Sentiment Distribution */}
      <SentimentDistributionCard apps={apps} percentageDiffs={percentageDiffs} />
    </Card>
  );
}