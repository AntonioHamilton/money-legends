import { statsSearch } from "@/backend/services/stats-search";
import { NextApiRequest, NextApiResponse } from "next";

const midStatsSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	await statsSearch(
		req,
		res,
		"oFl_Ejq5rTd6BMrVaThl2jilNz9-oeMzRMjit4O15Bl_ovdOkEdqN3rtDFyEeoXBV3q2-ewoQ2FekQ",
		"MIDDLE"
	);
};

export default midStatsSearch;
