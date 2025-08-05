import styled from "styled-components";
import { colors } from "@/styles/globalVariables";

type MessageContainerProps = {
	type?: string;
	visible?: boolean;
};

export const MessageContainer = styled.div<MessageContainerProps>`
	display: ${({ visible }) => (visible ? "block" : "none")};
	position: absolute;
	bottom: 10px;
	background: ${({ type }) =>
		type === "success" ? colors.green500 : colors.red500};
	padding: 16px;
	border-radius: 4px;
	pointer-events: none; /* Evita interação durante o fade */
`;
