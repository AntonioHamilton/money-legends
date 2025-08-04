import { CommonProps } from "../CommonProps";
import { MessageContainer } from "./styled";

export type MessageModalProps = {
	errorMessage: string;
	type?: string;
};

export const MessageModal = ({
	errorMessage,
	type,
}: CommonProps<MessageModalProps>) => (
	<MessageContainer type={type} visible={errorMessage}>
		{errorMessage}
	</MessageContainer>
);
