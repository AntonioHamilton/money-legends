import { colors } from "@/styles/globalVariables";
import styled from "styled-components";

export const SearchTextFieldContainer = styled.div`
	display: flex;
	align-items: center;
	width: 90%;
	background-color: #31313c;
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
	width: 6%;
	height: 40px;
	font-size: 30px;
	font-weight: 700;
	cursor: pointer;
	color: ${colors.mainFont};
	border: none;
	background: none;
`;
