import { Card } from '../../interfaces/Card';
import { CardTemplate } from '../../interfaces/CardTemplate';

import DateUtils from './Date';

/**
 * @hidden
 */
export default class CardUtils {
    public static createCard(data: any): Card {
        return {
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
            template: CardUtils.createCardTemplate(data.cardTemplate),
        };
    }

    public static createCardTemplate(data: any): CardTemplate {
        const cardTemplate: CardTemplate = {
            id: data.id,
            uuid: data.uuid,
            title: data.title,
            cardType: data.cardType,
            categoryId: data.categoryId,
            treatmentId: data.treatmentId,
            properties: {
                season: data.properties.season,
                gameId: data.properties.game_id,
                teamId: data.properties.team_id,
                playerId: data.properties.player_id,
                startDate: DateUtils.convertToDate(data.properties.date_start),
                endDate: DateUtils.convertToDate(data.properties.date_end),
            },
            limitedEdition: data.limitedEdition,
            inCirculation: data.inCirculation,
            rarity: data.rarity,
            images: data.images,
            treatment: {
                id: data.treatment.id,
                name: data.treatment.name,
                categoryId: data.treatment.categoryId,
                designation: data.treatment.designation,
                tier: data.treatment.tier,
                active: data.treatment.active,
                variation: data.treatment.variation,
                gameSide: data.treatment.gameSide,
                accentColor: data.treatment.accentColor,
                artistName: data.treatment.artistName,
                season: data.treatment.season,
                buyPrice: data.treatment.buyPrice,
                images: data.treatment.images,
                videos: data.treatment.videos,
            },
        };

        if (data.game) {
            cardTemplate.game = {
                id: data.game.id,
                name: data.game.name,
                startDate: DateUtils.convertToDate(data.game.dateStart),
                endDate: DateUtils.convertToDate(data.game.dateEnd),
                image: data.game.image,
                images: data.game.images,
            };
        }

        if (data.team) {
            cardTemplate.team = {
                id: data.team.id,
                country: data.team.country,
                birthDate: DateUtils.convertToDate(data.team.dob),
                name: data.team.name,
                gameId: data.team.gameId,
                active: data.team.active,
                image: data.team.image,
                images: data.team.images,
                bio: data.team.bio,
                startDate: DateUtils.convertToDate(data.team.dateStart),
                endDate: DateUtils.convertToDate(data.team.dateEnd),
                shortName: data.team.shortName,
                manager: data.team.manager,
                players: data.team.playersIds,
            };
        }

        if (data.player) {
            cardTemplate.player = {
                id: data.player.id,
                country: data.player.country,
                birthDate: DateUtils.convertToDate(data.player.dob),
                age: data.player.age,
                name: data.player.name,
                gameId: data.player.gameId,
                teamId: data.player.teamId,
                nickname: data.player.handle,
                active: data.player.active,
                image: data.player.image,
                images: data.player.images,
                videos: data.player.videos,
                bio: data.player.bio,
                position: data.player.position,
                dateStart: DateUtils.convertToDate(data.player.dateStart),
                dateEnd: DateUtils.convertToDate(data.player.dateEnd),
                quote: data.player.quote,
                homeTown: data.player.homeTown,
                frameType: data.player.frameType,
                lastDate: DateUtils.convertToDate(data.player.lastDate),
                playerRoleId: data.player.playerRoleId,
            };
        }

        if (data.playerRole) {
            cardTemplate.playerRole = {
                name: data.playerRole.name,
                gameSideIcon: data.playerRole.gameSideIcon,
            };
        }

        if (data.playerStats) {
            cardTemplate.playerStats = {
                rating: data.playerStats.filter((e: any): any => {
                    return e.name === 'rating2';
                })[0].value,
                previousRating: data.playerStats.filter((e: any): any => {
                    return e.name === 'prevRating2';
                })[0].value,
            };
        } else if (data.playerStatsV2) {
            cardTemplate.playerStats = {
                rating: data.playerStatsV2.rating,
                accuracy: data.playerStatsV2.accuracy,
                impact: data.playerStatsV2.impact,
                assists: data.playerStatsV2.assists,
                entry: data.playerStatsV2.entry,
                utility: data.playerStatsV2.utility,
                experience: data.playerStatsV2.experience,
            };
        }

        if (data.insert) {
            cardTemplate.insert = {
                id: data.insert.id,
                name: data.insert.name,
                images: data.insert.images,
                videos: data.insert.videos,
                isRedeemable: data.insert.isRedeemable,
                properties: {
                    playerIds: data.insert.properties.player_ids,
                    teamIds: data.insert.properties.team_ids,
                    streamerIds: data.insert.properties.streamer_ids,
                    externalItem: data.insert.properties.external_item,
                    expire: DateUtils.convertToDate(data.insert.properties.expire),
                    coins: data.insert.properties.coins,
                    silverCoins: data.insert.properties.silvercoins,
                    craftingCoins: data.insert.properties.craftingcoins,
                    packTemplateIds: data.insert.properties.pack_template_ids,
                },
            };
        }

        return cardTemplate;
    }
}
