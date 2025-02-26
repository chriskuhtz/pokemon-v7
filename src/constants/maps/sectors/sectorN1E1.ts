import { generateBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const sectorN1E1: OverworldMap = {
	id: 'sectorN1E1',
	borderTile: '/tiles/shrub.png',
	obstacleTile: '/tiles/shrub.png',
	backgroundTile: '/tiles/grass2.png',
	encounterTile: '/tiles/grass4.png',
	width: 50,
	height: 50,
	tileMap: generateBackground({
		height: 50,
		width: 50,
		withBorder: true,
		randomEncounterTiles: true,
		randomObstacleTiles: true,
		borderGates: [
			{ x: 0, y: 24 },
			{ x: 24, y: 49 },
		],
	}),
	occupants: ['sectorN1E1_to_sectorE1', 'sectorN1E1_to_sectorN1'],
	possibleEncounters: {
		MORNING: [
			{ dexId: 29, xp: 100 },
			{ dexId: 32, xp: 100 },
		],
		DAY: [
			{ dexId: 399, xp: 100 },
			{ dexId: 276, xp: 100 },
			{ dexId: 511, xp: 100 },
		],
		EVENING: [
			{ dexId: 56, xp: 100 },
			{ dexId: 938, xp: 100 },
			{ dexId: 821, xp: 100 },
		],
		NIGHT: [
			{ dexId: 714, xp: 100 },
			{ dexId: 204, xp: 100 },
		],
	},
};
