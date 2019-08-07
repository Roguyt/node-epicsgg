import { Rating } from './Rating';

export interface PlayerStatsV2 {
    rating: Rating;
    accuracy: Rating;
    impact: Rating;
    assists: Rating;
    entry: Rating;
    utility: Rating;
    experience: Rating;
}
