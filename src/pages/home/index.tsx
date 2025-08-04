import { PlayerCard } from "@components/PlayerCard";
import * as SC from "./styled";
import { SearchBox } from "@components/SearchBox";
import { Typography } from "@components/Typography";
import { PlayerSelector } from "@components/PlayerSelector";

import { MessageModal } from "@components/MessageModal";
import { useHome } from "../../hooks/useHome";
import axios from "axios";
import { IdealData } from "@/types/global";
import { OrbitProgress } from "react-loading-indicators";
import { colors } from "@/styles/globalVariables";

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
		loading,
		role,
		team,
		player,
		error,
	} = useHome(proStats);

	return (
		<SC.Container>
			<Typography className="title">MONEY LOL</Typography>
			<PlayerSelector team={team} changeRole={changeRole} selectedRole={role} />
			<SearchBox
				onChange={onChange}
				onSubmit={onSubmit}
				selectCountry={selectCountry}
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
	);
};

export default Home;
