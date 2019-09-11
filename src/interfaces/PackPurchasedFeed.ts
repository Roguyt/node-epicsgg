import { UserData } from './UserData';

export interface PackPurchasedFeed {
    packTemplateId: number;
    amount: number;
    createdAt: Date;
    user: UserData;
}
