import { OverworldMap } from '../../../interfaces/OverworldMap';
import { routeN1Lure } from '../../../modules/BerryLure/BerryLure';

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
		amount: 1,
		id: 'routeN1_antidote',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_antidote'),
	},
	{
		type: 'ITEM',
		x: 40,
		y: 30,
		item: 'great-ball',
		amount: 1,
		id: 'routeN1_great_ball',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_great_ball'),
	},
	{
		type: 'ITEM',
		x: 46,
		y: 4,
		item: 'lucky-egg',
		amount: 1,
		id: 'routeN1_lucky-egg',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_lucky-egg'),
	},
	{
		type: 'ITEM',
		x: 13,
		y: 44,
		item: 'black-apricorn',
		amount: 1,
		id: 'routeN1_black_apricorn',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_black_apricorn'),
	},
	{
		type: 'ITEM',
		x: 20,
		y: 3,
		item: 'green-apricorn',
		amount: 1,
		id: 'routeN1_green_apricorn',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_green_apricorn'),
	},
	{
		type: 'ITEM',
		x: 37,
		y: 15,
		item: 'yellow-apricorn',
		amount: 1,
		id: 'routeN1_yellow_apricorn',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_yellow_apricorn'),
	},
	{
		type: 'ITEM',
		x: 27,
		y: 20,
		item: 'bluk-berry',
		amount: 1,
		id: 'routeN1_bluk_berry',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_bluk_berry'),
	},
	{
		type: 'ITEM',
		x: 5,
		y: 7,
		item: 'kelpsy-berry',
		amount: 1,
		id: 'routeN1_kelpsy_berry',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_kelpsy_berry'),
	},
	{
		type: 'ITEM',
		x: 45,
		y: 40,
		item: 'aguav-berry',
		amount: 1,
		id: 'routeN1_aguav_berry',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_aguav_berry'),
	},
	{
		type: 'ITEM',
		x: 30,
		y: 40,
		item: 'kee-berry',
		amount: 1,
		id: 'routeN1_kee_berry',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_kee_berry'),
	},
	{
		type: 'ITEM',
		x: 17,
		y: 42,
		item: 'silk-scarf',
		amount: 1,
		id: 'routeN1_silk_scarf',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_silk_scarf'),
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
	{
		type: 'ON_STEP_PORTAL',
		id: 'cave entry',
		conditionFunction: () => true,
		x: 2,
		y: 3,
		portal: {
			mapId: 'onixCave',
			x: 1,
			y: 2,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		sprite: '/mapObjects/ladderDown.png',
	},
	{
		type: 'LEDGE',
		x: 1,
		y: 4,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'routeN1-ledge1'),
		id: 'routeN1-ledge1',
		sprite: '/ledges/ledgeDown.png',
		passableFrom: 'UP',
	},
	{
		type: 'LEDGE',
		x: 2,
		y: 4,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'routeN1-ledge2'),
		id: 'routeN1-ledge2',
		sprite: '/ledges/ledgeDown.png',
		passableFrom: 'UP',
	},
	{
		type: 'LEDGE',
		x: 3,
		y: 4,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'routeN1-ledge3'),
		id: 'routeN1-ledge3',
		sprite: '/ledges/ledgeDown.png',
		passableFrom: 'UP',
	},
	{
		type: 'LEDGE',
		x: 4,
		y: 4,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'routeN1-ledge4'),
		id: 'routeN1-ledge4',
		sprite: '/ledges/ledgeCornerRight.png',
		passableFrom: 'UP',
	},
	{
		type: 'LEDGE',
		x: 4,
		y: 3,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'routeN1-ledge5'),
		id: 'routeN1-ledge5',
		sprite: '/ledges/ledgeRight.png',
		passableFrom: 'LEFT',
	},
	{
		type: 'LEDGE',
		x: 4,
		y: 2,
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'routeN1-ledge6'),
		id: 'routeN1-ledge6',
		sprite: '/ledges/ledgeRight.png',
		passableFrom: 'LEFT',
	},
	routeN1Lure,
];
