export interface BaseClientOptions {
    email?: string;
    password?: string;
    jwt?: string;
    proxy?: {
        host: string;
        port: number;
    };
    useSocket?: boolean;
}
