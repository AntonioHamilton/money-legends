import mongoose from "mongoose";

const LaneStatsSchema = new mongoose.Schema({
	lane: { type: String, required: true },
	playerReference: { type: String, required: true },
	gold: { type: Number, required: false, default: 0 },
	kda: { type: Number, required: false, default: 0 },
	farmPerMinute: { type: Number, required: false, default: 0 },
	killParticipationPercentage: {
		type: Number,
		required: false,
		default: 0,
	},
	damagePerMinute: { type: Number, required: false, default: 0 },
	teamDamagePercentage: { type: Number, required: false, default: 0 },
	visionScorePerMinute: { type: Number, required: false, default: 0 },
	dragonKilled: { type: Number, required: false, default: 0 },
	baronKilled: { type: Number, required: false, default: 0 },
	voidGrubsKilled: { type: Number, required: false, default: 0 },
});

export default mongoose.models.LaneStats ||
	mongoose.model("LaneStats", LaneStatsSchema);
