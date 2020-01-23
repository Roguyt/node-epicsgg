import BaseClient from '../BaseClient';

import { Card } from '../../interfaces/Card';
import { TradeData } from '../../interfaces/TradeData';

import DateUtils from '../utils/Date';
import CardUtils from '../utils/Card';
import PackUtils from '../utils/Pack';
import StickerUtils from '../utils/Sticker';

export default class Trade {
    private baseClient: BaseClient;

    /**
     * @hidden
     */
    public constructor(baseClient: BaseClient) {
        this.baseClient = baseClient;
    }

    /**
     * TODO:
     * @param page
     * @param status
     * @param categoryId
     * @param gameId
     */
    public getOffers(
        page: number = 1,
        status: string = '',
        categoryId: number = 1,
        gameId: number = 1
    ): Promise<TradeData[]> {
        let url = 'trade?categoryId=' + categoryId + '&gameId=' + gameId + '&page=' + page + '';

        if (status !== '') {
            url += '&status=' + status;
        }

        return this.baseClient.get(url).then(
            (result): Promise<TradeData[]> => {
                return new Promise((resolve): void => {
                    let trades: TradeData[] = [];

                    for (let i = 0; i < result.trades.length; i += 1) {
                        let currentTrade = result.trades[i];

                        let tradeData: TradeData = {
                            id: currentTrade.id,
                            status: currentTrade.status,
                            offeredBy: currentTrade.offeredBy,
                            message: currentTrade.message,

                            sender: {
                                user: {
                                    id: currentTrade.user1.id,
                                    username: currentTrade.user1.username,
                                    avatar: currentTrade.user1.avatar,
                                    group: currentTrade.user1.group,
                                },
                                balance: currentTrade.user1.tradeBalance,
                                count: currentTrade.user1.count,

                                cards: [],
                                stickers: [],
                                packs: [],
                            },

                            receiver: {
                                user: {
                                    id: currentTrade.user2.id,
                                    username: currentTrade.user2.username,
                                    avatar: currentTrade.user2.avatar,
                                    group: currentTrade.user2.group,
                                },

                                balance: currentTrade.user2.tradeBalance,
                                count: currentTrade.user2.count,

                                cards: [],
                                stickers: [],
                                packs: [],
                            },

                            createdAt: DateUtils.convertToDate(currentTrade.created),
                            updatedAt: DateUtils.convertToDate(currentTrade.updated),
                        };

                        for (let j = 0; j < currentTrade.user1.cards.length; j += 1) {
                            tradeData.sender.cards.push(CardUtils.createACard(currentTrade.user1.cards[j]));
                        }

                        for (let j = 0; j < currentTrade.user1.packs.length; j += 1) {
                            tradeData.sender.packs.push(PackUtils.createAPack(currentTrade.user1.packs[j]));
                        }

                        for (let j = 0; j < currentTrade.user1.stickers.length; j += 1) {
                            tradeData.sender.stickers.push(StickerUtils.createASticker(currentTrade.user1.stickers[j]));
                        }

                        for (let j = 0; j < currentTrade.user2.cards.length; j += 1) {
                            tradeData.receiver.cards.push(CardUtils.createACard(currentTrade.user2.cards[j]));
                        }

                        for (let j = 0; j < currentTrade.user2.packs.length; j += 1) {
                            tradeData.receiver.packs.push(PackUtils.createAPack(currentTrade.user2.packs[j]));
                        }

                        for (let j = 0; j < currentTrade.user2.stickers.length; j += 1) {
                            tradeData.receiver.stickers.push(
                                StickerUtils.createASticker(currentTrade.user2.stickers[j])
                            );
                        }

                        trades.push(tradeData);
                    }

                    resolve(trades);
                });
            }
        );
    }

    /**
     * Create a trade offer and send it to a giver user id and a given array of cards
     * @param userId
     * @param cards
     * @param categoryId
     * @param gameId
     * @returns a Promise resolved with the response or rejected in case of error
     */
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
