export type Lane = "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM" | "UTILITY";

export interface LaneStats {
	lane: Lane;
	playerReference: string;
	gold?: number;
	kda?: number;
	farmPerMinute?: number;
	killParticipationPercentage?: number;
	damagePerMinute?: number;
	teamDamagePercentage?: number;
	visionScorePerMinute?: number;
	dragonKilled?: number;
	baronKilled?: number;
	voidGrubsKilled?: number;
	champions: string[];
	teamId?: string;
}

export interface User {
	uid: string;
	email: string;
	password: string;
	lastSignIn: Date;
}

export interface Team {
	uid: string;
	name: string;
	sinergy: number;
	created_by: string;
	create_at: Date;
	updated_by: string;
	updated_at: Date;
}
