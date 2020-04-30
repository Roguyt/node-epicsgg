import { UserData } from './UserData';
import { ImagesFeed } from './ImagesFeed';

export interface SpinnerFeed {
    name: string;
    chance: number;
    images: ImagesFeed;
    properties: {
        epiCoins: number;
        silverCoins: number;
        craftingCoins: number;
        cardTemplates: {
            id: number;
            quantity: number;
        }[];
        packTemplates: {
            id: number;
            quantity: number;
        }[];
    };

    createdAt: Date;

    user: UserData;
}
