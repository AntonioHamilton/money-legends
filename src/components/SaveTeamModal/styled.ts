import { colors } from "@/styles/globalVariables";
import styled from "styled-components";

export const Overlay = styled.div`
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
`;

export const Modal = styled.div`
	background: ${colors.formBackground};
	border: 1px solid ${colors.formBorder};
	box-shadow: 0px 4px 12px ${colors.shadowBlack};
	border-radius: 12px;
	padding: 24px;
	width: 400px;
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const Title = styled.h2`
	margin: 0;
	color: ${colors.textPrimary};
	font-size: 1.5rem;
	font-weight: bold;
`;

export const Input = styled.input`
	background: ${colors.inputBackground};
	border: 1px solid ${colors.inputBorder};
	border-radius: 8px;
	padding: 10px 12px;
	font-size: 1rem;
	color: ${colors.formTextPrimary};

	&::placeholder {
		color: ${colors.formTextSecondary};
	}

	&:focus {
		outline: none;
		border-color: ${colors.formAccentHover};
	}
`;

export const Buttons = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 12px;
`;

export const CancelButton = styled.button`
	background: transparent;
	border: 1px solid ${colors.border};
	color: ${colors.textSecondary};
	padding: 8px 16px;
	border-radius: 8px;
	cursor: pointer;
	transition: 0.2s;

	&:hover {
		background: ${colors.border};
		color: ${colors.textPrimary};
	}
`;

export const ConfirmButton = styled.button`
	background: ${colors.formAccent};
	border: none;
	color: ${colors.backgroundPrimary};
	padding: 8px 16px;
	border-radius: 8px;
	cursor: pointer;
	font-weight: bold;
	transition: 0.2s;

	&:hover {
		background: ${colors.formAccentHover};
	}

	&:disabled {
		background: ${colors.formAccentDisabled};
		cursor: not-allowed;
	}
`;
