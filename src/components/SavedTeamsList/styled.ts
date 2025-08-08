import styled from "styled-components";
import { colors } from "@/styles/globalVariables";

export const Title = styled.h1`
	font-family: "Londrina Sketch";
	color: ${colors.formTextPrimary};
	text-align: center;
	margin-bottom: 1.5rem;
	font-size: 2.75rem;
	margin-top: 96px;
`;

export const TeamListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	max-width: 700px;
	margin: 0 auto;
	font-family: "Roboto", sans-serif;
	margin-bottom: 1.5rem;
`;

export const AccordionItem = styled.div`
	background-color: ${colors.backgroundPrimary};
	border: 1px solid ${colors.statsBorder};
	border-radius: 8px;
	overflow: hidden;
	transition: all 0.3s ease-in-out;
`;

export const AccordionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 1.5rem;
	cursor: pointer;
	background-color: #1a1a18;

	&:hover {
		background-color: #2a2a28;
	}
`;

export const AccordionTitle = styled.h3`
	margin: 0;
	color: ${colors.textPrimary};
	font-size: 1.2rem;
	font-weight: 600;
`;

export const AccordionActions = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

export const IconButton = styled.button`
	background: none;
	border: none;
	color: ${colors.textSecondary};
	cursor: pointer;
	font-size: 1.1rem;
	padding: 0.5rem;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	transition:
		background-color 0.2s,
		color 0.2s;

	&:hover {
		background-color: ${colors.statsBorder};
		color: ${colors.textPrimary};
	}
`;

export const AccordionBody = styled.div<{ isOpen: boolean }>`
	max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
	overflow: hidden;
	transition:
		max-height 0.4s ease-in-out,
		padding 0.4s ease-in-out;
	padding: ${({ isOpen }) => (isOpen ? "1.5rem" : "0 1.5rem")};
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	background-color: ${colors.formBackground};
`;

export const PlayerList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	gap: 1rem;
`;

export const PlayerItem = styled.li`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	background-color: ${colors.backgroundPrimary};
	padding: 0.75rem;
	border-radius: 4px;
	border-left: 3px solid ${colors.buttonColor};
`;

export const PositionLabel = styled.span`
	color: ${colors.textSecondary};
	font-size: 0.8rem;
	font-weight: 500;
	text-transform: uppercase;
`;

export const PlayerName = styled.span`
	color: ${colors.textPrimary};
	font-size: 1rem;
	font-weight: 600;
`;

export const SynergyWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 1rem;
	border-top: 1px solid ${colors.statsBorder};
`;

export const SynergyLabel = styled.span`
	color: ${colors.textSecondary};
	font-size: 1rem;
	font-weight: 500;
`;

export const SynergyValue = styled.span`
	color: ${colors.buttonColor};
	font-size: 1.5rem;
	font-weight: 700;
`;

export const ChevronIcon = styled.div<{ isOpen: boolean }>`
	color: ${colors.textSecondary};
	transition: transform 0.3s ease-in-out;
	transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;
