export interface BaseClientOptions {
    email: string;
    password: string;
    proxy?: {
        host: string;
        port: number;
    };
}
