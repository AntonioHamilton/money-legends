import React, { useState } from "react";
import { FaPencilAlt, FaTrash, FaChevronDown } from "react-icons/fa";
import {
	TeamListWrapper,
	AccordionItem,
	AccordionHeader,
	AccordionTitle,
	AccordionActions,
	IconButton,
	AccordionBody,
	PlayerList,
	PlayerItem,
	PositionLabel,
	PlayerName,
	SynergyWrapper,
	SynergyLabel,
	SynergyValue,
	ChevronIcon,
	Title,
} from "./styled";
import { SavedTeam } from "@/types/SavedTeam";

interface TeamListProps {
	teams: SavedTeam[];
	onEdit: (teamId: string) => void;
	onDelete: (teamId: string) => void;
}

export const SavedTeamsList = ({ teams, onEdit, onDelete }: TeamListProps) => {
	const [openTeamId, setOpenTeamId] = useState<string | null>(null);

	const handleToggle = (teamId: string) => {
		setOpenTeamId(openTeamId === teamId ? null : teamId);
	};

	const handleActionClick = (e: React.MouseEvent, action: () => void) => {
		e.stopPropagation();
		action();
	};

	return (
		<TeamListWrapper>
			<Title>Saved Teams</Title>
			{teams.map((team) => (
				<AccordionItem key={team.id}>
					<AccordionHeader onClick={() => handleToggle(team.id)}>
						<AccordionTitle>{team.name}</AccordionTitle>
						<AccordionActions>
							<IconButton
								aria-label={`Edit team ${team.name}`}
								onClick={(e) => handleActionClick(e, () => onEdit(team.id))}
							>
								<FaPencilAlt />
							</IconButton>
							<IconButton
								aria-label={`Delete team ${team.name}`}
								onClick={(e) => handleActionClick(e, () => onDelete(team.id))}
							>
								<FaTrash />
							</IconButton>
							<ChevronIcon isOpen={openTeamId === team.id}>
								<FaChevronDown />
							</ChevronIcon>
						</AccordionActions>
					</AccordionHeader>
					<AccordionBody isOpen={openTeamId === team.id}>
						<PlayerList>
							{Object.entries(team.players).map(([position, player]) => (
								<PlayerItem key={position}>
									<PositionLabel>{position}</PositionLabel>
									<PlayerName>{player.name}</PlayerName>
								</PlayerItem>
							))}
						</PlayerList>
						<SynergyWrapper>
							<SynergyLabel>Team Synergy</SynergyLabel>
							<SynergyValue>{team.synergy}</SynergyValue>
						</SynergyWrapper>
					</AccordionBody>
				</AccordionItem>
			))}
		</TeamListWrapper>
	);
};
