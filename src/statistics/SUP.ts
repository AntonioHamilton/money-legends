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

export const SUP_STATS = (info: any, player: any) => {

	const { 
		challenges: {
			goldPerMinute, 
			kda,
			killParticipation, 
			teamDamagePercentage, 
			visionScorePerMinute
		}, 
		kills, 
		assists,
	} = player

	const haveMoreAssistsThenKills = assists > kills ? 100 : 0;
	const visionScorePerMinutePercentageStats = visionScorePerMinute * 100 / SUPidealVisionScorePerMinute
	const goldPercentageStats = goldPerMinute * 100 / SUPidealGold
	const KDAPercentageStats = kda * 100 / SUPidealKDA
	const killParticipationPercentageStats = killParticipation * 100 / SUPidealKillParticipationPercentage
	const teamDamagePercentageStats = teamDamagePercentage * 100 / SUPidealTeamDamagePercentage

	const proplayerStats = (
		haveMoreAssistsThenKills +
		visionScorePerMinutePercentageStats +
		goldPercentageStats +
		KDAPercentageStats +
		killParticipationPercentageStats +
		teamDamagePercentageStats
	) / 6

	return {
		stats: {haveMoreAssistsThenKills, visionScorePerMinutePercentageStats, goldPercentageStats, KDAPercentageStats, killParticipationPercentageStats, teamDamagePercentageStats},
		percentage: proplayerStats
	}
}