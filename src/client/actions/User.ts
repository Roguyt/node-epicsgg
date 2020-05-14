import { Owned } from '../../interfaces/Owned';
import { Card } from '../../interfaces/Card';
import { Sticker } from '../../interfaces/Sticker';
import { UserMarketListings } from '../../interfaces/UserMarketListings';
import { UserData } from '../../interfaces/UserData';
import { UserPack } from '../../interfaces/UserPack';

import BaseClient from '../BaseClient';

import CardUtils from '../utils/Card';
import MarketUtils from '../utils/Market';
import StickerUtils from '../utils/Sticker';
import PackUtils from '../utils/Pack';
import DateUtils from '../utils/Date';
import { UserFund } from '../../interfaces/UserFund';
import { UserSummary } from '../../interfaces/UserSummary';
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

        const data: UserData[] = result.map((user: any) => ({
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            group: user.group,
        }));

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

    public async getUserSummary(userId: number, season?: number | string): Promise<UserSummary> {
        const result = await this.baseClient.get(`collections/users/${userId}/user-summary`, {
            seasons: season?.toString(),
        });

        const data: UserSummary = {
            collections: result.map((collection: any) => ({
                count: collection.count,
                rank: collection.rank,
                score: collection.score,
                total: collection.total,
                collection: {
                    id: collection.collection.id,
                    name: collection.collection.name,
                    description: collection.collection.description,
                    categoryId: collection.collection.categoryId,
                    visible: collection.collection.visible,
                    properties: {
                        tiers: collection.collection.properties.tiers,
                        gameIds: collection.collection.properties.game_ids,
                        seasons: collection.collection.properties.seasons,
                        teamIds: collection.collection.properties.team_ids,
                        types: collection.collection.properties.types,
                    },
                    created: DateUtils.convertToDate(collection.collection.created),
                    updated: DateUtils.convertToDate(collection.collection.updated),
                    images: collection.collection.images,
                },
            })),
        };

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

        return {
            cards: result.cards.map(CardUtils.createCard),
            stickers: result.stickers.map(StickerUtils.createSticker),
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

        return result.map(CardUtils.createCard);
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

        return result.map(StickerUtils.createSticker);
    }

    /**
     * Get the showcased cards of a given user id
     * @param userId the user id to get its cards
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getShowcasedCards(userId: number): Promise<Card[]> {
        const result = await this.baseClient.get(`showcase/${userId}/all`);

        const data: Card[] = result.cards.map(CardUtils.createCard);

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
            marketListings: result.market.map(MarketUtils.createMarketListing),
        };

        return data;
    }

    /**
     * Get the owned packs of the currently authenticated user
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getPacks(): Promise<UserPack[]> {
        const result = await this.baseClient.get(`packs/user`);

        const data: UserPack[] = result.packs.map((pack: any) => ({
            id: pack.id,
            type: pack.type,
            packTemplate: PackUtils.createPack(pack.packTemplate),
        }));

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

        const data: Card[] = result.cards.map(CardUtils.createCard);

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
