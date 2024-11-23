import { PlayerCard } from "@components/PlayerCard";
import { Container } from "./styled";
import { SearchBox } from "@components/SearchBox";
import { Typography } from "@components/Typography";
import { PlayerSelector } from "@components/PlayerSelector";

import { MessageModal } from "@components/ErrorModal";
import { useHome } from "./useHome";

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
		<Container>
			<Typography className="title">WORK HARD GG</Typography>
			<PlayerSelector team={team} changeRole={changeRole} selectedRole={role} />
			<SearchBox onChange={onChange} onSubmit={onSubmit} />
			{player && <PlayerCard player={player} addToTeam={addToTeam} />}
			<MessageModal errorMessage={error} type="negative" />
		</Container>
	);
};

export default TestPage;
