import { colors } from "@/styles/globalVariables";
import Link from "next/link";
import styled from "styled-components";

export const Card = styled.div`
	background-color: ${colors.formBackground};
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	padding: 2rem;
	width: 100%;
	max-width: 400px;
`;

export const Title = styled.h2`
	color: ${colors.formTextPrimary};
	margin-bottom: 1.5rem;
	text-align: center;
	font-family: "Londrina Sketch";
	font-size: 2.75rem;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

export const FormGroup = styled.div`
	margin-bottom: 1rem;
`;

export const Label = styled.label`
	color: ${colors.formTextSecondary};
	margin-bottom: 0.5rem;
	font-size: 0.9rem;
	font-family: "Roboto";
`;

export const Input = styled.input`
	margin-top: 8px;
	width: 100%;
	padding: 0.75rem;
	border: 1px solid ${colors.formBorder};
	border-radius: 4px;
	font-size: 1rem;

	&:focus {
		border-color: ${colors.formAccentHover};
		outline: none;
	}
`;

export const Button = styled.button`
	background-color: ${colors.formAccent};
	color: ${colors.inputBackground};
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
		background-color: ${colors.formAccentHover};
	}

	&:disabled {
		background-color: ${colors.formAccentDisabled};
		cursor: not-allowed;
	}
`;

export const Actions = styled.div`
	flex-direction: column;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
`;

export const StyledLink = styled(Link)`
	color: ${colors.formAccent};
	text-decoration: none;
	font-size: 0.9rem;

	&:hover {
		text-decoration: underline;
	}
`;
