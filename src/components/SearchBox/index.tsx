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
import { queueTypes } from "@/hooks/useHome";

const regionOptions = [
	{
		value: "AMERICAS",
		text: "Americas",
	},
];

const rankedOptions: { value: keyof typeof queueTypes; text: string }[] = [
	{
		value: "SOLO",
		text: "Ranked Solo / Duo",
	},
	{
		value: "FLEX",
		text: "Ranked Flex",
	},
];

export type SearchProps = {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onSubmit?: () => void;
	selectCountry?: (prop: ChangeEvent<HTMLSelectElement>) => void;
	selectType?: (prop: any) => void;
};

export const SearchBox = ({
	onChange,
	onSubmit,
	selectCountry,
	selectType,
}: CommonProps<SearchProps>) => (
	<>
		<OptionsBarContainer>
			<OptionsWrapper>
				<Typography className="region-text">Region</Typography>
				<Select options={regionOptions} onChange={selectCountry} />
			</OptionsWrapper>
			<OptionsWrapper>
				<Typography className="region-text">Ranked Type</Typography>
				<Select options={rankedOptions} onChange={selectType} />
			</OptionsWrapper>
		</OptionsBarContainer>

		<SearchTextFieldContainer>
			<SearchTextField onChange={onChange} placeholder="summoner#tag" />
			<SearchButton onClick={onSubmit}>.GG</SearchButton>
		</SearchTextFieldContainer>
	</>
);
