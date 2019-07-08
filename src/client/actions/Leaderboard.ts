import BaseClient from '../BaseClient';

export default class Leaderboard {
    private baseClient: BaseClient;

    public constructor(baseClient: BaseClient) {
        this.baseClient = baseClient;
    }

    public getLeaderboards(page: number = 1): Promise<UserRanking[]> {
        return this.baseClient.get('leaderboards/categories/1?categoryId=1&gameId=1&page=' + page + '')
            .then(
            (result): Promise<UserRanking[]> => {
                return new Promise((resolve): void => {
                    const data: UserRanking[] = [];

                    for (let i = 0; i < result.length; i += 1) {
                        let ranking = result[i];

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
