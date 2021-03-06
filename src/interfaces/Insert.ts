import { Image } from './Image';
import { Video } from './Video';

export interface Insert {
    id: number;
    name: string;
    images: Image[];
    videos: Video[];
    isRedeemable: boolean;
    properties: {
        playerIds: number[];
        teamIds: number[];
        streamerIds: number[];
        externalItem: boolean;
        expire: Date | null;
        coins: number;
        silverCoins: number;
        craftingCoins: number;
        packTemplateIds: number[];
    };
}
