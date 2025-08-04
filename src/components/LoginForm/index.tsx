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
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { MessageModal } from "@components/MessageModal";
import { loginValidation } from "@/utils/userValidation";

export const LoginForm = () => {
	const [login, setLogin] = useState({
		email: "",
		password: "",
	});

	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage("");

		try {
			await loginValidation(login);
			const res = await api.post("/user/login", login);
			const token = res.data.data.token;

			if (token) {
				Cookies.set("auth-token", token, { expires: 7, path: "/" });
				router.push("/");
			} else {
				setErrorMessage("Falha no login");
			}
		} catch (err: any) {
			if (err?.response?.status === 404) {
				setErrorMessage("Usuário não encontrado!");
			} else if (err?.response?.status === 401) {
				setErrorMessage("Senha ou e-mail incorretos!");
			} else if (err?.errors?.[0]) {
				setErrorMessage(err.errors[0]);
			} else {
				setErrorMessage("Ocorreu um erro, tente novamente mais tarde!");
			}
		}
	};

	return (
		<>
			<Card>
				<Title>Login</Title>
				<Form onSubmit={handleLogin}>
					<FormGroup>
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							id="email"
							name="email"
							placeholder="seuemail@exemplo.com"
							value={login.email}
							onChange={(e) => {
								setLogin({ ...login, email: e.target.value });
								setErrorMessage("");
							}}
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="password">Password</Label>
						<Input
							type="password"
							id="password"
							name="password"
							placeholder="∗∗∗∗∗∗∗∗∗∗∗∗∗"
							value={login.password}
							onChange={(e) => {
								setLogin({ ...login, password: e.target.value });
								setErrorMessage("");
							}}
						/>
					</FormGroup>
					<Actions>
						<Button type="submit" disabled={!login.email || !login.password}>
							Login
						</Button>
						<StyledLink href="/register">Cadastrar</StyledLink>
					</Actions>
				</Form>
			</Card>
			<MessageModal errorMessage={errorMessage} />
		</>
	);
};
