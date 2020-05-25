import BaseClient from '../BaseClient';

import CardUtils from '../utils/Card';
import MarketUtils from '../utils/Market';
import StickerUtils from '../utils/Sticker';
import PackUtils from '../utils/Pack';

import { MarketListing } from '../../interfaces/MarketListing';
import { MarketTemplate } from '../../interfaces/MarketTemplate';

import EntityType from '../../enums/entityType';

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
     * @param type the type of the entity
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getMarketplaceTemplates(
        page = 1,
        filters: Record<string, string | boolean>,
        type: EntityType = EntityType.card
    ): Promise<MarketTemplate[]> {
        if (!(type in EntityType)) {
            throw new Error(`This isn't a valid entity type`);
        }

        const result = await this.baseClient.get('market/templates', {
            page,
            type,
            ...filters,
        });

        const data: MarketTemplate[] = result.templates.map((template: any) => {
            const marketTemplate: MarketTemplate = {
                entityTemplateId: template.entityTemplateId,
                isUserNeed: template.isUserNeed,
                lowestPrice: template.lowestPrice,
            };

            if (template.cardTemplate)
                marketTemplate.cardTemplate = CardUtils.createCardTemplate(template.cardTemplate);
            if (template.stickerTemplate)
                marketTemplate.stickerTemplate = StickerUtils.createStickerTemplate(template.stickerTemplate);
            if (template.packTemplate)
                marketTemplate.packTemplate = PackUtils.createPackTemplate(template.packTemplate);

            return marketTemplate;
        });

        return data;
    }

    /**
     * Get the market listings for a given cardId
     * @param templateId the templateId of the listings you want to get
     * @param page the page to get
     * @param sort price / ?
     * @param type the type of the entity
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getListings(
        templateId: number,
        page = 1,
        sort?: string,
        type: EntityType = EntityType.card
    ): Promise<MarketListing[]> {
        if (!(type in EntityType)) {
            throw new Error(`This isn't a valid entity type`);
        }

        const result = await this.baseClient.get('market/buy', {
            templateId,
            page,
            sort,
            type,
        });

        if (!result.market[0]) {
            return [];
        }

        const data: MarketListing[] = result.market[0].map(MarketUtils.createMarketListing);

        return data;
    }

    /**
     * Create a listing for the given entity id
     * @param id the entity id
     * @param type the type of the entity
     * @param price price of the listing
     * @param minOffer minOffer value (no minOffer if empty)
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async createListing(
        id: number,
        type: EntityType = EntityType.card,
        price: number,
        minOffer?: number
    ): Promise<number> {
        if (!(type in EntityType)) {
            throw new Error(`This isn't a valid entity type`);
        }

        const result = await this.baseClient.post(`market/list`, {
            id,
            price,
            type,
            minOffer,
        });

        return result.marketId;
    }

    /**
     * Remove a given listingId
     * @param listingId listingId to remove
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async removeListing(listingId: number): Promise<void> {
        await this.baseClient.delete(`market/listed/${listingId}`);
    }

    /**
     * Buy a market element
     * @param marketId the marketId you want to buy
     * @param price it's price (?)
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async buy(marketId: number, price: number): Promise<void> {
        await this.baseClient.post(`market/buy`, {
            marketId,
            price,
        });
    }

    /**
     * Create a counter offer for a given listing
     * @param marketId listing id
     * @param currentPrice the current price
     * @param counterPrice the counter offer price
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async makeCounterOffer(marketId: number, currentPrice: number, counterPrice: number): Promise<void> {
        await this.baseClient.post(`market/counter-offers`, {
            marketId,
            currentPrice,
            counterPrice,
        });
    }

    /**
     * Withdraw a counter offer
     * @param counterOfferId counterOfferId to withdraw
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async cancelCounterOffer(counterOfferId: number): Promise<void> {
        await this.baseClient.delete(`market/counter-offers/${counterOfferId}`);
    }

    /**
     * Accept a counter offer
     * @param counterOfferId the counterOfferId to accept
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async acceptCounterOffer(counterOfferId: number): Promise<void> {
        await this.baseClient.patch(`market/counter-offers/accept`, {
            offerId: counterOfferId,
        });
    }

    /**
     * Decline a given counter offer
     * @param counterOfferId the counterOfferId to decline
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async declineCounterOffer(counterOfferId: number): Promise<void> {
        await this.baseClient.patch(`market/counter-offers/decline`, {
            offerId: counterOfferId,
        });
    }
}
