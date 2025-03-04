import { Card, Badge } from "flowbite-react";
import { AppData } from './ComparisonDashboard';

interface KeywordsComparisonProps {
  apps: AppData[];
  sharedKeywords: Array<{
    word: string;
    counts: { [appId: string]: number };
  }>;
}

export default function KeywordsComparison({ apps, sharedKeywords }: KeywordsComparisonProps) {
  if (!apps?.length || !sharedKeywords?.length) {
    return null;
  }

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Top Keywords
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Common keywords across all apps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sharedKeywords.map((keyword) => (
            <div
              key={keyword.word}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <Badge color="info" size="lg">
                  {keyword.word}
                </Badge>
              </div>
              <div className="space-y-2">
                {apps.map((app) => (
                  <div key={app.id} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
                      {app.name}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {keyword.counts[app.id] || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
} 