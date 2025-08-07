import { LoginForm } from "@components/LoginForm";
import { Container } from "@/styles/login.styled";
import ValidateAuthToken from "@components/ValidateAuthToken";

const LoginPage = () => {
	return (
		<>
			<ValidateAuthToken />
			<Container>
				<LoginForm />
			</Container>
		</>
	);
};

export default LoginPage;
