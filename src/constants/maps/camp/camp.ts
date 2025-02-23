import { generateBackground } from '../../../functions/generateEmptyBackground';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const camp: OverworldMap = {
	id: 'camp',
	borderTile: '/mapObjects/fence.png',
	backgroundTile: '/tiles/grass.png',
	width: 20,
	height: 20,
	tileMap: generateBackground({
		height: 20,
		width: 20,
		withBorder: true,
		randomEncounterTiles: false,
		borderGates: [{ x: 19, y: 9 }],
	}),
	occupants: [
		//npcs
		'kid_Camp',
		'grandma_Camp',
		'gary_intro',
		'pikachu_fan_Camp',
		//portals
		'camp_to_market',
		'camp_to_pokecenter',
		'camp_to_trailer',
		'camp_to_university',
		'camp_to_sector1x0',
		//signs
		'camp_sign',
		'to_sector1x0_sign',
	],
	possibleEncounters: { MORNING: [], DAY: [], EVENING: [], NIGHT: [] },
};
