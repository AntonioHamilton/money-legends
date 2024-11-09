//Median ChatGPT info for Pro Players in LCK / LEC / LCS / Worlds (best leagues / competitions)
const ADCidealGold = 475
const ADCidealFarmPerMinute = 9.25
const ADCidealKDA = 5
const ADCidealKillParticipationPercentage = 0.6 //(in percentage)
const ADCidealDamagePerMinute = 600
const ADCidealTeamDamagePercentage = 0.3 //(in percentage)

// gameDuration (is in the match object)
// goldPerMinute (inside challenges)
// laneMinionsFirst10Minutes (is in the participant object)
// totalMinionsKilled (is in the participant object)
// KDA (is in the participant object)
// killParticipation (is in the challenges object inside participants)
// totalDamageDealtToChampions (is in the participant object)
// teamDamagePercentage (is in the challenges object inside participants)

const ADC_STATS = (
	gameDuration: number, 
	goldPerMinute: number, 
	totalMinionsKilled: number, 
	KDA: number, 
	killParticipation: number, 
	totalDamageDealtToChampions: number, 
	teamDamagePercentage: number
) => {
	const gameMinutes = Math.floor(gameDuration / 60)
	const minionsPerMinute = totalMinionsKilled / gameMinutes
	const damagePerMinute = totalDamageDealtToChampions / gameMinutes

	const goldPercentageStats = goldPerMinute * 100 / ADCidealGold
	const farmPercentageStats = (minionsPerMinute / gameDuration)* 100 / ADCidealFarmPerMinute
	const KDAPercentageStats = KDA * 100 / ADCidealKDA
	const killParticipationPercentageStats = killParticipation * 100 / ADCidealKillParticipationPercentage
	const damagePerMinutePercentageStats = damagePerMinute * 100 / ADCidealDamagePerMinute
	const teamDamagePercentageStats = teamDamagePercentage * 100 / ADCidealTeamDamagePercentage
}