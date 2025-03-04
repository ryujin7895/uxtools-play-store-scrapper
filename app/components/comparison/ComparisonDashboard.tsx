import { useState } from "react";
import { Card, Spinner, Alert } from "flowbite-react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import AppComparisonForm from "./AppComparisonForm";
import MetricsComparison from "./MetricsComparison";
import KeywordsComparison from "./KeywordsComparison";
import SentimentDistribution from "./SentimentDistribution";
import TrendAnalysis from "./TrendAnalysis";
import RecentComments from "./RecentComments";
import ExportButton from "./ExportButton";

export interface AppData {
  id: string;
  name: string;
  icon: string;
  metrics: {
    averageRating: number;
    totalReviews: number;
    sentimentDistribution: {
      positive: number;
      neutral: number;
      negative: number;
    };
  };
  keywords: Array<{
    word: string;
    count: number;
  }>;
  comments: Array<{
    id: string;
    userName: string;
    content: string;
    score: number;
    date: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  }>;
  trends: Array<{
    date: string;
    positive: number;
    negative: number;
    neutral: number;
    total: number;
  }>;
}

interface SharedKeyword {
  word: string;
  counts: { [appId: string]: number };
}

export default function ComparisonDashboard() {
  const [apps, setApps] = useState<AppData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sharedKeywords, setSharedKeywords] = useState<SharedKeyword[]>([]);
  
  const handleAddApps = async (appUrls: string[], year: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('urls', JSON.stringify(appUrls));
      formData.append('year', year.toString());

      const response = await fetch('/api/compare', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch comparison data');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to analyze apps');
      }

      // Transform the API response into the format we need
      const appsData = Object.entries(data.results).map(([url, result]: [string, any]) => ({
        id: url,
        name: result.appInfo?.title || url.split('id=')[1]?.split('&')[0] || url,
        icon: result.appInfo?.icon || `https://www.google.com/s2/favicons?domain=${url}&sz=64`,
        metrics: {
          averageRating: result.comments?.reduce((acc: number, c: any) => acc + c.score, 0) / (result.comments?.length || 1) || 0,
          totalReviews: result.comments?.length || 0,
          sentimentDistribution: {
            positive: result.sentiment?.positive || 0,
            neutral: result.sentiment?.neutral || 0,
            negative: result.sentiment?.negative || 0
          }
        },
        keywords: result.keywords || [],
        comments: result.comments || [],
        trends: result.trends || []
      }));

      setApps(appsData);

      // Transform shared keywords data
      const transformedSharedKeywords = (data.comparisonResult?.sharedKeywords || data.sharedKeywords || []).map((kw: any) => ({
        word: kw.word,
        counts: appsData.reduce((acc: { [key: string]: number }, app) => {
          acc[app.id] = kw.counts?.[app.id] || 0;
          return acc;
        }, {})
      }));

      setSharedKeywords(transformedSharedKeywords);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'Failed to fetch app data');
      console.error('Comparison error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveApp = (appId: string) => {
    setApps(prevApps => prevApps.filter(app => app.id !== appId));
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Compare Apps
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Enter Play Store URLs to compare apps
            </p>
          </div>
          {apps.length > 0 && <ExportButton data={{ apps, sharedKeywords }} />}
        </div>
        <AppComparisonForm onSubmit={handleAddApps} />
      </Card>

      {error && (
        <Alert color="failure" icon={InformationCircleIcon}>
          {error}
        </Alert>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="xl" />
        </div>
      ) : apps.length > 0 ? (
        <div className="space-y-6">
          <MetricsComparison apps={apps} onRemoveApp={handleRemoveApp} />
          <KeywordsComparison apps={apps} sharedKeywords={sharedKeywords} />
          <SentimentDistribution apps={apps} />
          <TrendAnalysis apps={apps} />
          <RecentComments apps={apps} />
        </div>
      ) : (
        <Alert color="info" icon={InformationCircleIcon}>
          Add app URLs to start comparing. You can find app URLs in their Play Store pages.
        </Alert>
      )}
    </div>
  );
}
