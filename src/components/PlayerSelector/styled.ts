import { colors } from "@/styles/globalVariables";
import styled from "styled-components";

export const Container = styled.div``;

export const LaneContainer = styled.div`
	display: flex;
	gap: 80px;
	height: 120px;
	margin-bottom: 8px;
`;

export const Selector = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100px;
	height: 140px;

	.summoner-name {
		color: white;
		padding: 5px;
		font-size: 12px;
		text-align: center;
	}

	.lane {
		color: white;
		font-weight: 600;
		padding: 5px;
		font-size: 12px;
	}
`;

export const Button = styled.button`
	border: 3px solid white;
	outline: none;
	background: none;
	height: 50px;
	width: 50px;
	cursor: pointer;
	border-radius: 100px;
	overflow: hidden;

	&.selected {
		border: 3px solid ${colors.green500};
	}

	img {
		height: 46px;
		width: 46px;
	}
`;
