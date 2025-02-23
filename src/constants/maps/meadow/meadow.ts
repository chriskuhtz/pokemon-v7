import { generateEmptyBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const meadow: OverworldMap = {
	id: 'meadow',
	borderTile: '/mapObjects/fence.png',
	backgroundTile: '/tiles/grass.png',
	encounterTile: '/tiles/tallGrass.png',
	width: 20,
	height: 10,
	tileMap: generateEmptyBackground(10, 20, true),
	occupants: [
		//items
		0, 1, 2,
		// trainers
		200001, 200002,
		//bushes
		500001,
		//npcs
		600001, 600002, 600003, 600004, 600005, 600007,
		//portals
		700001, 700003, 700005, 700007,
		//obstacles
		800001, 800003, 800004, 800005, 800006, 800007, 800008, 800009, 800010,
		800011, 800012,
		//signs
		900001,
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
