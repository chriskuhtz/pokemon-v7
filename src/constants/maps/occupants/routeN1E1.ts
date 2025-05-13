import { getTimeOfDay } from '../../../functions/getTimeOfDay';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import { routeN1E1Lure } from '../../../modules/BerryLure/BerryLure';
import { travellingMerchantRouteN1E1 } from '../../../modules/TravellingMerchant/TravellingMerchant';
import { janine } from './janine';

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
		y: 48,
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
	{
		type: 'ITEM',
		x: 17,
		y: 30,
		item: 'silver-powder',
		amount: 1,
		id: 'routeS1_silver-powder',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeS1_silver-powder'),
	},
	{
		type: 'ITEM',
		x: 40,
		y: 9,
		item: 'poison-barb',
		amount: 1,
		id: 'routeS1_poison-barb',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeS1_poison-barb'),
	},
	{
		type: 'LEDGE',
		passableFrom: 'DOWN',
		x: 1,
		y: 28,
		id: 'ledge_n1e1_1',
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'ledge_n1e1_1'),
		sprite: '/ledges/ledgeUp.png',
	},
	{
		type: 'LEDGE',
		passableFrom: 'DOWN',
		x: 2,
		y: 28,
		id: 'ledge_n1e1_2',
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'ledge_n1e1_2'),
		sprite: '/ledges/ledgeUp.png',
	},
	{
		type: 'LEDGE',
		passableFrom: 'DOWN',
		x: 3,
		y: 28,
		id: 'ledge_n1e1_3',
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'ledge_n1e1_3'),
		sprite: '/ledges/ledgeUp.png',
	},
	{
		type: 'LEDGE',
		passableFrom: 'DOWN',
		x: 4,
		y: 28,
		id: 'ledge_n1e1_4',
		conditionFunction: (s) =>
			!s.handledOccupants.some((occ) => occ.id === 'ledge_n1e1_4'),
		sprite: '/ledges/ledgeUp.png',
	},
	{
		type: 'POKEMON',
		x: 25,
		y: 25,
		orientation: 'DOWN',
		dexId: 151,
		encounter: {
			name: 'mew',
			maxXp: 125000,
			minXp: 125000,
			rarity: 'common',
		},
		dialogue: ['Mew Mew'],
		conditionFunction: (s) =>
			s.pokedex.mew.caughtOnRoutes.length === 0 &&
			s.bag['payapa-berry'] > 0 &&
			getTimeOfDay() === 'DAY' &&
			s.campUpgrades['invite historian'],
		id: 'routeN1E1_mew',
	},
	...janine,
	routeN1E1Lure,
	...travellingMerchantRouteN1E1,
];
