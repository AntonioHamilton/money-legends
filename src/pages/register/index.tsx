import { RegisterForm } from "@components/RegisterForm";
import { Container, Title } from "@/styles/register.styled";

const RegisterPage = () => {
	return (
		<Container>
			<Title>Money Legends</Title>
			<RegisterForm />
		</Container>
	);
};

export default RegisterPage;
