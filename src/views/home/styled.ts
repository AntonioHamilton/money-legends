import { colors } from "@/styles/globalVariables";
import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 16px 0px;
	min-height: 100vh;
	background-color: ${colors.mainBackground};

	.title {
		color: ${colors.mainFont};
		font-size: 50px;
		font-weight: 700;
		margin-bottom: 24px;
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
