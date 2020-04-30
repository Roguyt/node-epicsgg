import BaseClient from '../BaseClient';

import PackUtils from '../utils/Pack';

import { Pack } from '../../interfaces/Pack';
import { QueryParams } from '../../interfaces/QueryParams';
import { BodyData } from '../../interfaces/BodyData';

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
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public buyPack(packTemplateId: number, amount = 1): Promise<number[]> {
        const body: BodyData = {
            amount,
            packTemplateId,
        };

        return this.baseClient.post(`packs/buy`, body).then(
            (result): Promise<number[]> => {
                return new Promise((resolve): void => {
                    const resultData: number[] = result;

                    resolve(resultData);
                });
            }
        );
    }
}
