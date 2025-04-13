import { OverworldMap } from '../../../interfaces/OverworldMap';

export const routeS1W1Occupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		x: 25,
		y: 0,
		portal: {
			mapId: 'routeW1',
			x: 25,
			y: 49,
			orientation: 'UP',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1W1_to_routeW1',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 50,
		y: 25,
		portal: {
			mapId: 'routeS1',
			y: 25,
			x: 1,
			orientation: 'RIGHT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1W1_to_routeS1',
	},
	{
		x: 2,
		y: 48,
		type: 'ITEM',
		item: 'armor-fossil',
		amount: 1,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id == 'routeS1W1_armor_fossil'),
		id: 'routeS1W1_armor_fossil',
	},
	{
		x: 2,
		y: 47,
		type: 'ITEM',
		item: 'skull-fossil',
		amount: 1,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id == 'routeS1W1_skull_fossil'),
		id: 'routeS1W1_skull_fossil',
	},
];
