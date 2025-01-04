import {
	IdealData,
	MatchInfo,
	PlayerInfo,
	StatisticsInfo,
} from "@/types/global";

//Median ChatGPT info for Pro Players in LCK / LEC / LCS / Worlds (best leagues / competitions)
// gameDuration (is in the match object)
// goldPerMinute (inside challenges)
// laneMinionsFirst10Minutes (is in the participant object)
// totalMinionsKilled (is in the participant object)
// KDA (is in the participant object)
// killParticipation (is in the challenges object inside participants)
// totalDamageDealtToChampions (is in the participant object)
// teamDamagePercentage (is in the challenges object inside participants)

export const ADC_STATS = (
	info: MatchInfo,
	player: PlayerInfo,
	idealData: IdealData
): StatisticsInfo => {
	const {
		challenges: { goldPerMinute, kda, killParticipation, teamDamagePercentage },
		totalDamageDealtToChampions,
		totalMinionsKilled,
	} = player;

	const idealStats = idealData.info;

	const ADCidealGold = idealStats.idealGold || 475;
	const ADCidealFarmPerMinute = idealStats.idealFarmPerMinute || 9.25;
	const ADCidealKDA = idealStats.idealKDA || 5;
	const ADCidealKillParticipationPercentage =
		idealStats.idealKillParticipationPercentage || 0.6;
	const ADCidealDamagePerMinute = idealStats.idealDamagePerMinute || 600;
	const ADCidealTeamDamagePercentage =
		idealStats.idealTeamDamagePercentage || 0.3;

	const { gameDuration } = info;

	const gameMinutes = Math.floor(gameDuration / 60);
	const minionsPerMinute = totalMinionsKilled / gameMinutes;
	const damagePerMinute = totalDamageDealtToChampions / gameMinutes;

	const goldPercentageStats = (goldPerMinute * 100) / ADCidealGold;
	const farmPercentageStats = (minionsPerMinute * 100) / ADCidealFarmPerMinute;
	const KDAPercentageStats = (kda * 100) / ADCidealKDA;
	const killParticipationPercentageStats =
		(killParticipation * 100) / ADCidealKillParticipationPercentage;
	const damagePerMinutePercentageStats =
		(damagePerMinute * 100) / ADCidealDamagePerMinute;
	const teamDamagePercentageStats =
		(teamDamagePercentage * 100) / ADCidealTeamDamagePercentage;

	const proplayerStats =
		(goldPercentageStats ||
			0 + farmPercentageStats ||
			0 + KDAPercentageStats ||
			0 + killParticipationPercentageStats ||
			0 + damagePerMinutePercentageStats ||
			0 + teamDamagePercentageStats ||
			0) / 6;

	return {
		stats: {
			goldPercentageStats,
			farmPercentageStats,
			KDAPercentageStats,
			killParticipationPercentageStats,
			damagePerMinutePercentageStats,
			teamDamagePercentageStats,
		},
		percentage: proplayerStats,
	};
};
