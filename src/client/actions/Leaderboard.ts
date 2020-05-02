import { UserRanking } from '../../interfaces/UserRanking';
import { CollectionRanking } from '../../interfaces/CollectionRanking';

import BaseClient from '../BaseClient';

export default class Leaderboard {
    private baseClient: BaseClient;

    /**
     * @hidden
     */
    public constructor(baseClient: BaseClient) {
        this.baseClient = baseClient;
    }

    /**
     * Get the global rankings of Epics.gg given a category id and game id
     * @param page the page to get (1 page = 20 users)
     * @param country the country to filter the leaderboard
     * @param season the season to filter the leaderboard
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getLeaderboards(page = 1, country?: string, season?: number | string): Promise<UserRanking[]> {
        const result = await this.baseClient.get('leaderboards/categories/1', {
            page,
            country,
            season,
        });

        const data: UserRanking[] = result.map((ranking: any) => ({
            id: ranking.user.id,
            username: ranking.user.username,
            avatar: ranking.user.avatar,
            group: ranking.user.group,
            country: ranking.user.country,
            joined: ranking.user.created,
            ranking: {
                rank: ranking.rank,
                score: ranking.score,
                cardCount: ranking.cardCount,
                entityCount: ranking.entityCount,
            },
        }));

        return data;
    }

    /**
     * Get the rankings of a given collection id
     * @param collectionId the collection id to query
     * @param page the page to get (1 page = 20 users)
     * @param country the country to filter the leaderboard
     * @param season the season to filter the leaderboard
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public async getCollectionLeaderboards(
        collectionId: number,
        page = 1,
        country?: string,
        season?: number | string
    ): Promise<CollectionRanking[]> {
        const result = await this.baseClient.get(`leaderboards/collections/${collectionId}`, {
            page,
            country,
            season,
        });

        const data: CollectionRanking[] = result.map((ranking: any) => ({
            id: ranking.user.id,
            username: ranking.user.username,
            avatar: ranking.user.avatar,
            group: ranking.user.group,
            country: ranking.user.country,
            joined: ranking.user.created,
            ranking: {
                rank: ranking.rank,
                score: ranking.score,
                cardCount: ranking.cardCount,
                entityCount: ranking.entityCount,
            },
        }));

        return data;
    }
}
