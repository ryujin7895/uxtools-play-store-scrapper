import natural from "natural";

export function sentiment(text: string): 'positive' | 'negative' | 'neutral' {
  const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
  const score = analyzer.getSentiment(text.split(' '));
  
  if (score > 0.1) return 'positive';
  if (score < -0.1) return 'negative';
  return 'neutral';
} 