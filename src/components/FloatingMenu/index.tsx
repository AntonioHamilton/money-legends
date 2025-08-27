import Link from "next/link";
import { useRouter } from "next/router";
import * as SC from "./styled";

export const FloatingMenu = () => {
	const router = useRouter();

	const menuItems = [
		{ href: "/home", label: "Build" },
		{ href: "/saved-teams", label: "Teams" },
	];

	return (
		<SC.MenuContainer>
			<SC.LogoContainer>
				<Link href="/home" key="/home">
					<SC.LogoItem $font={"Londrina Sketch"}>Money Legends</SC.LogoItem>
				</Link>
			</SC.LogoContainer>
			<SC.ItemsContainer>
				{menuItems.map(({ href, label }) => (
					<Link href={href} key={href}>
						<SC.MenuItem $active={router.pathname === href}>
							{label}
						</SC.MenuItem>
					</Link>
				))}
				<Link href="/profile">
					<SC.ProfilePic
						src="/assets/any.jpg"
						alt="Profile"
						$active={router.pathname === "/profile"}
						width={50}
						height={50}
					/>
				</Link>
			</SC.ItemsContainer>
		</SC.MenuContainer>
	);
};
