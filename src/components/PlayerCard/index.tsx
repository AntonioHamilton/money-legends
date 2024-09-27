import { Card } from "../Card";
import { Typography } from "../Typography";
import { InfoContainer, PlayerCardContainer } from "./styled";

type PlayerCardProps = {
	name: string
	kills: number
	assists: number
	deaths: number
	kda: number
}

export const PlayerCard = ({name, kills, assists, deaths, kda}: PlayerCardProps) => (
	<Card>
		<PlayerCardContainer>
			<InfoContainer>
				<Typography>Nickname</Typography>
				<Typography>{name}</Typography>
			</InfoContainer>

			<InfoContainer>
				<Typography>Kills</Typography>
				<Typography>{kills}</Typography>
			</InfoContainer>
	
			<InfoContainer>
				<Typography>Deaths</Typography>
				<Typography>{deaths}</Typography>
			</InfoContainer>

			<InfoContainer>
				<Typography>Assists</Typography>
				<Typography>{assists}</Typography>
			</InfoContainer>

			<InfoContainer>
				<Typography>KDA</Typography>
				<Typography>{Math.ceil(kda * 100) / 100}</Typography>
			</InfoContainer>
		</PlayerCardContainer>
	</Card>
)