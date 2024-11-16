import { colors } from "@/styles/globalVariables";
import styled from "styled-components";

export const PlayerCardContainer = styled.div`
	display: flex;
	width: 60%;
	background: ${colors.card};
	flex-direction: column;
	align-items: center;
	border-radius: 8px;
`

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
`

export const InfoContainer = styled.div`
	padding: 8px;

	span {
		color: ${colors.white};
	}
`

export const StatsContainer = styled.div`
	background: ${colors.badge};
	padding: 4px 16px;
	font-size: 12px;
	border-radius: 50px;
`