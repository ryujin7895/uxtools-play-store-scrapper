export interface KeywordData {
  word: string;
  count: number;
}

export function extractKeywords(text: string): KeywordData[] {
  // Split text into words and convert to lowercase
  const words = text.toLowerCase().split(/\W+/);

  // Filter out common words and short words
  const stopwords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
    'app', 'apps', 'use', 'using', 'used', 'just', 'can', 'like', 'good', 'bad'
  ]);

  const filteredWords = words.filter(word => 
    word.length > 3 && 
    !stopwords.has(word) && 
    /^[a-z]+$/.test(word)
  );

  // Count word frequencies
  const wordCounts = new Map<string, number>();
  for (const word of filteredWords) {
    wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
  }

  // Convert to array and sort by frequency
  return Array.from(wordCounts.entries())
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 50);
} 