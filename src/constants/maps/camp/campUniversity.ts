import { generateBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const campUniversity: OverworldMap = {
	id: 'camp_university',
	backgroundTile: '/tiles/whiteBoards.png',
	possibleEncounters: { MORNING: [], DAY: [], EVENING: [], NIGHT: [] },
	height: 8,
	width: 20,
	tileMap: generateBackground({
		height: 8,
		width: 20,
		randomEncounterTiles: false,
		withBorder: false,
	}),
	occupants: [
		//npcs
		'oak_University',
		//portals
		'university_to_camp',
		//obstacles
		'bookShelf1_university',
	],
};
