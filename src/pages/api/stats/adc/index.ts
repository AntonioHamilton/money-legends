import { statsSearch } from "@/backend/services/stats-search";
import { NextApiRequest, NextApiResponse } from "next";

const adcStatsSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	await statsSearch(
		req,
		res,
		// "68a294e8bb5f208e368154fc", //local
		"68a2a1eea44f8425e43f288b", //online
		"jY7rLHgMYQnfXV-_Iv0QMRVQn13Q81_oTcKwXXYNOxcD4b0dvmOEKeWzqKKpZo7f2hvTm9D0jStuYQ",
		"BOTTOM",
		"420"
	);
};

export default adcStatsSearch;
