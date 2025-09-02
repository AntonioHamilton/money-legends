import { runIAModel } from "@/utils/sinergyModel";
import { NextApiRequest, NextApiResponse } from "next";

const teamMatrix = [
	[350.0, 3.5, 7.0, 0.45, 800.0, 0.25, 1.5],
	[400.0, 4.0, 8.5, 0.55, 950.0, 0.3, 1.8],
	[320.0, 2.8, 6.5, 0.35, 700.0, 0.2, 1.2],
	[380.0, 5.0, 7.8, 0.6, 1000.0, 0.35, 2.0],
	[300.0, 2.0, 5.5, 0.3, 650.0, 0.15, 1.0],
];

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
