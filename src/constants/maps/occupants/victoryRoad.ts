import { occupantHandled } from '../../../functions/occupantHandled';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const victoryRoadOccupants: OverworldMap['occupants'] = [
	{
		type: 'CLIMBING_STEPS',
		x: 7,
		y: 9,
		conditionFunction: () => true,
		id: 'climbing-steps-victoryRoad-1',
	},
	{
		type: 'CLIMBING_STEPS',
		x: 7,
		y: 10,
		conditionFunction: () => true,
		id: 'climbing-steps-victoryRoad-2',
	},
	{
		type: 'CLIMBING_STEPS',
		x: 7,
		y: 11,
		conditionFunction: () => true,
		id: 'climbing-steps-victoryRoad-3',
	},
	{
		type: 'LEDGE',
		x: 1,
		y: 29,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'ledge-victoryRoad-1'),
		id: 'ledge-victoryRoad-1',
		sprite: '/ledges/ledgeDown.png',
		passableFrom: 'UP',
	},
	{
		type: 'LEDGE',
		x: 2,
		y: 29,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'ledge-victoryRoad-2'),
		id: 'ledge-victoryRoad-2',
		sprite: '/ledges/ledgeDown.png',
		passableFrom: 'UP',
	},
	{
		type: 'LEDGE',
		x: 3,
		y: 29,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'ledge-victoryRoad-3'),
		id: 'ledge-victoryRoad-3',
		sprite: '/ledges/ledgeDown.png',
		passableFrom: 'UP',
	},
	{
		type: 'ROCK',
		x: 20,
		y: 45,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'rock_victory_road_1'),
		id: 'rock_victory_road_1',
	},
	{
		type: 'ROCK',
		x: 21,
		y: 44,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'rock_victory_road_2'),
		id: 'rock_victory_road_2',
	},
	{
		type: 'ROCK',
		x: 19,
		y: 46,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'rock_victory_road_3'),
		id: 'rock_victory_road_3',
	},
	{
		type: 'POKEMON',
		x: 4,
		y: 49,
		orientation: 'UP',
		dexId: 248,
		encounter: {
			name: 'tyranitar',
			maxXp: 343000,
			minXp: 343000,
			rarity: 'common',
		},
		dialogue: ['Taaarr'],
		conditionFunction: (s) => !occupantHandled(s, 'victory-road_ttar'),
		id: 'victory-road_ttar',
	},
	{
		type: 'POKEMON',
		x: 4,
		y: 48,
		orientation: 'DOWN',
		dexId: 452,
		encounter: {
			name: 'drapion',
			maxXp: 343000,
			minXp: 343000,
			rarity: 'common',
		},
		dialogue: ['Drap Drap'],
		conditionFunction: (s) => !occupantHandled(s, 'victory-road_drapion'),
		id: 'victory-road_drapion',
	},
];
