import BaseClient from '../BaseClient';
import { Card } from '../../interfaces/Card';

export default class Trade {
    private baseClient: BaseClient;

    public constructor(baseClient: BaseClient) {
        this.baseClient = baseClient;
    }

    public createOffer(userId: number, cards: Card[], categoryId: number = 1, gameId: number = 1): Promise<number> {
        const entities = [];

        for (let i = 0; i < cards.length; i += 1) {
            // Should throw an error is isMarketList = true

            entities.push({
                cardTemplateId: cards[i].template.id,
                ethStatus: 'none',
                ethTransactions: [],
                id: cards[i].id,
                images: cards[i].images,
                isGhost: cards[i].isGhost,
                isMarketList: cards[i].isOnMarket,
                isNewCardTemplate: cards[i].isNewTemplate,
                isTradeList: true,
                mintBatch: cards[i].mint.batch,
                mintNumber: cards[i].mint.value,
                rating: cards[i].rating,
                signatureImage: cards[i].signatureImage,
                type: cards[i].type,
                uuid: cards[i].uuid,
            });
        }

        return this.baseClient
            .post('trade/create-offer?categoryId=' + categoryId + '&gameId=' + gameId + '', {
                entities: entities,
                user1Balance: 0,
                user2Balance: 0,
                user2Id: '' + userId + '',
            })
            .then(
                (result): Promise<number> => {
                    return new Promise((resolve): void => {
                        resolve(result.tradeId as number);
                    });
                }
            );
    }
}
