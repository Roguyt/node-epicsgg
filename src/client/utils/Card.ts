import DateUtils from './Date';

export default class CardUtils {
    // TODO: Fix for previous non V2 Rating
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static createACard(data: any): Card {
        console.log(data);

        let card: Card = {
            id: data.id,
            uuid: data.uuid,
            images: data.images,
            type: data.type,
            mint: {
                batch: data.mintBatch,
                value: data.mintNumber,
            },
            rating: data.rating,
            signatureImage: data.signatureImage,
            isNewTemplate: data.isNewCardTemplate,
            isGhost: data.isGhost,
            isOnMarket: data.isMarketList,
            isOnTrade: data.isTradeList,
            template: {
                id: data.cardTemplate.id,
                uuid: data.cardTemplate.uuid,
                title: data.cardTemplate.title,
                cardType: data.cardTemplate.cardType,
                categoryId: data.cardTemplate.categoryId,
                treatmentId: data.cardTemplate.treatmentId,
                properties: {
                    season: data.cardTemplate.properties.season,
                    gameId: data.cardTemplate.properties.game_id,
                    teamId: data.cardTemplate.properties.team_id,
                    playerId: data.cardTemplate.properties.player_id,
                    startDate: DateUtils.convertToDate(data.cardTemplate.properties.date_start),
                    endDate: DateUtils.convertToDate(data.cardTemplate.properties.date_end),
                },
                limitedEdition: data.cardTemplate.limitedEdition,
                inCirculation: data.cardTemplate.inCirculation,
                rarity: data.cardTemplate.rarity,
                images: data.cardTemplate.images,
                treatment: {
                    id: data.cardTemplate.treatment.id,
                    name: data.cardTemplate.treatment.name,
                    categoryId: data.cardTemplate.treatment.categoryId,
                    designation: data.cardTemplate.treatment.designation,
                    tier: data.cardTemplate.treatment.tier,
                    active: data.cardTemplate.treatment.active,
                    variation: data.cardTemplate.treatment.variation,
                    gameSide: data.cardTemplate.treatment.gameSide,
                    accentColor: data.cardTemplate.treatment.accentColor,
                    artistName: data.cardTemplate.treatment.artistName,
                    season: data.cardTemplate.treatment.season,
                    buyPrice: data.cardTemplate.treatment.buyPrice,
                    images: data.cardTemplate.treatment.images,
                    videos: data.cardTemplate.treatment.videos,
                },
            },
        };

        if (data.cardTemplate.game) {
            data.game = {
                id: data.cardTemplate.game.id,
                name: data.cardTemplate.game.name,
                startDate: DateUtils.convertToDate(data.cardTemplate.game.dateStart),
                endDate: DateUtils.convertToDate(data.cardTemplate.game.dateEnd),
                image: data.cardTemplate.game.image,
                images: data.cardTemplate.game.images,
            };
        }

        if (data.cardTemplate.team) {
            data.team = {
                id: data.cardTemplate.team.id,
                country: data.cardTemplate.team.country,
                birthDate: DateUtils.convertToDate(data.cardTemplate.team.dob),
                name: data.cardTemplate.team.name,
                gameId: data.cardTemplate.team.gameId,
                active: data.cardTemplate.team.active,
                image: data.cardTemplate.team.image,
                images: data.cardTemplate.team.images,
                bio: data.cardTemplate.team.bio,
                startDate: DateUtils.convertToDate(data.cardTemplate.team.dateStart),
                endDate: DateUtils.convertToDate(data.cardTemplate.team.dateEnd),
                shortName: data.cardTemplate.team.shortName,
                manager: data.cardTemplate.team.manager,
                players: data.cardTemplate.team.playersIds,
            };
        }

        if (data.cardTemplate.player) {
            card.template.player = {
                id: data.cardTemplate.player.id,
                country: data.cardTemplate.player.country,
                birthDate: DateUtils.convertToDate(data.cardTemplate.player.dob),
                age: data.cardTemplate.player.age,
                name: data.cardTemplate.player.name,
                gameId: data.cardTemplate.player.gameId,
                teamId: data.cardTemplate.player.teamId,
                nickname: data.cardTemplate.player.handle,
                active: data.cardTemplate.player.active,
                image: data.cardTemplate.player.image,
                images: data.cardTemplate.player.images,
                videos: data.cardTemplate.player.videos,
                bio: data.cardTemplate.player.bio,
                position: data.cardTemplate.player.position,
                dateStart: DateUtils.convertToDate(data.cardTemplate.player.dateStart),
                dateEnd: DateUtils.convertToDate(data.cardTemplate.player.dateEnd),
                quote: data.cardTemplate.player.quote,
                homeTown: data.cardTemplate.player.homeTown,
                frameType: data.cardTemplate.player.frameType,
                lastDate: DateUtils.convertToDate(data.cardTemplate.player.lastDate),
                playerRoleId: data.cardTemplate.player.playerRoleId,
            };

            card.template.playerStats = {
                rating: data.cardTemplate.playerStatsV2.rating,
                accuracy: data.cardTemplate.playerStatsV2.accuracy,
                impact: data.cardTemplate.playerStatsV2.impact,
                assists: data.cardTemplate.playerStatsV2.assists,
                entry: data.cardTemplate.playerStatsV2.entry,
                utility: data.cardTemplate.playerStatsV2.utility,
                experience: data.cardTemplate.playerStatsV2.experience,
            };

            card.template.playerRole = {
                name: data.cardTemplate.playerRole.name,
                gameSideIcon: data.cardTemplate.playerRole.gameSideIcon,
            };
        }

        return card;
    }
}
