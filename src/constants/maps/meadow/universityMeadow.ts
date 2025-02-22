import { generateEmptyBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const universityMeadow: OverworldMap = {
	id: 'university_meadow',
	backgroundTile: '/tiles/whiteBoards.png',
	possibleEncounters: { MORNING: [], DAY: [], EVENING: [], NIGHT: [] },
	height: 8,
	width: 20,
	tileMap: generateEmptyBackground(8, 20),
	occupants: [
		//npcs
		600006,
		//portals
		700006,
		//obstacles
		800013,
	],
};
