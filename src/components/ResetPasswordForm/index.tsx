import { FormEvent, useState } from "react";
import {
	Actions,
	Button,
	Card,
	Form,
	FormGroup,
	Input,
	Label,
	StyledLink,
	Title,
} from "./styled";
import { api } from "@config/axios";
import { MessageModal } from "@components/MessageModal";

export const ResetPasswordForm = () => {
	const [info, setInfo] = useState({
		email: "",
		token: "",
		newPassword: "",
	});
	const [step, setStep] = useState(1);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSendEmail = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage("");
		setSuccessMessage("");

		try {
			await api.post("/user/reset-password", { email: info.email });
			setSuccessMessage(
				"The instructions for reset your password have been sent to your email!"
			);
			setStep(2);
		} catch (err: any) {
			if (err?.response?.status === 404) {
				setErrorMessage("User not found!");
			} else {
				setErrorMessage("Something went wrong, try again later!");
			}
		}
	};

	const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage("");
		setSuccessMessage("");

		try {
			await api.put("/user/reset-password", {
				token: info.token,
				password: info.newPassword,
			});
			setSuccessMessage("Your password has been changed!");
			setStep(2);
		} catch (err: any) {
			if (err?.response?.status === 404) {
				setErrorMessage("User not found!");
			} else {
				setErrorMessage("Something went wrong, try again later!");
			}
		}
	};

	return (
		<>
			<Card>
				<Title>Reset Password</Title>
				{step === 1 ? (
					<Form onSubmit={handleSendEmail}>
						<FormGroup>
							<Label htmlFor="email">Email</Label>
							<Input
								autoComplete="email"
								type="email"
								id="email"
								name="email"
								placeholder="email@example.com"
								value={info.email}
								onChange={(e) => {
									setInfo({ ...info, email: e.target.value });
									setErrorMessage("");
									setSuccessMessage("");
								}}
							/>
						</FormGroup>
						<Actions>
							<Button type="submit" disabled={!info.email}>
								Send email
							</Button>
							<StyledLink href="/login">Back to login</StyledLink>
						</Actions>
					</Form>
				) : (
					<Form onSubmit={handleResetPassword}>
						<FormGroup>
							<Label htmlFor="token">Token</Label>
							<Input
								autoComplete="on"
								type="text"
								id="token"
								name="token"
								placeholder="token received by email"
								value={info.token}
								onChange={(e) => {
									setInfo({ ...info, token: e.target.value });
									setErrorMessage("");
									setSuccessMessage("");
								}}
							/>
						</FormGroup>
						<FormGroup>
							<Label htmlFor="newPassword">New password</Label>
							<Input
								autoComplete="on"
								type="password"
								id="newPassword"
								name="newPassword"
								placeholder="nova senha"
								value={info.newPassword}
								onChange={(e) => {
									setInfo({ ...info, newPassword: e.target.value });
									setErrorMessage("");
									setSuccessMessage("");
								}}
							/>
						</FormGroup>
						<Actions>
							<Button type="submit" disabled={!info.token || !info.newPassword}>
								Reset password
							</Button>
							<StyledLink href="/login">Back to login</StyledLink>
						</Actions>
					</Form>
				)}
			</Card>
			<MessageModal
				errorMessage={errorMessage}
				successMessage={successMessage}
			/>
		</>
	);
};
