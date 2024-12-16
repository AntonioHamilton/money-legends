import mongoose from "mongoose";

const LaneStatsSchema = new mongoose.Schema({
	lane: { type: String, required: true, unique: true },
	playerReference: { type: String, required: true },
	idealGold: { type: Number, required: false, default: 0 },
	idealKDA: { type: Number, required: false, default: 0 },
	idealFarmPerMinute: { type: Number, required: false, default: 0 },
	idealKillParticipationPercentage: {
		type: Number,
		required: false,
		default: 0,
	},
	idealDamagePerMinute: { type: Number, required: false, default: 0 },
	idealTeamDamagePercentage: { type: Number, required: false, default: 0 },
	idealVisionScorePerMinute: { type: Number, required: false, default: 0 },
	idealDragonKilled: { type: Number, required: false, default: 0 },
	idealBaronKilled: { type: Number, required: false, default: 0 },
	idealVoidGrubsKilled: { type: Number, required: false, default: 0 },
});

export default mongoose.models.LaneStats ||
	mongoose.model("LaneStats", LaneStatsSchema);
