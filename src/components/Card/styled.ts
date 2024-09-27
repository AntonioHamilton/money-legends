import { colors } from "@/styles/globalVariables";
import styled from "styled-components";
import { CardProps } from ".";

export const CardContainer = styled.div<CardProps>`
	background-color: ${({ bgColor }) => bgColor || colors.white};
	padding: 8px 16px;
	border-radius: 4px;
	box-shadow: ${({ elevated }) =>
		elevated ? `1px 1px 1px ${colors.white25}` : "none"};
`;
