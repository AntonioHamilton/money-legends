import { PlayerCard } from "@/components/PlayerCard";
import { Container, MatchContainer } from "./index.styled";
import { api } from "@/config/axios";
import { ChangeEvent, useState } from "react";
import { SearchBox } from "@/components/SearchBox";
import { Typography } from "@/components/Typography";
import { PlayerSelector } from "@/components/PlayerSelector";
import { ADC_STATS, JG_STATS, MID_STATS, SUP_STATS, TOP_STATS } from "@/statistics";

type PlayerProps = {
	summonerName: string, 
	proplayerPercentage: number
}

type TeamProps = {
	"TOP"?: PlayerProps,
	"JUNGLE"?: PlayerProps,
	"MID"?: PlayerProps,
	"BOTTOM"?: PlayerProps,
	"SUPPORT"?: PlayerProps
}

const roleFunctions: Record<string, Function> = {
	"TOP": TOP_STATS,
	"JUNGLE": JG_STATS,
	"MID": MID_STATS,
	"BOTTOM": ADC_STATS,
	"SUPPORT": SUP_STATS
}

const initialPlayerState: PlayerProps = {
	summonerName: '',
	proplayerPercentage: 0
}

const TestPage = () => {
	const [searchInput, setSearchInput] = useState("");
	const [role, setRole] = useState<string>("TOP")
	const [region, setRegion] = useState("AMERICAS");
	const [match, setMatch] = useState<any>({})
	const [team, setTeam] = useState<TeamProps>({
		"TOP": initialPlayerState,
		"JUNGLE": initialPlayerState,
		"MID": initialPlayerState,
		"BOTTOM": initialPlayerState,
		"SUPPORT": initialPlayerState
	})
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const onSubmit = async () => {
		const [userID, userFlag] = searchInput.split('#')
		const {data: match} = await api.get(`/matches?region=${region}&user_id=${userID}&user_flag=${userFlag}`)
		const player = match.info.participants.filter((item: any) => {
			if (
				item.riotIdGameName.toLowerCase() === userID.toLowerCase() && 
				item.riotIdTagline.toLowerCase() === userFlag.toLowerCase()
			) {
				return item
			}
		})
		const proplayerPercentage = roleFunctions[role](match.info, player[0])
		const newTeam = team
		newTeam[role as keyof TeamProps] = {
			summonerName: userID,
			proplayerPercentage
		}
		setTeam(newTeam as TeamProps)
	};

	const changeRole = (role: string) => {
		console.log(role)
		setRole("TOP");
	}

	return (
		<Container>
			<Typography className="title">WORK HARD GG</Typography>
			<PlayerSelector changeRole={changeRole}/>
			<SearchBox onChange={onChange} onSubmit={onSubmit}/>
			<button onClick={() => console.log(team)}>show team</button>
		</Container>
	);
};

export default TestPage;
