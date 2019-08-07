import { Image } from './Image';

export interface Game {
    id: number;
    name: string;

    startDate: Date;
    endDate: Date;

    image: string;
    images: Image[];
}
