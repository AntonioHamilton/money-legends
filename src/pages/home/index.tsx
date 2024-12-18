import { PlayerCard } from "@components/PlayerCard";
import * as SC from "../../views/home/styled";
import { SearchBox } from "@components/SearchBox";
import { Typography } from "@components/Typography";
import { PlayerSelector } from "@components/PlayerSelector";

import { MessageModal } from "@components/ErrorModal";
import { useHome } from "../../hooks/useHome";

const TestPage = () => {
	const {
		changeRole,
		onChange,
		onSubmit,
		addToTeam,
		loading,
		role,
		team,
		player,
		error,
	} = useHome();

	return (
		<SC.Container>
			<Typography className="title">WORK HARD GG</Typography>
			<PlayerSelector team={team} changeRole={changeRole} selectedRole={role} />
			<SearchBox onChange={onChange} onSubmit={onSubmit} />
			{player && <PlayerCard player={player} addToTeam={addToTeam} />}
			<MessageModal errorMessage={error} type="negative" />
		</SC.Container>
	);
};

export default TestPage;
