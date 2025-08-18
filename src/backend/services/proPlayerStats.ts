import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../mongodb/config";
import ProPlayers from "../mongodb/models/proPlayers";
import { Types } from "mongoose";
import LaneStats from "../mongodb/models/laneStats";

export const createProPlayerStats = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		await connectToDatabase();

		const { stats, lane, playerName } = req.body;

		const laneInfo = await ProPlayers.create({
			lane,
			playerName,
			stats: new Types.ObjectId(stats),
		});

		return res.status(201).json({ success: true, data: laneInfo });
	} catch (error: any) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

export const getProPlayerStats = async (
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

		const proPlayerInfo = await ProPlayers.findOne({
			lane: lane.toUpperCase(),
		})
			.lean()
			.select(["-__v", "-_id"]);

		if (!proPlayerInfo) {
			return res
				.status(404)
				.json({ success: false, message: "Lane stats not found" });
		}

		const { stats } = proPlayerInfo as any;

		const statsInfo = await LaneStats.findById(stats)
			.lean()
			.select(["-__v", "-_id"]);

		return res
			.status(200)
			.json({ success: true, info: { ...proPlayerInfo, stats: statsInfo } });
	} catch (error: any) {
		return res.status(500).json({ success: false, error: error.message });
	}
};
