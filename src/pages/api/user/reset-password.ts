import { resetPassword, requestPasswordReset } from "@/backend/services/user";
import { NextApiRequest, NextApiResponse } from "next";

const handleReset = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST" && req.method !== "PUT") {
		res.setHeader("Allow", ["POST", "PUT"]);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	if (req.method === "POST") return requestPasswordReset(req, res);
	if (req.method === "PUT") return resetPassword(req, res);
};

export default handleReset;
