import { OverworldMap } from '../../../interfaces/OverworldMap';
import { routeS1E1Lure } from '../../../modules/BerryLure/BerryLure';

export const routeS1E1Occupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		x: 25,
		y: 0,
		portal: {
			mapId: 'routeE1',
			x: 25,
			y: 49,
			orientation: 'UP',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1E1_to_routeE1',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 0,
		y: 12,
		portal: {
			mapId: 'routeS1',
			y: 12,
			x: 49,
			orientation: 'LEFT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1E1_to_routeS1',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 0,
		y: 13,
		portal: {
			mapId: 'routeS1',
			y: 13,
			x: 49,
			orientation: 'LEFT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1E1_to_routeS1',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 0,
		y: 14,
		portal: {
			mapId: 'routeS1',
			y: 14,
			x: 49,
			orientation: 'LEFT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1E1_to_routeS1',
	},
	{
		type: 'ON_STEP_PORTAL',
		id: 'cave exit to plains',
		conditionFunction: () => true,
		x: 2,
		y: 3,
		portal: {
			mapId: 'onixCave',
			x: 48,
			y: 48,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		sprite: '/mapObjects/ladderDown.png',
	},
	{
		type: 'ITEM',
		id: 'poke-flute',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'poke-flute'),
		x: 45,
		y: 3,
		item: 'poke-flute',
		amount: 1,
	},
	{
		type: 'ITEM',
		id: 'miracle-seed',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'miracle-seed'),
		x: 40,
		y: 20,
		item: 'miracle-seed',
		amount: 1,
	},
	{
		type: 'ITEM',
		id: 'twisted-spoon',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'twisted-spoon'),
		x: 23,
		y: 40,
		item: 'twisted-spoon',
		amount: 1,
	},
	{
		type: 'ITEM',
		id: 'lucky-egg',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'lucky-egg'),
		x: 9,
		y: 23,
		item: 'lucky-egg',
		amount: 1,
	},
	routeS1E1Lure,
];
