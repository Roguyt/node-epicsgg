interface Card {
    id: number;
    uuid: string;
    images: Record<string, string>;
    signatureImage: string;
    type: string;
    mint: Mint;
    rating: number;

    isNewTemplate: boolean;
    isGhost: boolean;
    isOnMarket: boolean;
    isOnTrade: boolean; // Doesn't know what is it

    template: CardTemplate;
}
