export const laneStatsParser = (team: any, lane: string) => {
	return {
		gold: team[lane].averageStats!.averageGoldPerMinute,
		kda: team[lane].averageStats!.averageKDA,
		farmPerMinute: team[lane].averageStats!.averageFarmPerMinute,
		killParticipationPercentage:
			team[lane].averageStats!.averageKillParticipation,
		damagePerMinute: team[lane].averageStats!.averageDamagePerMinute,
		teamDamagePercentage: team[lane].averageStats!.averageTeamDamagePercentage,
		visionScorePerMinute: team[lane].averageStats!.averageVisionScorePerMinute,
		dragonKilled: 1,
		baronKilled: 1,
		voidGrubsKilled: 1,
	};
};
