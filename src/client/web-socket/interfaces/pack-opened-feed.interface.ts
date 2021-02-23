import { Mint } from '../../../interfaces/Mint';
import { UserData } from '../../../interfaces/UserData';

export interface PackOpenedFeedInterface {
    id: number;
    packTemplateId: number;

    user: UserData;
    cards: {
        id: number;
        cardTemplateId: number;
        cardTemplate: {
            images: Record<string, string | Record<string, string>>;
        };
        images: Record<string, string | Record<string, string>>;
        title: string;
        mint: Mint;
    }[];
    stickers: {
        id: number;
        stickerTemplateId: number;
        images: Record<string, string | Record<string, string>>;
        title: string;
        mint: Mint;
    }[];

    totalOpened: number;

    createdAt: Date | null;
}
