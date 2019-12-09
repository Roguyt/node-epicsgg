import { Card } from './Card';
import { Sticker } from './Sticker';

export interface Owned {
    cards: Card[];
    stickers: Sticker[];
}
