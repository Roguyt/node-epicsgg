import { CostType } from './CostType';
import { PackType } from './PackType';
import { PackPrimary } from './PackPrimary';

export interface PackTemplate {
    id: number;
    categoryId: number;

    name: string;
    description: string;
    packType: PackType;
    packPrimary: PackPrimary;
    packPrimaryId: number | null;

    openType?: string;

    cost: number;
    costType: CostType;
    saleCost: number;
    sale: boolean;

    cardCount: number;
    entityCount: number;
    inventoryCount: number;

    starter: boolean;
    limited: boolean;
    legacy: boolean;

    comingSoon: boolean;
    purchaseStart: Date | null;
    releaseTime: Date | null;
    purchaseEnd: Date | null;

    userLimit: number;

    images: Record<string, string>;
    videos: Record<string, string>;

    properties: {
        seasons: string[];
        gameIds: number[];
        orderMessageMin: string;
    };
}
