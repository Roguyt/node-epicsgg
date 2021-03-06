import { AveragePrice } from './AveragePrice';
import { Card } from './Card';
import { Pack } from './Pack';
import { Sticker } from './Sticker';

export interface MarketListing {
    marketId: number;

    price: number;
    previousAvgPrice: AveragePrice;
    // @TODO rename to currentHourPrice to stick to the API contract
    currentAvgHourPrice: AveragePrice;

    createdAt: Date | null;

    type: string;
    card?: Card;
    pack?: Pack;
    sticker?: Sticker;
}
