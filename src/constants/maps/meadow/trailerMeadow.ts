import { generateEmptyBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const trailerMeadow: OverworldMap = {
	id: 'trailer_meadow',
	backgroundTile: '/tiles/woodfloor.png',
	possibleEncounters: { MORNING: [], DAY: [], EVENING: [], NIGHT: [] },
	height: 2,
	width: 3,
	tileMap: generateEmptyBackground(2, 3),
	occupants: [
		//npcs
		600008,
		//portals
		700008,
		//obstacles
		800014, 800015,
	],
};
