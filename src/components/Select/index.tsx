import { ChangeEvent } from "react";
import { SelectContainer } from "./styled";

type SelectProps = {
	options: {
		value: string;
		text: string;
	}[];
	onChange?: (prop: ChangeEvent<HTMLSelectElement>) => void;
};

export const Select = ({ options, onChange }: SelectProps) => (
	<SelectContainer onChange={onChange}>
		{options.map((option) => (
			<option key={option.value} value={option.value}>
				{option.text}
			</option>
		))}
	</SelectContainer>
);
