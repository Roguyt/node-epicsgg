import { CardTemplate } from '../../interfaces/CardTemplate';
import { StickerTemplate } from '../../interfaces/StickerTemplate';
import { Treatment } from '../../interfaces/Treatment';
import RestClient from '../rest.client';
import CardUtils from '../utils/Card';
import StickerUtils from '../utils/Sticker';

export default class Library {
    private baseClient: RestClient;

    public constructor(baseClient: RestClient) {
        this.baseClient = baseClient;
    }

    /**
     * Get a list of Treatments
     * @param page the page to get (1 page = 100 treatments)
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getTreatments(page = 1): Promise<Treatment[]> {
        const result = await this.baseClient.get(`treatments`, {
            page,
        });

        const data: Treatment[] = result.treatments.map((treatment: any) => ({
            id: treatment.id,
            name: treatment.name,
            categoryId: treatment.categoryId,
            designation: treatment.designation,
            tier: treatment.tier,
            active: treatment.active,
            variation: treatment.variation,
            gameSide: treatment.gameSide,
            accentColor: treatment.accentColor,
            artistName: treatment.artistName,
            season: treatment.season,
            buyPrice: treatment.buyPrice,
            images: treatment.images,
            videos: treatment.videos,
        }));

        return data;
    }

    /**
     * Get a list of CardTemplate given a collection id
     * @param collectionId the collection id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getCollectionCardTemplates(collectionId: number): Promise<CardTemplate[]> {
        const result = await this.baseClient.get(`collections/${collectionId}/card-templates`);

        const data: CardTemplate[] = result.map(CardUtils.createCardTemplate);

        return data;
    }

    /**
     * Get a list of StickerTemplate given a collection id
     * @param collectionId the collection id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getCollectionStickerTemplates(collectionId: number): Promise<StickerTemplate[]> {
        const result = await this.baseClient.get(`collections/${collectionId}/sticker-templates`);

        const data: StickerTemplate[] = result.map(StickerUtils.createStickerTemplate);

        return data;
    }
}
