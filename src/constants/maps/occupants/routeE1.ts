import { OverworldMap } from '../../../interfaces/OverworldMap';

export const routeE1Occupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		x: 25,
		y: 0,
		portal: {
			mapId: 'routeN1E1',
			x: 25,
			y: 49,
			orientation: 'UP',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeE1_to_routeN1E1',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 25,
		y: 50,
		portal: {
			mapId: 'routeS1E1',
			y: 1,
			x: 25,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeE1_to_routeS1E1',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 0,
		y: 25,
		portal: {
			mapId: 'camp',
			y: 10,
			x: 18,
			orientation: 'LEFT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeE1_to_camp',
	},
	{
		type: 'LEDGE',
		x: 1,
		y: 24,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'ledge1'),
		id: 'ledge1',
		sprite: '/ledges/ledgeDown.png',
		passableFrom: 'UP',
	},
	{
		type: 'LEDGE',
		x: 2,
		y: 24,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'ledge2'),
		id: 'ledge2',
		sprite: '/ledges/ledgeInnerCornerLeft.png',
	},
	{
		type: 'LEDGE',
		x: 2,
		y: 25,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'ledge3'),
		id: 'ledge3',
		sprite: '/ledges/ledgeLeft.png',
		passableFrom: 'RIGHT',
	},
	{
		type: 'LEDGE',
		x: 2,
		y: 26,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'ledge4'),
		id: 'ledge4',
		sprite: '/ledges/ledgeInnerCornerLeftBottom.png',
	},
	{
		type: 'LEDGE',
		x: 1,
		y: 26,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'ledge5'),
		id: 'ledge5',
		sprite: '/ledges/ledgeUp.png',
		passableFrom: 'DOWN',
	},
	{
		type: 'LEDGE',
		x: 24,
		y: 2,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'ledge6'),
		id: 'ledge6',
		sprite: '/ledges/ledgeEndBottomLeft.png',
	},
	{
		type: 'LEDGE',
		x: 25,
		y: 2,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'ledge7'),
		id: 'ledge7',
		sprite: '/ledges/ledgeDown.png',
		passableFrom: 'UP',
	},
	{
		type: 'LEDGE',
		x: 26,
		y: 2,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'ledge8'),
		id: 'ledge8',
		sprite: '/ledges/ledgeEndBottomRight.png',
	},
	{
		y: 48,
		x: 25,
		type: 'SNORLAX',
		orientation: 'LEFT',
		id: 'snorlax-blocker-routeE1',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'snorlax-blocker-routeE1'),
	},
	{
		type: 'ROCK',
		y: 33,
		x: 22,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'rock_routeE1_1'),
		id: 'rock_routeE1_1',
	},
	{
		type: 'ROCK',
		y: 24,
		x: 40,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'rock_routeE1_2'),
		id: 'rock_routeE1_2',
	},
	{
		type: 'ROCK',
		y: 10,
		x: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'rock_routeE1_1'),
		id: 'rock_routeE1_1',
	},
	{
		type: 'ROCK',
		y: 5,
		x: 27,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'rock_routeE1_4'),
		id: 'rock_routeE1_4',
	},
	{
		type: 'ROCK',
		y: 40,
		x: 46,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'rock_routeE1_5'),
		id: 'rock_routeE1_5',
	},
	{
		type: 'ROCK',
		y: 30,
		x: 10,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'rock_routeE1_6'),
		id: 'rock_routeE1_6',
	},
	{
		type: 'ROCK',
		y: 42,
		x: 4,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'rock_routeE1_7'),
		id: 'rock_routeE1_7',
	},
	{
		type: 'ROCK',
		y: 7,
		x: 46,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'rock_routeE1_8'),
		id: 'rock_routeE1_8',
	},
	{
		type: 'ROCK',
		y: 13,
		x: 25,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'rock_routeE1_9'),
		id: 'rock_routeE1_9',
	},
];
