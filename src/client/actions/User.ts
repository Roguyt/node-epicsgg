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
import { CardIds } from '../../interfaces/CardIds';
import { StickerIds } from '../../interfaces/StickerIds';

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
    public async searchUsers(username: string): Promise<UserData[]> {
        const result = await this.baseClient.get(`users/search`, {
            username,
        });
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

        return data;
    }

    /**
     * Get the funds of the currently authenticated user
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getFunds(): Promise<UserFund> {
        const result = await this.baseClient.get(`user/funds`);
        const data: UserFund = {
            epiCoins: result.epicoins,
            silverCoins: result.silvercoins,
            craftingCoins: result.craftingcoins,
        };

        return data;
    }

    public async getUserSummary(userId: number, season: number | string = ''): Promise<UserSummary> {
        const result = await this.baseClient.get(`collections/users/${userId}/user-summary`, {
            season: season.toString(),
        });
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

        return data;
    }

    /**
     * Get the owned cards and stickers of a given user id and a given collection id
     * @param userId the user id to get its cards
     * @param collectionId the collection id to get its cards
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getOwned(userId: number, collectionId: number): Promise<Owned> {
        const result = await this.baseClient.get(`collections/${collectionId}/users/${userId}/owned2`);
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

        return {
            cards,
            stickers,
        };
    }

    /**
     * Get the cards ids of a given user and a given collection
     * @param userId the user id to get its cards ids
     * @param collectionId the collection of the cards to get
     */
    public async getCardIds(userId: number, collectionId: number): Promise<CardIds[]> {
        const result = await this.baseClient.get(`collections/users/${userId}/cardids`, {
            collectionId,
        });

        return result.map((cardIds: any) => ({
            templateId: cardIds.cardTemplateId,
            ids: cardIds.cardIds,
        }));
    }

    /**
     * Get the cards of a given user and a given cardTemplate
     * @param userId the user id to get its cards
     * @param cardTemplateId the cardTemplateId of the cards to get
     */
    public async getCards(userId: number, cardTemplateId: number): Promise<Card[]> {
        const result = await this.baseClient.get(`collections/users/${userId}/card-templates/${cardTemplateId}/cards`);

        return result.map(CardUtils.createACard);
    }

    /**
     * Get the stickers ids of a given user and a given collection
     * @param userId the user id to get its stickers ids
     * @param collectionId the collection of the stickers to get
     */
    public async getStickerIds(userId: number, collectionId: number): Promise<StickerIds[]> {
        const result = await this.baseClient.get(`collections/users/${userId}/stickerids`, {
            collectionId,
        });

        return result.map((stickerIds: any) => ({
            templateId: stickerIds.stickerTemplateId,
            ids: stickerIds.stickerIds,
        }));
    }

    /**
     * Get the stickers of a given user and a given stickerTemplate
     * @param userId the user id to get its stickers
     * @param stickerTemplateId the stickerTemplateId of the stickers to get
     */
    public async getStickers(userId: number, stickerTemplateId: number): Promise<Sticker[]> {
        const result = await this.baseClient.get(
            `collections/users/${userId}/sticker-templates/${stickerTemplateId}/stickers`
        );

        return result.map(StickerUtils.createASticker);
    }

    /**
     * Get the showcased cards of a given user id
     * @param userId the user id to get its cards
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getShowcasedCards(userId: number): Promise<Card[]> {
        const result = await this.baseClient.get(`showcase/${userId}/all`);
        const data: Card[] = [];

        for (let i = 0; i < result.cards.length; i += 1) {
            const card = result.cards[i];
            const cardData: Card = CardUtils.createACard(card);

            data.push(cardData);
        }

        return data;
    }

    /**
     * Get the market listings of a given user id
     * @param userId the user id to get its cards
     * @param page the page to get (1 page = 40 Market listings)
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getMarketListings(userId: number, page = 1): Promise<UserMarketListings> {
        const result = await this.baseClient.get(`market/listed/users/${userId}`, {
            userId,
            page,
        });
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
                marketListing.currentAvgHourPrice.date = new Date(result.market[i].currentHourPrice.statDate);
            }

            data.marketListings.push(marketListing);
        }

        return data;
    }

    /**
     * Get the owned packs of the currently authenticated user
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getPacks(): Promise<UserPack[]> {
        const result = await this.baseClient.get(`packs/user`);
        const data: UserPack[] = [];

        for (let i = 0; i < result.packs.length; i += 1) {
            data.push({
                id: result.packs[i].id,
                type: result.packs[i].type,
                packTemplate: PackUtils.createAPack(result.packs[i].packTemplate),
            });
        }

        return data;
    }

    /**
     * Open a given packId from the authenticated user
     * @param packId the pack id to open
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async openPack(packId: number): Promise<Card[]> {
        const result = await this.baseClient.post(`packs/open2`, {
            packId,
        });
        const data: Card[] = [];

        for (let i = 0; i < result.cards.length; i += 1) {
            data.push(CardUtils.createACard(result.cards[i]));
        }

        return data;
    }

    /**
     * Redeem a given card
     * @param cardId the card id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async redeemCard(cardId: number): Promise<void> {
        await this.baseClient.post(`cards/redeem/${cardId}`);
    }
}
