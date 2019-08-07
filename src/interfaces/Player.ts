import { Image } from './Image';
import { Video } from './Video';

export interface Player {
    id: number;
    gameId: number;
    teamId: number;

    birthDate: Date;
    age: number;
    country: string;
    homeTown: string;
    name: string;
    nickname: string;
    bio: string;
    quote: string;

    position: string;
    playerRoleId: number;

    dateStart: Date;
    dateEnd: Date;
    lastDate: Date;

    image: string;
    images: Image[];
    videos: Video[];

    frameType: string;
    active: boolean;
}
