import { Card } from "flowbite-react";
import { AppData } from "./ComparisonDashboard";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TrendAnalysisProps {
  apps: AppData[];
}

export default function TrendAnalysis({ apps }: TrendAnalysisProps) {
  const chartData: ChartData<'line'> = {
    labels: apps[0]?.trends.map(trend => new Date(trend.date).toLocaleDateString()) || [],
    datasets: apps.map((app, index) => ({
      label: app.name,
      data: app.trends.map(trend => trend.total),
      borderColor: [
        'rgb(59, 130, 246)', // blue
        'rgb(234, 88, 12)',  // orange
        'rgb(22, 163, 74)'   // green
      ][index],
      backgroundColor: [
        'rgba(59, 130, 246, 0.5)',
        'rgba(234, 88, 12, 0.5)',
        'rgba(22, 163, 74, 0.5)'
      ][index],
      tension: 0.4
    }))
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value.toString();
          }
        }
      }
    }
  };

  return (
    <Card className="mt-6">
      <div>
        <h3 className="text-lg font-medium mb-1 text-gray-800 dark:text-white">
          Trend Analysis
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Review volume trends over time
        </p>

        <div className="h-[400px]">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </Card>
  );
} 