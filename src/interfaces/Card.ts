import { Mint } from './Mint';
import { CardTemplate } from './CardTemplate';

export interface Card {
    id: number;
    uuid: string;
    images: Record<string, string>;
    signatureImage: string;
    type: string;
    mint: Mint;
    rating: number;

    isNewTemplate: boolean;
    isGhost: boolean;
    isOnMarket: boolean;
    isOnTrade: boolean;

    template: CardTemplate;
}
