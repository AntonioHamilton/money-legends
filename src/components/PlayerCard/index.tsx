import { FIXME, PlayerInfo, StatisticsInfo } from "@/types/global";
import { Typography } from "../Typography";
import * as SC from "./styled";
import Image from "next/image";
import { HomeProps } from "@/pages";

type PlayerCardProps = {
	proStats: HomeProps;
	player: {
		summonerName: string;
		stats: StatisticsInfo["stats"];
		matchInfo: PlayerInfo[];
		averageStats: FIXME;
	};
	addToTeam: () => void;
};

const translations = {
	stats_difference: "Stats difference compared to a pro player",
	percentages_compared: "Percentages compared to a pro player",
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

export const PlayerCard = ({
	proStats,
	player,
	addToTeam,
}: PlayerCardProps) => (
	<SC.PlayerCardContainer>
		<SC.TitleContainer>
			<Typography>{player.summonerName}</Typography>
		</SC.TitleContainer>
		<SC.ChampionsContainer>
			{player.matchInfo.map((match) => (
				<Image
					key={match.championName}
					title={match.championName}
					src={`/assets/champions/${match.championName}.png`}
					overrideSrc={`/assets/champions/Invoker.png`}
					alt={match.championName}
					width={45}
					height={45}
					aria-label={match.championName}
				/>
			))}
		</SC.ChampionsContainer>
		<SC.InfoContainer>
			<Typography className="stats-title">
				{translations.stats_difference}
			</Typography>
			{Object.keys(player.averageStats).map((stat, index) => {
				const statValue = player.averageStats[stat];
				return (
					<SC.StatsPercentageContainer key={index}>
						<Typography className="status-name">{stat}:</Typography>
						<Typography className="player-percentage">
							{statValue.toFixed(2)}
						</Typography>
					</SC.StatsPercentageContainer>
				);
			})}

			<Typography className="stats-title">
				{translations.percentages_compared}
			</Typography>
			{Object.keys(player.stats).map((stat, index) => {
				const playerPercentage = Math.round(
					player.stats[stat as keyof StatisticsInfo["stats"]] || 0
				);
				const playerDiff = playerPercentage - 100;

				return (
					<SC.StatsPercentageContainer key={index}>
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
					</SC.StatsPercentageContainer>
				);
			})}

			<SC.Button onClick={() => addToTeam()}>Add to team</SC.Button>
		</SC.InfoContainer>
	</SC.PlayerCardContainer>
);
