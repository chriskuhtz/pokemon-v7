import { generateBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const pokecenterMeadow: OverworldMap = {
	id: 'pokecenter_meadow',
	backgroundTile: '/tiles/redTiles.png',
	possibleEncounters: { MORNING: [], DAY: [], EVENING: [], NIGHT: [] },
	height: 4,
	width: 5,
	tileMap: generateBackground({
		height: 4,
		width: 5,
		withBorder: false,
		randomEncounterTiles: false,
	}),
	occupants: [
		//pcs
		100001,
		//nurses
		400001,
		//portals
		700004,
	],
};
