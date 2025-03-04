import { Button } from "flowbite-react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { AppData } from "./ComparisonDashboard";

interface ExportButtonProps {
  data: {
    apps: AppData[];
    sharedKeywords: any;
  };
}

export default function ExportButton({ data }: ExportButtonProps) {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "app-comparison.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport} gradientDuoTone="purpleToBlue">
      <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
      Export Data
    </Button>
  );
} 