import { ChangeEvent } from "react";
import { Card } from "../Card";
import { CommonProps } from "../CommonProps";
import { SearchTextField } from "./styled";

export type SearchProps = {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Search = ({ className, onChange }: CommonProps<SearchProps>) => (
	<Card className={className}>
		<SearchTextField onChange={onChange} />
	</Card>
);
