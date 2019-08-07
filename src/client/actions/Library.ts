import { CardTemplate } from '../../interfaces/CardTemplate';

import BaseClient from '../BaseClient';

import CardUtils from '../utils/Card';

export default class Library {
    private baseClient: BaseClient;

    public constructor(baseClient: BaseClient) {
        this.baseClient = baseClient;
    }

    public getCollectionCardTemplates(
        collectionId: number,
        categoryId: number = 1,
        gameId: number = 1
    ): Promise<CardTemplate[]> {
        return this.baseClient
            .get('collections/' + collectionId + '/card-templates?categoryId=' + categoryId + '&gameId=' + gameId + '')
            .then(
                (result): Promise<CardTemplate[]> => {
                    return new Promise((resolve): void => {
                        const data: CardTemplate[] = [];

                        for (let i = 0; i < result.length; i += 1) {
                            let cardTemplate = result[i];
                            let cardTemplateData = CardUtils.createCardTemplate(cardTemplate);

                            data.push(cardTemplateData);
                        }

                        resolve(data);
                    });
                }
            );
    }
}
