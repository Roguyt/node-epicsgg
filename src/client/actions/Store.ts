import BaseClient from '../BaseClient';

import PackUtils from '../utils/Pack';

import { Pack } from '../../interfaces/Pack';
import { QueryParams } from '../../interfaces/QueryParams';

export default class Store {
    private baseClient: BaseClient;

    /**
     * @hidden
     */
    public constructor(baseClient: BaseClient) {
        this.baseClient = baseClient;
    }

    /**
     * Get the packs from Epics.gg
     * @param page the page to get
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getPacks(page = 1): Promise<Pack[]> {
        const params: QueryParams = {
            page,
        };

        return this.baseClient.get('packs', params).then(
            (result): Promise<Pack[]> => {
                return new Promise((resolve): void => {
                    const data: Pack[] = [];

                    for (let i = 0; i < result.length; i += 1) {
                        const pack: Pack = PackUtils.createAPack(result[i]);

                        data.push(pack);
                    }

                    resolve(data);
                });
            }
        );
    }

    /**
     * Buy a given amount of a given packTemplateId
     * @param packTemplateId
     * @param amount the amount of packs to buy
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public buyPack(packTemplateId: number, amount = 1, categoryId = 1, gameId = 1): Promise<number[]> {
        return this.baseClient
            .post(`packs/buy?categoryId=${categoryId}&gameId=${gameId}`, {
                amount,
                packTemplateId,
            })
            .then(
                (result): Promise<number[]> => {
                    return new Promise((resolve): void => {
                        const data: number[] = result;

                        resolve(data);
                    });
                }
            );
    }
}
