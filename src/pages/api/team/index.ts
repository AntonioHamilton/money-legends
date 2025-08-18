import { deleteTeam, getTeams } from "@/backend/services/team";
import { NextApiRequest, NextApiResponse } from "next";

const handleCreateTeam = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET" && req.method !== "DELETE") {
		res.setHeader("Allow", ["GET", "DELETE"]);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	if (req.method === "GET") return getTeams(req, res);

	if (req.method === "DELETE") return deleteTeam(req, res);
};

export default handleCreateTeam;
