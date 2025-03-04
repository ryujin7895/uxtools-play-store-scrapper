import { type MetaFunction } from "@remix-run/node";
import Sidebar from "~/components/common/Sidebar";
import ComparisonDashboard from "~/components/comparison/ComparisonDashboard";

export const meta: MetaFunction = () => {
  return [
    { title: "App Comparison - Play Store Comment Analyzer" },
    { name: "description", content: "Compare your app with competitors" },
  ];
};

export default function Comparison() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 flex-1 min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                App Comparison
              </h1>
              <p className="text-gray-600">
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