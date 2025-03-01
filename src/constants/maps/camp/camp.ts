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
		borderGates: [
			{ x: 19, y: 9 },
			{ x: 9, y: 0 },
		],
	}),
	occupants: [
		//npcs
		'kid_Camp',
		'grandma_Camp',
		'gary_intro',
		'pikachu_fan_Camp',
		'gastly_fan_Camp',
		'clefairy_fan_Camp',
		'honey_explainer',
		//portals
		'camp_to_market',
		'camp_to_pokecenter',
		'camp_to_trailer',
		'camp_to_university',
		'camp_to_sectorN1',
		'camp_to_sectorE1',
		//signs
		'camp_sign',
		'to_sectorE1_sign',
		'to_sectorN1_sign',
	],
	possibleEncounters: { MORNING: [], DAY: [], EVENING: [], NIGHT: [] },
};
