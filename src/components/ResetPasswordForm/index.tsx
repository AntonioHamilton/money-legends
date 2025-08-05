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
	const [email, setEmail] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage("");
		setSuccessMessage("");

		try {
			await api.post("/user/reset-password", { email });
			setSuccessMessage(
				"As instruções para redefinição de senha foram enviadas para o seu e-mail."
			);
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
				<Form onSubmit={handleResetPassword}>
					<FormGroup>
						<Label htmlFor="email">Email</Label>
						<Input
							autoComplete="on"
							type="email"
							id="email"
							name="email"
							placeholder="seuemail@exemplo.com"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								setErrorMessage("");
								setSuccessMessage("");
							}}
						/>
					</FormGroup>
					<Actions>
						<Button type="submit" disabled={!email}>
							Redefinir Senha
						</Button>
						<StyledLink href="/login">Voltar para o Login</StyledLink>
					</Actions>
				</Form>
			</Card>
			<MessageModal
				errorMessage={errorMessage}
				successMessage={successMessage}
			/>
		</>
	);
};
