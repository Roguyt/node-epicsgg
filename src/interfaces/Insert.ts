interface Insert {
    id: number;
    name: string;
    images: Image[];
    videos: Video[];
    isRedeemable: boolean;
    properties: {
        playerIds: number[];
        teamIds: number[];
        streamerIds: number[];
        externalItem: boolean;
        expire: Date;
        coins: number;
        silverCoins: number;
        craftingCoins: number;
        packTemplateIds: number[];
    };
}
