import { colors } from "@/styles/globalVariables";
import styled from "styled-components";

export const PlayerCardContainer = styled.div`
	margin-top: 16px;
	display: flex;
	width: 60%;
	background: ${colors.card};
	flex-direction: column;
	align-items: center;
	border-radius: 8px;
`;

export const ChampionsContainer = styled.div`
	margin-top: 10px;
	display: flex;
	gap: 4px;
`;

export const TitleContainer = styled.div`
	padding: 8px;
	width: 100%;
	background-color: ${colors.textFields};
	border-top-right-radius: 8px;
	border-top-left-radius: 8px;
	text-align: center;

	span {
		color: ${colors.white};
	}
`;

export const InfoContainer = styled.div`
	padding: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;

	span {
		color: ${colors.white};
	}

	.stats-title {
		padding: 8px;
		width: 100%;
		text-align: center;
	}
`;

export const StatsContainer = styled.div``;

export const StatsPercentageContainer = styled.div`
	background: ${colors.badge};
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
		margin-right: 8px;
		font-weight: 600;
	}

	.player-difference {
		font-weight: 600;
		&.positive {
			color: ${colors.green500};
		}

		&.negative {
			color: ${colors.red700};
		}
	}
`;

export const Button = styled.button`
	padding: 8px;
	border-radius: 4px;
	background: ${colors.blue500};
	margin: 16px 16px 12px 16px;
	border: none;
	cursor: pointer;
`;
