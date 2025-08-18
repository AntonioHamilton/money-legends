import mongoose, { Schema } from "mongoose";

const ProPlayersSchema = new mongoose.Schema({
	lane: { type: String, required: true, unique: true },
	playerName: { type: String, required: true },
	stats: { type: Schema.Types.ObjectId, ref: "LaneStats", required: true },
});

export default mongoose.models.ProPlayers ||
	mongoose.model("ProPlayers", ProPlayersSchema);
