import { AveragePrice } from './AveragePrice';
import { Card } from './Card';

export interface MarketListing {
    marketId: number;

    price: number;
    previousAvgPrice: AveragePrice;
    currentAvgHourPrice: AveragePrice;

    createdAt: Date;

    type: string;
    card: Card;
}
