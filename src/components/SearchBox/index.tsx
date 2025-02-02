import { ChangeEvent } from "react";
import { CommonProps } from "../CommonProps";
import {
	OptionsBarContainer,
	OptionsWrapper,
	SearchButton,
	SearchTextField,
	SearchTextFieldContainer,
} from "./styled";
import { Select } from "@components/Select";
import { Typography } from "@components/Typography";

const regionOptions = [
	{
		value: "AMERICAS",
		text: "Americas",
	},
];

export type SearchProps = {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onSubmit?: () => void;
	selectCountry?: (prop: ChangeEvent<HTMLSelectElement>) => void;
};

export const SearchBox = ({
	onChange,
	onSubmit,
	selectCountry,
}: CommonProps<SearchProps>) => (
	<>
		<OptionsBarContainer>
			<OptionsWrapper>
				<Typography className="region-text">Region</Typography>
				<Select options={regionOptions} onChange={selectCountry} />
			</OptionsWrapper>
			<OptionsWrapper>
				<Typography className="region-text">Ranked Type</Typography>
				<Typography>Ranked Solo / Duo</Typography>
				<Typography>Ranked Flex</Typography>
			</OptionsWrapper>
		</OptionsBarContainer>

		<SearchTextFieldContainer>
			<SearchTextField onChange={onChange} placeholder="summoner#tag" />
			<SearchButton onClick={onSubmit}>.GG</SearchButton>
		</SearchTextFieldContainer>
	</>
);
