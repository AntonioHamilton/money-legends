import styled from "styled-components";
import { TypographyProps } from ".";
import { colors } from "@/styles/globalVariables";

export const Text = styled.span<TypographyProps>`
	color: ${({ color }) => (color ? color : colors.black)};
`;
