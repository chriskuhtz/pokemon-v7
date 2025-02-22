import { OverworldMap } from '../../../interfaces/OverworldMap';

export const meadow: OverworldMap = {
	id: 'meadow',
	backgroundTile: '/tiles/grass.png',
	encounterTile: '/tiles/tallGrass.png',
	width: 20,
	height: 10,
	tileMap: [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	],
	occupants: [
		//items
		0, 1, 2,
		// trainers
		200001, 200002,
		//bushes
		500001,
		//npcs
		600001, 600002, 600003, 600004, 600005,
		//portals
		700001, 700003,
		//obstacles
		800001,
	],
	possibleEncounters: {
		MORNING: [
			{ dexId: 27, xp: 200 },
			{ dexId: 16, xp: 200 },
			{ dexId: 19, xp: 200 },
		],
		DAY: [
			{ dexId: 25, xp: 200 },
			{ dexId: 21, xp: 200 },
			{ dexId: 396, xp: 200 },
		],
		EVENING: [
			{ dexId: 216, xp: 200 },
			{ dexId: 236, xp: 200 },
			{ dexId: 43, xp: 200 },
		],
		NIGHT: [
			{ dexId: 570, xp: 200 },
			{ dexId: 163, xp: 200 },
			{ dexId: 41, xp: 200 },
		],
	},
	weather: 'sandstorm',
};
