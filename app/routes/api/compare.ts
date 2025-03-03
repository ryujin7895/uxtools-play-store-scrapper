import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const mainAppUrl = formData.get("mainAppUrl") as string;
  const competitorUrls = JSON.parse(formData.get("competitorUrls") as string) as string[];

  try {
    // In a real implementation, this would call your backend API
    // For now, return mock data
    return json({
      metrics: {
        "Average Rating": {
          mainApp: 4.5,
          competitors: {
            [competitorUrls[0]]: 4.2,
            [competitorUrls[1]]: 4.7,
          },
          percentageDiffs: {
            [competitorUrls[0]]: -6.67,
            [competitorUrls[1]]: 4.44,
          },
          significance: {
            [competitorUrls[0]]: true,
            [competitorUrls[1]]: false,
          },
        },
        "Total Reviews": {
          mainApp: 10000,
          competitors: {
            [competitorUrls[0]]: 8500,
            [competitorUrls[1]]: 12000,
          },
          percentageDiffs: {
            [competitorUrls[0]]: -15,
            [competitorUrls[1]]: 20,
          },
        },
      },
      sharedKeywords: [
        {
          word: "performance",
          mainApp: 150,
          competitors: {
            [competitorUrls[0]]: 120,
            [competitorUrls[1]]: 180,
          },
          sentiment: {
            mainApp: "positive",
            competitors: {
              [competitorUrls[0]]: "neutral",
              [competitorUrls[1]]: "positive",
            },
          },
        },
        // Add more shared keywords...
      ],
      uniqueKeywords: {
        mainApp: [
          { word: "innovative", count: 45 },
          { word: "intuitive", count: 38 },
        ],
        competitors: {
          [competitorUrls[0]]: [
            { word: "reliable", count: 52 },
            { word: "stable", count: 47 },
          ],
          [competitorUrls[1]]: [
            { word: "powerful", count: 63 },
            { word: "professional", count: 58 },
          ],
        },
      },
      featureRequests: {
        mainApp: [
          { feature: "Dark mode", count: 85 },
          { feature: "Offline support", count: 67 },
        ],
        competitors: {
          [competitorUrls[0]]: [
            { feature: "Cloud backup", count: 73 },
            { feature: "Multi-device sync", count: 65 },
          ],
          [competitorUrls[1]]: [
            { feature: "Export options", count: 92 },
            { feature: "Templates", count: 78 },
          ],
        },
      },
      bugReports: {
        mainApp: [
          { bug: "App crashes on startup", count: 23 },
          { bug: "Cannot save changes", count: 18 },
        ],
        competitors: {
          [competitorUrls[0]]: [
            { bug: "Slow loading times", count: 31 },
            { bug: "Battery drain", count: 25 },
          ],
          [competitorUrls[1]]: [
            { bug: "Login issues", count: 28 },
            { bug: "Data sync fails", count: 22 },
          ],
        },
      },
      featureGaps: {
        mainApp: [
          {
            feature: "Cloud backup",
            presentIn: [competitorUrls[0], competitorUrls[1]],
          },
          {
            feature: "Multi-device sync",
            presentIn: [competitorUrls[0]],
          },
        ],
        competitors: {
          [competitorUrls[0]]: [
            {
              feature: "Dark mode",
              presentIn: [mainAppUrl, competitorUrls[1]],
            },
          ],
          [competitorUrls[1]]: [
            {
              feature: "Offline support",
              presentIn: [mainAppUrl],
            },
          ],
        },
      },
    });
  } catch (error) {
    console.error("Comparison error:", error);
    return json({ error: "Failed to compare apps" }, { status: 500 });
  }
};
