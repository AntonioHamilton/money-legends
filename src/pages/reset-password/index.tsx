import { Container, Title } from "@/styles/reset-password.styled";
import { ResetPasswordForm } from "@components/ResetPasswordForm";

const RegisterPage = () => {
	return (
		<Container>
			<Title>Money Legends</Title>
			<ResetPasswordForm />
		</Container>
	);
};

export default RegisterPage;
