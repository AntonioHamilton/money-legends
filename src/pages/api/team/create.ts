import { createTeam } from "@/backend/services/team";
import { NextApiRequest, NextApiResponse } from "next";

const handleCreateTeam = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	return createTeam(req, res);
};

export default handleCreateTeam;
