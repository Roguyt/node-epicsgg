import BaseClient from '../BaseClient';

export default class Spinner {
    private baseClient: BaseClient;

    public constructor(baseClient: BaseClient) {
        this.baseClient = baseClient;
    }

    public getSpinner(categoryId: number = 1, gameId: number = 1): Promise<SpinnerData> {
        return this.baseClient.get('spinner?categoryId=' + categoryId + '&gameId=' + gameId + '').then(
            (result): Promise<SpinnerData> => {
                return new Promise((resolve): void => {
                    const data: SpinnerData = {
                        id: result.id,
                        name: result.name,
                        items: [],
                    };

                    for (let i = 0; i < result.items.length; i += 1) {
                        const spinnerItem: SpinnerItem = {
                            id: result.items[i].id,
                            name: result.items[i].name,
                            chance: result.items[i].chance,
                            properties: {},
                            images: result.items[i].images,
                        };

                        if (result.items[i].properties.coins === 0) {
                            spinnerItem.properties.packs = {
                                packId: result.items[i].properties.pack_templates[0].id,
                                quantity: result.items[i].properties.pack_templates[0].quantity,
                            };
                        } else {
                            spinnerItem.properties.coins = result.items[i].properties.coins;
                        }

                        data.items.push(spinnerItem);
                    }

                    resolve(data);
                });
            }
        );
    }
}
