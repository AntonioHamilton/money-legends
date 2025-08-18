import { statsSearch } from "@/backend/services/stats-search";
import { NextApiRequest, NextApiResponse } from "next";

const jgStatsSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	await statsSearch(
		req,
		res,
		// "68a294fcbb5f208e36815500", //local
		"68a2a1f1a44f8425e43f288d", //online
		"JLsGEUb-imxHudkqXeoNSUNv4F8gjLT-fTJwBYnhSkADceuId0X9bZuky7w4PS9yLFD7QtxcPwGhhg",
		"JUNGLE",
		"420"
	);
};

export default jgStatsSearch;
