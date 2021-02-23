import { SpinnerData } from '../../interfaces/SpinnerData';
import { SpinnerHistory } from '../../interfaces/SpinnerHistory';
import RestClient from '../rest.client';
import DateUtils from '../utils/Date';

export default class Spinner {
    private baseClient: RestClient;

    /**
     * @hidden
     */
    public constructor(baseClient: RestClient) {
        this.baseClient = baseClient;
    }

    /**
     * Get the current Spinner's data
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getSpinner(): Promise<SpinnerData> {
        const result = await this.baseClient.get('spinner');

        const data: SpinnerData = {
            id: result.id,
            name: result.name,
            items: result.items.map((item: any) => ({
                id: item.id,
                name: item.name,
                chance: item.chance,
                properties: {
                    coins: item.properties.coins,
                    silverCoins: item.properties.silvercoins,
                    craftingCoins: item.properties.craftingcoins,
                    packs:
                        item.properties.pack_templates.length > 0
                            ? {
                                  id: item.properties.pack_templates[0].id,
                                  quantity: item.properties.pack_templates[0].quantity,
                              }
                            : null,
                },
                images: item.images,
            })),
        };

        return data;
    }

    /**
     * Get the history of the user's spinner rewards
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getHistory(): Promise<SpinnerHistory[]> {
        const result = await this.baseClient.get(`spinner/history`);

        const data: SpinnerHistory[] = result.spins.map((spin: any) => ({
            name: spin.name,
            chance: spin.chance,
            date: DateUtils.convertToDate(spin.created),
            images: spin.images,
            isPurchased: spin.isPurchased,
        }));

        return data;
    }

    /**
     * Buy a Spin
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async buySpinner(): Promise<void> {
        await this.baseClient.post('spinner/buy-spin', {
            amount: 1,
        });
    }

    /**
     * Spin a Spinner with a given spinner id
     * @param spinnerId spinner id to spin
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async spin(spinnerId = 166): Promise<void> {
        await this.baseClient.post('spinner/spin', {
            spinnerId,
        });
    }
}
