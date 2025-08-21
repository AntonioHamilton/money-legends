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
import { SpeedInsights } from "@vercel/speed-insights/next";
import SaveTeamModal from "@components/SaveTeamModal";
import { SynergyValue } from "@components/SavedTeamsList/styled";

export const getServerSideProps = async () => {
	const idealTOP = await axios(
		`${process.env.NEXT_PUBLIC_API_URL}/api/pro-player?lane=TOP`
	);
	const idealJUNGLE = await axios(
		`${process.env.NEXT_PUBLIC_API_URL}/api/pro-player?lane=JUNGLE`
	);
	const idealMIDDLE = await axios(
		`${process.env.NEXT_PUBLIC_API_URL}/api/pro-player?lane=MIDDLE`
	);
	const idealBOTTOM = await axios(
		`${process.env.NEXT_PUBLIC_API_URL}/api/pro-player?lane=BOTTOM`
	);
	const idealUTILITY = await axios(
		`${process.env.NEXT_PUBLIC_API_URL}/api/pro-player?lane=UTILITY`
	);

	return {
		props: {
			TOP: { success: idealTOP.data.success, info: idealTOP.data.info.stats },
			JUNGLE: {
				success: idealJUNGLE.data.success,
				info: idealJUNGLE.data.info.stats,
			},
			MIDDLE: {
				success: idealMIDDLE.data.success,
				info: idealMIDDLE.data.info.stats,
			},
			BOTTOM: {
				success: idealBOTTOM.data.success,
				info: idealBOTTOM.data.info.stats,
			},
			UTILITY: {
				success: idealUTILITY.data.success,
				info: idealUTILITY.data.info.stats,
			},
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
		saveTeam,
		setModalIsOpen,
		modalIsOpen,
		synergy,
		successMessage,
		loading,
		role,
		team,
		player,
		error,
	} = useHome(proStats);

	return (
		<>
			<SpeedInsights />
			<FloatingMenu />
			<ValidateAuthToken />
			<SC.Container>
				<Typography className="title">Build Your Team</Typography>
				<PlayerSelector
					team={team}
					changeRole={changeRole}
					selectedRole={role}
				/>
				<Typography className="synergy-title">Team Synergy</Typography>
				<SynergyValue>{synergy}</SynergyValue>
				<SC.Button
					disabled={
						!team.BOTTOM.summonerName ||
						!team.JUNGLE.summonerName ||
						!team.MIDDLE.summonerName ||
						!team.TOP.summonerName ||
						!team.UTILITY.summonerName
					}
					onClick={() => setModalIsOpen(true)}
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
						role={role}
						proStats={proStats}
						player={player}
						addToTeam={addToTeam}
					/>
				)}
				<MessageModal
					errorMessage={error}
					successMessage={successMessage}
					type={error ? "error" : "success"}
				/>
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
			<SaveTeamModal
				isOpen={modalIsOpen}
				onClose={() => setModalIsOpen(false)}
				saveTeam={saveTeam}
			/>
		</>
	);
};

export default Home;
