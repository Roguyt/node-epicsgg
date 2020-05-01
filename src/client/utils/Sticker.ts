import { Sticker } from '../../interfaces/Sticker';
import { StickerTemplate } from '../../interfaces/StickerTemplate';

/**
 * @hidden
 */
export default class StickerUtils {
    public static createASticker(data: any): Sticker {
        return {
            id: data.id,
            uuid: data.uuid,
            mint: {
                batch: data.mintBatch,
                value: data.mintNumber,
            },
            rating: data.rating,
            isNewTemplate: data.isNewStickerTemplate,
            isGhost: data.isGhost,
            isOnMarket: data.isMarketList,
            isOnTrade: data.isTradeList,
            template: StickerUtils.createAStickerTemplate(data.stickerTemplate),
        };
    }

    public static createAStickerTemplate(data: any): StickerTemplate {
        return {
            id: data.id,
            uuid: data.uuid,
            title: data.title,
            categoryId: data.categoryId,
            properties: {
                season: data.properties.season,
                gameId: data.properties.game_id,
                teamId: data.properties.team_id,
            },
            limitedEdition: data.limitedEdition,
            inCirculation: data.inCirculation,
            rarity: data.rarity,
            images: data.images,
        };
    }
}
