import styled from "styled-components";
import { colors } from "@/styles/globalVariables";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background-color: ${colors.inputBackground};
`;

export const Title = styled.h1`
	font-family: "Londrina Sketch";
	color: ${colors.formTextPrimary};
	text-align: center;
	margin-bottom: 1.5rem;
	font-size: 50px;
`;
