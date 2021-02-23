import { PackOpenedFeedInterface } from '../interfaces/pack-opened-feed.interface';

export class PackOpenedHandler {
    static handler(data: Record<string, any>): PackOpenedFeedInterface {
        return {
            id: data.id,
            packTemplateId: data.packTemplateId,

            user: {
                id: data.user.id,
                username: data.user.username,
                avatar: data.user.avatar,
                group: data.user.group,
            },

            cards: data.cards.map((card) => {
                return {
                    id: card.id,
                    cardTemplateId: card.cardTemplateId,
                    cardTemplate: card.cardTemplate,
                    images: card.images,
                    title: card.title,
                    mint: {
                        batch: card.mintBatch,
                        value: card.mintNumber,
                    },
                };
            }),
            stickers: data.stickers.map((sticker) => {
                return {
                    id: sticker.id,
                    stickerTemplateId: sticker.stickerTemplateId,
                    images: sticker.images,
                    title: sticker.title,
                    mint: {
                        batch: sticker.mintBatch,
                        value: sticker.mintNumber,
                    },
                };
            }),

            totalOpened: data.totalPacksOpened,

            createdAt: data.openedAt,
        };
    }
}
