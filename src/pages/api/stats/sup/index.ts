import { statsSearch } from "@/backend/services/stats-search";
import { NextApiRequest, NextApiResponse } from "next";

const supStatsSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	await statsSearch(
		req,
		res,
		"b6Jwril_LRtTgdmY6gUMOEtPBQROVWMaeDwerik_C2TBeDWHkyWGNYQKGiQJFVVIGovtc3GnAZ-O9g",
		"UTILITY"
	);
};

export default supStatsSearch;
