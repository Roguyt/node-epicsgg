import BaseClient from './client/BaseClient';

import User from './client/actions/User';

export = class Index {
    private baseClient: BaseClient;

    public User: User;

    public constructor(options: BaseClientOptions) {
        this.baseClient = new BaseClient(options);

        this.User = new User(this.baseClient);
    }
};
