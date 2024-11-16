import { PlayerCard } from "@/components/PlayerCard";
import { Container } from "./styled";
import { api } from "@/config/axios";
import { ChangeEvent, useState } from "react";
import { SearchBox } from "@/components/SearchBox";
import { Typography } from "@/components/Typography";
import { PlayerSelector } from "@/components/PlayerSelector";
import { ADC_STATS, JG_STATS, MID_STATS, SUP_STATS, TOP_STATS } from "@/statistics";

const ANY_STATS = (info: any, player: any) => {
	return ({
		percentage: TOP_STATS(info, player).percentage + 
		JG_STATS(info, player).percentage + 
		MID_STATS(info, player).percentage + 
		ADC_STATS(info, player).percentage + 
		SUP_STATS(info, player).percentage
	 / 5, 
	 stats: {}})
}

type PlayerProps = {
	summonerName: string, 
	proplayerPercentage: number,
	stats: Record<string, any>
}

export type TeamProps = {
	"TOP": PlayerProps,
	"JUNGLE": PlayerProps,
	"MIDDLE": PlayerProps,
	"BOTTOM": PlayerProps,
	"UTILITY": PlayerProps,
	"ANY": PlayerProps
}

const roleFunctions: Record<string, Function> = {
	"TOP": TOP_STATS,
	"JUNGLE": JG_STATS,
	"MIDDLE": MID_STATS,
	"BOTTOM": ADC_STATS,
	"UTILITY": SUP_STATS,
	"ANY": ANY_STATS
}

const initialPlayerState: PlayerProps = {
	summonerName: '',
	stats: {},
	proplayerPercentage: 0
}

const TestPage = () => {
	const [searchInput, setSearchInput] = useState("");
	const [role, setRole] = useState<keyof TeamProps>("ANY")
	const [error, setError] = useState<string>("")
	const [region, setRegion] = useState("AMERICAS");
	const [player, setPlayer] = useState<any>()
	const [team, setTeam] = useState<TeamProps>({
		"TOP": initialPlayerState,
		"JUNGLE": initialPlayerState,
		"MIDDLE": initialPlayerState,
		"BOTTOM": initialPlayerState,
		"UTILITY": initialPlayerState,
		"ANY": initialPlayerState,
	})

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const changeRole = (role: keyof TeamProps) => {
		setRole(role);
	};

	const roleAnalysis = (item: any, match: any, userID: string, userFlag: string) => {
		return item.riotIdGameName.toLowerCase() === userID.toLowerCase() && 
		item.riotIdTagline.toLowerCase() === userFlag.toLowerCase() &&
		item.individualPosition === role &&
		match.info.gameMode === "CLASSIC"
	}

	const playerSetter = (proPlayerResultsFiltered: any, userID: any) => {
		const statsKeys = Object.keys(proPlayerResultsFiltered[0].stats)

		if(statsKeys.length <= 0) return

		let statsObject: Record<string, any> = {}

		proPlayerResultsFiltered.forEach((value: any) => {
			statsKeys.forEach((item: any) => {
				statsObject[item] = ((statsObject[item] || 0) + (value.stats[item] || 0))
			})
		})

		let finalStats: Record<string, any> = {}

		statsKeys.forEach((item: any) => {
			finalStats[item] = statsObject[item] / proPlayerResultsFiltered.length
		})

		let proPlayerPercentage = 0;

		proPlayerResultsFiltered.forEach((value: any) => {
			proPlayerPercentage = proPlayerPercentage || 0 + value.percentage || 0
		})

		const playerStats = {
			summonerName: userID,
			stats: finalStats,
			proPlayerPercentage: proPlayerPercentage / proPlayerResultsFiltered.length
		}

		setPlayer(playerStats)
	}

	const addToTeam = () => {
		const newTeam = team
		newTeam[role as keyof TeamProps] = player
		setTeam(newTeam as TeamProps)
	}

	const onSubmit = async () => {
		setPlayer(null)
		setError('')
		if (searchInput.length === 0 || !searchInput.includes("#")) return setError("Choose a valid nickname or flag");

		let [userID, userFlag] = searchInput.trim().split('#')

		userID = userID.trim().toLowerCase()
		userFlag = userFlag.trim().toLowerCase()

		const { data: matchs } = await api.get(`/matches?region=${region}&user_id=${userID}&user_flag=${userFlag}`)

		if (matchs.lenght < 1) {
			return setError("The player doesn't have any matchs")
		}

		const proplayerResults = matchs.map((match: any) => {
			const playerInMatch = match.info.participants.filter((item: any) => {
				if (
					roleAnalysis(item, match, userID, userFlag) || 
					(
						role === "ANY" && 
						item.riotIdGameName.toLowerCase() === userID.toLowerCase() && 
						item.riotIdTagline.toLowerCase() === userFlag.toLowerCase()
					)
				) {
					return item
				}
			})

			return playerInMatch[0] ? roleFunctions[role](match.info, playerInMatch[0]) : null
		})

		const proPlayerResultsFiltered = proplayerResults.filter((match: any) => !!match)

		if (proPlayerResultsFiltered.length > 0) {
			playerSetter(proPlayerResultsFiltered, searchInput.trim())
		} else {
			return setError("The player doesn't have any matchs in this role")
		}
	};

	return (
		<Container>
			<Typography className="title">WORK HARD GG</Typography>
			<PlayerSelector changeRole={changeRole} selectedRole={role}/>
			<SearchBox onChange={onChange} onSubmit={onSubmit}/>
			<button style={{margin: "10px"}} onClick={() => console.log(team)}>Olhar o time</button>
			{player && <PlayerCard player={player} addToTeam={addToTeam}/>}
			{error}
		</Container>
	);
};

export default TestPage;
