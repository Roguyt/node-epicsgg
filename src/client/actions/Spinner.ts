import { SpinnerData } from '../../interfaces/SpinnerData';
import { SpinnerItem } from '../../interfaces/SpinnerItem';
import { SpinnerHistory } from '../../interfaces/SpinnerHistory';

import DateUtils from '../utils/Date';

import BaseClient from '../BaseClient';

export default class Spinner {
    private baseClient: BaseClient;

    /**
     * @hidden
     */
    public constructor(baseClient: BaseClient) {
        this.baseClient = baseClient;
    }

    /**
     * Get the current Spinner's data
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
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

    /**
     * Get the history of the user's spinner rewards
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getHistory(categoryId: number = 1, gameId: number = 1): Promise<SpinnerHistory[]> {
        return this.baseClient.get('spinner/history?categoryId=' + categoryId + '&gameId=' + gameId + '').then(
            (result): Promise<SpinnerHistory[]> => {
                return new Promise((resolve): void => {
                    const data: SpinnerHistory[] = [];

                    for (let i = 0; i < result.spins.length; i += 1) {
                        data.push({
                            name: result.spins[i].name,
                            chance: result.spins[i].chance,
                            date: DateUtils.convertToDate(result.spins[i].created),
                            images: result.spins[i].images,
                            isPurchased: result.spins[i].isPurchased,
                        });
                    }

                    resolve(data);
                });
            }
        );
    }

    /**
     * Buy a Spin
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public buySpinner(): Promise<null> {
        return this.baseClient
            .post('spinner/buy-spin', {
                amount: 1,
            })
            .then(
                (): Promise<null> => {
                    return new Promise((resolve): void => {
                        resolve(null);
                    });
                }
            );
    }

    /**
     * Spin a Spinner with a given spinner id
     * @param spinnerId spinner id to spin
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public spin(spinnerId: number = 166): Promise<null> {
        return this.baseClient
            .post('spinner/spin', {
                spinnerId,
            })
            .then(
                (): Promise<null> => {
                    return new Promise((resolve): void => {
                        resolve(null);
                    });
                }
            );
    }
}
