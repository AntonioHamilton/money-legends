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
import { colors } from "@/styles/globalVariables";
import { OrbitProgress } from "react-loading-indicators";

export const LoginForm = () => {
	const [loading, setLoading] = useState(false);
	const [login, setLogin] = useState({
		email: "",
		password: "",
	});

	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		setLoading(true);
		e.preventDefault();
		setErrorMessage("");

		try {
			await loginValidation(login);
			const res = await api.post("/user/login", login);
			const token = res.data.data.token;

			if (token) {
				Cookies.set("auth-token", token, { expires: 7, path: "/" });
				router.push("/home");
			} else {
				setErrorMessage("Login failed");
			}
		} catch (err: any) {
			if (err?.response?.status === 404) {
				setErrorMessage("User not found!");
			} else if (err?.response?.status === 401) {
				setErrorMessage("Password or email incorrects!");
			} else if (err?.errors?.[0]) {
				setErrorMessage(err.errors[0]);
			} else {
				setErrorMessage("Something went wrong, try again later!");
			}
		}
		setLoading(false);
	};

	return (
		<>
			<Card>
				<Title>Login</Title>
				<Form onSubmit={handleLogin}>
					<FormGroup>
						<Label htmlFor="email">Email</Label>
						<Input
							autoComplete="email"
							type="email"
							id="email"
							name="email"
							placeholder="email@example.com"
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
							autoComplete="current-password"
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
						{loading ? (
							<OrbitProgress
								color={colors.textPrimary}
								size="small"
								text=""
								textColor=""
							/>
						) : (
							<Button type="submit" disabled={!login.email || !login.password}>
								Login
							</Button>
						)}
						<StyledLink href="/register">Register</StyledLink>
						<StyledLink href="/reset-password">Reset Password</StyledLink>
					</Actions>
				</Form>
			</Card>
			<MessageModal errorMessage={errorMessage} />
		</>
	);
};
