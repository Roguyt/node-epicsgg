import { EventEmitter } from 'events';

import { PackPurchasedFeed } from '../interfaces/PackPurchasedFeed';
import { SpinnerFeed } from '../interfaces/SpinnerFeed';
import { PackOpenedFeed } from '../interfaces/PackOpenedFeed';

import SocketIO = require('socket.io');

/**
 * @hidden
 */
export default class SocketClient {
    private io = require('socket.io-client');
    private socket: SocketIO.Socket;

    public event: EventEmitter;

    public constructor() {
        this._connect();
    }

    private _connect(): void {
        this.socket = this.io('https://sockets.epics.gg/', {
            transports: ['websocket'],
        });

        this.event = new EventEmitter();

        this.socket.on('disconnect', () => {
            this.socket.removeAllListeners('pack-opened');
            this.socket.removeAllListeners('pack-purchased');
            this.socket.removeAllListeners('spinner-feed');
        });

        this.socket.on('connect', (): void => {
            this.socket.emit('join-public-feed');

            this.socket.on('pack-opened', (data): void => {
                let packOpenedFeed: PackOpenedFeed = {
                    id: data.id,
                    packTemplateId: data.packTemplateId,

                    user: {
                        id: data.user.id,
                        username: data.user.username,
                        avatar: data.user.avatar,
                        group: data.user.group,
                    },

                    cards: [],

                    totalOpened: data.totalPacksOpened,

                    createdAt: data.openedAt,
                };

                for (let i = 0; i < data.cards.length; i += 1) {
                    packOpenedFeed.cards.push({
                        id: data.cards[i].id,
                        cardTemplateId: data.cards[i].cardTemplateId,
                        cardTemplate: data.cards[i].cardTemplate,
                        images: data.cards[i].images,
                        title: data.cards[i].title,
                        mint: {
                            batch: data.cards[i].mintBatch,
                            value: data.cards[i].mintNumber,
                        },
                    });
                }

                this.event.emit('pack-opened', packOpenedFeed);
            });

            this.socket.on('pack-purchased', (data): void => {
                let packPurchasedFeed: PackPurchasedFeed = {
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

                this.event.emit('pack-purchased', packPurchasedFeed);
            });

            this.socket.on('spinner-feed', (data): void => {
                let spinnerFeed: SpinnerFeed = {
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
                        packTemplates: data.properties.pack_template,
                    },
                    createdAt: new Date(data.created),
                    user: {
                        id: data.user.id,
                        username: data.user.username,
                        avatar: data.user.avatar,
                        group: data.user.group,
                    },
                };

                this.event.emit('spinner-feed', spinnerFeed);
            });
        });
    }
}
