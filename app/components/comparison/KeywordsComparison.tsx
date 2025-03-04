import { Card, Badge } from "flowbite-react";
import { AppData } from "./ComparisonDashboard";
import { useMemo } from "react";

interface KeywordsComparisonProps {
  apps: AppData[];
}

export default function KeywordsComparison({ apps }: KeywordsComparisonProps) {
  // Find shared keywords between apps
  const sharedKeywords = useMemo(() => {
    const keywordMap = new Map<string, { word: string; counts: { [appId: string]: number } }>();

    apps.forEach(app => {
      app.keywords.forEach(({ word, count }) => {
        if (!keywordMap.has(word)) {
          keywordMap.set(word, { word, counts: {} });
        }
        keywordMap.get(word)!.counts[app.id] = count;
      });
    });

    // Filter keywords that appear in at least 2 apps and sort by total count
    return Array.from(keywordMap.values())
      .filter(keyword => Object.keys(keyword.counts).length >= 2)
      .sort((a, b) => {
        const totalA = Object.values(a.counts).reduce((sum, count) => sum + count, 0);
        const totalB = Object.values(b.counts).reduce((sum, count) => sum + count, 0);
        return totalB - totalA;
      });
  }, [apps]);

  if (!apps?.length || !sharedKeywords.length) {
    return null;
  }

  return (
    <Card>
      <div>
        <h3 className="text-lg font-medium mb-1 text-gray-900">
          Top Keywords
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Common keywords across all apps
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sharedKeywords.map((keyword) => (
            <Card key={keyword.word} className="bg-gray-50">
              <div>
                <Badge color="info" size="lg" className="mb-4">
                  {keyword.word}
                </Badge>
                <div className="space-y-3">
                  {apps.map((app) => (
                    keyword.counts[app.id] ? (
                      <div key={app.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={app.icon}
                            alt={`${app.name} icon`}
                            className="w-6 h-6 rounded"
                          />
                          <span className="text-sm text-gray-600 truncate max-w-[200px]">
                            {app.name}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {keyword.counts[app.id].toLocaleString()}
                        </span>
                      </div>
                    ) : null
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
} 