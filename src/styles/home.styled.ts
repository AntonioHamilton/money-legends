import { colors } from "@/styles/globalVariables";
import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 16px 0px;
	min-height: 100vh;
	background-color: ${colors.backgroundPrimary};

	.title {
		color: ${colors.textPrimary};
		font-family: "Londrina Sketch";
		font-size: 44px;
		font-weight: 700;
		margin-bottom: 24px;
		margin-top: 80px;
	}

	.synergy-title {
		color: ${colors.textPrimary};
		font-family: "Roboto";
		font-size: 20px;
		margin-top: 16px;
	}
`;

export const MatchContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-top: 16px;
`;

export const LoadingContainer = styled.div`
	margin-top: 70px;
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

	&:disabled {
		background-color: ${colors.formAccentDisabled};
		cursor: not-allowed;
	}
`;
