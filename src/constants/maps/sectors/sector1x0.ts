import { generateBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const sector1x0: OverworldMap = {
	id: 'sector1x0',
	borderTile: '/tiles/shrub.png',
	backgroundTile: '/tiles/grass.png',
	encounterTile: '/tiles/tallGrass.png',
	width: 50,
	height: 50,
	tileMap: generateBackground({
		height: 50,
		width: 50,
		withBorder: true,
		randomEncounterTiles: true,
		borderGates: [{ x: 0, y: 24 }],
	}),
	occupants: ['sector1x0_to_camp'],
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
