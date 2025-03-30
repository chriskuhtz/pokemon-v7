import { OverworldMap } from '../../../interfaces/OverworldMap';

export const onixCaveOccupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		id: 'cave exit to meadow',
		conditionFunction: () => true,
		x: 1,
		y: 1,
		portal: {
			mapId: 'routeN1',
			x: 3,
			y: 3,
			orientation: 'RIGHT',
			forwardFoot: 'CENTER1',
		},
		sprite: '/mapObjects/ladderUp.png',
	},
	{
		type: 'ON_STEP_PORTAL',
		id: 'cave exit to plains',
		conditionFunction: () => true,
		x: 48,
		y: 47,
		portal: {
			mapId: 'routeS1E1',
			x: 3,
			y: 3,
			orientation: 'RIGHT',
			forwardFoot: 'CENTER1',
		},
		sprite: '/mapObjects/ladderUp.png',
	},
	{
		type: 'ITEM',
		item: 'helix-fossil',
		amount: 1,
		x: 4,
		y: 7,
		id: 'onixCave_fossil',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'onixCave_fossil'),
	},
	{
		type: 'ITEM',
		item: 'black-augurite',
		amount: 1,
		x: 20,
		y: 27,
		id: 'onixCave_fossil',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'onixCave_fossil'),
	},
	{
		type: 'ITEM',
		item: 'dawn-stone',
		amount: 1,
		x: 43,
		y: 15,
		id: 'onixCave_fossil',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'onixCave_fossil'),
	},
];
