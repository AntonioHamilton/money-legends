import { ChangeEvent } from "react";
import { CommonProps } from "../CommonProps";
import {
	SearchButton,
	SearchTextField,
	SearchTextFieldContainer,
} from "./styled";

export type SearchProps = {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onSubmit?: () => void;
};

export const SearchBox = ({ onChange, onSubmit }: CommonProps<SearchProps>) => (
	<SearchTextFieldContainer>
		<SearchTextField onChange={onChange} placeholder="summoner#tag" />
		<SearchButton onClick={onSubmit}>.GG</SearchButton>
	</SearchTextFieldContainer>
);
