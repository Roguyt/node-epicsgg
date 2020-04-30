import { Owned } from '../../interfaces/Owned';
import { Card } from '../../interfaces/Card';
import { Sticker } from '../../interfaces/Sticker';
import { MarketListing } from '../../interfaces/MarketListing';
import { UserMarketListings } from '../../interfaces/UserMarketListings';
import { UserData } from '../../interfaces/UserData';
import { UserPack } from '../../interfaces/UserPack';

import BaseClient from '../BaseClient';

import CardUtils from '../utils/Card';
import StickerUtils from '../utils/Sticker';
import PackUtils from '../utils/Pack';
import DateUtils from '../utils/Date';
import { UserFund } from '../../interfaces/UserFund';
import { UserSummary } from '../../interfaces/UserSummary';
import { UserCollection } from '../../interfaces/UserCollection';
import { QueryParams } from '../../interfaces/QueryParams';

export default class User {
    private baseClient: BaseClient;

    /**
     * @hidden
     */
    public constructor(baseClient: BaseClient) {
        this.baseClient = baseClient;
    }

    /**
     * Search players with a given string
     * @param username the username to search
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public searchUsers(username: string): Promise<UserData[]> {
        const params: QueryParams = {
            username,
        };

        return this.baseClient.get(`users/search`, params).then(
            (result): Promise<UserData[]> => {
                return new Promise((resolve): void => {
                    const data: UserData[] = [];

                    for (let i = 0; i < result.length; i += 1) {
                        const user = result[i];

                        data.push({
                            id: user.id,
                            username: user.username,
                            avatar: user.avatar,
                            group: user.group,
                        });
                    }

                    resolve(data);
                });
            }
        );
    }

    /**
     * Get the funds of the currently authenticated user
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getFunds(): Promise<UserFund> {
        return this.baseClient.get(`user/funds`).then(
            (result): Promise<UserFund> => {
                return new Promise((resolve): void => {
                    const data: UserFund = {
                        epiCoins: result.epicoins,
                        silverCoins: result.silvercoins,
                        craftingCoins: result.craftingcoins,
                    };

                    resolve(data);
                });
            }
        );
    }

    public getUserSummary(userId: number, season: number | string = ''): Promise<UserSummary> {
        const params: QueryParams = {
            season: season.toString(),
        };

        return this.baseClient.get(`collections/users/${userId}/user-summary`, params).then(
            (result): Promise<UserSummary> => {
                return new Promise((resolve): void => {
                    const data: UserSummary = {
                        collections: [],
                    };

                    for (let i = 0; i < result.length; i += 1) {
                        const temp: UserCollection = {
                            count: result[i].count,
                            rank: result[i].rank,
                            score: result[i].score,
                            total: result[i].total,
                            collection: {
                                id: result[i].collection.id,
                                name: result[i].collection.name,
                                description: result[i].collection.description,
                                categoryId: result[i].collection.categoryId,
                                visible: result[i].collection.visible,
                                properties: {
                                    tiers: result[i].collection.properties.tiers,
                                    gameIds: result[i].collection.properties.game_ids,
                                    seasons: result[i].collection.properties.seasons,
                                    teamIds: result[i].collection.properties.team_ids,
                                    types: result[i].collection.properties.types,
                                },
                                created: DateUtils.convertToDate(result[i].collection.created),
                                updated: DateUtils.convertToDate(result[i].collection.updated),
                                images: result[i].collection.images,
                            },
                        };
                        data.collections.push(temp);
                    }

                    resolve(data);
                });
            }
        );
    }

    /**
     * Get the owned cards and stickers of a given user id and a given collection id
     * @param userId the user id to get its cards
     * @param collectionId the collection id to get its cards
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getOwned(userId: number, collectionId: number): Promise<Owned> {
        return this.baseClient.get(`collections/${collectionId}/users/${userId}/owned2`).then(
            (result): Promise<Owned> => {
                return new Promise((resolve): void => {
                    const cards: Card[] = [];

                    for (let i = 0; i < result.cards.length; i += 1) {
                        const card = result.cards[i];
                        const cardData: Card = CardUtils.createACard(card);

                        cards.push(cardData);
                    }

                    const stickers: Sticker[] = [];

                    for (let i = 0; i < result.stickers.length; i += 1) {
                        const sticker = result.stickers[i];
                        const stickerData: Sticker = StickerUtils.createASticker(sticker);

                        stickers.push(stickerData);
                    }

                    resolve({
                        cards,
                        stickers,
                    });
                });
            }
        );
    }

    /**
     * Get the showcased cards of a given user id
     * @param userId the user id to get its cards
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getShowcasedCards(userId: number): Promise<Card[]> {
        return this.baseClient.get(`showcase/${userId}/all`).then(
            (result): Promise<Card[]> => {
                return new Promise((resolve): void => {
                    const data: Card[] = [];

                    for (let i = 0; i < result.cards.length; i += 1) {
                        const card = result.cards[i];
                        const cardData: Card = CardUtils.createACard(card);

                        data.push(cardData);
                    }

                    resolve(data);
                });
            }
        );
    }

    /**
     * Get the market listings of a given user id
     * @param userId the user id to get its cards
     * @param page the page to get (1 page = 40 Market listings)
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getMarketListings(userId: number, page = 1): Promise<UserMarketListings> {
        const params: QueryParams = {
            userId,
            page,
        };

        return this.baseClient.get(`market/listed/users/${userId}`, params).then(
            (result): Promise<UserMarketListings> => {
                return new Promise((resolve): void => {
                    const data: UserMarketListings = {
                        count: result.count,
                        total: result.total,
                        marketListings: [],
                    };

                    for (let i = 0; i < result.market.length; i += 1) {
                        const marketListing: MarketListing = {
                            marketId: result.market[i].marketId,
                            price: result.market[i].price,
                            currentAvgHourPrice: {
                                date: null,
                                value: null,
                            },
                            previousAvgPrice: {
                                date: null,
                                value: null,
                            },
                            createdAt: new Date(result.market[i].created),
                            type: result.market[i].type,
                            card: CardUtils.createACard(result.market[i].card),
                        };

                        if (result.market[i].previousAvgPrice !== null) {
                            marketListing.previousAvgPrice.value = result.market[i].previousAvgPrice.statValue;
                            marketListing.previousAvgPrice.date = new Date(result.market[i].previousAvgPrice.statDate);
                        }

                        if (result.market[i].currentHourPrice !== null) {
                            marketListing.currentAvgHourPrice.value = result.market[i].currentHourPrice.statValue;
                            marketListing.currentAvgHourPrice.date = new Date(
                                result.market[i].currentHourPrice.statDate
                            );
                        }

                        data.marketListings.push(marketListing);
                    }

                    resolve(data);
                });
            }
        );
    }

    /**
     * Get the owned packs of the currently authenticated user
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getPacks(): Promise<UserPack[]> {
        return this.baseClient.get(`packs/user`).then(
            (result): Promise<UserPack[]> => {
                return new Promise((resolve): void => {
                    const data: UserPack[] = [];

                    for (let i = 0; i < result.packs.length; i += 1) {
                        data.push({
                            id: result.packs[i].id,
                            type: result.packs[i].type,
                            packTemplate: PackUtils.createAPack(result.packs[i].packTemplate),
                        });
                    }

                    resolve(data);
                });
            }
        );
    }

    /**
     * Open a given packId from the authenticated user
     * @param packId the pack id to open
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public openPack(packId: number, categoryId = 1, gameId = 1): Promise<Card[]> {
        return this.baseClient
            .post(`packs/open2?categoryId=${categoryId}&gameId=${gameId}`, {
                packId,
            })
            .then(
                (result): Promise<Card[]> => {
                    return new Promise((resolve): void => {
                        const data: Card[] = [];

                        for (let i = 0; i < result.cards.length; i += 1) {
                            data.push(CardUtils.createACard(result.cards[i]));
                        }

                        resolve(data);
                    });
                }
            );
    }

    /**
     * Redeem a given card
     * @param cardId the card id
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public redeemCard(cardId: number, categoryId = 1, gameId = 1): Promise<null> {
        return this.baseClient
            .post(`cards/redeem/${cardId.toString()}?categoryId=${categoryId}&gameId=${gameId}`, {})
            .then(
                (): Promise<null> => {
                    return new Promise((resolve): void => {
                        resolve(null);
                    });
                }
            );
    }
}
