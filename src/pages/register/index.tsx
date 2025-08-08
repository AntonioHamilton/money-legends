import { RegisterForm } from "@components/RegisterForm";
import { Container, Title } from "@/styles/register.styled";
import { SpeedInsights } from "@vercel/speed-insights/next";

const RegisterPage = () => {
	return (
		<Container>
			<SpeedInsights />
			<Title>Money Legends</Title>
			<RegisterForm />
		</Container>
	);
};

export default RegisterPage;
