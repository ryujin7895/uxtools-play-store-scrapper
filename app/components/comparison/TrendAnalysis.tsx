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
  ChartOptions,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TrendAnalysisProps {
  apps: AppData[];
}

const chartColors = [
  { line: 'rgb(37, 99, 235)', fill: 'rgba(37, 99, 235, 0.1)' },   // Blue
  { line: 'rgb(234, 88, 12)', fill: 'rgba(234, 88, 12, 0.1)' },   // Orange
  { line: 'rgb(22, 163, 74)', fill: 'rgba(22, 163, 74, 0.1)' },   // Green
  { line: 'rgb(217, 70, 239)', fill: 'rgba(217, 70, 239, 0.1)' }  // Purple
];

export default function TrendAnalysis({ apps }: TrendAnalysisProps) {
  const chartData: ChartData<'line'> = {
    labels: apps[0]?.trends.map(trend => new Date(trend.date).toLocaleDateString()) || [],
    datasets: apps.map((app, index) => ({
      label: app.name,
      data: app.trends.map(trend => trend.total),
      borderColor: chartColors[index].line,
      backgroundColor: chartColors[index].fill,
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: chartColors[index].line,
      pointBorderColor: 'white',
      pointBorderWidth: 2,
      borderWidth: 2
    }))
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#111827',
        bodyColor: '#111827',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context) => ` ${context.dataset.label}: ${context.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          padding: 10
        }
      },
      y: {
        beginAtZero: true,
        border: {
          display: false
        },
        grid: {
          color: '#e5e7eb'
        },
        ticks: {
          padding: 10,
          callback: function(value) {
            return value.toLocaleString();
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