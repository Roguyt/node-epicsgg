import { Mint } from './Mint';
import { StickerTemplate } from './StickerTemplate';

export interface Sticker {
    id: number;
    uuid: string;
    mint: Mint;
    rating: number;

    isNewTemplate: boolean;
    isGhost: boolean;
    isOnMarket: boolean;
    isOnTrade: boolean;

    template: StickerTemplate;
}
