import { LoginForm } from "@components/LoginForm";
import { Container, Title } from "@/styles/login.styled";
import { SpeedInsights } from "@vercel/speed-insights/next";

const LoginPage = () => {
	return (
		<>
			<SpeedInsights />
			<Container>
				<Title>Money Legends</Title>
				<LoginForm />
			</Container>
		</>
	);
};

export default LoginPage;
