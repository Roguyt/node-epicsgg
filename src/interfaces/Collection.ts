import { Image } from './Image';

export interface Collection {
    id: number;
    categoryId: number;
    description: string;
    name: string;
    images: Image[];
    properties: {
        tiers: string[];
        types: string[];
        seasons: string;
        gameIds: number[];
        teamIds: number[];
    };
    created: Date;
    updated: Date;
    visible: boolean;
}
