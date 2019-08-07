import { User } from './User';
import { Ranking } from './Ranking';

export interface UserRanking extends User {
    ranking: Ranking;
}
