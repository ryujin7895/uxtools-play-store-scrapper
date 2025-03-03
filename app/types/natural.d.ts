declare module 'natural' {
  export class SentimentAnalyzer {
    constructor(language: string, stemmer: any, vocabulary: string);
    getSentiment(words: string[]): number;
  }

  export class TfIdf {
    addDocument(doc: string): void;
    listTerms(docIndex: number): Array<{ term: string; tfidf: number }>;
  }

  export const PorterStemmer: any;
} 