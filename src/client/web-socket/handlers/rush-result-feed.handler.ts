import { RushResultFeedInterface } from '../interfaces/rush-result-feed.interface';

export class RushResultFeedHandler {
    static handler(data: Record<string, any>): RushResultFeedInterface {
        return {
            event: data.event,
            id: data.id,
            user1: {
                id: data.user1.id,
                username: data.user1.username,
                avatar: data.user1.avatar,
                winner: data.user1.winner,
                roster: { rating: data.user1.roster.rating, cards: data.user1.roster.cards },
            },
            user2: { roster: { teamId: data.user2.roster.rating, shortName: data.user2.roster.shortName } },
            totalGamesPlayed: data.totalGamesPlayed,
        };
    }
}
