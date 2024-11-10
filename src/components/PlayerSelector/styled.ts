import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	gap: 32px;
	height: 100px;
	margin-bottom: 24px;

	div:nth-child(odd) {
		align-self: flex-start;
	}

	div:nth-child(even) {
		align-self: flex-end;
	}
`

export const Selector = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.lane {
		color: white;
    font-weight: 600;
    padding: 5px;
    font-size: 12px;
	}
`

export const Button = styled.button`
	border: 1px solid white;
	outline: none;
	background: none;
	height: 50px;
	width: 50px;
	cursor: pointer;
  border-radius: 100px;
	overflow: hidden;

	&:focus {
		border: 1px solid green;
	}

	img {
		height: 40px;
	}
`