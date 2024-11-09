//Median ChatGPT info for Pro Players in LCK / LEC / LCS / Worlds (best leagues / competitions)
const SUPidealGold = 250
const SUPidealKDA = 4.75
const SUPidealKillParticipationPercentage = 0.7 //(in percentage)
const SUPidealTeamDamagePercentage = 0.075 //(in percentage)
const SUPidealVisionScorePerMinute = 2


// gameDuration (is in the match object)
// goldPerMinute (inside challenges)
// totalMinionsKilled (is in the participant object)
// KDA (is in the participant object)
// teamDamagePercentage (is in the challenges object inside participants)
// assists (in the participant object)
// visionScorePerMinute (is in the challenges object inside participants)

const SUP_STATS = (
	gameDuration: number, 
	goldPerMinute: number, 
	KDA: number,
	assists: number,
	kills: number,
	killParticipation: number, 
	teamDamagePercentage: number,
	visionScorePerMinute: number,
) => {

	const gameMinutes = Math.floor(gameDuration / 60)

	const haveMoreAssistsThenKills = assists > kills; // boolean
	const visionScorePerMinutePercentageStats = visionScorePerMinute * 100 / SUPidealVisionScorePerMinute
	const goldPercentageStats = goldPerMinute * 100 / SUPidealGold
	const KDAPercentageStats = KDA * 100 / SUPidealKDA
	const killParticipationPercentageStats = killParticipation * 100 / SUPidealKillParticipationPercentage
	const teamDamagePercentageStats = teamDamagePercentage * 100 / SUPidealTeamDamagePercentage
}