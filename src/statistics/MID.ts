//Median ChatGPT info for Pro Players in LCK / LEC / LCS / Worlds (best leagues / competitions)
const MIDidealGold = 450; // Ouro por minuto (GPM), idealmente acima de 450
const MIDidealFarmPerMinute = 8; // Farm por minuto (CS), idealmente entre 8 e 10
const MIDidealKDA = 4.0; // KDA (Kill/Death/Assist ratio), idealmente acima de 4.0
const MIDidealKillParticipationPercentage = 65; // Participação em abates (%), idealmente entre 65% e 75%
const MIDidealDamagePerMinute = 600; // Dano por minuto (DPM), idealmente acima de 600
const MIDidealTeamDamagePercentage = 30; // Porcentagem de dano da equipe (%), idealmente entre 25% e 35%
const MIDidealVisionScorePerMinute = 0.8; // Pontuação de visão por minuto (VSPM), idealmente entre 0.8 e 1.0

// gameDuration (is in the match object)
// goldPerMinute (inside challenges)
// laneMinionsFirst10Minutes (is in the participant object)
// totalMinionsKilled (is in the participant object)
// KDA (is in the participant object)
// killParticipation (is in the challenges object inside participants)
// totalDamageDealtToChampions (is in the participant object)
// teamDamagePercentage (is in the challenges object inside participants)
// visionScorePerMinute (is in the challenges object inside participants)

export const MID_STATS = (info: any, player: any) => {
	const { 
		challenges: {
			goldPerMinute, 
			kda, 
			killParticipation, 
			teamDamagePercentage, 
			visionScorePerMinute
		}, 
		totalDamageDealtToChampions, 
		totalMinionsKilled 
	} = player

	const { gameDuration } = info

	const gameMinutes = Math.floor(gameDuration / 60)
	const minionsPerMinute = totalMinionsKilled / gameMinutes
	const damagePerMinute = totalDamageDealtToChampions / gameMinutes

	const visionScorePerMinutePercentageStats = visionScorePerMinute * 100 / MIDidealVisionScorePerMinute
	const goldPercentageStats = goldPerMinute * 100 / MIDidealGold
	const farmPercentageStats = (minionsPerMinute / gameDuration)* 100 / MIDidealFarmPerMinute
	const KDAPercentageStats = kda * 100 / MIDidealKDA
	const killParticipationPercentageStats = killParticipation * 100 / MIDidealKillParticipationPercentage
	const damagePerMinutePercentageStats = damagePerMinute * 100 / MIDidealDamagePerMinute
	const teamDamagePercentageStats = teamDamagePercentage * 100 / MIDidealTeamDamagePercentage

	const proplayerStats = (
		visionScorePerMinutePercentageStats + 
		goldPercentageStats + 
		farmPercentageStats + 
		KDAPercentageStats + 
		killParticipationPercentageStats + 
		damagePerMinutePercentageStats + 
		teamDamagePercentageStats
	) / 7

	return proplayerStats
}