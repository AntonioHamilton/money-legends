import { object, string } from "yup";

const userSchema = object({
	email: string().email("O email deve ser válido").required(),
	password: string().required(),
});

export const loginValidation = async (user: {
	password: string;
	email: string;
}) => {
	return userSchema.validate(user);
};

export const registerValidation = async (user: {
	password: string;
	email: string;
}) => {
	return userSchema.validate(user);
};
