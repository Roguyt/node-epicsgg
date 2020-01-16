import { Pack } from '../../interfaces/Pack';

/**
 * @hidden
 */
export default class PackUtils {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static createAPack(data: any): Pack {
        let pack: Pack = {
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
}
