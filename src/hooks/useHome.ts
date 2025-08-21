import { ChangeEvent, useState } from "react";
import {
	TOP_STATS,
	JG_STATS,
	ADC_STATS,
	MID_STATS,
	SUP_STATS,
} from "@statistics/index";
import {
	FIXME,
	IdealData,
	MatchInfo,
	MatchsServiceProps,
	PlayerInfo,
	StatisticsInfo,
} from "@/types/global";
import { api } from "@config/axios";
import {
	roleAnalysis,
	playerStatsAverageClient,
} from "@/helpers/playerAnalysis";
import { HomeProps } from "@/pages/home";
import { synergyModel } from "@/utils/sinergyModel";
import { laneStatsParser } from "@/utils/laneStatsParser";
import Cookies from "js-cookie";

const REMAKE_TIME = 300;

type PlayerProps = {
	summonerName: string;
	proPlayerPercentage: number;
	averageStats?: Record<string, unknown>;
	stats: Record<string, unknown>;
};

export type TeamProps = {
	TOP: PlayerProps;
	JUNGLE: PlayerProps;
	MIDDLE: PlayerProps;
	BOTTOM: PlayerProps;
	UTILITY: PlayerProps;
};

const roleFunctions: Record<
	string,
	(
		info: MatchInfo,
		player: PlayerInfo,
		idealData: IdealData,
		data: HomeProps
	) => StatisticsInfo
> = {
	TOP: TOP_STATS,
	JUNGLE: JG_STATS,
	MIDDLE: MID_STATS,
	BOTTOM: ADC_STATS,
	UTILITY: SUP_STATS,
};

const initialPlayerState: PlayerProps = {
	summonerName: "",
	stats: {},
	proPlayerPercentage: 0,
};

export const queueTypes = {
	FLEX: "440",
	SOLO: "420",
	ANY: "",
};

export const useHome = (idealData: HomeProps) => {
	const [queueType, setQueueType] = useState<keyof typeof queueTypes>("SOLO");
	const [synergy, setSynergy] = useState<number>(0);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [role, setRole] = useState<keyof TeamProps>("TOP");
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [region, setRegion] = useState("AMERICAS");
	const [player, setPlayer] = useState<FIXME>();
	const [team, setTeam] = useState<TeamProps>({
		TOP: initialPlayerState,
		JUNGLE: initialPlayerState,
		MIDDLE: initialPlayerState,
		BOTTOM: initialPlayerState,
		UTILITY: initialPlayerState,
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSuccessMessage("");
		setError("");
		setSearchInput(e.target.value);
	};

	const saveTeam = async (teamName: string) => {
		setError("");
		setSuccessMessage("");

		try {
			const topStatsId = await api
				.post("/lane-stats", {
					lane: "TOP",
					playerReference: team.TOP.summonerName,
					...laneStatsParser(team, "TOP"),
				})
				.then((res) => res.data.data._id);

			const jungleStatsId = await api
				.post("/lane-stats", {
					lane: "JUNGLE",
					playerReference: team.JUNGLE.summonerName,
					...laneStatsParser(team, "JUNGLE"),
				})
				.then((res) => res.data.data._id);

			const middleStatsId = await api
				.post("/lane-stats", {
					lane: "MIDDLE",
					playerReference: team.MIDDLE.summonerName,
					...laneStatsParser(team, "MIDDLE"),
				})
				.then((res) => res.data.data._id);

			const bottomStatsId = await api
				.post("/lane-stats", {
					lane: "BOTTOM",
					playerReference: team.BOTTOM.summonerName,
					...laneStatsParser(team, "BOTTOM"),
				})
				.then((res) => res.data.data._id);

			const utilityStatsId = await api
				.post("/lane-stats", {
					lane: "UTILITY",
					playerReference: team.UTILITY.summonerName,
					...laneStatsParser(team, "UTILITY"),
				})
				.then((res) => res.data.data._id);

			const response = await api.post(
				"/team/create",
				{
					name: teamName,
					synergy,
					team: {
						top: topStatsId,
						jungle: jungleStatsId,
						middle: middleStatsId,
						bottom: bottomStatsId,
						utility: utilityStatsId,
					},
				},
				{ headers: { "auth-token": Cookies.get("auth-token") } }
			);

			if (response.data.success) {
				setSuccessMessage("Team saved successfully");
				setModalIsOpen(false);
			}

			return response.data.success;
		} catch (err: any) {
			setError("Error trying to save this team, try again later");
			return err.data.success;
		}
	};

	const selectCountry = ({
		target: { value },
	}: {
		target: { value: string };
	}) => {
		setRegion(value);
	};

	const selectType = ({
		target: { value },
	}: {
		target: { value: keyof typeof queueTypes };
	}) => {
		setQueueType(value);
	};

	const changeRole = (role: keyof TeamProps) => {
		setRole(role);
	};

	const addToTeam = () => {
		const newTeam = { ...team };
		newTeam[role as keyof TeamProps] = player;
		setTeam(newTeam as TeamProps);
		setPlayer(null);

		if (
			newTeam.BOTTOM.summonerName &&
			newTeam.JUNGLE.summonerName &&
			newTeam.MIDDLE.summonerName &&
			newTeam.TOP.summonerName &&
			newTeam.UTILITY.summonerName
		) {
			setSynergy(Math.round(synergyModel(newTeam)));
		}
	};

	const onSubmit = async () => {
		setPlayer(null);
		setError("");
		if (searchInput.length === 0 || !searchInput.includes("#"))
			return setError("Choose a valid nickname and flag");

		let [userID, userFlag] = searchInput.trim().split("#");

		userID = userID.trim().toLowerCase();
		userFlag = userFlag.trim().toLowerCase();

		setLoading(true);

		const res = await api
			.get(
				`/matches?region=${region}&user_id=${userID}&user_flag=${userFlag}&queue=${queueTypes[queueType]}`
			)
			.then((data) => data as FIXME)
			.catch((err) => {
				return { err: err.message };
			})
			.finally(() => {
				setLoading(false);
			});

		if (res.err) {
			return setError(res.err);
		}

		const matchs = res.data.matchs as MatchsServiceProps[];
		const puuid = res.data.puuid;

		if (matchs.length < 1) {
			return setError("The player doesn't have any matchs");
		}

		const proplayerResults = matchs.map((match) => {
			const playerInMatch = match.info.participants.filter((item) => {
				if (roleAnalysis(item, match, puuid, role)) {
					return item;
				}
				return null;
			});

			return playerInMatch[0]
				? {
						percentages: roleFunctions[role](
							match.info,
							playerInMatch[0],
							idealData[role as keyof HomeProps],
							idealData
						),
						matchInfo: playerInMatch[0],
					}
				: null;
		});

		const proPlayerResultsFiltered = proplayerResults.filter(
			(match) => !!match
		);

		if (proPlayerResultsFiltered.length > 0) {
			setPlayer(
				playerStatsAverageClient(proPlayerResultsFiltered, searchInput.trim())
			);
		} else {
			return setError("The player doesn't have any matchs in this role");
		}

		return null;
	};

	return {
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
	};
};
