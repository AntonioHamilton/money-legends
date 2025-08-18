import { SavedTeam } from "@/types/SavedTeam";

export const teamsMock: SavedTeam[] = [
	{
		id: "1",
		name: "Team Aurora",
		synergy: 87,
		players: {
			top: { name: "Blaze" },
			jungle: { name: "ShadowFox" },
			mid: { name: "Crystal" },
			bottom: { name: "Falcon" },
			support: { name: "Echo" },
		},
	},
	{
		id: "2",
		name: "Phantom Squad",
		synergy: 92,
		players: {
			top: { name: "Titan" },
			jungle: { name: "Specter" },
			mid: { name: "Myst" },
			bottom: { name: "Nova" },
			support: { name: "Sage" },
		},
	},
	{
		id: "3",
		name: "Void Reapers",
		synergy: 78,
		players: {
			top: { name: "Ragnar" },
			jungle: { name: "Phantom" },
			mid: { name: "Hex" },
			bottom: { name: "Viper" },
			support: { name: "Orb" },
		},
	},

	{
		id: "4",
		name: "Silver Blades",
		synergy: 84,
		players: {
			top: { name: "Ironclad" },
			jungle: { name: "Whisper" },
			mid: { name: "Ember" },
			bottom: { name: "Pulse" },
			support: { name: "Glimmer" },
		},
	},
	{
		id: "5",
		name: "Crimson Howl",
		synergy: 90,
		players: {
			top: { name: "Claw" },
			jungle: { name: "Shade" },
			mid: { name: "Wraith" },
			bottom: { name: "Fury" },
			support: { name: "Lumen" },
		},
	},
];
