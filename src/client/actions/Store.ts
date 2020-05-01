import BaseClient from '../BaseClient';

import PackUtils from '../utils/Pack';

import { Pack } from '../../interfaces/Pack';

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
    public async getPacks(page = 1): Promise<Pack[]> {
        const result = await this.baseClient.get('packs', {
            page,
        });
        const data: Pack[] = [];

        for (let i = 0; i < result.length; i += 1) {
            const pack: Pack = PackUtils.createAPack(result[i]);

            data.push(pack);
        }

        return data;
    }

    /**
     * Buy a given amount of a given packTemplateId
     * @param packTemplateId
     * @param amount the amount of packs to buy
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async buyPack(packTemplateId: number, amount = 1): Promise<number[]> {
        const result = await this.baseClient.post(`packs/buy`, {
            amount,
            packTemplateId,
        });
        return result;
    }
}
