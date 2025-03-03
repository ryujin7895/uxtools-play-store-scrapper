declare module 'google-play-scraper' {
  export interface Review {
    id: string;
    userName: string;
    text: string;
    score: number;
    thumbsUp: number;
    date: string;
  }

  export interface ReviewsResult {
    data: Review[];
    nextPaginationToken?: string;
  }

  export const sort: {
    NEWEST: number;
    RATING: number;
    HELPFULNESS: number;
  };

  export function reviews(options: {
    appId: string;
    sort?: number;
    num?: number;
    paginate?: boolean;
    nextPaginationToken?: string;
  }): Promise<ReviewsResult>;
} 