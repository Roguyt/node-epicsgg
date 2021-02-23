import EntityType from '../../enums/entityType';
import { Card } from '../../interfaces/Card';
import { Sticker } from '../../interfaces/Sticker';
import { TradeData } from '../../interfaces/TradeData';
import RestClient from '../rest.client';
import CardUtils from '../utils/Card';
import DateUtils from '../utils/Date';
import PackUtils from '../utils/Pack';
import StickerUtils from '../utils/Sticker';

export default class Trade {
    private baseClient: RestClient;

    /**
     * @hidden
     */
    public constructor(baseClient: RestClient) {
        this.baseClient = baseClient;
    }

    /**
     * Get a list of the current user's offers
     * @param page the page to get (1 page = 100 treatments)
     * @param status the status of the offers
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getOffers(page = 1, status?: string): Promise<TradeData[]> {
        const result = await this.baseClient.get('trade', {
            page,
            status,
        });

        const trades: TradeData[] = result.trades.map((trade: any) => ({
            id: trade.id,
            status: trade.status,
            offeredBy: trade.offeredBy,
            message: trade.message,

            sender: {
                user: {
                    id: trade.user1.id,
                    username: trade.user1.username,
                    avatar: trade.user1.avatar,
                    group: trade.user1.group,
                },
                balance: trade.user1.tradeBalance,
                count: trade.user1.count,

                cards: trade.user1.cards.map(CardUtils.createCard),
                stickers: trade.user1.stickers.map(StickerUtils.createSticker),
                packs: trade.user1.packs.map(PackUtils.createPack),
            },

            receiver: {
                user: {
                    id: trade.user2.id,
                    username: trade.user2.username,
                    avatar: trade.user2.avatar,
                    group: trade.user2.group,
                },

                balance: trade.user2.tradeBalance,
                count: trade.user2.count,

                cards: trade.user2.cards.map(CardUtils.createCard),
                stickers: trade.user2.stickers.map(StickerUtils.createSticker),
                packs: trade.user2.packs.map(PackUtils.createPack),
            },

            createdAt: DateUtils.convertToDate(trade.created),
            updatedAt: DateUtils.convertToDate(trade.updated),
        }));

        return trades;
    }

    /**
     * Create a trade offer and send it to a giver user id and a given array of cards
     * @param userId
     * @param cards
     * @param stickers
     * @returns a Promise resolved with the response or rejected in case of error
     */
    // TODO: Should throw an error if isMarketList = true (or rework to require id arrays only and get error from the API ?)
    public async createOffer(userId: number, cards: Card[], stickers: Sticker[]): Promise<number> {
        const entities = [
            ...cards.map((card: any) => ({
                id: card.id,
                type: EntityType.card,
            })),
            ...stickers.map((sticker: any) => ({
                id: sticker.id,
                type: EntityType.sticker,
            })),
        ];

        const result = await this.baseClient.post(`trade/create-offer`, {
            user1Balance: 0,
            user2Balance: 0,
            user2Id: userId.toString(),
            entities,
        });

        return result.tradeId;
    }

    /**
     * Accept a given tradeId
     * @param tradeId the tradeId to accept
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async acceptOffer(tradeId: number): Promise<void> {
        await this.baseClient.patch(`trade/accept-offer`, {
            tradeId,
        });
    }

    /**
     * Decline a given tradeId
     * @param tradeId
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async declineOffer(tradeId: number): Promise<void> {
        await this.baseClient.patch(`trade/decline-offer`, {
            tradeId,
        });
    }
}
