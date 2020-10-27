import CardUtils from './Card';
import DateUtils from './Date';
import PackUtils from './Pack';
import StickerUtils from './Sticker';

import { MarketListing } from '../../interfaces/MarketListing';

/**
 * @hidden
 */
export default class MarketUtils {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public static createMarketListing(data: any): MarketListing {
        const marketListing: MarketListing = {
            marketId: data.marketId,

            price: data.price,
            previousAvgPrice: {
                value: data.previousAvgPrice?.statValue ?? null,
                date: DateUtils.convertToDate(data.previousAvgPrice?.statDate ?? null),
            },
            // @TODO rename to currentHourPrice to stick to the API contract
            currentAvgHourPrice: {
                value: data.currentHourPrice?.statValue ?? null,
                date: DateUtils.convertToDate(data.currentHourPrice?.statDate ?? null),
            },

            createdAt: new Date(data.created),

            type: data.type,
        };

        if (data.card) marketListing.card = CardUtils.createCard(data.card);
        if (data.pack) marketListing.pack = PackUtils.createPack(data.pack.packTemplate);
        if (data.sticker) marketListing.sticker = StickerUtils.createSticker(data.sticker);

        return marketListing;
    }
}
