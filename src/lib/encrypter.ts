import bcrypt from "bcryptjs";

const salt = 8;

export const authenticate = (
	dbpassword: string,
	plainTextPassword: string
): boolean => {
	return bcrypt.compareSync(plainTextPassword, dbpassword);
};

export const encryptPassword = (password: string): string => {
	return bcrypt.hashSync(password, salt);
};
