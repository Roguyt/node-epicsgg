import { CardTemplate } from '../../interfaces/CardTemplate';
import { Treatment } from '../../interfaces/Treatment';

import BaseClient from '../BaseClient';

import CardUtils from '../utils/Card';
import { QueryParams } from '../../interfaces/QueryParams';

export default class Library {
    private baseClient: BaseClient;

    public constructor(baseClient: BaseClient) {
        this.baseClient = baseClient;
    }

    /**
     * Get a list of Treatments
     * @param page the page to get (1 page = 100 treatments)
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getTreatments(page = 1): Promise<Treatment[]> {
        const params: QueryParams = {
            page,
        };

        return this.baseClient.get(`treatments`, params).then(
            (result): Promise<Treatment[]> => {
                return new Promise((resolve): void => {
                    const data: Treatment[] = [];

                    for (let i = 0; i < result.treatments.length; i += 1) {
                        const treatment: Treatment = {
                            id: result.treatments[i].id,
                            name: result.treatments[i].name,
                            categoryId: result.treatments[i].categoryId,
                            designation: result.treatments[i].designation,
                            tier: result.treatments[i].tier,
                            active: result.treatments[i].active,
                            variation: result.treatments[i].variation,
                            gameSide: result.treatments[i].gameSide,
                            accentColor: result.treatments[i].accentColor,
                            artistName: result.treatments[i].artistName,
                            season: result.treatments[i].season,
                            buyPrice: result.treatments[i].buyPrice,
                            images: result.treatments[i].images,
                            videos: result.treatments[i].videos,
                        };

                        data.push(treatment);
                    }

                    resolve(data);
                });
            }
        );
    }

    /**
     * Get a list of CardTemplate given a collection id
     * @param collectionId the collection id
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getCollectionCardTemplates(collectionId: number): Promise<CardTemplate[]> {
        return this.baseClient.get(`collections/${collectionId}/card-templates`).then(
            (result): Promise<CardTemplate[]> => {
                return new Promise((resolve): void => {
                    const data: CardTemplate[] = [];

                    for (let i = 0; i < result.length; i += 1) {
                        const cardTemplate = result[i];
                        const cardTemplateData = CardUtils.createCardTemplate(cardTemplate);

                        data.push(cardTemplateData);
                    }

                    resolve(data);
                });
            }
        );
    }
}
