export interface ComparisonMetric {
  mainApp: number;
  competitors: { [url: string]: number };
  percentageDiffs?: { [url: string]: number };
  significance?: { [url: string]: boolean };
}

export interface ComparisonData {
  metrics: {
    [key: string]: ComparisonMetric;
  };
  sharedKeywords: {
    word: string;
    mainApp: number;
    competitors: { [url: string]: number };
    sentiment: {
      mainApp: 'positive' | 'negative' | 'neutral';
      competitors: { [url: string]: 'positive' | 'negative' | 'neutral' };
    };
  }[];
  uniqueKeywords: {
    mainApp: { word: string; count: number }[];
    competitors: {
      [url: string]: { word: string; count: number }[];
    };
  };
  featureRequests: {
    mainApp: { feature: string; count: number }[];
    competitors: {
      [url: string]: { feature: string; count: number }[];
    };
  };
  bugReports: {
    mainApp: { bug: string; count: number }[];
    competitors: {
      [url: string]: { bug: string; count: number }[];
    };
  };
  featureGaps?: {
    mainApp: {
      feature: string;
      presentIn: string[];
    }[];
    competitors: {
      [url: string]: {
        feature: string;
        presentIn: string[];
      }[];
    };
  };
}

export interface CompetitorApp {
  url: string;
  name: string;
  icon?: string;
  error?: string;
}
