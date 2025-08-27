import styled from "styled-components";
import { colors } from "@/styles/globalVariables";
import Image from "next/image";

export const MenuContainer = styled.nav`
	position: fixed;
	width: 100%;
	background: ${colors.formBackground};
	border: 1px solid ${colors.border};
	border-radius: 12px;
	box-shadow: 0 4px 12px ${colors.shadowBlack};
	padding: 0.75rem 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 1000;
`;

export const LogoItem = styled.div<{ $active?: boolean; $font?: string }>`
	color: ${({ $active }) => ($active ? colors.primary : colors.textPrimary)};
	font-family: ${({ $font }) => $font || "inherit"};
	font-weight: bold;
	cursor: pointer;
	font-size: 32px;
	padding: 0.3rem 0.6rem;
	border-radius: 8px;
	background-color: ${({ $active }) =>
		$active ? colors.inputBackground : "transparent"};

	&:hover {
		color: ${colors.formAccentHover};
	}
`;

export const MenuItem = styled.div<{ $active?: boolean; $font?: string }>`
	color: ${({ $active }) => ($active ? colors.primary : colors.textPrimary)};
	font-family: "Roboto";
	font-weight: bold;
	cursor: pointer;
	padding: 0.3rem 0.6rem;
	border-radius: 8px;
	background-color: ${({ $active }) =>
		$active ? colors.inputBackground : "transparent"};

	&:hover {
		color: ${colors.formAccentHover};
	}
`;

export const ProfilePic = styled(Image)<{ $active?: boolean }>`
	border-radius: 50%;
	border: 2px solid
		${({ $active }) => ($active ? colors.primary : "transparent")};
	cursor: pointer;

	&:hover {
		border-color: ${colors.formAccentHover};
	}
`;

export const LogoContainer = styled.div``;

export const ItemsContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;
