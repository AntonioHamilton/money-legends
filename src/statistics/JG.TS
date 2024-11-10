//Median ChatGPT info for Pro Players in LCK / LEC / LCS / Worlds (best leagues / competitions)
const JGidealGold = 400; // Ouro por minuto (GPM), idealmente acima de 450
const JGidealFarmPerMinute = 5.5; // Farm por minuto (CS), idealmente entre 8 e 10
const JGidealKDA = 4; // KDA (Kill/Death/Assist ratio), idealmente acima de 4.0
const JGidealKillParticipationPercentage = 72.5; // Participação em abates (%), idealmente entre 65% e 75%
const JGidealDamagePerMinute = 275; // Dano por minuto (DPM), idealmente acima de 600
const JGidealTeamDamagePercentage = 17.5; // Porcentagem de dano da equipe (%), idealmente entre 25% e 35%
const JGidealVisionScorePerMinute = 1.35; // Pontuação de visão por minuto (VSPM), idealmente entre 0.8 e 1.0
const JGidealDragonKilled = 0.5 // Dragons mortos,  em porcentagem, idealmente 50%
const JGidealBaronKilled = 0.5 // Barons mortos,  em porcentagem, idealmente 50%
const JGidealVoidGrubsKilled = 0.5 // Vastilarvas mortas, em porcentagem, idealmente 50%

// voidGrubs (is in the match object, inside the teams, is named horde)
// dragons (is in the match object, inside the teams, is named horde)
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
	gameDuration: number, 
	goldPerMinute: number, 
	totalMinionsKilled: number, 
	KDA: number, 
	killParticipation: number, 
	totalDamageDealtToChampions: number, 
	teamDamagePercentage: number,
	visionScorePerMinute: number,
	totalVoidGrubsKilled: number,
	teamVoidGrubsKilled: number,
	totalDragonsKilled: number,
	teamDragonsKilled: number,
	totalBaronsKilled: number,
	teamBaronsKilled: number
) => {
	const gameMinutes = Math.floor(gameDuration / 60)
	const minionsPerMinute = totalMinionsKilled / gameMinutes
	const damagePerMinute = totalDamageDealtToChampions / gameMinutes

	const visionScorePerMinutePercentageStats = visionScorePerMinute * 100 / JGidealVisionScorePerMinute
	const goldPercentageStats = goldPerMinute * 100 / JGidealGold
	const farmPercentageStats = (minionsPerMinute / gameDuration)* 100 / JGidealFarmPerMinute
	const KDAPercentageStats = KDA * 100 / JGidealKDA
	const killParticipationPercentageStats = killParticipation * 100 / JGidealKillParticipationPercentage
	const damagePerMinutePercentageStats = damagePerMinute * 100 / JGidealDamagePerMinute
	const teamDamagePercentageStats = teamDamagePercentage * 100 / JGidealTeamDamagePercentage

	// Stats that only junglers have
	const voidGrubsPercentage = (teamVoidGrubsKilled / totalVoidGrubsKilled)
	const dragonsPercentage = (teamDragonsKilled / totalDragonsKilled)
	const baronsPercentage = (teamBaronsKilled / totalBaronsKilled)
}