import { User } from './User';
import { Ranking } from './Ranking';

export interface CollectionRanking extends User {
    ranking: Ranking;
}
