import { MarketListing } from '../../interfaces/MarketListing';
import CardUtils from './Card';

import DateUtils from './Date';

/**
 * @hidden
 */
export default class MarketUtils {
    public static createMarketListing(listing: any): MarketListing {
        return {
            marketId: listing.marketId,

            price: listing.price,
            previousAvgPrice: {
                value: listing.previousAvgPrice?.statValue ?? null,
                date: DateUtils.convertToDate(listing.previousAvgPrice?.statDate),
            },
            currentAvgHourPrice: {
                value: listing.currentAvgHourPrice?.statValue ?? null,
                date: DateUtils.convertToDate(listing.currentAvgHourPrice?.statDate),
            },

            createdAt: new Date(listing.created),

            type: listing.type,
            card: CardUtils.createCard(listing.card),
        };
    }
}
