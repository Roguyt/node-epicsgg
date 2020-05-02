import { Image } from './Image';

export interface SpinnerHistory {
    name: string;
    chance: number;
    isPurchased: boolean;
    images: Image[];
    date: Date | null;
}
