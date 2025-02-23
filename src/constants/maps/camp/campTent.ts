import { generateBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const campTent: OverworldMap = {
	id: 'camp_tent',
	backgroundTile: '/tiles/woodfloor.png',
	possibleEncounters: { MORNING: [], DAY: [], EVENING: [], NIGHT: [] },
	height: 2,
	width: 3,
	tileMap: generateBackground({
		height: 2,
		width: 3,
		withBorder: false,
		randomEncounterTiles: false,
	}),
	occupants: [
		//portals
		'trailer_to_camp',
		//obstacles
		'bed_trailer',
	],
};
