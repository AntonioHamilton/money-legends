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
				"As instruções para redefinição de senha foram enviadas para o seu e-mail."
			);
			setStep(2);
		} catch (err: any) {
			if (err?.response?.status === 404) {
				setErrorMessage("Usuário não encontrado!");
			} else {
				setErrorMessage("Ocorreu um erro, tente novamente mais tarde!");
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
			setSuccessMessage("Sua senha foi modificada!");
			setStep(2);
		} catch (err: any) {
			if (err?.response?.status === 404) {
				setErrorMessage("Usuário não encontrado!");
			} else {
				setErrorMessage("Ocorreu um erro, tente novamente mais tarde!");
			}
		}
	};

	return (
		<>
			<Card>
				<Title>Redefinir Senha</Title>
				{step === 1 ? (
					<Form onSubmit={handleSendEmail}>
						<FormGroup>
							<Label htmlFor="email">Email</Label>
							<Input
								autoComplete="email"
								type="email"
								id="email"
								name="email"
								placeholder="seuemail@exemplo.com"
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
								Enviar email
							</Button>
							<StyledLink href="/login">Voltar para o Login</StyledLink>
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
								placeholder="token recebido por email"
								value={info.token}
								onChange={(e) => {
									setInfo({ ...info, token: e.target.value });
									setErrorMessage("");
									setSuccessMessage("");
								}}
							/>
						</FormGroup>
						<FormGroup>
							<Label htmlFor="newPassword">Nova Senha</Label>
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
								Redefinir Senha
							</Button>
							<StyledLink href="/login">Voltar para o Login</StyledLink>
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
