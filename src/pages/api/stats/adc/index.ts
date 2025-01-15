import { statsSearch } from "@/backend/services/stats-search";
import { NextApiRequest, NextApiResponse } from "next";

const adcStatsSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	await statsSearch(
		req,
		res,
		"jY7rLHgMYQnfXV-_Iv0QMRVQn13Q81_oTcKwXXYNOxcD4b0dvmOEKeWzqKKpZo7f2hvTm9D0jStuYQ",
		"BOTTOM",
		"420"
	);
};

export default adcStatsSearch;
