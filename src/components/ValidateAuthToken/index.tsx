"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getCookie } from "@/utils/getCookie";

const ValidateAuthToken = ({ children }: { children: ReactNode }) => {
	const router = useRouter();

	useEffect(() => {
		const token = getCookie("auth-token");

		if (token) {
			const validateToken = async () => {
				try {
					await axios.post("/api/user/validate-token", { token });
				} catch (error) {
					if (router.pathname !== "/login") {
						router.push("/login");
					}
					return error;
				}
			};

			validateToken();
		} else {
			if (router.pathname !== "/login") {
				router.push("/login");
			}
		}
	}, [router]);

	return <>{children}</>;
};

export default ValidateAuthToken;
