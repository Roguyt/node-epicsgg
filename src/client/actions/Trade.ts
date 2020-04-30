import BaseClient from '../BaseClient';

import { Card } from '../../interfaces/Card';
import { Sticker } from '../../interfaces/Sticker';
import { TradeData } from '../../interfaces/TradeData';

import DateUtils from '../utils/Date';
import CardUtils from '../utils/Card';
import PackUtils from '../utils/Pack';
import StickerUtils from '../utils/Sticker';
import { QueryParams } from '../../interfaces/QueryParams';
import { BodyData } from '../../interfaces/BodyData';

export default class Trade {
    private baseClient: BaseClient;

    /**
     * @hidden
     */
    public constructor(baseClient: BaseClient) {
        this.baseClient = baseClient;
    }

    /**
     * Get a list of the current user's offers
     * @param page the page to get (1 page = 100 treatments)
     * @param status the status of the offers
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getOffers(page = 1, status: string = null): Promise<TradeData[]> {
        const params: QueryParams = {
            page,
        };

        if (status !== null) {
            params.status = status;
        }

        return this.baseClient.get('trade', params).then(
            (result): Promise<TradeData[]> => {
                return new Promise((resolve): void => {
                    const trades: TradeData[] = [];

                    for (let i = 0; i < result.trades.length; i += 1) {
                        const currentTrade = result.trades[i];

                        const tradeData: TradeData = {
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
     * @param stickers
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public createOffer(userId: number, cards: Card[], stickers: Sticker[]): Promise<number> {
        const body: BodyData = {
            user1Balance: 0,
            user2Balance: 0,
            user2Id: userId.toString(),
        };

        const entities = [];

        for (let i = 0; i < cards.length; i += 1) {
            // TODO: Should throw an error is isMarketList = true

            entities.push({
                id: cards[i].id,
                type: 'card',
            });
        }

        for (let i = 0; i < stickers.length; i += 1) {
            entities.push({
                id: stickers[i].id,
                type: 'sticker',
            });
        }

        body.entities = entities;

        return this.baseClient.post(`trade/create-offer`, body).then(
            (result): Promise<number> => {
                return new Promise((resolve): void => {
                    resolve(result.tradeId as number);
                });
            }
        );
    }

    /**
     * Accept a given tradeId
     * @param tradeId the tradeId to accept
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public acceptOffer(tradeId: number, categoryId = 1, gameId = 1): Promise<void> {
        return this.baseClient
            .patch(`trade/accept-offer/?categoryId=${categoryId}&gameId=${gameId}`, {
                tradeId,
            })
            .then(
                (): Promise<void> => {
                    return new Promise((resolve): void => {
                        resolve();
                    });
                }
            );
    }

    /**
     * Decline a given tradeId
     * @param tradeId
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public declineOffer(tradeId: number, categoryId = 1, gameId = 1): Promise<void> {
        return this.baseClient
            .patch(`trade/decline-offer/?categoryId=${categoryId}&gameId=${gameId}`, {
                tradeId,
            })
            .then(
                (): Promise<void> => {
                    return new Promise((resolve): void => {
                        resolve();
                    });
                }
            );
    }
}
