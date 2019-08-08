import { UserData } from './UserData';
import { Ranking } from './Ranking';

export interface UserRanking extends UserData {
    ranking: Ranking;
}
