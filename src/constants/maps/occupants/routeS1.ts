import { OverworldMap } from '../../../interfaces/OverworldMap';

export const routeS1Occupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		x: 50,
		y: 25,
		portal: {
			mapId: 'routeS1E1',
			x: 1,
			y: 25,
			orientation: 'RIGHT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1_to_routeS1E1',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 25,
		y: 0,
		portal: {
			mapId: 'camp',
			x: 10,
			y: 18,
			orientation: 'UP',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1_to_camp',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 50,
		y: 12,
		portal: {
			mapId: 'routeS1E1',
			x: 1,
			y: 12,
			orientation: 'RIGHT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1_to_routeS1E1',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 50,
		y: 13,
		portal: {
			mapId: 'routeS1E1',
			x: 1,
			y: 13,
			orientation: 'RIGHT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1_to_routeS1E1',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 50,
		y: 14,
		portal: {
			mapId: 'routeS1E1',
			x: 1,
			y: 14,
			orientation: 'RIGHT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1_to_routeS1E1',
	},
	{
		type: 'ITEM',
		x: 15,
		y: 23,
		item: 'soft-sand',
		amount: 1,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'softsand'),
		id: 'softsand',
	},
	{
		type: 'ITEM',
		x: 17,
		y: 22,
		item: 'helix-fossil',
		amount: 1,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'lake-fossil'),
		id: 'lake-fossil',
	},
	{
		type: 'ITEM',
		x: 10,
		y: 38,
		item: 'net-ball',
		amount: 10,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'lake-net-balls'),
		id: 'lake-net-balls',
	},
	{
		type: 'ITEM',
		x: 35,
		y: 34,
		item: 'full-restore',
		amount: 1,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'lake-full-restore'),
		id: 'lake-full-restore',
	},

	// {
	// 	type: 'ON_STEP_PORTAL',
	// 	x: 0,
	// 	y: 25,
	// 	portal: {
	// 		mapId: 'routeS1W1',
	// 		y: 25,
	// 		x: 49,
	// 		orientation: 'LEFT',
	// 		forwardFoot: 'CENTER1',
	// 	},
	// 	conditionFunction: () => true,
	// 	id: 'routeS1_to_routeS1W1',
	// },
];
