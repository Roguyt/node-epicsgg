import { UserData } from './UserData';
import { Card } from './Card';
import { Sticker } from './Sticker';
import { Pack } from './Pack';

export interface TradeUser {
    user: UserData;

    balance: number;

    cards: Card[];
    stickers: Sticker[];
    packs: Pack[];

    count: number;
}
