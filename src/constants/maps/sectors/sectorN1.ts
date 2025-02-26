import { generateBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const sectorN1: OverworldMap = {
	id: 'sectorN1',
	borderTile: '/tiles/stump.png',
	obstacleTile: '/tiles/stump.png',
	backgroundTile: '/tiles/forestLawn.png',
	encounterTile: '/tiles/forestGrass.png',
	width: 50,
	height: 50,
	tileMap: generateBackground({
		height: 50,
		width: 50,
		withBorder: true,
		randomEncounterTiles: true,
		randomObstacleTiles: true,
		borderGates: [
			{ x: 24, y: 49 },
			{ x: 49, y: 24 },
		],
	}),
	occupants: ['sectorN1_to_camp', 'ranger_sectorN1', 'sectorN1_to_sectorN1E1'],
	possibleEncounters: {
		MORNING: [
			{ dexId: 123, xp: 100 },
			{ dexId: 83, xp: 100 },
		],
		DAY: [
			{ dexId: 123, xp: 100 },
			{ dexId: 83, xp: 100 },
			{ dexId: 263, xp: 100 },
		],
		EVENING: [
			{ dexId: 123, xp: 100 },
			{ dexId: 167, xp: 100 },
			{ dexId: 543, xp: 100 },
		],
		NIGHT: [
			{ dexId: 123, xp: 100 },
			{ dexId: 204, xp: 100 },
		],
	},
};

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
			{ dexId: 123, xp: 100 },
			{ dexId: 83, xp: 100 },
		],
		DAY: [
			{ dexId: 123, xp: 100 },
			{ dexId: 83, xp: 100 },
			{ dexId: 263, xp: 100 },
		],
		EVENING: [
			{ dexId: 123, xp: 100 },
			{ dexId: 167, xp: 100 },
			{ dexId: 543, xp: 100 },
		],
		NIGHT: [
			{ dexId: 123, xp: 100 },
			{ dexId: 204, xp: 100 },
		],
	},
};
