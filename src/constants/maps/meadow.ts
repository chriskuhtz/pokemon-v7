import { OverworldMap } from '../../interfaces/OverworldMap';

export const meadow: OverworldMap = {
	id: 'meadow',
	backgroundTile: { x: 103, y: 1 },
	encounterTile: { x: 120, y: 1 },
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
		//pcs
		100001,
		// trainers
		200001, 200002,
		//merchants
		300001,
		//nurses
		400001,
		//bushes
		500001,
		//npcs
		600001, 600002, 600003, 600004, 600005,
		//buildings
		700001,
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
