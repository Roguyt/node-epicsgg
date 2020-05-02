import { Image } from './Image';

export interface Game {
    id: number;
    name: string;

    startDate: Date | null;
    endDate: Date | null;

    image: string;
    images: Image[];
}
