import { generateBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const universityMeadow: OverworldMap = {
	id: 'university_meadow',
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
		600006,
		//portals
		700006,
		//obstacles
		800013,
	],
};
