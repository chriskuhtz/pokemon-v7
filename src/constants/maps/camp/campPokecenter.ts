import { generateBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const campPokecenter: OverworldMap = {
	id: 'camp_pokecenter',
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
		'pc_Pokecenter_Camp',
		//nurses
		'nurse_Pokecenter_Camp',
		//portals
		'pokecenter_to_camp',
	],
};
