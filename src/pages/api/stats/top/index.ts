import { statsSearch } from "@/backend/services/stats-search";
import { NextApiRequest, NextApiResponse } from "next";

const topStatsSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	await statsSearch(
		req,
		res,
		// "68a29506bb5f208e36815502", //localposition
		"68a2a1daa44f8425e43f2885", //onlineposition
		"VqJK9OIgO6F3cr4cjOqsVklLbyRptIrWwfxK6jSoAXUXbX3nkNfFJUlhMWiW60b9qwXUvQfjXib57g",
		"TOP",
		"420"
	);
};

export default topStatsSearch;
