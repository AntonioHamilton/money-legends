import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		redirect: {
			destination: "/login",
			permanent: false,
		},
	};
};

export default function RedirectHome() {
	return null;
}
