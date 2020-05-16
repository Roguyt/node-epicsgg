import { Card } from './Card';
import { Pack } from './Pack';
import { Sticker } from './Sticker';
import { UserData } from './UserData';

export interface TradeUser {
    user: UserData;

    balance: number;

    cards: Card[];
    stickers: Sticker[];
    packs: Pack[];

    count: number;
}
