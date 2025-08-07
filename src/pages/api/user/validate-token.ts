import { validateToken } from "@/backend/services/user";
import { NextApiRequest, NextApiResponse } from "next";

const handleValidation = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	return validateToken(req, res);
};

export default handleValidation;
