import { Chance } from './Chance';
import { Image } from './Image';
import { Video } from './Video';

export interface Pack {
    id: number;
    name: string;
    description: string;
    categoryId: number;

    packType: string;
    packPrimary: string;
    packPrimaryId: number;
    openType: string;

    cost: number;
    costType: string;
    saleCost: number;
    sale: boolean;

    cardCount: number;
    entityCount: number;
    available: number;
    userLimit: number;

    starter: boolean;
    limited: boolean;
    comingSoon: boolean;

    releaseTime: Date | null;
    startDate: Date | null;
    endDate: Date | null;

    properties: {
        seasons: [];
        gameIds: [];
        orderMessageMin: string;
    };

    odds?: Chance[];

    images?: Image[];
    videos?: Video[];
}
