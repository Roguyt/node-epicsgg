import { Insert } from './Insert';
import { Game } from './Game';
import { Team } from './Team';
import { Player } from './Player';
import { PlayerStatsV2 } from './PlayerStatsV2';
import { PlayerStats } from './PlayerStats';
import { PlayerRole } from './PlayerRole';
import { Treatment } from './Treatment';

export interface CardTemplate {
    id: number;
    uuid: string;

    title: string;

    cardType: string;
    categoryId: number;
    treatmentId: number;

    properties: {
        season: string;
        gameId: number;
        teamId: number;
        playerId: number;

        startDate: Date | null;
        endDate: Date | null;
    };

    limitedEdition: boolean;
    rarity: string;
    inCirculation: number;

    images: Record<string, string>;

    insert?: Insert;
    game?: Game;
    team?: Team;
    player?: Player;
    playerStats?: PlayerStatsV2 | PlayerStats;
    playerRole?: PlayerRole;

    treatment: Treatment;
}
