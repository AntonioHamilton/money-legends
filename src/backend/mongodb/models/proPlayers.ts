import mongoose from "mongoose";

const ProPlayersSchema = new mongoose.Schema({
	summonerName: { type: String, required: true, unique: true },
	playerName: { type: String, required: true },
});

export default mongoose.models.ProPlayers ||
	mongoose.model("ProPlayers", ProPlayersSchema);
