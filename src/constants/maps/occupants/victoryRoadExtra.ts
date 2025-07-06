import { makePokemonStatue } from '../../../functions/makePokemonStatue';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const victoryRoadOccupantsExtra: OverworldMap['occupants'] = [
	//PORTALS
	{
		id: 'victory_road_lower_level_to_victory_road_extra_cave',
		type: 'ON_STEP_PORTAL',
		x: 20,
		y: 38,
		portal: {
			mapId: 'victoryRoadU1',
			x: 8,
			y: 4,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
	},
	//OBSTACLES
	{
		type: 'CLIMBING_STEPS',
		x: 12,
		y: 8,
		conditionFunction: () => true,
		id: 'climbing-steps-victoryRoadExtra-1',
	},
	{
		type: 'CLIMBING_STEPS',
		x: 12,
		y: 9,
		conditionFunction: () => true,
		id: 'climbing-steps-victoryRoadExtra-2',
	},
	//OVERWORLD_MONS
	//TRAINERS
	//ITEMS
	...makePokemonStatue({
		x: 17,
		y: 20,
		orientation: 'LEFT',
		dexId: 144,
		dialogue: ['A strange statue.', 'You feel a cold wind.'],
		activeCondition: (s) => s.pokedex.articuno.caughtOnRoutes.length > 0,
	}),
	...makePokemonStatue({
		x: 20,
		y: 23,
		orientation: 'DOWN',
		dexId: 145,
		dialogue: ['A strange statue.', 'You feel a spark in the air.'],
		activeCondition: (s) => s.pokedex.zapdos.caughtOnRoutes.length > 0,
	}),
	...makePokemonStatue({
		x: 23,
		y: 20,
		orientation: 'RIGHT',
		dexId: 146,
		dialogue: ['A strange statue.', 'You feel a gust of hot air.'],
		activeCondition: (s) => s.pokedex.moltres.caughtOnRoutes.length > 0,
	}),
	{
		type: 'POKEMON',
		dialogue: ['kyyaaahh'],
		x: 20,
		y: 2,
		orientation: 'DOWN',
		dexId: 249,
		id: 'victory-road-lugia',
		encounter: {
			name: 'lugia',
			maxXp: 216000,
			minXp: 216000,
			rarity: 'common',
		},
		conditionFunction: (s) =>
			s.pokedex.moltres.caughtOnRoutes.length > 0 &&
			s.pokedex.zapdos.caughtOnRoutes.length > 0 &&
			s.pokedex.articuno.caughtOnRoutes.length > 0,
	},
];
