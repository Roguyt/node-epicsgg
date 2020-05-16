import { BaseClientOptions } from './interfaces/BaseClientOptions';

import BaseClient from './client/BaseClient';
import SocketClient from './client/SocketClient';

import User from './client/actions/User';
import Library from './client/actions/Library';
import Store from './client/actions/Store';
import Trade from './client/actions/Trade';
import Market from './client/actions/Market';
import Spinner from './client/actions/Spinner';
import Leaderboard from './client/actions/Leaderboard';

export = class Index {
    public baseClient: BaseClient;

    public User: User;

    public Library: Library;

    public Store: Store;

    public Trade: Trade;

    public Market: Market;

    public Spinner: Spinner;

    public Leaderboard: Leaderboard;

    public SocketClient: SocketClient;

    public constructor(options: BaseClientOptions) {
        this.baseClient = new BaseClient(options);

        this.User = new User(this.baseClient);
        this.Library = new Library(this.baseClient);
        this.Store = new Store(this.baseClient);
        this.Trade = new Trade(this.baseClient);
        this.Market = new Market(this.baseClient);
        this.Spinner = new Spinner(this.baseClient);
        this.Leaderboard = new Leaderboard(this.baseClient);

        if (typeof options.useSocket === 'undefined' || options.useSocket === true) {
            this.SocketClient = new SocketClient();
        }
    }
};
