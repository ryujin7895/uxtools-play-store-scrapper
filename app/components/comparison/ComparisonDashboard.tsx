import { useState, useEffect } from "react";
import AppComparisonForm from "./AppComparisonForm";
import MetricsComparison from "./MetricsComparison";
import LoadingSpinner from "../common/LoadingSpinner";
import { fetchAppData } from "~/utils/comparisonApi";

export interface AppData {
  id: string;
  name: string;
  icon: string;
  averageRating: number;
  totalReviews: number;
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  commentVolume: {
    total: number;
    perMonth: number[];
    months: string[];
  };
  keywords: {
    term: string;
    count: number;
    sentiment: number;
  }[];
}

export default function ComparisonDashboard() {
  const [apps, setApps] = useState<AppData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleAddApps = async (appIds: string[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const appDataPromises = appIds.map(id => fetchAppData(id));
      const results = await Promise.all(appDataPromises);
      setApps(results);
    } catch (err) {
      setError("Failed to fetch app data. Please check the app IDs and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveApp = (appId: string) => {
    setApps(prevApps => prevApps.filter(app => app.id !== appId));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Compare Apps
        </h2>
        <AppComparisonForm onSubmit={handleAddApps} />
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : apps.length > 0 ? (
        <div className="space-y-8">
          <MetricsComparison apps={apps} onRemoveApp={handleRemoveApp} />
        </div>
      ) : (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-blue-700 dark:text-blue-400">
            Add app IDs to start comparing. You can find app IDs in their Play Store URLs (e.g., com.example.app).
          </p>
        </div>
      )}
    </div>
  );
}
