import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { connectToDatabase } from "../mongodb/config";
import User from "../mongodb/models/user";
import { authenticate } from "@/lib/encrypter";
import { loginValidation, registerValidation } from "@/utils/userValidation";
import { sendEmail } from "@/utils/sendEmail";

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await connectToDatabase();

		const { email, password } = req.body;

		await registerValidation({ email, password });

		if (!email || !password) {
			return res
				.status(400)
				.json({ success: false, message: "Email and password are required" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(422)
				.json({ success: false, message: "User already exists" });
		}

		const user = await User.create({
			email,
			password,
		});

		return res
			.status(201)
			.json({ success: true, data: { _id: user._id, email: user.email } });
	} catch (error: any) {
		if (error.errors[0]) {
			return res.status(500).json({ success: false, error: error.errors[0] });
		}
		return res.status(500).json({ success: false, error: error.message });
	}
};

export const requestPasswordReset = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		await connectToDatabase();
		const { email } = req.body;

		if (!email) {
			return res
				.status(400)
				.json({ success: false, message: "Email is required" });
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		if (user) {
			const resetToken = crypto.randomBytes(3).toString("hex");

			user.passwordResetToken = crypto
				.createHash("sha256")
				.update(resetToken)
				.digest("hex");

			user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

			await user.save({ validateBeforeSave: false });

			const response = sendEmail(email, resetToken);
		}

		return res.status(200).json({
			success: true,
			message:
				"Se existir uma conta com este e-mail, um link para redefinição de senha foi enviado.",
		});
	} catch (error: any) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

export const resetPassword = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		await connectToDatabase();
		const { token, password } = req.body;

		const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

		const user = await User.findOne({
			passwordResetToken: hashedToken,
			passwordResetExpires: { $gt: Date.now() },
		});

		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "Token is invalid or has expired" });
		}

		user.password = password;
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save();

		return res
			.status(200)
			.json({ success: true, message: "Password reset successfully" });
	} catch (error: any) {
		if (error.errors && error.errors[0]) {
			return res.status(500).json({ success: false, error: error.errors[0] });
		}
		return res.status(500).json({ success: false, error: error.message });
	}
};

export const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await connectToDatabase();

		const { email, password } = req.body;

		await loginValidation({ email, password });

		if (!email || !password) {
			return res
				.status(400)
				.json({ success: false, message: "Email and password are required" });
		}

		const user = await User.findOne({ email }).select("+password");

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		const isPasswordCorrect = authenticate(user.password, password);

		if (!isPasswordCorrect) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid credentials" });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
			expiresIn: "8h",
		});

		const { password: _, ...userWithoutPassword } = user.toObject();

		return res
			.status(200)
			.json({ success: true, data: { user: userWithoutPassword, token } });
	} catch (error: any) {
		if (error.errors[0]) {
			return res.status(500).json({ success: false, error: error.errors[0] });
		}
		return res.status(500).json({ success: false, error: error.message });
	}
};
