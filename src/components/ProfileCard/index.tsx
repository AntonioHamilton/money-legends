import { useState } from "react";
import { useRouter } from "next/router";
import {
	ChangePasswordButton,
	Input,
	InfoWrapper,
	Label,
	ProfileCardWrapper,
	LogoutButton,
	Title,
} from "./styled";
import { removeCookie } from "@/utils/removeCookie";

interface ProfileCardProps {
	email: string;
}

export const ProfileCard = ({ email }: ProfileCardProps) => {
	const router = useRouter();
	const [changePassword, setChangePassword] = useState({
		active: false,
		password: "",
	});

	const handleLogout = () => {
		removeCookie("auth-token");
		router.push("/login");
	};

	return (
		<ProfileCardWrapper>
			<Title>Profile</Title>
			<InfoWrapper>
				<Label>Email</Label>
				<Input value={email} disabled />
			</InfoWrapper>
			<InfoWrapper>
				<Label>Password</Label>
				<Input value="∗∗∗∗∗∗∗∗∗∗∗∗∗" disabled={!changePassword.active} />
			</InfoWrapper>
			{!changePassword.active && (
				<ChangePasswordButton
					onClick={() => setChangePassword({ ...changePassword, active: true })}
				>
					Change Password
				</ChangePasswordButton>
			)}
			{changePassword.active && (
				<ChangePasswordButton
					onClick={() =>
						setChangePassword({ ...changePassword, active: false })
					}
				>
					Confirm
				</ChangePasswordButton>
			)}
			<LogoutButton onClick={handleLogout}>Logout</LogoutButton>
		</ProfileCardWrapper>
	);
};
