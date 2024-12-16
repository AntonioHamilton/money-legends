import { getMatchWithPuuid } from "@/backend/services/match";
import {
	getStats,
	playerStatsAverageServer,
	roleAnalysisByPuuid,
} from "@/helpers/playerAnalysis";
import { FIXME, MatchsServiceProps } from "@/types/global";
import { API_URLS } from "@config/url";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const midStatsSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	const puuid =
		"oFl_Ejq5rTd6BMrVaThl2jilNz9-oeMzRMjit4O15Bl_ovdOkEdqN3rtDFyEeoXBV3q2-ewoQ2FekQ"; //Faker;
	const url = API_URLS.ASIA;
	const protocol = req?.headers?.host?.includes("localhost") ? "http" : "https";
	const baseUrl = `${protocol}://${req.headers.host}`;

	try {
		const matchs = (await getMatchWithPuuid(
			url,
			puuid as string
		)) as MatchsServiceProps[];

		if (matchs.length < 1) {
			return res
				.status(424)
				.json({ success: false, error: "something gone wrong with riot API" });
		}

		const proplayerResults = matchs.map((match) => {
			const playerInMatch = match.info.participants.filter((item) => {
				if (roleAnalysisByPuuid(item, match, puuid, "MIDDLE")) {
					return item;
				}
				return null;
			});

			return playerInMatch[0] ? getStats(match.info, playerInMatch[0]) : null;
		});

		const proPlayerResultsFiltered = proplayerResults.filter(
			(match) => !!match
		);

		let laneStats: Record<string, FIXME> | null = null;

		if (proPlayerResultsFiltered.length > 0) {
			laneStats = playerStatsAverageServer(proPlayerResultsFiltered, puuid);
		} else {
			return res.status(500).json({
				success: false,
				error: "player dont have any matchs get another puuid for MID lane",
			});
		}

		if (laneStats.puuid) {
			const response = await axios.put(`${baseUrl}/api/lane-stats?lane=mid`, {
				playerReference: laneStats.puuid,
				idealGold: laneStats.stats.goldPerMinute,
				idealKDA: laneStats.stats.kda,
				idealFarmPerMinute: laneStats.stats.minionsPerMinute,
				idealKillParticipationPercentage: laneStats.stats.killParticipation,
				idealDamagePerMinute: laneStats.stats.damagePerMinute,
				idealTeamDamagePercentage: laneStats.stats.teamDamagePercentage,
				idealVisionScorePerMinute: laneStats.stats.visionScorePerMinute,
				idealDragonKilled: laneStats.stats.voidGrubsPercentage,
				idealBaronKilled: laneStats.stats.dragonsPercentage,
				idealVoidGrubsKilled: laneStats.stats.baronsPercentage,
			});
			return res.status(response.status).json(response.data);
		} else {
			return res.status(500).json({
				success: false,
				error: `Something got wrong getting this player | puuid: ${puuid}`,
			});
		}
	} catch (error: any) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

export default midStatsSearch;
