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
}

export interface SharePrice {
  date: string;
  price: number;
  dateCreated: string;
}
