import { OverworldMap } from '../../../interfaces/OverworldMap';

export const routeN1E1Occupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		x: 0,
		y: 25,
		portal: {
			mapId: 'routeN1',
			x: 49,
			y: 25,
			orientation: 'LEFT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeN1E1_to_routeE1',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 25,
		y: 50,
		portal: {
			mapId: 'routeE1',
			y: 1,
			x: 25,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeN1E1_to_routeE1',
	},
	{
		type: 'ROCK',
		y: 49,
		x: 25,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'rock_routeN1E1'),
		id: 'rock_routeN1E1',
	},
	{
		type: 'HALLOWED_TOWER',
		x: 2,
		y: 31,
		id: 'hallowed_tower',
		conditionFunction: () => true,
	},
	{
		type: 'ITEM',
		x: 15,
		y: 25,
		item: 'super-potion',
		amount: 1,
		id: 'routeS1_super_potion',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeS1_super_potion'),
	},
	{
		type: 'ITEM',
		x: 31,
		y: 20,
		item: 'pink-apricorn',
		amount: 1,
		id: 'routeS1_pink_apricorn',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeS1_pink_apricorn'),
	},
	{
		type: 'ITEM',
		x: 33,
		y: 5,
		item: 'red-apricorn',
		amount: 1,
		id: 'routeS1_red_apricorn',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeS1_red_apricorn'),
	},
	{
		type: 'ITEM',
		x: 17,
		y: 15,
		item: 'blue-apricorn',
		amount: 1,
		id: 'routeS1_blue_apricorn',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeS1_blue_apricorn'),
	},
];
