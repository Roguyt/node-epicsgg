import BaseClient from '../BaseClient';

import CardUtils from '../utils/Card';

import { MarketTemplate } from '../../interfaces/MarketTemplate';
import { MarketListing } from '../../interfaces/MarketListing';

export default class Market {
    private baseClient: BaseClient;

    /**
     * @hidden
     */
    public constructor(baseClient: BaseClient) {
        this.baseClient = baseClient;
    }

    /**
     * Get the marketplace templates (list of CardTemplates with the lowest price)
     *  #### List of filters
     *  - season: ```Founders, 2017, 2018, 2019```
     *  - price: ```asc, desc```
     *  - need (need only): boolean
     *  - signed: boolean
     *  - teamId
     *  - playerId
     *  - treatmentId
     *  - cardRarity: ```To be updqted```
     *  - tier: ```To be updqted```
     * @param page the page to get
     * @param filters the filters to be used in the request
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getMarketplaceTemplates(
        page = 1,
        filters: Record<string, string | boolean>,
        categoryId = 1,
        gameId = 1
    ): Promise<MarketTemplate[]> {
        let url = `market/templates?categoryId=${categoryId}&gameId=${gameId}&page${page}&type=card`;

        Object.keys(filters).forEach((param): void => {
            url += `&${param}=${filters[param]}`;
        });

        return this.baseClient.get(url).then(
            (result): Promise<MarketTemplate[]> => {
                return new Promise((resolve): void => {
                    const data: MarketTemplate[] = [];

                    for (let i = 0; i < result.templates.length; i += 1) {
                        const marketTemplate: MarketTemplate = {
                            entityTemplateId: result.templates[i].entityTemplateId,
                            isUserNeed: result.templates[i].isUserNeed,
                            lowestPrice: result.templates[i].lowestPrice,
                            cardTemplate: CardUtils.createCardTemplate(result.templates[i].cardTemplate),
                        };

                        data.push(marketTemplate);
                    }

                    resolve(data);
                });
            }
        );
    }

    /**
     * Get the market listings for a given cardId
     * @param cardId the cardId of the listings you want to get
     * @param page the page to get
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getListings(cardId: number, page = 1, categoryId = 1, gameId = 1): Promise<MarketListing[]> {
        return this.baseClient
            .get(
                `market/buy?categoryId=${categoryId}&gameId=${gameId}&page=${page}&sort=price&templateId=${cardId}&type=card`
            )
            .then(
                (result): Promise<MarketListing[]> => {
                    return new Promise((resolve): void => {
                        const data: MarketListing[] = [];

                        if (!result.market[0]) {
                            return resolve(data);
                        }

                        for (let i = 0; i < result.market[0].length; i += 1) {
                            const marketListing: MarketListing = {
                                marketId: result.market[0][i].marketId,

                                price: result.market[0][i].price,
                                previousAvgPrice: {
                                    value: null,
                                    date: null,
                                },
                                currentAvgHourPrice: {
                                    value: null,
                                    date: null,
                                },

                                createdAt: new Date(result.market[0][i].created),

                                type: result.market[0][i].type,
                                card: CardUtils.createACard(result.market[0][i].card),
                            };

                            if (result.market[0][i].previousAvgPrice !== null) {
                                marketListing.previousAvgPrice.value = result.market[0][i].previousAvgPrice.statValue;
                                marketListing.previousAvgPrice.date = new Date(
                                    result.market[0][i].previousAvgPrice.statValue
                                );
                            }

                            if (result.market[0][i].currentHourPrice !== null) {
                                marketListing.currentAvgHourPrice.value =
                                    result.market[0][i].currentHourPrice.statValue;
                                marketListing.currentAvgHourPrice.date = new Date(
                                    result.market[0][i].currentHourPrice.statValue
                                );
                            }

                            data.push(marketListing);
                        }

                        return resolve(data);
                    });
                }
            );
    }

    /**
     * Create a listing for the given entity id
     * @param id the entity id
     * @param type of the entity
     * @param price price of the listing
     * @param minOffer minOffer value (no minOffer if empty)
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public createListing(
        id: number,
        type: string,
        price: number,
        minOffer?: number,
        categoryId = 1,
        gameId = 1
    ): Promise<number> {
        const data: Record<string, string | number> = {
            id,
            price,
            type,
        };

        if (minOffer) {
            data.minOffer = minOffer;
        }

        return this.baseClient.post(`market/list?categoryId=${categoryId}&gameId=${gameId}`, data).then(
            (result): Promise<number> => {
                return new Promise((resolve): void => {
                    resolve(result.marketId);
                });
            }
        );
    }

    /**
     * Remove a given listingId
     * @param listingId listingId to remove
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public removeListing(listingId: number, categoryId = 1, gameId = 1): Promise<void> {
        return this.baseClient.delete(`market/listed/${listingId}?categoryId=${categoryId}&gameId=${gameId}`).then(
            (): Promise<void> => {
                return new Promise((resolve): void => {
                    resolve();
                });
            }
        );
    }

    /**
     * Buy a market element
     * @param marketId the marketId you want to buy
     * @param price it's price (?)
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public buy(marketId: number, price: number, categoryId = 1, gameId = 1): Promise<void> {
        return this.baseClient
            .post(`market/buy?categoryId=${categoryId}&gameId=${gameId}`, {
                marketId,
                price,
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
     * Create a counter offer for a given listing
     * @param marketId listing id
     * @param currentPrice the current price
     * @param counterPrice the counter offer price
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public makeCounterOffer(
        marketId: number,
        currentPrice: number,
        counterPrice: number,
        categoryId = 1,
        gameId = 1
    ): Promise<void> {
        return this.baseClient
            .post(`market/counter-offers?categoryId=${categoryId}&gameId=${gameId}`, {
                marketId,
                currentPrice,
                counterPrice,
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
     * Withdraw a counter offer
     * @param counterOfferId counterOfferId to withdraw
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public cancelCounterOffer(counterOfferId: number, categoryId = 1, gameId = 1): Promise<void> {
        return this.baseClient
            .delete(`market/counter-offers/${counterOfferId}?categoryId=${categoryId}&gameId=${gameId}`)
            .then(
                (): Promise<void> => {
                    return new Promise((resolve): void => {
                        resolve();
                    });
                }
            );
    }

    /**
     * Accept a counter offer
     * @param counterOfferId the counterOfferId to accept
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public acceptCounterOffer(counterOfferId: number, categoryId = 1, gameId = 1): Promise<void> {
        return this.baseClient
            .patch(`market/counter-offers/accept?categoryId=${categoryId}&gameId=${gameId}`, {
                offerId: counterOfferId,
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
     * Decline a given counter offer
     * @param counterOfferId the counterOfferId to decline
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public declineCounterOffer(counterOfferId: number, categoryId = 1, gameId = 1): Promise<void> {
        return this.baseClient
            .patch(`market/counter-offers/decline?categoryId=${categoryId}&gameId=${gameId}`, {
                offerId: counterOfferId,
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
