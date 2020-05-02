import { Image } from './Image';
import { Video } from './Video';

export interface Player {
    id: number;
    gameId: number;
    teamId: number;

    birthDate: Date | null;
    age: number;
    country: string;
    homeTown: string;
    name: string;
    nickname: string;
    bio: string;
    quote: string;

    position: string;
    playerRoleId: number;

    dateStart: Date | null;
    dateEnd: Date | null;
    lastDate: Date | null;

    image: string;
    images: Image[];
    videos: Video[];

    frameType: string;
    active: boolean;
}
