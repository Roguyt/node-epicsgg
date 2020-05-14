import { AveragePrice } from './AveragePrice';
import { Card } from './Card';

export interface MarketListing {
    marketId: number;

    price: number;
    previousAvgPrice: AveragePrice;
    // @TODO rename to currentHourPrice to stick to the API contract
    currentAvgHourPrice: AveragePrice;

    createdAt: Date | null;

    type: string;
    card: Card;
}
