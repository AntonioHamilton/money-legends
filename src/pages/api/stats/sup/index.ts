import { statsSearch } from "@/backend/services/stats-search";
import { NextApiRequest, NextApiResponse } from "next";

const supStatsSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	await statsSearch(
		req,
		res,
		// "68a294c7bb5f208e368154f8", //local
		"68a2a1eba44f8425e43f2889", //online
		"b6Jwril_LRtTgdmY6gUMOEtPBQROVWMaeDwerik_C2TBeDWHkyWGNYQKGiQJFVVIGovtc3GnAZ-O9g",
		"UTILITY",
		"420"
	);
};

export default supStatsSearch;
