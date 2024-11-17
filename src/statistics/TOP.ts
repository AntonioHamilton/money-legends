import { MatchInfo, PlayerInfo, StatisticsInfo } from "@/types/global";

//Median ChatGPT info for Pro Players in LCK / LEC / LCS / Worlds (best leagues / competitions)
const TOPidealGold = 395; // Ouro por minuto (GPM), idealmente acima de 450
const TOPidealFarmPerMinute = 7; // Farm por minuto (CS), idealmente entre 8 e 10
const TOPidealKDA = 3.25; // KDA (Kill/Death/Assist ratio), idealmente acima de 4.0
const TOPidealKillParticipationPercentage = 0.5; // Participação em abates (%), idealmente entre 65% e 75%
const TOPidealDamagePerMinute = 525; // Dano por minuto (DPM), idealmente acima de 600
const TOPidealTeamDamagePercentage = 0.225; // Porcentagem de dano da equipe (%), idealmente entre 25% e 35%
const TOPidealVisionScorePerMinute = 0.85; // Pontuação de visão por minuto (VSPM), idealmente entre 0.8 e 1.0

// gameDuration (is in the match object)
// goldPerMinute (inside challenges)
// laneMinionsFirst10Minutes (is in the participant object)
// totalMinionsKilled (is in the participant object)
// KDA (is in the participant object)
// killParticipation (is in the challenges object inside participants)
// totalDamageDealtToChampions (is in the participant object)
// teamDamagePercentage (is in the challenges object inside participants)
// visionScorePerMinute (is in the challenges object inside participants)

type TopProps = {
	gameDuration: number;
	goldPerMinute: number;
	totalMinionsKilled: number;
	KDA: number;
	killParticipation: number;
	totalDamageDealtToChampions: number;
	teamDamagePercentage: number;
	visionScorePerMinute: number;
};

export const TOP_STATS = (
	info: MatchInfo,
	player: PlayerInfo
): StatisticsInfo => {
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
	} = player;

	const { gameDuration } = info;

	const gameMinutes = Math.floor(gameDuration / 60);
	const minionsPerMinute = totalMinionsKilled / gameMinutes;
	const damagePerMinute = totalDamageDealtToChampions / gameMinutes;

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
