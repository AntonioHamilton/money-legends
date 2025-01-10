import { PlayerCard } from "@components/PlayerCard";
import * as SC from "../views/home/styled";
import { SearchBox } from "@components/SearchBox";
import { Typography } from "@components/Typography";
import { PlayerSelector } from "@components/PlayerSelector";

import { MessageModal } from "@components/ErrorModal";
import { useHome } from "../hooks/useHome";
import axios from "axios";
import { IdealData } from "@/types/global";

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
		loading,
		role,
		team,
		player,
		error,
	} = useHome(proStats);

	return (
		<SC.Container>
			<Typography className="title">WORK HARD GG</Typography>
			<PlayerSelector team={team} changeRole={changeRole} selectedRole={role} />
			<SearchBox onChange={onChange} onSubmit={onSubmit} />
			{player && (
				<PlayerCard
					role={role === "ANY" ? "MIDDLE" : role}
					proStats={proStats}
					player={player}
					addToTeam={addToTeam}
				/>
			)}
			<MessageModal errorMessage={error} type="negative" />
		</SC.Container>
	);
};

export default Home;
