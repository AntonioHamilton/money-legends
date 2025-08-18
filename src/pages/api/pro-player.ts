import {
	createProPlayerStats,
	getProPlayerStats,
} from "@/backend/services/proPlayerStats";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		return createProPlayerStats(req, res);
	}

	if (req.method === "GET") {
		return getProPlayerStats(req, res);
	}

	return res.status(405).json({ success: false, error: "Method Not Allowed" });
}
