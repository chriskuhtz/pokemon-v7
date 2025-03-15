import { OverworldMap } from '../../interfaces/OverworldMap';

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
		x: 30,
		y: 10,
		item: 'honey',
		amount: 5,
		id: 'routeN1_honey',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_honey'),
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
		type: 'HONEY_TREE',
		x: 25,
		y: 25,
		id: 'routeN1_honey_tree',
		conditionFunction: () => true,
	},
];
