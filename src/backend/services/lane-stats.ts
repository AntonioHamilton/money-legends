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

		if (!lane) {
			return res
				.status(400)
				.json({ success: false, message: "query: lane is required" });
		}

		if (typeof lane !== "string") {
			return res
				.status(400)
				.json({ success: false, message: "lane must be a string" });
		}

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

export const getLaneStats = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const { lane } = req.query;

	if (!lane) {
		return res
			.status(400)
			.json({ success: false, message: "query: lane is required" });
	}

	if (typeof lane !== "string") {
		return res
			.status(400)
			.json({ success: false, message: "lane must be a string" });
	}

	try {
		await connectToDatabase();

		const statsInfo = await laneStats
			.findOne({
				lane: lane.toUpperCase(),
			})
			.select(["-__v", "-_id"]);

		if (!statsInfo) {
			return res
				.status(404)
				.json({ success: false, message: "Lane stats not found" });
		}

		return res.status(200).json({ success: true, info: statsInfo });
	} catch (error: any) {
		return res.status(500).json({ success: false, error: error.message });
	}
};
