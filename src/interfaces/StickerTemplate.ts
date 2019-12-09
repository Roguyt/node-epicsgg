export interface StickerTemplate {
    id: number;
    uuid: string;

    title: string;

    categoryId: number;

    properties: {
        season: string;
        gameId: number;
        teamId: number;
    };

    limitedEdition: boolean;
    rarity: string;
    inCirculation: number;

    images: Record<string, string>;
}
