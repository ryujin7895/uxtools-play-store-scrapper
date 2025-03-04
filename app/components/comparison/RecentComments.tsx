import { Card, Badge } from "flowbite-react";
import { AppData } from "./ComparisonDashboard";
import { useMemo } from "react";

interface RecentCommentsProps {
  apps: AppData[];
}

export default function RecentComments({ apps }: RecentCommentsProps) {
  // Combine and sort comments from all apps
  const sortedComments = useMemo(() => {
    return apps
      .flatMap(app => 
        app.comments.map(comment => ({
          ...comment,
          appName: app.name,
          appIcon: app.icon
        }))
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10); // Show only the 10 most recent comments
  }, [apps]);

  if (!apps?.length || !sortedComments.length) {
    return null;
  }

  const getSentimentColor = (sentiment: 'positive' | 'negative' | 'neutral') => {
    switch (sentiment) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'failure';
      default:
        return 'gray';
    }
  };

  return (
    <Card>
      <div>
        <h3 className="text-lg font-medium mb-1 text-gray-900">
          Recent Comments
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Latest comments from all apps
        </p>

        <div className="space-y-4">
          {sortedComments.map((comment) => (
            <Card key={comment.id} className="bg-gray-50">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={comment.appIcon}
                      alt={`${comment.appName} icon`}
                      className="w-6 h-6 rounded"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {comment.appName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge color={getSentimentColor(comment.sentiment)}>
                      {comment.sentiment}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">
                    {comment.content}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {comment.userName}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-900">
                      {comment.score.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">★</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
} 