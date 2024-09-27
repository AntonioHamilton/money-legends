import { CardContainer } from "./styled";
import { CommonProps } from "../CommonProps";

export type CardProps = {
	bgColor?: string;
	elevated?: boolean;
};

export const Card = ({
	children,
	bgColor,
	elevated,
	className
}: CommonProps<CardProps>) => (
	<CardContainer className={className} bgColor={bgColor} elevated={elevated}>
		{children}
	</CardContainer>
);
