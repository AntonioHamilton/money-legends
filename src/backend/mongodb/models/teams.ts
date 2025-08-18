import mongoose, { Schema } from "mongoose";

const TeamsSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: false },
		synergy: { type: Number, required: true, unique: false },
		players: {
			top: { type: Schema.Types.ObjectId, required: true, ref: "LaneStats" },
			jungle: { type: Schema.Types.ObjectId, required: true, ref: "LaneStats" },
			middle: { type: Schema.Types.ObjectId, required: true, ref: "LaneStats" },
			bottom: { type: Schema.Types.ObjectId, required: true, ref: "LaneStats" },
			utility: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: "LaneStats",
			},
		},
		created_by: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		updated_by: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Teams || mongoose.model("Teams", TeamsSchema);
