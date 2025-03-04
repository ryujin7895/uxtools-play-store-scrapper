interface ReviewSentiment {
  date: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

interface TrendData {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

export function groupByMonth(reviews: ReviewSentiment[]): TrendData[] {
  const monthlyData = new Map<string, TrendData>();

  reviews.forEach(review => {
    const date = new Date(review.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!monthlyData.has(monthKey)) {
      monthlyData.set(monthKey, {
        date: monthKey,
        positive: 0,
        negative: 0,
        neutral: 0,
        total: 0
      });
    }

    const data = monthlyData.get(monthKey)!;
    data[review.sentiment]++;
    data.total++;
  });

  return Array.from(monthlyData.values())
    .sort((a, b) => a.date.localeCompare(b.date));
} 