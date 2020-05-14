import { AveragePrice } from './AveragePrice';
import { Card } from './Card';

export interface MarketListing {
    marketId: number;

    price: number;
    previousAvgPrice: AveragePrice;
    currentHourPrice: AveragePrice;

    createdAt: Date | null;

    type: string;
    card: Card;
}
