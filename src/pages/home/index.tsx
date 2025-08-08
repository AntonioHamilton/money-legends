import { PlayerCard } from "@components/PlayerCard";
import * as SC from "@/styles/home.styled";
import { SearchBox } from "@components/SearchBox";
import { Typography } from "@components/Typography";
import { PlayerSelector } from "@components/PlayerSelector";

import { MessageModal } from "@components/MessageModal";
import { useHome } from "../../hooks/useHome";
import axios from "axios";
import { IdealData } from "@/types/global";
import { OrbitProgress } from "react-loading-indicators";
import { colors } from "@/styles/globalVariables";
import ValidateAuthToken from "@components/ValidateAuthToken";
import { FloatingMenu } from "../../components/FloatingMenu/index";

export const getServerSideProps = async () => {
	const idealTOP = await axios(
		`${process.env.NEXT_PUBLIC_API_URL}/api/lane-stats?lane=TOP`
	);
	const idealJUNGLE = await axios(
		`${process.env.NEXT_PUBLIC_API_URL}/api/lane-stats?lane=JUNGLE`
	);
	const idealMIDDLE = await axios(
		`${process.env.NEXT_PUBLIC_API_URL}/api/lane-stats?lane=MIDDLE`
	);
	const idealBOTTOM = await axios(
		`${process.env.NEXT_PUBLIC_API_URL}/api/lane-stats?lane=BOTTOM`
	);
	const idealUTILITY = await axios(
		`${process.env.NEXT_PUBLIC_API_URL}/api/lane-stats?lane=UTILITY`
	);

	return {
		props: {
			TOP: idealTOP.data,
			JUNGLE: idealJUNGLE.data,
			MIDDLE: idealMIDDLE.data,
			BOTTOM: idealBOTTOM.data,
			UTILITY: idealUTILITY.data,
		},
	};
};

export type HomeProps = {
	TOP: IdealData;
	JUNGLE: IdealData;
	MIDDLE: IdealData;
	BOTTOM: IdealData;
	UTILITY: IdealData;
};

const Home = ({ TOP, JUNGLE, MIDDLE, BOTTOM, UTILITY }: HomeProps) => {
	const proStats = {
		TOP,
		JUNGLE,
		MIDDLE,
		BOTTOM,
		UTILITY,
	};

	const {
		changeRole,
		onChange,
		onSubmit,
		addToTeam,
		selectCountry,
		selectType,
		loading,
		role,
		team,
		player,
		error,
	} = useHome(proStats);

	return (
		<>
			<FloatingMenu />
			<ValidateAuthToken />
			<SC.Container>
				<Typography className="title">Build Your Team</Typography>
				<PlayerSelector
					team={team}
					changeRole={changeRole}
					selectedRole={role}
				/>
				<SC.Button
					disabled={
						!team.BOTTOM.summonerName ||
						!team.JUNGLE.summonerName ||
						!team.MIDDLE.summonerName ||
						!team.TOP.summonerName ||
						!team.UTILITY.summonerName
					}
				>
					Save Team
				</SC.Button>
				<SearchBox
					onChange={onChange}
					onSubmit={onSubmit}
					selectCountry={selectCountry}
					selectType={selectType}
				/>
				{player && (
					<PlayerCard
						role={role === "ANY" ? "MIDDLE" : role}
						proStats={proStats}
						player={player}
						addToTeam={addToTeam}
					/>
				)}
				<MessageModal errorMessage={error} type="negative" />
				{loading && (
					<SC.LoadingContainer>
						<OrbitProgress
							color={colors.textPrimary}
							size="medium"
							text=""
							textColor=""
						/>
					</SC.LoadingContainer>
				)}
			</SC.Container>
		</>
	);
};

export default Home;
