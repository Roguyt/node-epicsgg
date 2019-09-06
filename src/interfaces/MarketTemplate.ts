import { CardTemplate } from './CardTemplate';

export interface MarketTemplate {
    entityTemplateId: number;
    isUserNeed: boolean;
    lowestPrice: number;

    cardTemplate: CardTemplate;
}
