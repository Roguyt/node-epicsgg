import { SpinnerFeed } from '../../../interfaces/SpinnerFeed';
import DateUtils from '../../utils/Date';

export class SpinnerFeedHandler {
    static handler(data: Record<string, any>): SpinnerFeed {
        return {
            name: data.name,
            chance: data.chance,
            images: {
                webBackground: data.images.webBackground,
                mobileBackground: data.images.mobileBackground,
            },
            properties: {
                epiCoins: data.properties.epicoins,
                silverCoins: data.properties.silvercoins,
                craftingCoins: data.properties.craftingcoins,
                cardTemplates: data.properties.card_templates,
                packTemplates: data.properties.pack_templates,
            },
            createdAt: DateUtils.convertToDate(data.created),
            user: {
                id: data.user.id,
                username: data.user.username,
                avatar: data.user.avatar,
                group: data.user.group,
            },
        };
    }
}
