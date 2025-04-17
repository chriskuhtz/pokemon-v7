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
];
