import BaseClient from './client/BaseClient';

import User from './client/actions/User';
import Store from './client/actions/Store';
import Trade from './client/actions/Trade';
import Spinner from './client/actions/Spinner';
import Leaderboard from './client/actions/Leaderboard';

export = class Index {
    private baseClient: BaseClient;

    public User: User;
    public Store: Store;
    public Trade: Trade;
    public Spinner: Spinner;
    public Leaderboard: Leaderboard;

    public constructor(options: BaseClientOptions) {
        this.baseClient = new BaseClient(options);

        this.User = new User(this.baseClient);
        this.Store = new Store(this.baseClient);
        this.Trade = new Trade(this.baseClient);
        this.Spinner = new Spinner(this.baseClient);
        this.Leaderboard = new Leaderboard(this.baseClient);
    }
};
