import { useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";

interface AppComparisonFormProps {
  onSubmit: (urls: string[], year: number) => void;
}

const isValidPlayStoreUrl = (url: string): boolean => {
  const pattern = /^https:\/\/play\.google\.com\/store\/apps\/details\?id=[a-zA-Z0-9_.]+(&.*)?$/;
  return pattern.test(url.trim());
};

export default function AppComparisonForm({ onSubmit }: AppComparisonFormProps) {
  const [competitorUrls, setCompetitorUrls] = useState<string[]>(["", ""]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validUrls = competitorUrls.filter(url => url.trim() !== "");
    if (validUrls.length > 0) {
      onSubmit(validUrls, selectedYear);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        {competitorUrls.map((url, index) => (
          <div key={index}>
            <div className="mb-2">
              <Label htmlFor={`app-${index}`}>
                {index === 0 ? "Main App URL" : `Competitor ${index} URL`}
              </Label>
            </div>
            <TextInput
              id={`app-${index}`}
              type="url"
              placeholder="https://play.google.com/store/apps/details?id=..."
              value={url}
              onChange={(e) => {
                const newUrls = [...competitorUrls];
                newUrls[index] = e.target.value;
                setCompetitorUrls(newUrls);
              }}
              required={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="mb-2">
            <Label htmlFor="year">Analysis Year</Label>
          </div>
          <Select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            <option value={new Date().getFullYear()}>Current Year</option>
            <option value={new Date().getFullYear() - 1}>Last Year</option>
            <option value={new Date().getFullYear() - 2}>2 Years Ago</option>
          </Select>
        </div>
        <div className="flex items-end">
          <Button type="submit" color="blue">
            Compare Apps
          </Button>
        </div>
      </div>
    </form>
  );
}
