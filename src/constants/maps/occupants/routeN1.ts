import { OverworldMap } from '../../../interfaces/OverworldMap';

export const routeN1Occupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		x: 25,
		y: 50,
		portal: {
			mapId: 'camp',
			y: 1,
			x: 10,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeN1_to_camp',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 50,
		y: 25,
		portal: {
			mapId: 'routeN1E1',
			y: 25,
			x: 1,
			orientation: 'RIGHT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeN1_to_routeN1E1',
	},
	{
		type: 'ITEM',
		x: 20,
		y: 20,
		item: 'antidote',
		amount: 2,
		id: 'routeN1_antidote',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_antidote'),
	},
	{
		type: 'ITEM',
		x: 40,
		y: 30,
		item: 'great-ball',
		amount: 2,
		id: 'routeN1_great_ball',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_great_ball'),
	},
	{
		type: 'ITEM',
		x: 13,
		y: 44,
		item: 'black-apricorn',
		amount: 5,
		id: 'routeN1_black_apricorn',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_black_apricorn'),
	},
	{
		type: 'ITEM',
		x: 20,
		y: 3,
		item: 'green-apricorn',
		amount: 5,
		id: 'routeN1_green_apricorn',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_green_apricorn'),
	},
	{
		type: 'ITEM',
		x: 37,
		y: 15,
		item: 'yellow-apricorn',
		amount: 5,
		id: 'routeN1_yellow_apricorn',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_yellow_apricorn'),
	},
	{
		type: 'HONEY_TREE',
		x: 25,
		y: 25,
		id: 'routeN1_honey_tree',
		conditionFunction: () => true,
	},
	{
		type: 'HONEY_TREE',
		x: 23,
		y: 25,
		id: 'routeN1_honey_tree_1',
		conditionFunction: () => true,
	},
	{
		type: 'HONEY_TREE',
		x: 27,
		y: 27,
		id: 'routeN1_honey_tree_2',
		conditionFunction: () => true,
	},
	{
		type: 'HONEY_TREE',
		x: 25,
		y: 22,
		id: 'routeN1_honey_tree_3',
		conditionFunction: () => true,
	},
	{
		type: 'BUSH',
		x: 49,
		y: 25,
		id: 'routeN1E1_blocker_bush',
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'routeN1E1_blocker_bush'),
	},
];
