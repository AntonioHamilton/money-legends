import { FIXME, StatisticsInfo } from "@/types/global";
import { Typography } from "../Typography";
import {
	Button,
	InfoContainer,
	PlayerCardContainer,
	StatsContainer,
	TitleContainer,
} from "./styled";
import Image from "next/image";

type PlayerCardProps = {
	player: {
		summonerName: string;
		stats: StatisticsInfo["stats"];
		matchInfo: FIXME[];
	};
	addToTeam: () => void;
};

const keyTranslation: Record<string, string> = {
	haveMoreAssistsThenKills: "More Assists Then kills: ",
	visionScorePerMinutePercentageStats: "Vision Percentage: ",
	goldPercentageStats: "Gold Percentage: ",
	farmPercentageStats: "Farm Percentage: ",
	KDAPercentageStats: "KDA Percentage: ",
	killParticipationPercentageStats: "Kill Participation: ",
	damagePerMinutePercentageStats: "Damage Per Minute Percentage: ",
	teamDamagePercentageStats: "Team Damage Percentage: ",
	voidGrubsPercentage: "Void Grubs Percentage: ",
	dragonsPercentage: "Dragons Percentage: ",
	baronsPercentage: "Barons Percentage: ",
};

const chooseStatusName = (player: FIXME, index: number) => {
	const stats = Object.keys(player.stats);

	return keyTranslation[stats[index]];
};

export const PlayerCard = ({ player, addToTeam }: PlayerCardProps) => (
	<PlayerCardContainer>
		<TitleContainer>
			<Typography>{player.summonerName}</Typography>
		</TitleContainer>
		{player.matchInfo.map((match) => (
			<p key={match.championName}>
				{match.championName}
				<Image
					src={`/assets/champions/${match.championName}.png`}
					overrideSrc={`/assets/champions/Invoker.png`}
					alt={match.championName}
					width={45}
					height={45}
				/>
			</p>
		))}
		<InfoContainer>
			{Object.keys(player.stats).map((stat, index) => {
				const playerPercentage = Math.round(
					player.stats[stat as keyof StatisticsInfo["stats"]] || 0
				);
				const playerDiff = playerPercentage - 100;

				return (
					<StatsContainer key={index}>
						<Typography className="status-name">
							{chooseStatusName(player, index)}
						</Typography>
						<Typography
							className={`player-percentage ${playerPercentage < 100 ? "negative" : "positive"}`}
						>
							{playerPercentage}% ▶
						</Typography>
						<Typography
							className={`player-difference ${playerDiff < 0 ? "negative" : "positive"}`}
						>
							{playerDiff}%
						</Typography>
					</StatsContainer>
				);
			})}

			<Button onClick={() => addToTeam()}>Add to team</Button>
		</InfoContainer>
	</PlayerCardContainer>
);
