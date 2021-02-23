import { UserData } from '../../../interfaces/UserData';

export interface PackPurchasedFeedInterface {
    packTemplateId: number;
    amount: number;
    createdAt: Date | null;
    user: UserData;
}
