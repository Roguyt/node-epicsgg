import { Image } from './Image';

export interface Team {
    id: number;

    name: string;
    shortName: string;
    manager: string;
    country: string;
    birthDate: Date;
    startDate: Date;
    endDate: Date;
    active: boolean;

    gameId: number;

    image: string;
    images: Image[];

    bio: string;
    players: number[];
}
