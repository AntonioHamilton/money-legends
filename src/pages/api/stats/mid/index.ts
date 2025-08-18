import { statsSearch } from "@/backend/services/stats-search";
import { NextApiRequest, NextApiResponse } from "next";

const midStatsSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	await statsSearch(
		req,
		res,
		// "68a294f8bb5f208e368154fe", //local
		"68a2a1e4a44f8425e43f2887", //online
		"oFl_Ejq5rTd6BMrVaThl2jilNz9-oeMzRMjit4O15Bl_ovdOkEdqN3rtDFyEeoXBV3q2-ewoQ2FekQ",
		"MIDDLE",
		"420"
	);
};

export default midStatsSearch;
