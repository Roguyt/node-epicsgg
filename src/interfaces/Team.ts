import { Image } from './Image';

export interface Team {
    id: number;

    name: string;
    shortName: string;
    manager: string;
    country: string;
    birthDate: Date | null;
    startDate: Date | null;
    endDate: Date | null;
    active: boolean;

    gameId: number;

    image: string;
    images: Image[];

    bio: string;
    players: number[];
}
