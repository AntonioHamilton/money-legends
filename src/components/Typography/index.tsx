import { CommonProps } from "../CommonProps";
import { Text } from "./styled";

export type TypographyProps = {
	color?: string;
};

export const Typography = ({
	children,
	className,
	color
}: CommonProps<TypographyProps>) => (
	<Text className={className} color={color}>
		{children}
	</Text>
);
