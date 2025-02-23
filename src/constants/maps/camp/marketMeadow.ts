import { OverworldMap } from '../../../interfaces/OverworldMap';

export const marketMeadow: OverworldMap = {
	id: 'market_meadow',
	backgroundTile: '/tiles/blueTiles.png',
	possibleEncounters: { MORNING: [], DAY: [], EVENING: [], NIGHT: [] },
	width: 5,
	height: 4,
	tileMap: [
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
	],
	occupants: [
		//merchants
		300001,
		//portals
		700002,
	],
};
