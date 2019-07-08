interface MarketListing {
    marketId: number;

    price: number;
    previousAvgPrice: AveragePrice;
    currentAvgHourPrice: AveragePrice;

    createdAt: Date;

    type: string;
    card: Card;
}
