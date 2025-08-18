import { colors } from "@/styles/globalVariables";
import styled from "styled-components";

export const Title = styled.h1`
	font-family: "Londrina Sketch";
	color: ${colors.formTextPrimary};
	text-align: center;
	margin-bottom: 1.5rem;
	font-size: 2.75rem;
`;

export const ProfileCardWrapper = styled.section`
	background-color: ${colors.backgroundPrimary};
	border: 1px solid ${colors.statsBorder};
	border-radius: 8px;
	padding: 24px;
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 20px;
	width: 400px;
	font-family: "Roboto";
`;

export const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const Label = styled.span`
	color: ${colors.textSecondary};
	font-size: 14px;
`;

export const Input = styled.input`
	background-color: ${colors.inputBackground};
	border: 1px solid ${colors.inputBorder};
	border-radius: 4px;
	padding: 0.75rem;
	color: ${colors.formTextPrimary};
	font-size: 1rem;
	height: 2.5rem;
	box-sizing: border-box;
	font-family: "Roboto";

	&:focus {
		outline: none;
		border-color: ${colors.formAccent};
		box-shadow: 0 0 0 2px ${colors.formAccent}33;
	}

	&:disabled {
		background-color: ${colors.backgroundPrimary};
		border-color: ${colors.statsBorder};
		color: ${colors.textSecondary};
		cursor: not-allowed;
	}
`;

export const ChangePasswordButton = styled.button`
	background-color: ${colors.buttonColor};
	color: ${colors.textPrimary};
	border: none;
	border-radius: 4px;
	padding: 10px 15px;
	font-size: 14px;
	cursor: pointer;
	transition: background-color 0.3s ease;
`;

export const LogoutButton = styled.button`
	background: none;
	border: none;
	padding: 0;
	font-family: "Roboto";
	color: ${colors.formAccent};
	text-decoration: none;
	font-size: 0.9rem;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;

export const DeleteButton = styled.button`
	background: none;
	border: none;
	padding: 0;
	font-family: "Roboto";
	color: ${colors.formAccent};
	text-decoration: none;
	font-size: 0.9rem;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;
