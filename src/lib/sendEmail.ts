import { Resend } from "resend";

import { readFileSync } from "fs";
import { join } from "path";

const html = readFileSync(
	join(process.cwd(), "src/templates/reset-password.html"),
	"utf-8"
);

export const sendEmail = async (email: string, token: string) => {
	const resend = new Resend(process.env.EMAIL_SECRET);
	const personalizedHTML = html.replace("{{token}}", token);

	resend.emails
		.send({
			from: "onboarding@resend.dev",
			to: "projectmoneylegends@gmail.com",
			subject: "Reset Password - Money Legends",
			html: personalizedHTML,
		})
		.then((res) => console.log(res));
};
