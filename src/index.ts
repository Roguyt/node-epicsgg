import BaseClient from './client/BaseClient';

import User from './client/actions/User';
import Leaderboard from './client/actions/Leaderboard';

export = class Index {
    private baseClient: BaseClient;

    public User: User;
    public Leaderboard: Leaderboard;

    public constructor(options: BaseClientOptions) {
        this.baseClient = new BaseClient(options);

        this.User = new User(this.baseClient);
        this.Leaderboard = new Leaderboard(this.baseClient);
    }
};
