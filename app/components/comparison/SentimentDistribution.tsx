import { Card, Progress } from "flowbite-react";
import { AppData } from './ComparisonDashboard';

interface SentimentDistributionProps {
  apps: AppData[];
}

export default function SentimentDistribution({ apps }: SentimentDistributionProps) {
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sentiment Distribution
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Distribution of positive, neutral, and negative sentiments
          </p>
        </div>

        <div className="space-y-6">
          {apps.map((app) => {
            const total = app.metrics.sentimentDistribution.positive +
              app.metrics.sentimentDistribution.neutral +
              app.metrics.sentimentDistribution.negative;

            const positivePercentage = (app.metrics.sentimentDistribution.positive / total) * 100;
            const neutralPercentage = (app.metrics.sentimentDistribution.neutral / total) * 100;
            const negativePercentage = (app.metrics.sentimentDistribution.negative / total) * 100;

            return (
              <div key={app.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <img
                    src={app.icon}
                    alt={`${app.name} icon`}
                    className="w-6 h-6 rounded"
                  />
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {app.name}
                  </h4>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 dark:text-green-400">
                      Positive ({positivePercentage.toFixed(1)}%)
                    </span>
                    <span>{app.metrics.sentimentDistribution.positive}</span>
                  </div>
                  <Progress
                    progress={positivePercentage}
                    color="success"
                    size="sm"
                  />

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Neutral ({neutralPercentage.toFixed(1)}%)
                    </span>
                    <span>{app.metrics.sentimentDistribution.neutral}</span>
                  </div>
                  <Progress
                    progress={neutralPercentage}
                    color="gray"
                    size="sm"
                  />

                  <div className="flex justify-between text-sm">
                    <span className="text-red-600 dark:text-red-400">
                      Negative ({negativePercentage.toFixed(1)}%)
                    </span>
                    <span>{app.metrics.sentimentDistribution.negative}</span>
                  </div>
                  <Progress
                    progress={negativePercentage}
                    color="error"
                    size="sm"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
} 