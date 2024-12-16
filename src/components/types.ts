export type Rates = Record<string, number>;

export interface IHistoricalData {
  date: string;
  rate: number;
}

export interface NewsArticle {
  url: string;
  title: string;
  description: string;
}
