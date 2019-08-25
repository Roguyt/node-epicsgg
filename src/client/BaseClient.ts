import axios, { AxiosResponse } from 'axios';
import * as jwt from 'jsonwebtoken';

import { BaseClientOptions } from '../interfaces/BaseClientOptions';
// eslint-disable-next-line no-undef
import Timeout = NodeJS.Timeout;

/**
 * @hidden
 */
export default class BaseClient {
    private username: string;
    private password: string;

    private jwt: string;
    private jwtExpiracy: Date;

    public constructor(options: BaseClientOptions) {
        if (!options) {
            // Throw a warning
            throw new Error('Missing BaseClient options');
        }

        this.username = options.email || '';
        this.password = options.password || '';

        this._validateOptions();
    }

    private _validateOptions(): void {
        if (this.username === '' || this.password === '') {
            // Throw an error
            throw new Error('Missing epics.gg credentials');
        }
    }

    private _timeout(ms: number): Promise<void> {
        return new Promise(
            (resolve): Timeout => {
                return setTimeout(resolve, ms);
            }
        );
    }

    public async login(): Promise<void> {
        try {
            let response: AxiosResponse = await axios.post(
                'https://api.epics.gg/api/v1/auth/login?categoryId=1&gameId=1',
                { email: this.username, password: this.password }
            );

            if (!response.data) {
                // Throw an error
            }

            this.jwt = response.data.data.jwt;

            // @ts-ignore
            this.jwtExpiracy = jwt.decode(this.jwt).exp * 1000;
        } catch (e) {
            if (!e.response) {
                await this._timeout(5 * 1000);
                await this.login();
            }

            switch (e.response.status) {
                case 429:
                    await this._timeout(60 * 1000);
                    await this.login();
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async get(path: string): Promise<any> {
        if (!this.jwt || this.jwtExpiracy < new Date()) {
            await this.login();
        }

        try {
            let response: AxiosResponse = await axios.get('https://api.epics.gg/api/v1/' + path, {
                headers: {
                    'X-User-JWT': this.jwt,
                },
            });

            if (!response.data) {
                // Throw an error
            }

            if (response.data.success === false) {
                // Throw an error
            }

            return response.data.data;
        } catch (e) {
            if (!e.response) {
                throw new Error('Internet error');
            }

            // Throw a custom error, not an axios one
            switch (e.response.status) {
                case 429:
                    throw new Error('Rate limit reached');

                case 403:
                    throw new Error(e.response.data.error);
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async post(path: string, data: Record<string, any>): Promise<any> {
        if (!this.jwt || this.jwtExpiracy < new Date()) {
            await this.login();
        }

        try {
            let response: AxiosResponse = await axios.post('https://api.epics.gg/api/v1/' + path, data, {
                headers: {
                    'X-User-JWT': this.jwt,
                },
            });

            if (!response.data) {
                // Throw an error
            }

            if (response.data.success === false) {
                // Throw an error
            }

            return response.data.data;
        } catch (e) {
            if (!e.response) {
                throw new Error('Internet error');
            } else {
                // Throw a custom error, not an axios one
                switch (e.response.status) {
                    case 429:
                        throw new Error('Rate limit reached');

                    case 403:
                        throw new Error(e.response.data.error);
                }
            }
        }
    }
}
