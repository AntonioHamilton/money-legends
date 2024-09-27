import { colors } from "@/styles/globalVariables";
import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background-color: ${colors.gray};
`;

export const MatchContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-top: 16px;
`