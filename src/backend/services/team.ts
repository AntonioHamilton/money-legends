import Teams from "../mongodb/models/teams";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../mongodb/models/user";
import { Types } from "mongoose";
import LaneStats from "../mongodb/models/laneStats";
import jwt from "jsonwebtoken";

export const getTeams = async (req: NextApiRequest, res: NextApiResponse) => {
	const { "auth-token": token } = req.headers;

	try {
		const decoded = jwt.verify(
			token as string,
			process.env.JWT_SECRET as string
		) as {
			id: string;
		};

		const user = await User.findById(decoded.id);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found!",
			});
		}

		const userTeams = await Teams.find({ created_by: user._id }).lean();

		const allTeams = await Promise.all(
			userTeams.map(async (team) => {
				const players = await Promise.all(
					Object.values(team.players).map(async (player) => {
						return LaneStats.findById(player).lean();
					})
				);

				return {
					...team,
					players: {
						top: players[0],
						jungle: players[1],
						middle: players[2],
						bottom: players[3],
						utility: players[4],
					},
				};
			})
		);

		return res.status(200).json({
			success: true,
			data: allTeams,
		});
	} catch (error: any) {
		console.error("Error searching teams:", error.message);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export const createTeam = async (req: NextApiRequest, res: NextApiResponse) => {
	const { team, name, synergy } = req.body;
	const { "auth-token": token } = req.headers;

	console.log({ team, name, synergy, token });

	try {
		const decoded = jwt.verify(
			token as string,
			process.env.JWT_SECRET as string
		) as {
			id: string;
		};

		const verifyUser = await User.findById(decoded.id);

		if (!verifyUser) {
			return res.status(404).json({
				success: false,
				message: "User not found!",
			});
		}

		const userTeams = await Teams.find({ created_by: verifyUser._id }).lean();

		if (userTeams.some((team) => team.name === name)) {
			return res.status(422).json({
				success: false,
				message: "Team name already exists",
			});
		}

		const teamCreated = await Teams.create({
			created_by: verifyUser._id,
			updated_by: verifyUser._id,
			name,
			synergy,
			players: {
				top: new Types.ObjectId(team.top),
				jungle: new Types.ObjectId(team.jungle),
				middle: new Types.ObjectId(team.middle),
				bottom: new Types.ObjectId(team.bottom),
				utility: new Types.ObjectId(team.utility),
			},
		});

		return res.status(201).json({
			success: true,
			data: teamCreated,
		});
	} catch (error: any) {
		console.error("Error creating team:", error.message);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export const deleteTeam = async (req: NextApiRequest, res: NextApiResponse) => {
	const { "auth-token": token } = req.headers;
	const { teamId } = req.query;

	if (!teamId) {
		return res.status(404).json({
			success: false,
			message: "TeamId is required!",
		});
	}

	if (!token) {
		return res
			.status(400)
			.json({ success: false, message: "Token is required" });
	}

	const objectIdTeam = new Types.ObjectId(teamId as string);

	try {
		const decoded = jwt.verify(
			token as string,
			process.env.JWT_SECRET as string
		) as {
			id: string;
		};

		const verifyUser = await User.findById(decoded.id);

		if (!verifyUser) {
			return res.status(404).json({
				success: false,
				message: "User not found!",
			});
		}

		const team = await Teams.find({
			_id: objectIdTeam,
			createdBy: verifyUser._id,
		});

		if (!team || !objectIdTeam) {
			return res.status(404).json({
				success: false,
				message: "Team not found!",
			});
		}

		await Teams.deleteOne(objectIdTeam);

		return res.status(200).json({
			success: true,
			message: "Team deleted successfully!",
		});
	} catch (error: any) {
		console.error("Error deleting team:", error.message);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
