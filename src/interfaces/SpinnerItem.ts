interface SpinnerItem {
    id: number;
    name: string;
    chance: number;
    properties: {
        coins?: number;
        packs?: {
            packId: number;
            quantity: number;
        };
    };
    images: Image[];
}
