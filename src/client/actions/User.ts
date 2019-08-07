import { Card } from '../../interfaces/Card';
import { UserMarketListings } from '../../interfaces/UserMarketListings';
import { MarketListing } from '../../interfaces/MarketListing';

import BaseClient from '../BaseClient';

import CardUtils from '../utils/Card';

export default class User {
    private baseClient: BaseClient;

    public constructor(baseClient: BaseClient) {
        this.baseClient = baseClient;
    }

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
