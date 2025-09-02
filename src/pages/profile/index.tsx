import { ProfileContainer } from "@/styles/profile.styled";
import { FloatingMenu } from "@components/FloatingMenu";
import { ProfileCard } from "@components/ProfileCard";
import ValidateAuthToken from "@components/ValidateAuthToken";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Profile = () => {
	return (
		<ValidateAuthToken>
			<SpeedInsights />
			<FloatingMenu />
			<ProfileContainer>
				<ProfileCard />
			</ProfileContainer>
		</ValidateAuthToken>
	);
};

export default Profile;
