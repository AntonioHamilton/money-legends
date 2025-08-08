import { ProfileContainer } from "@/styles/profile.styled";
import { FloatingMenu } from "@components/FloatingMenu";
import { ProfileCard } from "@components/ProfileCard";
import ValidateAuthToken from "@components/ValidateAuthToken";

const Profile = () => {
	return (
		<>
			<FloatingMenu />
			<ValidateAuthToken />
			<ProfileContainer>
				<ProfileCard email="teste" />
			</ProfileContainer>
		</>
	);
};

export default Profile;
