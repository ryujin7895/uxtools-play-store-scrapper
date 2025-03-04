import { Card, Badge } from "flowbite-react";
import { AppData } from './ComparisonDashboard';

interface RecentCommentsProps {
  apps: AppData[];
}

export default function RecentComments({ apps }: RecentCommentsProps) {
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Recent Comments
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Latest user reviews from each app
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app) => (
            <div key={app.id} className="space-y-4">
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

              <div className="space-y-4">
                {app.comments.slice(0, 5).map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-gray-900 dark:text-white">
                          {comment.userName}
                        </span>
                        <Badge
                          color={
                            comment.sentiment === 'positive'
                              ? 'success'
                              : comment.sentiment === 'negative'
                              ? 'failure'
                              : 'gray'
                          }
                          size="sm"
                        >
                          {comment.score}/5
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(comment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {comment.content}
                    </p>
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