import { UserData } from './UserData';
import { Ranking } from './Ranking';

export interface CollectionRanking extends UserData {
    ranking: Ranking;
}
