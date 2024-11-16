import { Card } from "../Card";
import { Typography } from "../Typography";
import { InfoContainer, PlayerCardContainer, StatsContainer, TitleContainer } from "./styled";

type PlayerCardProps = {
	name: string
}

export const PlayerCard = ({name}: PlayerCardProps) => (
		<PlayerCardContainer>
			<TitleContainer>
				<Typography>{name}</Typography>
			</TitleContainer>
			<InfoContainer>
				<StatsContainer>
					<Typography>STATUS 1</Typography>
					<Typography>100 {'>'}</Typography>
					<Typography>{200}</Typography>
				</StatsContainer>
			</InfoContainer>
		</PlayerCardContainer>
)