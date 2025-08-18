import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	ChangePasswordButton,
	Input,
	InfoWrapper,
	Label,
	ProfileCardWrapper,
	LogoutButton,
	Title,
	DeleteButton,
} from "./styled";
import { removeCookie } from "@/utils/removeCookie";
import { api } from "@config/axios";
import Cookies from "js-cookie";

export const ProfileCard = () => {
	const router = useRouter();
	const [changePassword, setChangePassword] = useState({
		active: false,
		password: "",
	});
	const [user, setUser] = useState({
		email: "any",
	});

	const getUser = async () => {
		const response = await api.get("/user", {
			headers: {
				"auth-token": Cookies.get("auth-token"),
			},
		});

		setUser({ email: response.data.data.email });
	};

	const handleLogout = () => {
		removeCookie("auth-token");
		router.push("/login");
	};

	const handleDeleteUser = async () => {
		const response = await api.delete("/user", {
			headers: {
				"auth-token": Cookies.get("auth-token"),
			},
		});

		if (response.data.success) {
			removeCookie("auth-token");
			router.push("/login");
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<ProfileCardWrapper>
			<Title>Profile</Title>
			<InfoWrapper>
				<Label>Email</Label>
				<Input value={user.email} disabled />
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
			<DeleteButton onClick={handleDeleteUser}>Delete my account</DeleteButton>
		</ProfileCardWrapper>
	);
};
