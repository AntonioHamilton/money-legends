export type FIXME = any;

export type PlayerInfo = {
	challenges: {
		goldPerMinute: number;
		kda: number;
		killParticipation: number;
		teamDamagePercentage: number;
		visionScorePerMinute: number;
	};
	summonerName: string;
	riotIdGameName: string;
	riotIdTagline: string;
	kills: number;
	assists: number;
	totalDamageDealtToChampions: number;
	totalMinionsKilled: number;
	teamId: number;
};

export type MatchInfo = {
	gameDuration: number;
	teams: {
		teamId: number;
		objectives: {
			horde: {
				kills: number;
			};
			dragon: {
				kills: number;
			};
			baron: {
				kills: number;
			};
		};
	}[];
};

export type StatisticsInfo = {
	stats: {
		goldPercentageStats: number;
		KDAPercentageStats: number;
		killParticipationPercentageStats: number;
		teamDamagePercentageStats: number;
		damagePerMinutePercentageStats?: number;
		farmPercentageStats?: number;
		visionScorePerMinutePercentageStats?: number;
		voidGrubsPercentage?: number;
		dragonsPercentage?: number;
		baronsPercentage?: number;
		haveMoreAssistsThenKills?: number;
	};
	percentage: number;
};

export type PlayerStatistcsRiot = {
	goldPerMinute: number;
	kda: number;
	killParticipation: number;
	teamDamagePercentage: number;
	visionScorePerMinute: number;
	damagePerMinute: number;
	minionsPerMinute: number;
	voidGrubsPercentage: number;
	dragonsPercentage: number;
	baronsPercentage: number;
};

export type MatchsServiceProps = {
	info: {
		gameMode: string;
		gameDuration: MatchInfo["gameDuration"];
		teams: MatchInfo["teams"];
		participants: PlayerInfo[];
	};
};
