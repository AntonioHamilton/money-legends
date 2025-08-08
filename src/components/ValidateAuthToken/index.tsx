"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getCookie } from "@/utils/getCookie";

const ValidateAuthToken = () => {
	const router = useRouter();

	useEffect(() => {
		const token = getCookie("auth-token");

		if (token) {
			const validateToken = async () => {
				try {
					await axios.post("/api/user/validate-token", { token });

					if (
						router.pathname !== "/home" &&
						router.pathname !== "/profile" &&
						router.pathname !== "/saved-teams"
					) {
						router.push("/home");
					}
				} catch (error) {
					if (router.pathname !== "/login") {
						router.push("/login");
					}
					return error;
				}
			};

			validateToken();
		}
	}, [router]);

	return null;
};

export default ValidateAuthToken;
