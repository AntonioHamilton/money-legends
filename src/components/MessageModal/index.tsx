import { CommonProps } from "../CommonProps";
import { MessageContainer } from "./styled";

export type MessageModalProps = {
	errorMessage?: string;
	successMessage?: string;
	type?: string;
};

export const MessageModal = ({
	errorMessage,
	successMessage,
	type,
}: CommonProps<MessageModalProps>) => {
	const message = errorMessage || successMessage;
	const messageType = errorMessage ? "error" : "success";
	const visible = errorMessage || successMessage ? "visible" : "";

	return (
		<MessageContainer type={type || messageType} visible={visible}>
			{message}
		</MessageContainer>
	);
};
