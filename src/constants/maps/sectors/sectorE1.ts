import { generateBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const sectorE1: OverworldMap = {
	id: 'sectorE1',
	borderTile: '/tiles/shrub.png',
	obstacleTile: '/tiles/shrub.png',
	backgroundTile: '/tiles/grass.png',
	encounterTile: '/tiles/tallGrass.png',
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
			{ x: 24, y: 0 },
		],
	}),
	occupants: [
		'sectorE1_to_camp',
		'merchant_Valuables',
		'sectorE1_to_sectorN1E1',
	],
	possibleEncounters: {
		MORNING: [
			{ dexId: 27, xp: 100 },
			{ dexId: 16, xp: 100 },
			{ dexId: 19, xp: 100 },
			{ dexId: 191, xp: 100 },
		],
		DAY: [
			{ dexId: 25, xp: 100 },
			{ dexId: 21, xp: 100 },
			{ dexId: 396, xp: 100 },
		],
		EVENING: [
			{ dexId: 216, xp: 100 },
			{ dexId: 236, xp: 100 },
			{ dexId: 43, xp: 100 },
		],
		NIGHT: [
			{ dexId: 570, xp: 100 },
			{ dexId: 163, xp: 100 },
			{ dexId: 41, xp: 100 },
			{ dexId: 35, xp: 100 },
			{ dexId: 92, xp: 100 },
		],
	},
};
