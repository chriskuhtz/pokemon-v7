import { generateEmptyBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const camp: OverworldMap = {
	id: 'camp',
	borderTile: '/mapObjects/fence.png',
	backgroundTile: '/tiles/grass.png',
	width: 20,
	height: 10,
	tileMap: generateEmptyBackground(10, 20, true),
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

// possibleEncounters: {
// 	MORNING: [
// 		{ dexId: 27, xp: 200 },
// 		{ dexId: 16, xp: 200 },
// 		{ dexId: 19, xp: 200 },
// 	],
// 	DAY: [
// 		{ dexId: 25, xp: 200 },
// 		{ dexId: 21, xp: 200 },
// 		{ dexId: 396, xp: 200 },
// 	],
// 	EVENING: [
// 		{ dexId: 216, xp: 200 },
// 		{ dexId: 236, xp: 200 },
// 		{ dexId: 43, xp: 200 },
// 	],
// 	NIGHT: [
// 		{ dexId: 570, xp: 200 },
// 		{ dexId: 163, xp: 200 },
// 		{ dexId: 41, xp: 200 },
// 	],
// },
// weather: 'sandstorm',
