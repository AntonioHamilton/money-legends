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
import { registerValidation } from "@/utils/userValidation";
import { api } from "@config/axios";
import { MessageModal } from "@components/MessageModal";
import { useRouter } from "next/router";

export const RegisterForm = () => {
	const router = useRouter();
	const [register, setRegister] = useState({
		email: "",
		password: "",
	});

	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage("");
		setSuccessMessage("");

		try {
			await registerValidation(register);
			const res = await api.post("/user/register", register);

			if (res.data.success) setSuccessMessage("Your account has been created!");
			setTimeout(() => {
				router.push("/login");
			}, 1000);
		} catch (err: any) {
			if (err.status === 422) setErrorMessage("User already exist!");
			else if (err.status === 400)
				setErrorMessage("Email and Password are required!");
			else if (err?.errors?.[0]) {
				setErrorMessage(err.errors[0]);
			} else {
				setErrorMessage("Something went wrong, try again later!");
			}
		}
	};

	return (
		<>
			<Card>
				<Title>Register</Title>
				<Form onSubmit={handleRegister}>
					<FormGroup>
						<Label htmlFor="email">Email</Label>
						<Input
							autoComplete="email"
							type="email"
							id="email"
							name="email"
							placeholder="email@example.com"
							value={register.email}
							onChange={(e) => {
								setRegister({ ...register, email: e.target.value });
								setErrorMessage("");
							}}
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="password">Password</Label>
						<Input
							autoComplete="new-password"
							type="password"
							id="password"
							name="password"
							placeholder="∗∗∗∗∗∗∗∗∗∗∗∗∗"
							value={register.password}
							onChange={(e) => {
								setRegister({ ...register, password: e.target.value });
								setErrorMessage("");
							}}
						/>
					</FormGroup>
					<Actions>
						<Button
							type="submit"
							disabled={!register.email || !register.password}
						>
							Register user
						</Button>
						<StyledLink href="/login">Login</StyledLink>
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
