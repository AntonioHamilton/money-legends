export interface SavedPlayer {
	playerReference: string;
}

export interface SavedTeam {
	_id: string;
	name: string;
	synergy: number;
	players: {
		top: SavedPlayer;
		jungle: SavedPlayer;
		mid: SavedPlayer;
		bottom: SavedPlayer;
		support: SavedPlayer;
	};
}
