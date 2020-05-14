import { MarketListing } from '../../interfaces/MarketListing';
import CardUtils from './Card';
import PackUtils from './Pack';
import StickerUtils from './Sticker';

import DateUtils from './Date';

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
            // @TODO rename to currentHourPrice to stick to the API contract
            currentAvgHourPrice: {
                value: listing.currentHourPrice?.statValue ?? null,
                date: DateUtils.convertToDate(listing.currentHourPrice?.statDate ?? null),
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
