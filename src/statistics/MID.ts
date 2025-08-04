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

export const MID_STATS = (
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
			gameLength,
			damagePerMinute,
		},
		totalMinionsKilled,
	} = player;

	const idealStats = idealData.info;

	const MIDidealGold = idealStats.gold || 450;
	const MIDidealFarmPerMinute = idealStats.farmPerMinute || 8;
	const MIDidealKDA = idealStats.kda || 4.0;
	const MIDidealKillParticipationPercentage =
		idealStats.killParticipationPercentage || 0.65;
	const MIDidealDamagePerMinute = idealStats.damagePerMinute || 600;
	const MIDidealTeamDamagePercentage = idealStats.teamDamagePercentage || 0.3;
	const MIDidealVisionScorePerMinute = idealStats.damagePerMinute || 0.8;

	const gameMinutes = Math.floor(gameLength / 60);
	const minionsPerMinute = totalMinionsKilled / gameMinutes;

	const visionScorePerMinutePercentageStats =
		(visionScorePerMinute * 100) / MIDidealVisionScorePerMinute;
	const goldPercentageStats = (goldPerMinute * 100) / MIDidealGold;
	const farmPercentageStats = (minionsPerMinute * 100) / MIDidealFarmPerMinute;
	const KDAPercentageStats = (kda * 100) / MIDidealKDA;
	const killParticipationPercentageStats =
		(killParticipation * 100) / MIDidealKillParticipationPercentage;
	const damagePerMinutePercentageStats =
		(damagePerMinute * 100) / MIDidealDamagePerMinute;
	const teamDamagePercentageStats =
		(teamDamagePercentage * 100) / MIDidealTeamDamagePercentage;

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
