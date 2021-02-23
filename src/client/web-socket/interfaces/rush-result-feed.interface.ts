export interface RushResultFeedInterface {
    event: string;
    id: number;
    user1: {
        id: number;
        username: string;
        avatar: string;
        winner: boolean;
        roster: { rating: number; cards: { image: string }[] };
    };
    user2: { roster: { teamId: number; shortName: string } };
    totalGamesPlayed: number;
}
