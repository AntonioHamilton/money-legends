import { ChangeEvent, useState } from "react";
import { TOP_STATS } from "@statistics/TOP";
import { JG_STATS } from "@statistics/JG";
import { MID_STATS } from "@statistics/MID";
import { ADC_STATS } from "@statistics/ADC";
import { SUP_STATS } from "@statistics/SUP";
import {
	FIXME,
	MatchInfo,
	MatchsServiceProps,
	PlayerInfo,
	StatisticsInfo,
} from "@/types/global";
import { api } from "@config/axios";

const ANY_STATS = (info: MatchInfo, player: PlayerInfo): StatisticsInfo => {
	const TOP = TOP_STATS(info, player);
	const JG = JG_STATS(info, player);
	const MID = MID_STATS(info, player);
	const ADC = ADC_STATS(info, player);
	const SUP = SUP_STATS(info, player);

	const percentageSUM =
		TOP.percentage +
		JG.percentage +
		MID.percentage +
		ADC.percentage +
		SUP.percentage;

	const goldPercentageSum =
		TOP.stats.goldPercentageStats +
		JG.stats.goldPercentageStats +
		MID.stats.goldPercentageStats +
		ADC.stats.goldPercentageStats +
		SUP.stats.goldPercentageStats;

	const KDAPercentageSum =
		TOP.stats.KDAPercentageStats +
		JG.stats.KDAPercentageStats +
		MID.stats.KDAPercentageStats +
		ADC.stats.KDAPercentageStats +
		SUP.stats.KDAPercentageStats;

	const killParticipationPercentageSum =
		TOP.stats.killParticipationPercentageStats +
		JG.stats.killParticipationPercentageStats +
		MID.stats.killParticipationPercentageStats +
		ADC.stats.killParticipationPercentageStats +
		SUP.stats.killParticipationPercentageStats;

	const teamDamagePercentageSum =
		TOP.stats.teamDamagePercentageStats +
		JG.stats.teamDamagePercentageStats +
		MID.stats.teamDamagePercentageStats +
		ADC.stats.teamDamagePercentageStats +
		SUP.stats.teamDamagePercentageStats;

	return {
		percentage: percentageSUM / 5,
		stats: {
			goldPercentageStats: goldPercentageSum / 5,
			KDAPercentageStats: KDAPercentageSum / 5,
			killParticipationPercentageStats: killParticipationPercentageSum / 5,
			teamDamagePercentageStats: teamDamagePercentageSum / 5,
		},
	};
};

type PlayerProps = {
	summonerName: string;
	proPlayerPercentage: number;
	stats: Record<string, unknown>;
};

export type TeamProps = {
	TOP: PlayerProps;
	JUNGLE: PlayerProps;
	MIDDLE: PlayerProps;
	BOTTOM: PlayerProps;
	UTILITY: PlayerProps;
	ANY: PlayerProps;
};

const roleFunctions: Record<
	string,
	(info: MatchInfo, player: PlayerInfo) => StatisticsInfo
> = {
	TOP: TOP_STATS,
	JUNGLE: JG_STATS,
	MIDDLE: MID_STATS,
	BOTTOM: ADC_STATS,
	UTILITY: SUP_STATS,
	ANY: ANY_STATS,
};

const initialPlayerState: PlayerProps = {
	summonerName: "",
	stats: {},
	proPlayerPercentage: 0,
};

export const useHome = () => {
	const [loading, setLoading] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [role, setRole] = useState<keyof TeamProps>("ANY");
	const [error, setError] = useState<string>("");
	const [region, setRegion] = useState("AMERICAS");
	const [player, setPlayer] = useState<FIXME>();
	const [team, setTeam] = useState<TeamProps>({
		TOP: initialPlayerState,
		JUNGLE: initialPlayerState,
		MIDDLE: initialPlayerState,
		BOTTOM: initialPlayerState,
		UTILITY: initialPlayerState,
		ANY: initialPlayerState,
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const changeRole = (role: keyof TeamProps) => {
		setRole(role);
	};

	const roleAnalysis = (
		item: FIXME,
		match: MatchsServiceProps,
		userID: string,
		userFlag: string
	) => {
		return (
			item.riotIdGameName.toLowerCase() === userID.toLowerCase() &&
			item.riotIdTagline.toLowerCase() === userFlag.toLowerCase() &&
			item.individualPosition === role &&
			match.info.gameMode === "CLASSIC"
		);
	};

	const playerSetter = (
		proPlayerResultsFiltered: StatisticsInfo[],
		userID: string
	) => {
		const statsKeys = Object.keys(proPlayerResultsFiltered[0].stats);

		if (statsKeys.length <= 0) return;

		const statsObject: Record<string, FIXME> = {};

		proPlayerResultsFiltered.forEach((value) => {
			statsKeys.forEach((item) => {
				statsObject[item] =
					(statsObject[item] || 0) +
					(value.stats[item as keyof StatisticsInfo["stats"]] || 0);
			});
		});

		const finalStats: Record<string, FIXME> = {};

		statsKeys.forEach((item) => {
			finalStats[item] = statsObject[item] / proPlayerResultsFiltered.length;
		});

		const percentages = proPlayerResultsFiltered.map(
			(value) => value.percentage
		);

		const playerStats = {
			summonerName: userID,
			stats: finalStats,
			proPlayerPercentage:
				percentages.reduce(
					(value: number, current: number) => value + current
				) / proPlayerResultsFiltered.length,
		};

		setPlayer(playerStats);
	};

	const addToTeam = () => {
		const newTeam = { ...team };
		newTeam[role as keyof TeamProps] = player;
		setTeam(newTeam as TeamProps);
		setPlayer(null);
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
			.get(`/matches?region=${region}&user_id=${userID}&user_flag=${userFlag}`)
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

		const matchs = res.data as MatchsServiceProps[];

		if (matchs.length < 1) {
			return setError("The player doesn't have any matchs");
		}

		const proplayerResults = matchs.map((match) => {
			const playerInMatch = match.info.participants.filter((item) => {
				if (
					roleAnalysis(item, match, userID, userFlag) ||
					(role === "ANY" &&
						item.riotIdGameName.toLowerCase() === userID.toLowerCase() &&
						item.riotIdTagline.toLowerCase() === userFlag.toLowerCase())
				) {
					return item;
				}
				return null;
			});

			return playerInMatch[0]
				? roleFunctions[role](match.info, playerInMatch[0])
				: null;
		});

		const proPlayerResultsFiltered = proplayerResults.filter(
			(match) => !!match
		);

		if (proPlayerResultsFiltered.length > 0) {
			playerSetter(proPlayerResultsFiltered, searchInput.trim());
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
		loading,
		role,
		team,
		player,
		error,
	};
};
