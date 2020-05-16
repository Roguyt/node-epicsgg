import { Mint } from './Mint';
import { UserData } from './UserData';

export interface PackOpenedFeed {
    id: number;
    packTemplateId: number;

    user: UserData;
    cards: {
        id: number;
        cardTemplateId: number;
        cardTemplate: {
            images: Record<string, string>;
        };
        images: Record<string, string>;
        title: string;
        mint: Mint;
    }[];
    stickers: {
        id: number;
        stickerTemplateId: number;
        images: Record<string, string>;
        title: string;
        mint: Mint;
    }[];

    totalOpened: number;

    createdAt: Date | null;
}
