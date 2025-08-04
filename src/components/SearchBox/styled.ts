import { colors } from "@/styles/globalVariables";
import styled from "styled-components";

export const SearchTextFieldContainer = styled.div`
	display: flex;
	align-items: center;
	width: 90%;
	background-color: ${colors.formBorder};
	padding: 8px 16px;
	border-radius: 30px;
`;

export const SearchTextField = styled.input`
	width: 94%;
	height: 30px;
	outline: none;
	background: none;
	border: none;
`;

export const SearchButton = styled.button`
	font-family: "Londrina Sketch";
	font-size: 30px;
	font-weight: 800;
	cursor: pointer;
	color: ${colors.textPrimary};
	border: none;
	background: none;
`;

export const OptionsBarContainer = styled.div`
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(3, 1fr);
	width: 90%;
	background: ${colors.formBorder};
	border-radius: 30px;
	margin-bottom: 12px;
`;

export const OptionsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 6px;

	&:nth-child(even) {
		border-right: 1px solid #1c1c1f;
		border-left: 1px solid #1c1c1f;
	}

	.region-text {
		color: white;
		font-size: 12px;
		text-align: center;
	}
`;
