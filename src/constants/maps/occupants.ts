import { Inventory } from '../../interfaces/Inventory';
import { OverworldMap } from '../../interfaces/OverworldMap';
import { SpriteEnum } from '../../interfaces/SpriteEnum';

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
		type: 'ITEM',
		x: 20,
		y: 20,
		item: 'antidote',
		amount: 2,
		id: 'routeN1_antidote',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_antidote'),
	},
	{
		type: 'ITEM',
		x: 30,
		y: 10,
		item: 'honey',
		amount: 5,
		id: 'routeN1_honey',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_honey'),
	},
	{
		type: 'ITEM',
		x: 40,
		y: 30,
		item: 'great-ball',
		amount: 2,
		id: 'routeN1_great_ball',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_great_ball'),
	},
	{
		type: 'HONEY_TREE',
		x: 25,
		y: 25,
		id: 'routeN1_honey_tree',
		conditionFunction: () => true,
	},
];

const market1Inventory: Partial<Inventory> = {
	'poke-ball': 1,
	potion: 1,
	antidote: 1,
	repel: 1,
};
const market2Inventory: Partial<Inventory> = {
	...market1Inventory,
	'great-ball': 1,
	'paralyze-heal': 1,
	'burn-heal': 1,
	'super-potion': 1,
	'ice-heal': 1,
	awakening: 1,
};
const market3Inventory: Partial<Inventory> = {
	...market2Inventory,
	'ultra-ball': 1,
	'full-heal': 1,
	'hyper-potion': 1,
	'super-repel': 1,
};
export const campOccupants: OverworldMap['occupants'] = [
	{
		type: 'NPC',
		id: 'oak_1',
		x: 5,
		y: 4,
		orientation: 'DOWN',
		unhandledMessage: [
			'Ah, you made it',
			'Outside of the fence, the wild Kuma Region awaits',
			'If your Pokemon are hurt, talk to nurse joy on my right',
			'For camp related issues, Camp Manager Kevin can help you',
			'I have a first request for you and some equipment to get you started',
		],
		handledMessage: ['Check the Bulletin board for more quests'],
		gifts: { 'poke-ball': 10 },
		quest: 'catch a pokemon',
		sprite: SpriteEnum.oak,
		conditionFunction: (s) => s.quests['catch a pokemon'] !== 'FULFILLED',
	},
	{
		type: 'NURSE',
		id: 'camp_nurse',
		x: 6,
		y: 4,
		orientation: 'DOWN',
		sprite: SpriteEnum.nurse,
		dialogue: ['Lets heal your Pokemon'],
		conditionFunction: () => true,
	},
	{
		type: 'CAMP_MANAGER',
		id: 'camp_manager',
		x: 4,
		y: 4,
		orientation: 'DOWN',
		dialogue: ['How should we expand our camp?'],
		sprite: SpriteEnum.butler,
		conditionFunction: () => true,
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 10,
		y: 0,
		portal: {
			mapId: 'routeN1',
			x: 25,
			y: 49,
			orientation: 'UP',
			forwardFoot: 'CENTER1',
		},
		id: 'camp_to_routeN1',
		conditionFunction: () => true,
	},
	{
		type: 'SIGN',
		x: 11,
		y: 1,
		dialogue: ['Route N1, beware of wild pokemon'],
		approachDirection: 'UP',
		id: 'routeN1Sign',
		conditionFunction: () => true,
	},
	{
		type: 'PC',
		x: 2,
		y: 1,
		approachDirection: 'UP',
		id: 'camp_pc',
		conditionFunction: () => true,
	},
	{
		type: 'MERCHANT',
		id: 'market_1',
		x: 14,
		y: 1,
		orientation: 'DOWN',
		sprite: SpriteEnum.clerkMale,
		dialogue: ['If we get more famous, we can get more items delivered'],
		inventory: { 'poke-ball': 1, potion: 1, antidote: 1, repel: 1 },
		conditionFunction: (s) =>
			s.campUpgrades.market_1 &&
			!s.campUpgrades.market_2 &&
			!s.campUpgrades.market_3,
	},
	{
		type: 'MERCHANT',
		id: 'market_2',
		x: 14,
		y: 1,
		orientation: 'DOWN',
		sprite: SpriteEnum.clerkMale,
		dialogue: ['Thanks to your hard work, we get better deliveries'],
		inventory: market2Inventory,
		conditionFunction: (s) =>
			s.campUpgrades.market_1 &&
			s.campUpgrades.market_2 &&
			!s.campUpgrades.market_3,
	},
	{
		type: 'MERCHANT',
		id: 'market_3',
		x: 14,
		y: 1,
		orientation: 'DOWN',
		sprite: SpriteEnum.clerkMale,
		dialogue: [
			'Keep it up and we will have a better selection than celadon city',
		],
		inventory: market3Inventory,
		conditionFunction: (s) =>
			s.campUpgrades.market_1 &&
			s.campUpgrades.market_2 &&
			s.campUpgrades.market_3,
	},
	{
		type: 'BULLETIN_BOARD',
		id: 'camp_bulletin_board',
		x: 10,
		y: 10,
		approachDirection: 'UP',
		dialogue: ['Looking for new Quests ...'],
		conditionFunction: (s) => s.campUpgrades.bulletin_board,
	},
	{
		type: 'HALLOWED_TOWER',
		x: 17,
		y: 17,
		id: 'hallowed_tower',
		conditionFunction: () => true,
	},
];
