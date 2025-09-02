import { colors } from "@/styles/globalVariables";
import { LoadingContainer } from "@/styles/savedTeams.styled";
import { FloatingMenu } from "@components/FloatingMenu";
import { SavedTeamsList } from "@components/SavedTeamsList";
import ValidateAuthToken from "@components/ValidateAuthToken";
import { api } from "@config/axios";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";

const SavedTeams = () => {
	const [teams, setTeams] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleEdit = async (name: string, id: string) => {
		setLoading(true);
		const res = await api.put(
			`/team?teamId=${id}`,
			{
				name,
			},
			{
				headers: {
					"auth-token": Cookies.get("auth-token"),
				},
			}
		);
		setTeams(res.data.teams);
		setLoading(false);
	};

	const handleDelete = async (id: string) => {
		setLoading(true);
		const res = await api.delete(`/team?teamId=${id}`, {
			headers: {
				"auth-token": Cookies.get("auth-token"),
			},
		});
		setTeams(res.data.teams);
		setLoading(false);
	};

	const handleGetTeams = async () => {
		setLoading(true);
		const teams = await api.get("/team", {
			headers: {
				"auth-token": Cookies.get("auth-token"),
			},
		});

		setTeams(teams.data.data);
		setLoading(false);
	};

	useEffect(() => {
		handleGetTeams();
	}, []);

	return (
		<ValidateAuthToken>
			<SpeedInsights />
			<FloatingMenu />
			{!loading ? (
				<SavedTeamsList
					teams={teams}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			) : (
				<LoadingContainer>
					<OrbitProgress
						color={colors.textPrimary}
						size="medium"
						text=""
						textColor=""
					/>
				</LoadingContainer>
			)}
		</ValidateAuthToken>
	);
};

export default SavedTeams;
