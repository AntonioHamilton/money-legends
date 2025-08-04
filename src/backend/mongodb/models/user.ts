import { model, models, Schema } from "mongoose";
import { encryptPassword } from "@/lib/encrypter";

interface IUser {
	email: string;
	password: string;
}

interface IModelUser extends Document, IUser {
	getUpdate(): Record<string, any>;
	methods: Record<string, VoidFunction>;
}

const UserSchema: Schema<IModelUser> = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
	if (this.isModified("password")) {
		this.password = encryptPassword(this.password);
	}
	next();
});

export default models.User || model<IModelUser>("User", UserSchema);
