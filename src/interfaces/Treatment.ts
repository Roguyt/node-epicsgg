interface Treatment {
    id: number;
    categoryId: number;

    name: string;
    designation: string;
    tier: string;
    variation: string;
    season: string;

    gameSide: string;
    accentColor: string;
    artistName: string;

    buyPrice: number;

    images: Image[];
    videos: Video[];

    active: boolean;
}
