import { Card, Progress } from "flowbite-react";
import type { AppData } from "./ComparisonDashboard";

interface SentimentDistributionCardProps {
  apps: AppData[];
  percentageDiffs: Array<{
    sentimentPositive: number;
    sentimentNeutral: number;
    sentimentNegative: number;
  } | null>;
}

const formatDiff = (diff: number | null | undefined) => {
  if (diff === null || diff === undefined) return '';
  return `${diff > 0 ? '+' : ''}${diff.toFixed(1)}%`;
};

const getDiffColorClass = (diff: number | null | undefined, isNegativeGood = false) => {
  if (diff === null || diff === undefined) return '';
  
  const isPositive = diff > 0;
  const isGood = isNegativeGood ? !isPositive : isPositive;
  
  return isGood ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
};

export default function SentimentDistributionCard({ apps, percentageDiffs }: SentimentDistributionCardProps) {
  return (
    <Card className="mt-6">
      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Sentiment Distribution</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {apps.map((app, index) => (
          <Card key={`sentiment-${app.id}`} className="bg-gray-50 dark:bg-gray-700">
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
                    <span className="text-gray-700 dark:text-gray-300">{app.metrics.sentimentDistribution.positive}%</span>
                    {index > 0 && (
                      <span className={`ml-1 text-xs ${getDiffColorClass(percentageDiffs[index]?.sentimentPositive)}`}>
                        ({formatDiff(percentageDiffs[index]?.sentimentPositive)})
                      </span>
                    )}
                  </div>
                </div>
                <Progress
                  progress={app.metrics.sentimentDistribution.positive}
                  color="success"
                  size="sm"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300">Neutral</span>
                  <div className="flex items-center">
                    <span className="text-gray-700 dark:text-gray-300">{app.metrics.sentimentDistribution.neutral}%</span>
                    {index > 0 && (
                      <span className={`ml-1 text-xs ${getDiffColorClass(percentageDiffs[index]?.sentimentNeutral)}`}>
                        ({formatDiff(percentageDiffs[index]?.sentimentNeutral)})
                      </span>
                    )}
                  </div>
                </div>
                <Progress
                  progress={app.metrics.sentimentDistribution.neutral}
                  color="warning"
                  size="sm"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300">Negative</span>
                  <div className="flex items-center">
                    <span className="text-gray-700 dark:text-gray-300">{app.metrics.sentimentDistribution.negative}%</span>
                    {index > 0 && (
                      <span className={`ml-1 text-xs ${getDiffColorClass(percentageDiffs[index]?.sentimentNegative, true)}`}>
                        ({formatDiff(percentageDiffs[index]?.sentimentNegative)})
                      </span>
                    )}
                  </div>
                </div>
                <Progress
                  progress={app.metrics.sentimentDistribution.negative}
                  color="failure"
                  size="sm"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
} 