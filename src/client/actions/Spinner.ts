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

                        if (result.items[i].properties.pack_templates.length !== 0) {
                            spinnerItem.properties.packs = {
                                packId: result.items[i].properties.pack_templates[0].id,
                                quantity: result.items[i].properties.pack_templates[0].quantity,
                            };
                        }

                        spinnerItem.properties.coins = result.items[i].properties.coins;
                        spinnerItem.properties.silverCoins = result.items[i].properties.silvercoins;
                        spinnerItem.properties.craftingCoins = result.items[i].properties.craftingcoins;

                        data.items.push(spinnerItem);
                    }

                    resolve(data);
                });
            }
        );
    }

    public spin(spinnerId: number = 166): Promise<null> {
        return this.baseClient
            .post('spinner/spin', {
                spinnerId,
            })
            .then(
                (result): Promise<null> => {
                    return new Promise((resolve): void => {
                        resolve(null);
                    });
                }
            );
    }
}
