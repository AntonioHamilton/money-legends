import {
	FIXME,
	MatchInfo,
	MatchsServiceProps,
	PlayerInfo,
	PlayerStatistcsRiot,
	StatisticsInfo,
} from "@/types/global";

export const roleAnalysis = (
	item: FIXME,
	match: MatchsServiceProps,
	userID: string,
	userFlag: string,
	role: string
) => {
	return (
		item.riotIdGameName.toLowerCase() === userID.toLowerCase() &&
		item.riotIdTagline.toLowerCase() === userFlag.toLowerCase() &&
		item.individualPosition === role &&
		match.info.gameMode === "CLASSIC"
	);
};

export const roleAnalysisByPuuid = (
	item: FIXME,
	match: MatchsServiceProps,
	puuid: string,
	role: string
) => {
	return (
		item.puuid.toLowerCase() === puuid.toLowerCase() &&
		item.individualPosition === role &&
		match.info.gameMode === "CLASSIC"
	);
};

export const getStats = (info: MatchInfo, player: PlayerInfo) => {
	const initialStateTeam = {
		objectives: {
			horde: {
				kills: 0,
			},
			dragon: {
				kills: 0,
			},
			baron: {
				kills: 0,
			},
		},
	};

	const {
		challenges: {
			goldPerMinute,
			kda,
			killParticipation,
			teamDamagePercentage,
			visionScorePerMinute,
		},
		totalDamageDealtToChampions,
		totalMinionsKilled,
		teamId,
	} = player;

	const { gameDuration, teams } = info;

	const gameMinutes = Math.floor(gameDuration / 60);
	const minionsPerMinute = totalMinionsKilled / gameMinutes;
	const damagePerMinute = totalDamageDealtToChampions / gameMinutes;

	let playerTeam = initialStateTeam;
	let enemyTeam = initialStateTeam;

	teams.forEach((team) => {
		if (team.teamId === teamId) {
			playerTeam = team;
		} else {
			enemyTeam = team;
		}
	});

	const teamVoidGrubsKilled = playerTeam.objectives.horde.kills;
	const totalVoidGrubsKilled =
		teamVoidGrubsKilled + enemyTeam.objectives.horde.kills;

	const teamDragonsKilled = playerTeam.objectives.dragon.kills;
	const totalDragonsKilled =
		teamDragonsKilled + enemyTeam.objectives.dragon.kills;

	const teamBaronsKilled = playerTeam.objectives.baron.kills;
	const totalBaronsKilled = teamBaronsKilled + enemyTeam.objectives.baron.kills;

	const voidGrubsPercentage =
		totalVoidGrubsKilled > 0
			? (teamVoidGrubsKilled / totalVoidGrubsKilled) * 100
			: 100;
	const dragonsPercentage =
		totalDragonsKilled > 0
			? (teamDragonsKilled / totalDragonsKilled) * 100
			: 100;
	const baronsPercentage =
		totalBaronsKilled > 0 ? (teamBaronsKilled / totalBaronsKilled) * 100 : 100;

	return {
		goldPerMinute,
		kda,
		killParticipation,
		teamDamagePercentage,
		visionScorePerMinute,
		damagePerMinute,
		minionsPerMinute,
		voidGrubsPercentage,
		dragonsPercentage,
		baronsPercentage,
	};
};

export const playerStatsAverageClient = (
	proPlayerResultsFiltered: {
		percentages: StatisticsInfo;
		matchInfo: FIXME;
	}[],
	userID: string
) => {
	const statsKeys = Object.keys(proPlayerResultsFiltered[0].percentages.stats);
	const matchInfo: FIXME = [];

	if (statsKeys.length <= 0) return {};

	const statsObject: Record<string, FIXME> = {};

	proPlayerResultsFiltered.forEach((value) => {
		matchInfo.push(value.matchInfo);
		statsKeys.forEach((item) => {
			statsObject[item] =
				(statsObject[item] || 0) +
				(value.percentages.stats[item as keyof StatisticsInfo["stats"]] || 0);
		});
	});

	const finalStats: Record<string, FIXME> = {};

	statsKeys.forEach((item) => {
		finalStats[item] = statsObject[item] / proPlayerResultsFiltered.length;
	});

	const percentages = proPlayerResultsFiltered.map(
		(value) => value.percentages.percentage
	);

	const playerStats = {
		summonerName: userID,
		stats: finalStats,
		matchInfo,
		proPlayerPercentage:
			percentages.reduce((value: number, current: number) => value + current) /
			proPlayerResultsFiltered.length,
	};

	return playerStats;
};

export const playerStatsAverageServer = (
	proPlayerResultsFiltered: PlayerStatistcsRiot[],
	puuid: string
) => {
	const statsKeys = Object.keys(proPlayerResultsFiltered[0]);

	if (statsKeys.length <= 0) throw "wrong stats key";

	const statsObject: Record<string, FIXME> = {};

	proPlayerResultsFiltered.forEach((value) => {
		statsKeys.forEach((item) => {
			statsObject[item] =
				(statsObject[item] || 0) +
				(value[item as keyof PlayerStatistcsRiot] || 0);
		});
	});

	const finalStats: Record<string, FIXME> = {};

	statsKeys.forEach((item) => {
		finalStats[item] = statsObject[item] / proPlayerResultsFiltered.length;
	});

	return {
		puuid,
		stats: finalStats,
	};
};
