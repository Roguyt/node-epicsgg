import { EventEmitter } from 'events';

import debug from 'debug';
import io, { Socket } from 'socket.io-client';

import { PackOpenedHandler } from './handlers/pack-opened.handler';
import { PackPurchasedHandler } from './handlers/pack-purchased.handler';
import { RushResultFeedHandler } from './handlers/rush-result-feed.handler';
import { SpinnerFeedHandler } from './handlers/spinner-feed.handler';

const log = debug('node-epicsgg');

/**
 * @hidden
 */
export default class WebSocketClient {
    private static socket: Socket;

    private static _event: EventEmitter;

    static get event(): EventEmitter {
        if (!this._event) {
            this.connect();
        }

        return this._event;
    }

    private static connect(): void {
        log('Connecting');

        this.socket = io('https://sockets.epics.gg/', {
            transports: ['websocket'],
        });

        this._event = new EventEmitter();

        this.socket.on('disconnect', (): void => {
            log('Disconnected');
            this.socket.off();
        });

        this.socket.on('connect', (): void => {
            log('Connected');
            this.socket.emit('join-public-feed');

            this.socket.on('pack-opened', (data): void => {
                this._event.emit('pack-opened', PackOpenedHandler.handler(data));
            });

            this.socket.on('pack-purchased', (data): void => {
                this._event.emit('pack-purchased', PackPurchasedHandler.handler(data));
            });

            this.socket.on('spinner-feed', (data): void => {
                this._event.emit('spinner-feed', SpinnerFeedHandler.handler(data));
            });

            this.socket.on('ut-pve-feed', (data): void => {
                this._event.emit('ut-pve-feed', RushResultFeedHandler.handler(data));
            });
        });
    }
}
