import { Ranking } from './Ranking';
import { UserData } from './UserData';

export interface CollectionRanking extends UserData {
    ranking: Ranking;
}
