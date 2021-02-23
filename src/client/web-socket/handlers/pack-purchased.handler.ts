import { PackPurchasedFeedInterface } from '../interfaces/pack-purchased-feed.interface';

export class PackPurchasedHandler {
    static handler(data: Record<string, any>): PackPurchasedFeedInterface {
        return {
            packTemplateId: data.packTemplateId,
            amount: data.amount,
            createdAt: new Date(data.created),
            user: {
                id: data.user.id,
                username: data.user.username,
                avatar: data.user.avatar,
                group: data.user.group,
            },
        };
    }
}
