import { TradeUser } from './TradeUser';

export interface TradeData {
    id: number;
    status: string;
    offeredBy: number;
    message: string;

    sender: TradeUser;
    receiver: TradeUser;

    createdAt: Date | null;
    updatedAt: Date | null;
}
