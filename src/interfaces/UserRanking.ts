import { Ranking } from './Ranking';
import { UserData } from './UserData';

export interface UserRanking extends UserData {
    ranking: Ranking;
}
