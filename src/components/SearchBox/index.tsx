import { ChangeEvent } from "react";
import { Card } from "../Card";
import { CommonProps } from "../CommonProps";
import { SearchButton, SearchTextField, SearchTextFieldContainer } from "./styled";

export type SearchProps = {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onSubmit?: () => void;
};

export const SearchBox = ({ onChange, onSubmit }: CommonProps<SearchProps>) => (
	<SearchTextFieldContainer>
		<SearchTextField onChange={onChange} placeholder="invocador#region"/>
		<SearchButton onClick={onSubmit}>.GG</SearchButton>
	</SearchTextFieldContainer>
);
