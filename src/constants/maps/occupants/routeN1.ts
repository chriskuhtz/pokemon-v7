import { makeApricornTree } from '../../../functions/makeApricornTree';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import { routeN1Lure } from '../../../modules/BerryLure/BerryLure';
import { travellingMerchantRouteN1 } from '../../../modules/TravellingMerchant/TravellingMerchant';
import { barryN1 } from './barry';
import { cynthiaN1 } from './cynthia';
import { erika } from './erika';
import { giovanni } from './giovanni';
import { hughN1 } from './hugh';
import { nN1 } from './n';
import { redN1 } from './red';
import { silverN1 } from './silver';

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
		x: 20,
		y: 3,
		item: 'lumiose-galette',
		amount: 1,
		id: 'routeN1_lumi_galette',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_lumi_galette'),
	},
	{
		type: 'ITEM',
		x: 37,
		y: 15,
		item: 'nest-ball',
		amount: 1,
		id: 'routeN1_nest_ball',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_nest_ball'),
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
	...erika,
	giovanni,
	routeN1Lure,
	...travellingMerchantRouteN1,
	...makeApricornTree({
		x: 4,
		y: 30,
		apricorn: 'green-apricorn',
		id: 'routeN1_green_tree_1',
	}),
	...makeApricornTree({
		x: 6,
		y: 28,
		apricorn: 'green-apricorn',
		id: 'routeN1_green_tree_2',
	}),
	...makeApricornTree({
		x: 3,
		y: 27,
		apricorn: 'green-apricorn',
		id: 'routeN1_green_tree_3',
	}),
	barryN1,
	silverN1,
	cynthiaN1,
	nN1,
	hughN1,
	{
		type: 'SIGN',
		x: 33,
		y: 31,
		approachDirection: 'UP',
		id: 'catch streak sign',
		dialogue: [
			'If you catch the same pokemon multiple times in a row',
			'stronger specimen will appear',
			'and they are more likely to be shiny',
			'if you leave the area, this effect resets',
		],
		conditionFunction: () => true,
	},
	redN1,
];
