import { generateBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const camp: OverworldMap = {
	id: 'camp',
	borderTile: '/mapObjects/fence.png',
	backgroundTile: '/tiles/grass.png',
	width: 20,
	height: 20,
	tileMap: generateBackground({
		height: 20,
		width: 20,
		withBorder: true,
		randomEncounterTiles: false,
		borderGates: [{ x: 19, y: 9 }],
	}),
	occupants: [
		//npcs
		600001, 600003, 600004, 600007,
		//portals
		700001, 700003, 700005, 700007,
		//signs
		900001,
	],
	possibleEncounters: { MORNING: [], DAY: [], EVENING: [], NIGHT: [] },
};

export const sector1x0: OverworldMap = {
	id: 'sector1x0',
	borderTile: '/mapObjects/slimTree.png',
	backgroundTile: '/tiles/grass.png',
	encounterTile: '/tiles/tallGrass.png',
	width: 50,
	height: 50,
	tileMap: generateBackground({
		height: 50,
		width: 50,
		withBorder: true,
		randomEncounterTiles: true,
	}),
	occupants: [],
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
};
