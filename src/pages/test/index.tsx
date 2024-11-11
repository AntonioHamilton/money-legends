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
	return ((
		TOP_STATS(info, player) + 
		JG_STATS(info, player) + 
		MID_STATS(info, player) + 
		ADC_STATS(info, player) + 
		SUP_STATS(info, player)
	) / 5)
}

type PlayerProps = {
	summonerName: string, 
	proplayerPercentage: number
}

type TeamProps = {
	"TOP"?: PlayerProps,
	"JUNGLE"?: PlayerProps,
	"MID"?: PlayerProps,
	"BOTTOM"?: PlayerProps,
	"UTILITY"?: PlayerProps,
	"ANY"?: PlayerProps
}

const roleFunctions: Record<string, Function> = {
	"TOP": TOP_STATS,
	"JUNGLE": JG_STATS,
	"MID": MID_STATS,
	"BOTTOM": ADC_STATS,
	"UTILITY": SUP_STATS,
	"ANY": ANY_STATS
}

const initialPlayerState: PlayerProps = {
	summonerName: '',
	proplayerPercentage: 0
}

const TestPage = () => {
	const [searchInput, setSearchInput] = useState("");
	const [role, setRole] = useState<string>("ANY")
	const [region, setRegion] = useState("AMERICAS");
	const [match, setMatch] = useState<any>({})
	const [team, setTeam] = useState<TeamProps>({
		"TOP": initialPlayerState,
		"JUNGLE": initialPlayerState,
		"MID": initialPlayerState,
		"BOTTOM": initialPlayerState,
		"UTILITY": initialPlayerState,
		"ANY": initialPlayerState,
	})

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const changeRole = (role: string) => {
		setRole(role);
	};

	const roleAnalysis = (item: any, match: any, userID: string, userFlag: string) => {
		return item.riotIdGameName.toLowerCase() === userID.toLowerCase() && 
		item.riotIdTagline.toLowerCase() === userFlag.toLowerCase() &&
		item.individualPosition === role &&
		match.info.gameMode === "CLASSIC"
	}

	const onSubmit = async () => {
		const [userID, userFlag] = searchInput.split('#')
		const {data} = await api.get(`/matches?region=${region}&user_id=${userID}&user_flag=${userFlag}`)

		const matchs = [data]

		const proplayerResults = matchs.map((match) => {
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
	
		const newTeam = team
		newTeam[role as keyof TeamProps] = {
			summonerName: userID,
			proplayerPercentage: proplayerResults.reduce((value, current) => value + current) / proplayerResults.length
		}
		setTeam(newTeam as TeamProps)
	};

	return (
		<Container>
			<Typography className="title">WORK HARD GG</Typography>
			<PlayerSelector changeRole={changeRole}/>
			<SearchBox onChange={onChange} onSubmit={onSubmit}/>
		</Container>
	);
};

export default TestPage;
