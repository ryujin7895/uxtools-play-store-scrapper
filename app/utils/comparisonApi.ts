import type { AppData } from "~/components/comparison/ComparisonDashboard";

// This is a mock implementation for demonstration purposes
// In a real app, you would call your backend API
export async function fetchAppData(appId: string): Promise<AppData> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate mock app data based on appId
  const hash = generateSimpleHash(appId);
  
  return {
    id: appId,
    name: getAppName(appId),
    icon: `https://picsum.photos/seed/${hash}/200`,
    averageRating: 3 + (hash % 20) / 10, // Between 3.0 and 5.0
    totalReviews: 1000 + (hash % 9000),
    sentimentDistribution: {
      positive: 40 + (hash % 40),
      neutral: 10 + (hash % 20),
      negative: 5 + (hash % 25)
    },
    commentVolume: {
      total: 500 + (hash % 4500),
      perMonth: Array.from({ length: 12 }, () => 20 + (hash % 100)),
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    keywords: generateMockKeywords(hash)
  };
}

// Helper function to generate a simple numeric hash from a string
function generateSimpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Generate mock keywords
function generateMockKeywords(seed: number): Array<{ term: string, count: number, sentiment: number }> {
  const keywords = [
    "user interface", "performance", "battery life", "crash", "bug", 
    "feature", "update", "design", "usability", "customer service",
    "login", "notification", "payment", "speed", "stability", 
    "responsive", "intuitive", "reliable", "glitch", "improvement"
  ];
  
  // Use the seed to select and mix keywords
  return keywords
    .slice(seed % 5, (seed % 5) + 10)
    .map((term, index) => ({
      term,
      count: 5 + ((seed + index) % 95),
      sentiment: -0.9 + ((seed + index) % 19) / 10 // Between -0.9 and +0.9
    }));
}

// Generate a readable app name from the app ID
function getAppName(appId: string): string {
  // Extract a product name from the app ID (e.g., "com.example.myproduct" -> "My Product")
  const parts = appId.split('.');
  if (parts.length > 2) {
    const productPart = parts[2];
    return productPart
      .replace(/([A-Z])/g, ' $1') // Add spaces before capitals
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
      .trim();
  }
  return appId;
}
