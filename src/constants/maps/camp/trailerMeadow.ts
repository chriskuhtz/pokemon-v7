import { generateBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const trailerMeadow: OverworldMap = {
	id: 'trailer_meadow',
	backgroundTile: '/tiles/woodfloor.png',
	possibleEncounters: { MORNING: [], DAY: [], EVENING: [], NIGHT: [] },
	height: 2,
	width: 3,
	tileMap: generateBackground(2, 3),
	occupants: [
		//portals
		700008,
		//obstacles
		800014,
	],
};
