import { Card } from '../../interfaces/Card';
import { MarketListing } from '../../interfaces/MarketListing';
import { UserMarketListings } from '../../interfaces/UserMarketListings';
import { UserData } from '../../interfaces/UserData';

import BaseClient from '../BaseClient';

import CardUtils from '../utils/Card';

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
     * @param search the text to search
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public searchUsers(search: string, categoryId: number, gameId: number): Promise<UserData[]> {
        return this.baseClient
            .get('users/search?username=' + search + '&categoryId=' + categoryId + '&gameId=' + gameId + '')
            .then(
                (result): Promise<UserData[]> => {
                    return new Promise((resolve): void => {
                        const data: UserData[] = [];

                        for (let i = 0; i < result.length; i += 1) {
                            let user = result[i];

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
     * Get the owned cards of a given user id and a given collection id
     * @param userId the user id to get its cards
     * @param collectionId the collection id to get its cards
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getOwnedCards(
        userId: number,
        collectionId: number,
        categoryId: number = 1,
        gameId: number = 1
    ): Promise<Card[]> {
        return this.baseClient
            .get(
                'collections/' +
                    collectionId +
                    '/users/' +
                    userId +
                    '/owned2?categoryId=' +
                    categoryId +
                    '&gameId=' +
                    gameId +
                    ''
            )
            .then(
                (result): Promise<Card[]> => {
                    return new Promise((resolve): void => {
                        const data: Card[] = [];

                        for (let i = 0; i < result.cards.length; i += 1) {
                            let card = result.cards[i];
                            let cardData: Card = CardUtils.createACard(card);

                            data.push(cardData);
                        }

                        resolve(data);
                    });
                }
            );
    }

    /**
     * Get the showcased cards of a given user id
     * @param userId the user id to get its cards
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getShowcasedCards(userId: number, categoryId: number = 1, gameId: number = 1): Promise<Card[]> {
        return this.baseClient
            .get('showcase/' + userId + '/all?categoryId=' + categoryId + '&gameId=' + gameId + '')
            .then(
                (result): Promise<Card[]> => {
                    return new Promise((resolve): void => {
                        const data: Card[] = [];

                        for (let i = 0; i < result.cards.length; i += 1) {
                            let card = result.cards[i];
                            let cardData: Card = CardUtils.createACard(card);

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
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getMarketListings(
        userId: number,
        page: number = 1,
        categoryId: number = 1,
        gameId: number = 1
    ): Promise<UserMarketListings> {
        return this.baseClient
            .get(
                'market/listed/users/' +
                    userId +
                    '?categoryId=' +
                    categoryId +
                    '&gameId=' +
                    gameId +
                    '&page=' +
                    page +
                    '&userId=' +
                    userId
            )
            .then(
                (result): Promise<UserMarketListings> => {
                    return new Promise((resolve): void => {
                        let data: UserMarketListings = {
                            count: result.count,
                            total: result.total,
                            marketListings: [],
                        };

                        for (let i = 0; i < result.market.length; i += 1) {
                            let marketListing: MarketListing;

                            marketListing = {
                                marketId: result.market[i].marketId,
                                price: result.market[i].price,
                                currentAvgHourPrice: {
                                    date: result.market[i].currentHourPrice.statDate,
                                    value: result.market[i].currentHourPrice.statValue,
                                },
                                previousAvgPrice: {
                                    date: result.market[i].previousAvgPrice.statDate,
                                    value: result.market[i].previousAvgPrice.statValue,
                                },
                                createdAt: new Date(result.market[i].created),
                                type: result.market[i].type,
                                card: CardUtils.createACard(result.market[i].card),
                            };

                            data.marketListings.push(marketListing);
                        }

                        resolve(data);
                    });
                }
            );
    }
}
