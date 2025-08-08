import { LoginForm } from "@components/LoginForm";
import { Container, Title } from "@/styles/login.styled";
import ValidateAuthToken from "@components/ValidateAuthToken";
import { SpeedInsights } from "@vercel/speed-insights/next";

const LoginPage = () => {
	return (
		<>
			<SpeedInsights />
			<ValidateAuthToken />
			<Container>
				<Title>Money Legends</Title>
				<LoginForm />
			</Container>
		</>
	);
};

export default LoginPage;
