import DateUtils from './Date';

import { Pack } from '../../interfaces/Pack';
import { PackTemplate } from '../../interfaces/PackTemplate';

/**
 * @hidden
 */
export default class PackUtils {
    public static createPack(data: any): Pack {
        const pack: Pack = {
            id: data.id,
            name: data.name,
            description: data.description,
            categoryId: data.categoryId,
            packType: data.packType,
            packPrimary: data.packPrimary,
            packPrimaryId: data.packPrimaryId,
            openType: data.openType,

            cost: data.cost,
            costType: data.costType,
            sale: data.sale,
            saleCost: data.saleCost,

            cardCount: data.cardCount,
            entityCount: data.entityCount,
            available: data.inventoryCount,
            userLimit: data.userLimit,

            starter: data.starter,
            limited: data.limited,
            comingSoon: data.comingSoon,

            releaseTime: new Date(data.releaseTime),
            startDate: new Date(data.purchaseStart),
            endDate: new Date(data.purchaseEnd),

            properties: {
                seasons: data.properties.seasons,
                gameIds: data.properties.game_ids,
                orderMessageMin: data.properties.order_message_min,
            },
        };

        if (data.treatmentsChance) {
            pack.odds = data.treatmentsChance;
        }

        if (data.images) {
            pack.images = data.images;
        }

        if (data.videos) {
            pack.videos = data.videos;
        }

        return pack;
    }

    public static createPackTemplate(data: any): PackTemplate {
        return {
            id: data.id,
            name: data.name,
            categoryId: data.categoryId,
            description: data.description,
            properties: {
                seasons: data.properties.seasons,
                gameIds: data.properties.game_ids,
                orderMessageMin: data.properties.order_message_min,
            },
            packType: data.packType,
            packPrimary: data.packPrimary,
            packPrimaryId: data.packPrimaryId,
            openType: data.openType,
            cost: data.cost,
            costType: data.costType,
            saleCost: data.saleCost,
            sale: data.sale,

            cardCount: data.cardCount,
            entityCount: data.entityCount,
            inventoryCount: data.inventoryCount,
            starter: data.starter,
            limited: data.limited,
            legacy: data.legacy,
            comingSoon: data.comingSoon,
            purchaseStart: DateUtils.convertToDate(data.purchaseStart),
            releaseTime: DateUtils.convertToDate(data.releaseTime),
            purchaseEnd: DateUtils.convertToDate(data.purchaseEnd),
            userLimit: data.userLimit,
            images: data.images,
            videos: data.videos,
        };
    }
}
