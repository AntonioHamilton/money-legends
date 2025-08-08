import { Container, Title } from "@/styles/reset-password.styled";
import { ResetPasswordForm } from "@components/ResetPasswordForm";
import { SpeedInsights } from "@vercel/speed-insights/next";

const RegisterPage = () => {
	return (
		<Container>
			<SpeedInsights />
			<Title>Money Legends</Title>
			<ResetPasswordForm />
		</Container>
	);
};

export default RegisterPage;
