import { Pack } from '../../interfaces/Pack';
import RestClient from '../rest.client';
import PackUtils from '../utils/Pack';

export default class Store {
    private baseClient: RestClient;

    /**
     * @hidden
     */
    public constructor(baseClient: RestClient) {
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

        const data: Pack[] = result.map(PackUtils.createPack);

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
