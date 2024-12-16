import {
	createLaneStats,
	updateLaneStats,
} from "@/backend/services/lane-stats";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		return createLaneStats(req, res);
	}

	if (req.method === "PUT") {
		return updateLaneStats(req, res);
	}

	return res.status(405).json({ success: false, error: "Method Not Allowed" });
}
