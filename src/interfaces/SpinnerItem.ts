interface SpinnerItem {
    id: number;
    name: string;
    chance: number;
    properties: {
        coins?: number;
        silverCoins?: number;
        craftingCoins?: number;
        packs?: {
            packId: number;
            quantity: number;
        };
    };
    images: Image[];
}
