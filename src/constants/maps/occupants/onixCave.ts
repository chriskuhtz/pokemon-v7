import { OverworldMap } from '../../../interfaces/OverworldMap';

export const onixCaveOccupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		id: 'cave exit',
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
		type: 'ITEM',
		item: 'helix-fossil',
		amount: 1,
		x: 4,
		y: 7,
		id: 'onixCave_fossil',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'onixCave_fossil'),
	},
];
