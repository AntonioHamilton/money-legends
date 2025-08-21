import { deleteTeam, getTeams, updateTeam } from "@/backend/services/team";
import { NextApiRequest, NextApiResponse } from "next";

const handleCreateTeam = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET" && req.method !== "DELETE" && req.method !== "PUT") {
		res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	if (req.method === "GET") return getTeams(req, res);

	if (req.method === "DELETE") return deleteTeam(req, res);

	if (req.method === "PUT") return updateTeam(req, res);
};

export default handleCreateTeam;
