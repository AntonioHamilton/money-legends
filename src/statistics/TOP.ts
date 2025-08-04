import {
	IdealData,
	MatchInfo,
	PlayerInfo,
	StatisticsInfo,
} from "@/types/global";

// gameDuration (is in the match object)
// goldPerMinute (inside challenges)
// laneMinionsFirst10Minutes (is in the participant object)
// totalMinionsKilled (is in the participant object)
// KDA (is in the participant object)
// killParticipation (is in the challenges object inside participants)
// totalDamageDealtToChampions (is in the participant object)
// teamDamagePercentage (is in the challenges object inside participants)
// visionScorePerMinute (is in the challenges object inside participants)

export const TOP_STATS = (
	info: MatchInfo,
	player: PlayerInfo,
	idealData: IdealData
): StatisticsInfo => {
	const {
		challenges: {
			goldPerMinute,
			kda,
			killParticipation,
			teamDamagePercentage,
			visionScorePerMinute,
			damagePerMinute,
			gameLength,
		},
		totalMinionsKilled,
	} = player;

	const idealStats = idealData.info;

	const TOPidealGold = idealStats.gold || 395;
	const TOPidealFarmPerMinute = idealStats.farmPerMinute || 7;
	const TOPidealKDA = idealStats.kda || 3.25;
	const TOPidealKillParticipationPercentage =
		idealStats.killParticipationPercentage || 0.5;
	const TOPidealDamagePerMinute = idealStats.damagePerMinute || 525;
	const TOPidealTeamDamagePercentage = idealStats.teamDamagePercentage || 0.225;
	const TOPidealVisionScorePerMinute = idealStats.visionScorePerMinute || 0.85;

	const gameMinutes = Math.floor(gameLength / 60);
	const minionsPerMinute = totalMinionsKilled / gameMinutes;

	const visionScorePerMinutePercentageStats =
		(visionScorePerMinute * 100) / TOPidealVisionScorePerMinute;
	const goldPercentageStats = (goldPerMinute * 100) / TOPidealGold;
	const farmPercentageStats = (minionsPerMinute * 100) / TOPidealFarmPerMinute;
	const KDAPercentageStats = (kda * 100) / TOPidealKDA;
	const killParticipationPercentageStats =
		(killParticipation * 100) / TOPidealKillParticipationPercentage;
	const damagePerMinutePercentageStats =
		(damagePerMinute * 100) / TOPidealDamagePerMinute;
	const teamDamagePercentageStats =
		(teamDamagePercentage * 100) / TOPidealTeamDamagePercentage;

	const proplayerStats =
		(visionScorePerMinutePercentageStats +
			goldPercentageStats +
			farmPercentageStats +
			KDAPercentageStats +
			killParticipationPercentageStats +
			damagePerMinutePercentageStats +
			teamDamagePercentageStats) /
		7;

	return {
		stats: {
			visionScorePerMinutePercentageStats,
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
