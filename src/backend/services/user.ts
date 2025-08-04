import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../mongodb/config";
import User from "../mongodb/models/user";
import { authenticate } from "@/lib/encrypter";
import { loginValidation, registerValidation } from "@/utils/userValidation";

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
