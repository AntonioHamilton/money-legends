import { SavedTeam } from "@/types/SavedTeam";

export const teamsMock: SavedTeam[] = [
	{
		_id: "1",
		name: "Team Aurora",
		synergy: 87,
		players: {
			top: { playerReference: "Blaze" },
			jungle: { playerReference: "ShadowFox" },
			mid: { playerReference: "Crystal" },
			bottom: { playerReference: "Falcon" },
			support: { playerReference: "Echo" },
		},
	},
	{
		_id: "2",
		name: "Phantom Squad",
		synergy: 92,
		players: {
			top: { playerReference: "Titan" },
			jungle: { playerReference: "Specter" },
			mid: { playerReference: "Myst" },
			bottom: { playerReference: "Nova" },
			support: { playerReference: "Sage" },
		},
	},
	{
		_id: "3",
		name: "Void Reapers",
		synergy: 78,
		players: {
			top: { playerReference: "Ragnar" },
			jungle: { playerReference: "Phantom" },
			mid: { playerReference: "Hex" },
			bottom: { playerReference: "Viper" },
			support: { playerReference: "Orb" },
		},
	},

	{
		_id: "4",
		name: "Silver Blades",
		synergy: 84,
		players: {
			top: { playerReference: "Ironclad" },
			jungle: { playerReference: "Whisper" },
			mid: { playerReference: "Ember" },
			bottom: { playerReference: "Pulse" },
			support: { playerReference: "Glimmer" },
		},
	},
	{
		_id: "5",
		name: "Crimson Howl",
		synergy: 90,
		players: {
			top: { playerReference: "Claw" },
			jungle: { playerReference: "Shade" },
			mid: { playerReference: "Wraith" },
			bottom: { playerReference: "Fury" },
			support: { playerReference: "Lumen" },
		},
	},
];
