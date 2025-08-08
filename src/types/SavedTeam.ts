export interface SavedPlayer {
	name: string;
}

export interface SavedTeam {
	id: string;
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
