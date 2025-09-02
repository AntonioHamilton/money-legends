import { runIAModel } from "@/utils/sinergyModel";
import { NextApiRequest, NextApiResponse } from "next";

export const IAModel = async (req: NextApiRequest, res: NextApiResponse) => {
	const { newTeam } = req.body;

	try {
		const matrix = Object.keys(newTeam).map((role: string) => {
			return [
				newTeam[role].stats.averageGoldPerMinute,
				newTeam[role].stats.averageKDA,
				newTeam[role].stats.averageFarmPerMinute,
				newTeam[role].stats.averageKillParcipation,
				newTeam[role].stats.averageDamagePerMinute,
				newTeam[role].stats.averageTeamDamagePercentage,
				newTeam[role].stats.averageVisionScorePerMinute,
			];
		});

		const result = await runIAModel(matrix);
		return res.status(200).json({ success: true, result });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: "Internal Server Error" });
	}
};
