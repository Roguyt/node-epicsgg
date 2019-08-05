import BaseClient from '../BaseClient';

export default class Store {
    private baseClient: BaseClient;

    public constructor(baseClient: BaseClient) {
        this.baseClient = baseClient;
    }

    public getPacks(page: number = 1, categoryId: number = 1, gameId: number = 1): Promise<Pack[]> {
        return this.baseClient.get('packs?categoryId=' + categoryId + '&gameId=' + gameId + '&page=' + page + '').then(
            (result): Promise<Pack[]> => {
                return new Promise((resolve): void => {
                    const data: Pack[] = [];

                    for (let i = 0; i < result.length; i += 1) {
                        let pack: Pack = {
                            id: result[i].id,
                            name: result[i].name,
                            description: result[i].description,
                            categoryId: result[i].categoryId,
                            packType: result[i].packType,
                            packPrimary: result[i].packPrimary,
                            packPrimaryId: result[i].packPrimaryId,
                            openType: result[i].openType,

                            cost: result[i].cost,
                            costType: result[i].costType,
                            sale: result[i].sale,
                            saleCost: result[i].saleCost,

                            cardCount: result[i].cardCount,
                            entityCount: result[i].entityCount,
                            available: result[i].inventoryCount,
                            userLimit: result[i].userLimit,

                            starter: result[i].starter,
                            limited: result[i].limited,
                            comingSoon: result[i].comingSoon,

                            releaseTime: new Date(result[i].releaseTime),
                            startDate: new Date(result[i].purchaseStart),
                            endDate: new Date(result[i].purchaseEnd),

                            properties: {
                                seasons: result[i].properties.seasons,
                                gameIds: result[i].properties.game_ids,
                                orderMessageMin: result[i].properties.order_message_min,
                            },

                            images: result[i].images,
                            videos: result[i].videos,

                            odds: result[i].treatmentChance,
                        };

                        data.push(pack);
                    }

                    resolve(data);
                });
            }
        );
    }

    public buyPack(
        packTemplateId: number,
        amount: number = 1,
        categoryId: number = 1,
        gameId: number = 1
    ): Promise<number[]> {
        return this.baseClient
            .post('packs/buy?categoryId=' + categoryId + '&gameId=' + gameId + '', {
                amount,
                packTemplateId,
            })
            .then(
                (result): Promise<number[]> => {
                    return new Promise((resolve): void => {
                        const data: number[] = result;

                        resolve(data);
                    });
                }
            );
    }
}
