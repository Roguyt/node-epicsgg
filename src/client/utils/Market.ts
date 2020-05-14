import { MarketListing } from '../../interfaces/MarketListing';
import CardUtils from './Card';

import DateUtils from './Date';
import PackUtils from './Pack';
import StickerUtils from './Sticker';

/**
 * @hidden
 */
export default class MarketUtils {
    public static createMarketListing(listing: any): MarketListing {
        const marketListing: MarketListing = {
            marketId: listing.marketId,

            price: listing.price,
            previousAvgPrice: {
                value: listing.previousAvgPrice?.statValue ?? null,
                date: DateUtils.convertToDate(listing.previousAvgPrice?.statDate ?? null),
            },
            currentAvgHourPrice: {
                value: listing.currentAvgHourPrice?.statValue ?? null,
                date: DateUtils.convertToDate(listing.currentAvgHourPrice?.statDate ?? null),
            },

            createdAt: new Date(listing.created),

            type: listing.type,
        };

        if (listing.card) marketListing.card = CardUtils.createCard(listing.card);
        if (listing.pack) marketListing.pack = PackUtils.createPack(listing.pack.packTemplate);
        if (listing.sticker) marketListing.sticker = StickerUtils.createSticker(listing.sticker);

        return marketListing;
    }
}
