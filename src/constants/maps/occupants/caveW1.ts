import { getTimeOfDay } from '../../../functions/getTimeOfDay';
import { OverworldMap } from '../../../interfaces/OverworldMap';

export const caveW1Occupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		id: 'cave entry bottom',
		conditionFunction: () => true,
		x: 28,
		y: 47,
		portal: {
			mapId: 'routeW1',
			x: 29,
			y: 47,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		sprite: '/mapObjects/ladderUp.png',
	},
	{
		type: 'ON_STEP_PORTAL',
		id: 'cave entry middle',
		conditionFunction: () => true,
		x: 6,
		y: 17,
		portal: {
			mapId: 'routeW1',
			x: 7,
			y: 17,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		sprite: '/mapObjects/ladderUp.png',
	},
	{
		type: 'ON_STEP_PORTAL',
		id: 'cave entry top',
		conditionFunction: () => true,
		x: 23,
		y: 2,
		portal: {
			mapId: 'routeW1',
			x: 24,
			y: 2,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		sprite: '/mapObjects/ladderUp.png',
	},
	{
		type: 'ITEM',
		x: 11,
		y: 48,
		item: 'jaw-fossil',
		amount: 1,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'caveW1-jaw-fossil'),
		id: 'caveW1-jaw-fossil',
	},
	{
		type: 'ITEM',
		x: 20,
		y: 20,
		item: 'sail-fossil',
		amount: 1,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'caveW1-sail-fossil'),
		id: 'caveW1-sail-fossil',
	},
	{
		type: 'ITEM',
		x: 5,
		y: 3,
		item: 'protector',
		amount: 1,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'caveW1-protector'),
		id: 'caveW1-protector',
	},
	{
		type: 'ITEM',
		x: 35,
		y: 45,
		item: 'max-repel',
		amount: 1,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'caveW1-max-repel'),
		id: 'caveW1-max-repel',
	},
	{
		type: 'ITEM',
		x: 27,
		y: 13,
		item: 'elixir',
		amount: 2,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'caveW1-elixir'),
		id: 'caveW1-elixir',
	},
	{
		type: 'ITEM',
		x: 48,
		y: 3,
		item: 'revive',
		amount: 2,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'caveW1-revive'),
		id: 'caveW1-revive',
	},
	{
		type: 'POKEMON',
		x: 46,
		y: 21,
		orientation: 'DOWN',
		dexId: 146,
		encounter: {
			name: 'moltres',
			maxXp: 125000,
			minXp: 125000,
			rarity: 'common',
		},
		dialogue: ['Kyaaah'],
		conditionFunction: (s) =>
			s.pokedex.moltres.caughtOnRoutes.length === 0 &&
			s.bag['fire-stone'] > 0 &&
			getTimeOfDay() === 'NIGHT',
		id: 'routeW1_moltres',
	},
];
