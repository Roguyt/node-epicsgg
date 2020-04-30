export interface BaseClientOptions {
    email?: string;
    password?: string;
    categoryId?: number;
    gameId?: number;
    jwt?: string;
    proxy?: {
        host: string;
        port: number;
    };
    useSocket?: boolean;
}
