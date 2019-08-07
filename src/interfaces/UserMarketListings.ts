import { MarketListing } from './MarketListing';

export interface UserMarketListings {
    total: number;
    count: number;

    marketListings: MarketListing[];
}
