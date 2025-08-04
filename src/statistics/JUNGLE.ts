import {
	IdealData,
	MatchInfo,
	PlayerInfo,
	StatisticsInfo,
} from "@/types/global";

//Median ChatGPT info for Pro Players in LCK / LEC / LCS / Worlds (best leagues / competitions)
const JGidealGold = 400; // Ouro por minuto (GPM), idealmente acima de 450
const JGidealFarmPerMinute = 5.5; // Farm por minuto (CS), idealmente entre 8 e 10
const JGidealKDA = 4; // KDA (Kill/Death/Assist ratio), idealmente acima de 4.0
const JGidealKillParticipationPercentage = 0.725; // Participação em abates (%), idealmente entre 65% e 75%
const JGidealDamagePerMinute = 275; // Dano por minuto (DPM), idealmente acima de 600
const JGidealTeamDamagePercentage = 0.175; // Porcentagem de dano da equipe (%), idealmente entre 25% e 35%
const JGidealVisionScorePerMinute = 1.35; // Pontuação de visão por minuto (VSPM), idealmente entre 0.8 e 1.0
const JGidealDragonKilled = 0.5; // Dragons mortos,  em porcentagem, idealmente 50%
const JGidealBaronKilled = 0.5; // Barons mortos,  em porcentagem, idealmente 50%
const JGidealVoidGrubsKilled = 0.5; // Vastilarvas mortas, em porcentagem, idealmente 50%

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

// voidGrubs (is in the match object, inside the teams, is named horde)
// dragonsKilled (is in the match object, inside the teams, is named dragons)
// voidGrubs (is in the match object, inside the teams, is named horde)
// gameDuration (is in the match object)
// goldPerMinute (inside challenges)
// laneMinionsFirst10Minutes (is in the participant object)
// totalMinionsKilled (is in the participant object)
// KDA (is in the participant object)
// killParticipation (is in the challenges object inside participants)
// totalDamageDealtToChampions (is in the participant object)
// teamDamagePercentage (is in the challenges object inside participants)
// visionScorePerMinute (is in the challenges object inside participants)

export const JG_STATS = (
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
		teamId,
	} = player;

	const { teams } = info;
	const idealStats = idealData.info;

	const JGidealGold = idealStats.gold || 400;
	const JGidealFarmPerMinute = idealStats.farmPerMinute || 5.5;
	const JGidealKDA = idealStats.kda || 4;
	const JGidealKillParticipationPercentage =
		idealStats.killParticipationPercentage || 0.725;
	const JGidealDamagePerMinute = idealStats.damagePerMinute || 275;
	const JGidealTeamDamagePercentage = idealStats.teamDamagePercentage || 0.175;
	const JGidealVisionScorePerMinute = idealStats.visionScorePerMinute || 1.35;

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

	const gameMinutes = Math.floor(gameLength / 60);
	const minionsPerMinute = totalMinionsKilled / gameMinutes;

	const visionScorePerMinutePercentageStats =
		(visionScorePerMinute * 100) / JGidealVisionScorePerMinute;
	const goldPercentageStats = (goldPerMinute * 100) / JGidealGold;
	const farmPercentageStats = (minionsPerMinute * 100) / JGidealFarmPerMinute;
	const KDAPercentageStats = (kda * 100) / JGidealKDA;
	const killParticipationPercentageStats =
		(killParticipation * 100) / JGidealKillParticipationPercentage;
	const damagePerMinutePercentageStats =
		(damagePerMinute * 100) / JGidealDamagePerMinute;
	const teamDamagePercentageStats =
		(teamDamagePercentage * 100) / JGidealTeamDamagePercentage;

	// Stats that only junglers have
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

	const proplayerStats =
		(visionScorePerMinutePercentageStats +
			goldPercentageStats +
			farmPercentageStats +
			KDAPercentageStats +
			killParticipationPercentageStats +
			damagePerMinutePercentageStats +
			teamDamagePercentageStats +
			voidGrubsPercentage +
			dragonsPercentage +
			baronsPercentage) /
		10;

	return {
		stats: {
			visionScorePerMinutePercentageStats,
			goldPercentageStats,
			farmPercentageStats,
			KDAPercentageStats,
			killParticipationPercentageStats,
			damagePerMinutePercentageStats,
			teamDamagePercentageStats,
			voidGrubsPercentage,
			dragonsPercentage,
			baronsPercentage,
		},
		percentage: proplayerStats,
	};
};
