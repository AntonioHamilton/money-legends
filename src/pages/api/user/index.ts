import { deleteUser, getUser } from "@/backend/services/user";
import { NextApiRequest, NextApiResponse } from "next";

const handleUserDelete = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "DELETE" && req.method !== "GET") {
		res.setHeader("Allow", ["DELETE", "GET"]);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	if (req.method === "DELETE") return deleteUser(req, res);

	if (req.method === "GET") return getUser(req, res);
};

export default handleUserDelete;
