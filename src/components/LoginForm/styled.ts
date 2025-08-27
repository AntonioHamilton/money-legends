import styled from "styled-components";
import Link from "next/link";
import { colors } from "@/styles/globalVariables";
import { OrbitProgress } from "react-loading-indicators";

export const Loader = styled(OrbitProgress)`
	height: 12px;
`;

export const Card = styled.div`
	background-color: ${colors.formBackground};
	padding: 2rem;
	border-radius: 8px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
	width: 100%;
	max-width: 400px;
	border: 1px solid ${colors.formBorder};
`;

export const Title = styled.h1`
	font-family: "Londrina Sketch";
	color: ${colors.formTextPrimary};
	text-align: center;
	margin-bottom: 1.5rem;
	font-size: 2.75rem;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
`;

export const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Label = styled.label`
	color: ${colors.formTextSecondary};
	margin-bottom: 0.5rem;
	font-size: 0.9rem;
	font-family: "Roboto";
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
`;

export const Actions = styled.div`
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
`;

export const Button = styled.button`
	background-color: ${colors.buttonColor};
	border: none;
	padding: 0.75rem 1.5rem;
	border-radius: 4px;
	font-size: 1rem;
	font-weight: bold;
	cursor: pointer;
	width: 100%;
	transition: background-color 0.2s ease-in-out;
	font-family: "Roboto";

	&:hover {
		background-color: ${colors.accentBlue};
	}

	&:disabled {
		background-color: ${colors.formAccentDisabled};
		cursor: not-allowed;
	}
`;

export const StyledLink = styled(Link)`
	color: ${colors.formAccent};
	text-decoration: none;
	font-size: 0.9rem;

	&:hover {
		text-decoration: underline;
	}
`;
