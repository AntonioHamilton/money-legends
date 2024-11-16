import { PlayerCard } from "@/components/PlayerCard";
import { Container, MatchContainer } from "./index.styled";
import { api } from "@/config/axios";
import { ChangeEvent, useState } from "react";
import { SearchBox } from "@/components/SearchBox";
import { Typography } from "@/components/Typography";
import { PlayerSelector } from "@/components/PlayerSelector";
import { ADC_STATS, JG_STATS, MID_STATS, SUP_STATS, TOP_STATS } from "@/statistics";
import { Button, Selector } from "@/components/PlayerSelector/styled";

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
	const [region, setRegion] = useState("AMERICAS");
	const [match, setMatch] = useState<any>({})
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

	const teamSetter = (proplayerResults: any, userID: any) => {
		const statsKeys = Object.keys(proplayerResults[0].stats)

		if(statsKeys.length <= 0) return

		let statsObject: Record<string, any> = {}

		proplayerResults.forEach((value: any) => {
			statsKeys.forEach((item: any) => {
				statsObject[item] = ((statsObject[item] || 0) + (value.stats[item] || 0))
			})
		})

		let finalStats: Record<string, any> = {}

		statsKeys.forEach((item: any) => {
			finalStats[item] = statsObject[item] / proplayerResults.length
		})

		const newTeam = team
		newTeam[role as keyof TeamProps] = {
			summonerName: userID,
			stats: finalStats,
			proplayerPercentage: proplayerResults.reduce((value: any, current: any) => value.percentage + current.percentage) / proplayerResults.length
		}

		setTeam(newTeam as TeamProps)
	}

	const onSubmit = async () => {
		if (searchInput.length === 0 || !searchInput.includes("#")) return;

		const [userID, userFlag] = searchInput.split('#')
		const { data } = await api.get(`/matches?region=${region}&user_id=${userID}&user_flag=${userFlag}`)

		const matchs = [data, data]

		const proplayerResults = matchs.map((match: any) => {
			const player = match.info.participants.filter((item: any) => {
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

			return player[0] ? roleFunctions[role](match.info, player[0]) : null
		})

		if (proplayerResults) {
			teamSetter(proplayerResults, userID)
		}
	};

	return (
		<Container>
			<Typography className="title">WORK HARD GG</Typography>
			<PlayerSelector changeRole={changeRole}/>
			<SearchBox onChange={onChange} onSubmit={onSubmit}/>
			<button style={{margin: "10px"}} onClick={() => console.log(team)}>Olhar o time</button>
			{<PlayerCard name={team[role as keyof TeamProps].summonerName}/>}
			
		</Container>
	);
};

export default TestPage;
