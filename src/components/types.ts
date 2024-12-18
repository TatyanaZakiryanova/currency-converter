export type Rates = Record<string, number>;

export interface IHistoricalData {
  date: string;
  rate: number;
}

export interface NewsArticle {
  article_id: string;
  link: string;
  title: string;
  description: string;
}
