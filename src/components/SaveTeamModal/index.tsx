import React, { ChangeEvent, useState } from "react";
import * as S from "./styled";

interface SaveTeamModalProps {
	isOpen: boolean;
	onClose: () => void;
	saveTeam: (teamName: string) => Promise<any>;
}

const SaveTeamModal = ({ isOpen, onClose, saveTeam }: SaveTeamModalProps) => {
	const [teamName, setTeamName] = useState("");

	if (!isOpen) return null;

	const handleConfirm = async () => {
		if (teamName.trim() !== "") {
			const success = await saveTeam(teamName);

			if (success) {
				setTeamName("");
				onClose();
			}
		}
	};

	return (
		<S.Overlay>
			<S.Modal>
				<S.Title>Salvar Time</S.Title>
				<S.Input
					type="text"
					placeholder="Digite o nome do time"
					value={teamName}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setTeamName(e.target.value)
					}
				/>
				<S.Buttons>
					<S.CancelButton onClick={onClose}>Cancel</S.CancelButton>
					<S.ConfirmButton onClick={handleConfirm}>Confirm</S.ConfirmButton>
				</S.Buttons>
			</S.Modal>
		</S.Overlay>
	);
};

export default SaveTeamModal;
