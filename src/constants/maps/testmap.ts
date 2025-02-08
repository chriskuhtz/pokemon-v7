import { OverworldMap } from '../../interfaces/OverworldMap';

export const testMap: OverworldMap = {
	id: 'testMap',
	backgroundTile: { x: 103, y: 1 },
	width: 10,
	height: 5,
	tileMap: [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	],
	occupants: [0, 1, 100001, 300001],
	possibleEncounters: [
		{ dexId: 1, xp: 10000 },
		{ dexId: 4, xp: 10000 },
		{ dexId: 7, xp: 10000 },
		{ dexId: 25, xp: 10000 },
	],
};
