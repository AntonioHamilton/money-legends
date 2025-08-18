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
				<AccordionItem key={team._id}>
					<AccordionHeader onClick={() => handleToggle(team._id)}>
						<AccordionTitle>{team.name}</AccordionTitle>
						<AccordionActions>
							<IconButton
								aria-label={`Edit team ${team.name}`}
								onClick={(e) => handleActionClick(e, () => onEdit(team._id))}
							>
								<FaPencilAlt />
							</IconButton>
							<IconButton
								aria-label={`Delete team ${team.name}`}
								onClick={(e) => handleActionClick(e, () => onDelete(team._id))}
							>
								<FaTrash />
							</IconButton>
							<ChevronIcon isOpen={openTeamId === team._id}>
								<FaChevronDown />
							</ChevronIcon>
						</AccordionActions>
					</AccordionHeader>
					<AccordionBody isOpen={openTeamId === team._id}>
						<PlayerList>
							{Object.entries(team.players).map(([lane, player]) => (
								<PlayerItem key={lane}>
									<PositionLabel>{lane}</PositionLabel>
									<PlayerName>{player.playerReference}</PlayerName>
								</PlayerItem>
							))}
						</PlayerList>
						<SynergyWrapper>
							<SynergyLabel>Team Synergy</SynergyLabel>
							<SynergyValue>{Math.round(team.synergy)}%</SynergyValue>
						</SynergyWrapper>
					</AccordionBody>
				</AccordionItem>
			))}
		</TeamListWrapper>
	);
};
