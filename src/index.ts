import Leaderboard from './client/actions/Leaderboard';
import Library from './client/actions/Library';
import Market from './client/actions/Market';
import Spinner from './client/actions/Spinner';
import Store from './client/actions/Store';
import Trade from './client/actions/Trade';
import User from './client/actions/User';
import RestClient from './client/rest.client';
import WebSocketClient from './client/web-socket/web-socket.client';
import EntityType from './enums/entityType';
import { BaseClientOptions } from './interfaces/BaseClientOptions';

export class EpicsGGAPI {
    public baseClient: RestClient;

    public User: User;

    public Library: Library;

    public Store: Store;

    public Trade: Trade;

    public Market: Market;

    public Spinner: Spinner;

    public Leaderboard: Leaderboard;
    public constructor(options: BaseClientOptions) {
        this.baseClient = new RestClient(options);

        this.User = new User(this.baseClient);
        this.Library = new Library(this.baseClient);
        this.Store = new Store(this.baseClient);
        this.Trade = new Trade(this.baseClient);
        this.Market = new Market(this.baseClient);
        this.Spinner = new Spinner(this.baseClient);
        this.Leaderboard = new Leaderboard(this.baseClient);
    }
}

export { RestClient, WebSocketClient };

export { EntityType };
