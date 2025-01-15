import { statsSearch } from "@/backend/services/stats-search";
import { NextApiRequest, NextApiResponse } from "next";

const topStatsSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	await statsSearch(
		req,
		res,
		"VqJK9OIgO6F3cr4cjOqsVklLbyRptIrWwfxK6jSoAXUXbX3nkNfFJUlhMWiW60b9qwXUvQfjXib57g",
		"TOP",
		"420"
	);
};

export default topStatsSearch;
