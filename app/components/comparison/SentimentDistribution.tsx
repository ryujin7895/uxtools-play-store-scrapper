import { Card } from "flowbite-react";
import { AppData } from "./ComparisonDashboard";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SentimentDistributionProps {
  apps: AppData[];
}

const chartColors = [
  { bar: 'rgb(37, 99, 235)', hover: 'rgb(29, 78, 216)' },   // Blue
  { bar: 'rgb(234, 88, 12)', hover: 'rgb(194, 65, 12)' },   // Orange
  { bar: 'rgb(22, 163, 74)', hover: 'rgb(21, 128, 61)' },   // Green
  { bar: 'rgb(217, 70, 239)', hover: 'rgb(192, 38, 211)' }  // Purple
];

export default function SentimentDistribution({ apps }: SentimentDistributionProps) {
  const chartData: ChartData<'bar'> = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: apps.map((app, index) => ({
      label: app.name,
      data: [
        app.sentiments.positive,
        app.sentiments.neutral,
        app.sentiments.negative
      ],
      backgroundColor: chartColors[index].bar,
      hoverBackgroundColor: chartColors[index].hover,
      borderRadius: 4,
      borderSkipped: false,
      barPercentage: 0.7,
      categoryPercentage: 0.8
    }))
  };

  const options: ChartOptions<'bar'> = {
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
    <div>
      <h3 className="text-lg font-medium mb-1 text-gray-900">
        Sentiment Distribution
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Compare sentiment distribution across apps
      </p>

      <div className="h-[400px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
} 