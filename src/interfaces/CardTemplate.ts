interface CardTemplate {
    id: number;
    uuid: string;

    title: string;

    cardType: string;
    categoryId: number;
    treatmentId: number;

    properties: {
        season: string;
        gameId: number;
        teamId: number;
        playerId: number;

        startDate: Date;
        endDate: Date;
    };

    limitedEdition: boolean;
    rarity: string;
    inCirculation: number;

    images: Record<string, string>;

    game?: Game;
    team?: Team;
    player?: Player;
    playerStats?: PlayerStats;
    playerRole?: PlayerRole;

    treatment: Treatment;
}
