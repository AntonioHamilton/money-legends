import { colors } from "@/styles/globalVariables";
import styled from "styled-components";

export const PlayerCardContainer = styled.div`
	margin-top: 16px;
	display: flex;
	width: 60%;
	background: ${colors.border};
	flex-direction: column;
	align-items: center;
	border-radius: 8px;
`;

export const ChampionsContainer = styled.div`
	font-family: "Roboto";
	margin-top: 12px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	.champions-title {
		color: ${colors.textPrimary};
		padding: 8px;
		width: 100%;
		text-align: center;
	}
`;

export const ChampionsWrapper = styled.div`
	font-family: "Roboto";
	display: flex;
	gap: 4px;
	flex-wrap: wrap;
	padding: 12px;
`;

export const TitleContainer = styled.div`
	font-family: "Roboto";
	padding: 8px;
	width: 100%;
	background-color: ${colors.statsBorder};
	border-top-right-radius: 8px;
	border-top-left-radius: 8px;
	text-align: center;

	span {
		color: ${colors.textPrimary};
		font-size: 24px;
	}
`;

export const InfoContainer = styled.div`
	font-family: "Roboto";
	padding: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;

	span {
		color: ${colors.textPrimary};
	}

	.stats-title {
		padding: 8px;
		width: 100%;
		text-align: center;
	}
`;

export const StatsContainer = styled.div``;

export const StatsPercentageContainer = styled.div`
	font-family: "Roboto";
	background: ${colors.statsBorder};
	padding: 4px 16px;
	font-size: 12px;
	border-radius: 50px;
	margin: 4px 0px;
	width: fit-content;

	.status-name {
		margin-right: 8px;
		font-weight: 700;
	}

	.player-percentage {
		margin-right: 4px;
		font-weight: 600;
	}

	.player-difference {
		font-weight: 600;
		&.positive {
			color: ${colors.green500};
		}

		&.negative {
			color: ${colors.red500};
		}
	}
`;

export const Button = styled.button`
	font-family: "Roboto";
	font-size: 16px;
	padding: 8px;
	border-radius: 4px;
	background-color: ${colors.buttonColor};
	margin: 16px 16px 12px 16px;
	border: none;
	cursor: pointer;
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: ${colors.accentBlue};
	}
`;
