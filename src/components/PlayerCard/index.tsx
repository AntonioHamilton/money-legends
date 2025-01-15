import { FIXME, PlayerInfo, StatisticsInfo } from "@/types/global";
import { Typography } from "../Typography";
import * as SC from "./styled";
import Image from "next/image";
import { HomeProps } from "@/pages";
import { useState } from "react";

type PlayerCardProps = {
	proStats: HomeProps;
	role: string;
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
	last_played_champion: "Last played champions",
};

const keyRawStatsTranslation: Record<string, string> = {
	averageGoldPerMinute: "average gold per minute: ",
	averageKDA: "average KDA: ",
	averageFarmPerMinute: "average farm per minute: ",
	averageKillParcipation: "average kill participation: ",
	averageDamagePerMinute: "average damage per minute: ",
	averageTeamDamagePercentage: "average team damage percentage: ",
	averageVisionScorePerMinute: "average vision score per minute: ",
};

const chooseRawStatsName = (stat: string) => {
	return keyRawStatsTranslation[stat];
};

const translateStatToProStat: Record<string, string> = {
	averageGoldPerMinute: "idealGold",
	averageKDA: "idealKDA",
	averageFarmPerMinute: "idealFarmPerMinute",
	averageKillParcipation: "idealKillParticipationPercentage",
	averageDamagePerMinute: "idealDamagePerMinute",
	averageTeamDamagePercentage: "idealTeamDamagePercentage",
	averageVisionScorePerMinute: "idealVisionScorePerMinute",
};

const keyPercentageTranslation: Record<string, string> = {
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

const choosePercentageStatusName = (player: FIXME, index: number) => {
	const stats = Object.keys(player.stats);

	return keyPercentageTranslation[stats[index]];
};

export const PlayerCard = ({
	proStats,
	player,
	role,
	addToTeam,
}: PlayerCardProps) => {
	const [champions] = useState(
		player.matchInfo.map((match) => {
			return match.championName;
		})
	);

	const [championsObj] = useState(
		(() => {
			const obj: Record<string, number> = {};
			champions.forEach((champion) => {
				if (obj[champion] >= 1) return (obj[champion] += 1);
				obj[champion] = 1;
			});

			return obj;
		})()
	);

	return (
		<SC.PlayerCardContainer>
			<SC.TitleContainer>
				<Typography>{player.summonerName}</Typography>
			</SC.TitleContainer>

			<SC.ChampionsContainer>
				<Typography className="champions-title">
					{translations.last_played_champion}
				</Typography>
				<SC.ChampionsWrapper>
					{Object.keys(championsObj).map((champion) => (
						<Image
							key={champion}
							title={`${champion} - ${championsObj[champion]}`}
							src={`/assets/champions/${champion}.png`}
							overrideSrc={`/assets/champions/Invoker.png`}
							alt={champion}
							width={45}
							height={45}
							aria-label={champion}
						/>
					))}
				</SC.ChampionsWrapper>
			</SC.ChampionsContainer>
			<SC.InfoContainer>
				<Typography className="stats-title">
					{translations.stats_difference}
				</Typography>
				{Object.keys(player.averageStats).map((stat, index) => {
					const statValue = player.averageStats[stat];
					return (
						<SC.StatsPercentageContainer key={index}>
							<Typography className="status-name">
								{chooseRawStatsName(stat)}
							</Typography>
							<Typography className="player-percentage">
								{statValue.toFixed(2)} ▶
							</Typography>
							<Typography className="player-percentage">
								{Number(
									proStats[role as keyof HomeProps].info[
										translateStatToProStat[
											stat
										] as keyof HomeProps["MIDDLE"]["info"]
									]
								).toFixed(2)}
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
								{choosePercentageStatusName(player, index)}
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
};
