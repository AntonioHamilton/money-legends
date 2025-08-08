import { teams } from "@/mocks/teamMock";
import { FloatingMenu } from "@components/FloatingMenu";
import { SavedTeamsList } from "@components/SavedTeamsList";
import ValidateAuthToken from "@components/ValidateAuthToken";
import { SpeedInsights } from "@vercel/speed-insights/next";

const SavedTeams = () => {
	const handleEdit = () => {
		console.log("edit");
	};

	const handleDelete = () => {
		console.log("delete");
	};

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
