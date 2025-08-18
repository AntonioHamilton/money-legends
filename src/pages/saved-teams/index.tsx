import { FloatingMenu } from "@components/FloatingMenu";
import { SavedTeamsList } from "@components/SavedTeamsList";
import ValidateAuthToken from "@components/ValidateAuthToken";
import { api } from "@config/axios";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const SavedTeams = () => {
	const [teams, setTeams] = useState([]);

	const handleEdit = () => {};

	const handleDelete = async (id: string) => {
		await api.delete(`/team?teamId=${id}`, {
			headers: {
				"auth-token": Cookies.get("auth-token"),
			},
		});
	};

	const handleGetTeams = async () => {
		const teams = await api.get("/team", {
			headers: {
				"auth-token": Cookies.get("auth-token"),
			},
		});

		setTeams(teams.data.data);
	};

	useEffect(() => {
		handleGetTeams();
	}, []);

	return (
		<>
			<SpeedInsights />
			<FloatingMenu />
			<ValidateAuthToken />
			<SavedTeamsList
				teams={teams}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
		</>
	);
};

export default SavedTeams;
