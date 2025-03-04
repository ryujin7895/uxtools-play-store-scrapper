import { Button } from "flowbite-react";
import { AppData } from "./ComparisonDashboard";

interface ExportButtonProps {
  apps: AppData[];
}

export default function ExportButton({ apps }: ExportButtonProps) {
  const handleExport = () => {
    const exportData = apps.map(app => ({
      name: app.name,
      metrics: {
        averageRating: app.metrics.averageRating,
        totalReviews: app.metrics.totalReviews
      },
      sentiments: {
        positive: app.sentiments.positive,
        neutral: app.sentiments.neutral,
        negative: app.sentiments.negative
      },
      keywords: app.keywords,
      comments: app.comments,
      trends: app.trends
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "app-comparison-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport} color="gray">
      Export Data
    </Button>
  );
} 