import { statsSearch } from "@/backend/services/stats-search";
import { NextApiRequest, NextApiResponse } from "next";

const jgStatsSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	await statsSearch(
		req,
		res,
		"JLsGEUb-imxHudkqXeoNSUNv4F8gjLT-fTJwBYnhSkADceuId0X9bZuky7w4PS9yLFD7QtxcPwGhhg",
		"JUNGLE"
	);
};

export default jgStatsSearch;
