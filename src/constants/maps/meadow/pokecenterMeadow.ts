import { OverworldMap } from '../../../interfaces/OverworldMap';

export const pokecenterMeadow: OverworldMap = {
	id: 'pokecenter_meadow',
	backgroundTile: '/tiles/redTiles.png',
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
		//pcs
		100001,
		//nurses
		400001,
		//portals
		700004,
	],
};
