import { type MetaFunction } from "@remix-run/node";
import { Link, useLocation } from "@remix-run/react";
import ComparisonDashboard from "~/components/ComparisonDashboard";

export const meta: MetaFunction = () => {
  return [
    { title: "App Comparison - UX Tools Play Store Scraper" },
    { name: "description", content: "Compare your app with competitors" },
  ];
};

export default function Comparison() {
  const location = useLocation();
  
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-30">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-8">
              <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
              <span className="text-xl font-bold text-gray-800 dark:text-white">Comment Analyzer</span>
            </div>
            <nav className="space-y-2">
              <Link
                to="/"
                className={`flex w-full items-center space-x-2 p-2 rounded-lg ${
                  location.pathname === '/' 
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                <span>Dashboard</span>
              </Link>
              <Link
                to="/comparison"
                className={`flex w-full items-center space-x-2 p-2 rounded-lg ${
                  location.pathname === '/comparison'
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <span>Comparison</span>
              </Link>
              <Link
                to="/history"
                className={`flex w-full items-center space-x-2 p-2 rounded-lg ${
                  location.pathname === '/history'
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <span>History</span>
              </Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                App Comparison
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Compare your app with competitors
              </p>
            </div>
          </div>
          <ComparisonDashboard />
        </div>
      </main>
    </div>
  );
} 