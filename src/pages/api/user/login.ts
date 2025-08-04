import { loginUser } from "@/backend/services/user";
import { NextApiRequest, NextApiResponse } from "next";

const handleLogin = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	return loginUser(req, res);
};

export default handleLogin;
