import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as jwt from 'jsonwebtoken';
import { HttpsProxyAgent } from 'https-proxy-agent';

import { BaseClientOptions } from '../interfaces/BaseClientOptions';
import { CurrentUser } from '../interfaces/CurrentUser';
import { QueryParams } from '../interfaces/QueryParams';
import { BodyData } from '../interfaces/BodyData';

// eslint-disable-next-line no-undef
import Timeout = NodeJS.Timeout;

/**
 * @hidden
 */
export default class BaseClient {
    private readonly username: string;

    private readonly password: string;

    private categoryId: number;

    // Currently not used by the API calls inside the webapp
    private gameId: number;

    public currentUser: CurrentUser = null;

    private axios: AxiosInstance;

    private jwt: string;

    private jwtExpiracy: Date;

    public constructor(options: BaseClientOptions) {
        if (!options) {
            // Throw a warning
            throw new Error('Missing BaseClient options');
        }

        this.username = options.email || '';
        this.password = options.password || '';
        // TODO: Add a setter/getter
        this.categoryId = options.categoryId || 1;
        this.gameId = options.gameId || 1;
        this.jwt = '';

        if (options.proxy) {
            const agent = new HttpsProxyAgent({ host: options.proxy.host, port: options.proxy.port });

            this.axios = axios.create({
                httpsAgent: agent,
                timeout: 600000,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            this.axios = axios.create();
        }

        if (options.jwt) {
            this.jwt = options.jwt;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const jwtData = jwt.decode(this.jwt) as { [key: string]: any };
            this.jwtExpiracy = new Date(jwtData.exp * 1000);
        }

        this.validateOptions();
    }

    private validateOptions(): void {
        if ((this.username === '' || this.password === '') && this.jwt === '') {
            // Throw an error
            throw new Error('Missing epics.gg credentials');
        }
    }

    private static timeout(ms: number): Promise<void> {
        return new Promise(
            (resolve): Timeout => {
                return setTimeout(resolve, ms);
            }
        );
    }

    public async login(): Promise<void> {
        try {
            const response: AxiosResponse = await this.axios.post('https://api.epics.gg/api/v1/auth/login', {
                email: this.username,
                password: this.password,
            });

            if (!response.data) {
                // Throw an error
            }

            this.currentUser = response.data.data.user;

            this.jwt = response.data.data.jwt;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const jwtData = jwt.decode(this.jwt) as { [key: string]: any };
            this.jwtExpiracy = new Date(jwtData.exp * 1000);
        } catch (e) {
            if (!e.response) {
                await BaseClient.timeout(5 * 1000);
            } else {
                switch (e.response.status) {
                    case 429: {
                        await BaseClient.timeout(60 * 1000);
                        break;
                    }
                    case 400: {
                        throw new Error('Credentials errors');
                    }
                    default: {
                        throw new Error(`Unhandled error. ${JSON.stringify(e.response.data)}`);
                    }
                }
            }

            await this.login();
        }
    }

    public getJWT(): string {
        return this.jwt;
    }

    public async loginAndGetJwt(): Promise<string> {
        await this.login();
        return this.getJWT();
    }

    public async get(
        path: string,
        params?: QueryParams
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Promise<any> {
        if (!this.jwt || this.jwtExpiracy < new Date()) {
            await this.login();
        }

        try {
            const response: AxiosResponse = await this.axios.get(`https://api.epics.gg/api/v1/${path}`, {
                headers: {
                    'X-User-JWT': this.jwt,
                },
                params: {
                    ...params,
                    categoryId: this.categoryId,
                    gameId: this.gameId,
                },
            });

            if (!response.data) {
                // Throw an error
            }

            return response.data.data;
        } catch (e) {
            if (e.errorCode) {
                throw new Error(e.message);
            } else if (!e.response) {
                throw new Error('Internet error');
            } else {
                // Throw a custom error, not an axios one
                switch (e.response.status) {
                    case 429:
                        throw new Error('Rate limit reached');

                    case 409:
                        throw new Error(e.response.data.error);

                    case 403:
                        throw new Error(e.response.data.error);

                    default:
                        throw new Error(`Unhandled error. ${JSON.stringify(e.response.data)}`);
                }
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async post(path: string, data?: BodyData, params?: QueryParams): Promise<any> {
        if (!this.jwt || this.jwtExpiracy < new Date()) {
            await this.login();
        }

        try {
            const response: AxiosResponse = await this.axios.post(`https://api.epics.gg/api/v1/${path}`, data, {
                headers: {
                    'X-User-JWT': this.jwt,
                },
                params: {
                    ...params,
                    categoryId: this.categoryId,
                    gameId: this.gameId,
                },
            });

            if (!response.data) {
                // Throw an error
            }

            return response.data.data;
        } catch (e) {
            if (e.errorCode) {
                throw new Error(e.message);
            } else if (!e.response) {
                throw new Error('Internet error');
            } else {
                // Throw a custom error, not an axios one
                switch (e.response.status) {
                    case 429:
                        throw new Error('Rate limit reached');

                    case 409:
                        throw new Error(e.response.data.error);

                    case 403:
                        throw new Error(e.response.data.error);

                    default:
                        throw new Error(`Unhandled error. ${JSON.stringify(e.response.data)}`);
                }
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async delete(path: string, params?: QueryParams): Promise<any> {
        if (!this.jwt || this.jwtExpiracy < new Date()) {
            await this.login();
        }

        try {
            const response: AxiosResponse = await this.axios.delete(`https://api.epics.gg/api/v1/${path}`, {
                headers: {
                    'X-User-JWT': this.jwt,
                },
                params: {
                    ...params,
                    categoryId: this.categoryId,
                    gameId: this.gameId,
                },
            });

            if (!response.data) {
                // Throw an error
            }

            return response.data.data;
        } catch (e) {
            if (e.errorCode) {
                throw new Error(e.message);
            } else if (!e.response) {
                throw new Error('Internet error');
            } else {
                // Throw a custom error, not an axios one
                switch (e.response.status) {
                    case 429:
                        throw new Error('Rate limit reached');

                    case 409:
                        throw new Error(e.response.data.error);

                    case 403:
                        throw new Error(e.response.data.error);

                    default:
                        throw new Error(`Unhandled error. ${JSON.stringify(e.response.data)}`);
                }
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async patch(path: string, data?: BodyData, params?: QueryParams): Promise<any> {
        if (!this.jwt || this.jwtExpiracy < new Date()) {
            await this.login();
        }

        try {
            const response: AxiosResponse = await this.axios.patch(`https://api.epics.gg/api/v1/${path}`, data, {
                headers: {
                    'X-User-JWT': this.jwt,
                },
                params: {
                    ...params,
                    categoryId: this.categoryId,
                    gameId: this.gameId,
                },
            });

            if (!response.data) {
                // Throw an error
            }

            return response.data.data;
        } catch (e) {
            if (
                (path.indexOf('accept-offer') !== -1 || path.indexOf('decline-offer') !== -1) &&
                e.message.indexOf('Trade offer already sent.')
            ) {
                throw new Error("You can't accept your own offer.");
            }
            if (e.errorCode) {
                throw new Error(e.message);
            } else if (!e.response) {
                throw new Error('Internet error');
            } else {
                // Throw a custom error, not an axios one
                switch (e.response.status) {
                    case 429:
                        throw new Error('Rate limit reached');

                    case 409:
                        throw new Error(e.response.data.error);

                    case 403:
                        throw new Error(e.response.data.error);

                    default:
                        throw new Error(`Unhandled error. ${JSON.stringify(e.response.data)}`);
                }
            }
        }
    }
}
