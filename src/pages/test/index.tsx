import { PlayerCard } from "@/components/PlayerCard";
import { Container, MatchContainer } from "./index.styled";
import { api } from "@/config/axios";
import { ChangeEvent, useState } from "react";
import { SearchBox } from "@/components/SearchBox";
import { Typography } from "@/components/Typography";

const TestPage = () => {
	const [searchInput, setSearchInput] = useState("");
	const [region, setRegion] = useState("AMERICAS");
	const [match, setMatch] = useState<any>({})
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const onSubmit = async () => {
		const [userID, userFlag] = searchInput.split('#')
		console.log(userID, userFlag)
		const {data: match} = await api.get(`/matches?region=${region}&user_id=${userID}&user_flag=${userFlag}`)
		setMatch(match)
	};

	return (
		<Container>
			<Typography className="title">WORK HARD GG</Typography>
			<SearchBox onChange={onChange} onSubmit={onSubmit}/>
			<MatchContainer>
				{match.info && match.info.participants.map((player: Record<string, any>) => 
					<PlayerCard
						key={player.riotIdGameName as string}
						name={player.riotIdGameName as string}
						kills={player.kills as number}
						assists={player.assists as number}
						deaths={player.deaths as number}
						kda={player.challenges.kda as number}
					/>
				)}
			</MatchContainer>
		</Container>
	);
};

export default TestPage;
