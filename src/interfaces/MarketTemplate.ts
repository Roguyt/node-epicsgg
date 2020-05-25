import { CardTemplate } from './CardTemplate';
import { StickerTemplate } from './StickerTemplate';
import { PackTemplate } from './PackTemplate';

export interface MarketTemplate {
    entityTemplateId: number;
    isUserNeed: boolean;
    lowestPrice: number;

    cardTemplate?: CardTemplate;
    stickerTemplate?: StickerTemplate;
    packTemplate?: PackTemplate;
}
