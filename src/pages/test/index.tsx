import { Container } from "./index.styled";
import { SearchTextField } from "@/components/Search/styled";
import { api } from "@/config/axios";
import { ChangeEvent, useState } from "react";

const TestPage = () => {
	const [searchInput, setSearchInput] = useState("");
	const [region, setRegion] = useState("AMERICAS");
	const [playerStats, setPlayerStats] = useState({})
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const onSubmit = async () => {
		const [userID, userFlag] = searchInput.split('#')
		const res = await api.get(`/basic-stats?region=${region}&user_id=${userID}&user_flag=${userFlag}`)
		setPlayerStats(res.data)
	};

	return (
		<Container>
			<div>
				<SearchTextField onChange={onChange} />
				<button onClick={onSubmit}>submit</button>
			</div>
			<div>
				{JSON.stringify(playerStats)}
			</div>
		</Container>
	);
};

export default TestPage;
