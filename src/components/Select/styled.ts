import { colors } from "@/styles/globalVariables";
import styled from "styled-components";

export const SelectContainer = styled.select`
	border: none;
	width: 100%;
	padding: 10px;
	font-size: 14px;
	border-radius: 5px;
	background: transparent;
	appearance: none; /* Remove o estilo padrão do navegador */
	-webkit-appearance: none; /* Remove o estilo padrão no Safari */
	-moz-appearance: none; /* Remove o estilo padrão no Firefox */
	background-image: url('data:image/svg+xml;utf8,<svg fill="%23333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>'); /* Ícone de seta */
	background-repeat: no-repeat;
	background-position: right 10px center;
	cursor: pointer;

	&:focus {
		outline: none;
	}

	option {
		padding: 10px;
		background-color: ${colors.border};
	}
`;
