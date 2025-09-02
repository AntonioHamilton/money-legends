import { IAModel } from "@/backend/services/IAModel";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		return IAModel(req, res);
	}

	return res.status(405).json({ success: false, error: "Method Not Allowed" });
}
