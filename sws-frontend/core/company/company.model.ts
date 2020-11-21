import { ID } from '@datorama/akita';

export interface CompanyModel {
  id: ID;
  name: string;
  canonicalUrl: string;
  dateGenerated: string;
  exchangeCountryIso: string;
  exchangeSymbol: string;
  listingCurrencyIso: string;
  securityName: string;
  tickerSymbol: string;
  uniqueSymbol: string;
  uniqueSymbolSlug: string;
  shares?: SharePrice[];
  score?: Score;
}

export interface SharePrice {
  date: string;
  price: number;
  dateCreated: string;
}

export interface Score {
  id: number;
  dateGenerated: string;
  dividend: number;
  future: number;
  health: number;
  management: number;
  past: number;
  value: number;
  misc: number;
  total: number;
  sentence: string;
}
