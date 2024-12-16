import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../mongodb/config";
import laneStats from "../mongodb/models/laneStats";

export const createLaneStats = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		await connectToDatabase();

		const {
			lane,
			playerReference,
			idealGold,
			idealKDA,
			idealFarmPerMinute,
			idealKillParticipationPercentage,
			idealDamagePerMinute,
			idealTeamDamagePercentage,
			idealVisionScorePerMinute,
			idealDragonKilled,
			idealBaronKilled,
			idealVoidGrubsKilled,
		} = req.body;

		const laneInfo = await laneStats.create({
			lane,
			playerReference,
			idealGold,
			idealKDA,
			idealFarmPerMinute,
			idealKillParticipationPercentage,
			idealDamagePerMinute,
			idealTeamDamagePercentage,
			idealVisionScorePerMinute,
			idealDragonKilled,
			idealBaronKilled,
			idealVoidGrubsKilled,
		});

		return res.status(201).json({ success: true, data: laneInfo });
	} catch (error: any) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

export const updateLaneStats = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		await connectToDatabase();

		const { lane } = req.query;
		const {
			playerReference,
			idealGold,
			idealKDA,
			idealFarmPerMinute,
			idealKillParticipationPercentage,
			idealDamagePerMinute,
			idealTeamDamagePercentage,
			idealVisionScorePerMinute,
			idealDragonKilled,
			idealBaronKilled,
			idealVoidGrubsKilled,
		} = req.body;

		const updatedLaneStats = await laneStats.findOneAndUpdate(
			{ lane },
			{
				playerReference,
				idealGold,
				idealKDA,
				idealFarmPerMinute,
				idealKillParticipationPercentage,
				idealDamagePerMinute,
				idealTeamDamagePercentage,
				idealVisionScorePerMinute,
				idealDragonKilled,
				idealBaronKilled,
				idealVoidGrubsKilled,
			},
			{ new: true, runValidators: true }
		);

		if (!updatedLaneStats) {
			return res
				.status(404)
				.json({ success: false, message: "Lane stats not found" });
		}

		return res.status(200).json({ success: true, data: updatedLaneStats });
	} catch (error: any) {
		return res.status(500).json({ success: false, error: error.message });
	}
};
