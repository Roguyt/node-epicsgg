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
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getLeaderboards(
        page = 1,
        country: string = null,
        season: string = null,
        categoryId = 1,
        gameId = 1
    ): Promise<UserRanking[]> {
        let url = `leaderboards/categories/1?categoryId=${categoryId}&gameId=${gameId}&page=${page}`;

        if (country !== null) {
            url += `&country=${country}`;
        }

        if (season !== null) {
            url += `&season=${season}`;
        }

        return this.baseClient.get(url).then(
            (result): Promise<UserRanking[]> => {
                return new Promise((resolve): void => {
                    const data: UserRanking[] = [];

                    for (let i = 0; i < result.length; i += 1) {
                        const ranking = result[i];

                        data.push({
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
                        });
                    }

                    resolve(data);
                });
            }
        );
    }

    /**
     * Get the rankings of a given collection id
     * @param collectionId the collection id to query
     * @param page the page to get (1 page = 20 users)
     * @param country the country to filter the leaderboard
     * @param season the season to filter the leaderboard
     * @param categoryId the category id
     * @param gameId the game id
     * @returns a Promise resolved with the response or rejected in case of error
     */
    public getCollectionLeaderboards(
        collectionId: number,
        page = 1,
        country: string = null,
        season: string = null,
        categoryId = 1,
        gameId = 1
    ): Promise<CollectionRanking[]> {
        let url = `leaderboards/collections/${collectionId}?categoryId=${categoryId}&gameId=${gameId}&page=${page}`;

        if (country !== null) {
            url += `&country=${country}`;
        }

        if (season !== null) {
            url += `&season=${season}`;
        }

        return this.baseClient.get(url).then(
            (result): Promise<CollectionRanking[]> => {
                return new Promise((resolve): void => {
                    const data: CollectionRanking[] = [];

                    for (let i = 0; i < result.length; i += 1) {
                        const ranking = result[i];

                        data.push({
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
                        });
                    }

                    resolve(data);
                });
            }
        );
    }
}
