import EntityType from '../enums/entityType';

import { CardTemplate } from './CardTemplate';
import { Mint } from './Mint';

export interface Card {
    id: number;
    uuid: string;
    images: Record<string, string>;
    signatureImage: string;
    type: EntityType.card;
    mint: Mint;
    rating: number;

    isNewTemplate: boolean;
    isGhost: boolean;
    isOnMarket: boolean;
    isOnTrade: boolean;

    template: CardTemplate;
}
