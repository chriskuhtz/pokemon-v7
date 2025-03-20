import { Inventory } from '../../interfaces/Inventory';
import {
	evBoostItemTypes,
	ppRestorationItemTypes,
	xItemTypes,
} from '../../interfaces/Item';
import { Occupant, OverworldMap } from '../../interfaces/OverworldMap';
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
		x: 40,
		y: 30,
		item: 'great-ball',
		amount: 2,
		id: 'routeN1_great_ball',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_great_ball'),
	},
	{
		type: 'ITEM',
		x: 13,
		y: 44,
		item: 'black-apricorn',
		amount: 5,
		id: 'routeN1_black_apricorn',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_black_apricorn'),
	},
	{
		type: 'ITEM',
		x: 20,
		y: 3,
		item: 'green-apricorn',
		amount: 5,
		id: 'routeN1_green_apricorn',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_green_apricorn'),
	},
	{
		type: 'ITEM',
		x: 37,
		y: 15,
		item: 'yellow-apricorn',
		amount: 5,
		id: 'routeN1_yellow_apricorn',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeN1_yellow_apricorn'),
	},
	{
		type: 'HONEY_TREE',
		x: 25,
		y: 25,
		id: 'routeN1_honey_tree',
		conditionFunction: () => true,
	},
];
export const routeS1Occupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		x: 25,
		y: 0,
		portal: {
			mapId: 'camp',
			y: 18,
			x: 10,
			orientation: 'UP',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1_to_camp',
	},
	{
		type: 'HALLOWED_TOWER',
		x: 47,
		y: 40,
		id: 'hallowed_tower',
		conditionFunction: () => true,
	},
	{
		type: 'ITEM',
		x: 15,
		y: 25,
		item: 'super-potion',
		amount: 3,
		id: 'routeS1_super_potion',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeS1_super_potion'),
	},
	{
		type: 'ITEM',
		x: 31,
		y: 20,
		item: 'pink-apricorn',
		amount: 5,
		id: 'routeS1_pink_apricorn',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeS1_pink_apricorn'),
	},
	{
		type: 'ITEM',
		x: 33,
		y: 7,
		item: 'red-apricorn',
		amount: 5,
		id: 'routeS1_red_apricorn',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeS1_red_apricorn'),
	},
	{
		type: 'ITEM',
		x: 17,
		y: 15,
		item: 'blue-apricorn',
		amount: 5,
		id: 'routeS1_blue_apricorn',
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'routeS1_blue_apricorn'),
	},
	{
		type: 'HONEY_TREE',
		x: 10,
		y: 5,
		id: 'routeS1_honey_tree_1',
		conditionFunction: () => true,
	},
	{
		type: 'HONEY_TREE',
		x: 8,
		y: 7,
		id: 'routeS1_honey_tree_2',
		conditionFunction: () => true,
	},
	{
		type: 'HONEY_TREE',
		x: 12,
		y: 6,
		id: 'routeS1_honey_tree_3',
		conditionFunction: () => true,
	},
];
export const routeN1E1Occupants: OverworldMap['occupants'] = [];
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
const battleItemMarket: Partial<Inventory> = {
	...Object.fromEntries(xItemTypes.map((item) => [item, 1])),
	...Object.fromEntries(evBoostItemTypes.map((item) => [item, 1])),
	...Object.fromEntries(ppRestorationItemTypes.map((item) => [item, 1])),
};

const merchants: Occupant[] = [
	{
		type: 'MERCHANT',
		id: 'market_1',
		x: 13,
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
		x: 13,
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
		x: 13,
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
		type: 'MERCHANT',
		id: 'battle_item_market',
		x: 14,
		y: 1,
		orientation: 'DOWN',
		sprite: SpriteEnum.clerkFemale,
		dialogue: ['My Market specialises in battle items'],
		inventory: battleItemMarket,
		conditionFunction: (s) => s.campUpgrades.battle_item_market,
	},
];

const rowanLine: Occupant[] = [
	{
		type: 'NPC',
		id: 'rowan_1',
		x: 5,
		y: 15,
		unhandledMessage: [
			'My name is Professor Rowan',
			'I have travelled all across the world',
			'to study pokemon',
			'It is important to encounter pokemon from all regions',
			'Can you catch one from Kanto',
		],
		handledMessage: ['How is the catching going'],
		quest: 'catch a pokemon orginally found in kanto',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor rowan'] &&
			s.quests['catch a pokemon orginally found in kanto'] !== 'COLLECTED',
		orientation: 'DOWN',
		sprite: SpriteEnum.rowan,
	},
	{
		type: 'NPC',
		id: 'rowan_2',
		x: 5,
		y: 15,
		unhandledMessage: ['Great', 'Next, my travels took me to johto'],
		handledMessage: ['How is the catching going'],
		quest: 'catch a pokemon orginally found in johto',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor rowan'] &&
			s.quests['catch a pokemon orginally found in kanto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in johto'] !== 'COLLECTED',
		orientation: 'DOWN',
		sprite: SpriteEnum.rowan,
	},
	{
		type: 'NPC',
		id: 'rowan_3',
		x: 5,
		y: 15,
		unhandledMessage: [
			'If you ever plan on going to hoenn',
			'you better bring a boat',
			'So much water ...',
		],
		handledMessage: ['How is the catching going'],
		quest: 'catch a pokemon orginally found in hoenn',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor rowan'] &&
			s.quests['catch a pokemon orginally found in kanto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in johto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in hoenn'] !== 'COLLECTED',
		orientation: 'DOWN',
		sprite: SpriteEnum.rowan,
	},
	{
		type: 'NPC',
		id: 'rowan_4',
		x: 5,
		y: 15,
		unhandledMessage: [
			'I once got lost in Mt. coronet for a week',
			'I did find some cranidos fossils though',
		],
		handledMessage: ['How is the catching going'],
		quest: 'catch a pokemon orginally found in sinnoh',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor rowan'] &&
			s.quests['catch a pokemon orginally found in kanto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in johto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in hoenn'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in sinnoh'] !== 'COLLECTED',
		orientation: 'DOWN',
		sprite: SpriteEnum.rowan,
	},
];
const mortyLine: Occupant[] = [
	{
		type: 'NPC',
		id: 'morty_1',
		x: 12,
		y: 7,
		orientation: 'LEFT',
		sprite: SpriteEnum.morty,
		unhandledMessage: [
			'I am Morty, a Gym Leader from Johto',
			'I have heard rumours',
			'about a very rare ghost pokemon,',
			'that is trapped in a ruin south of here',
			'Its a very odd tale',
			'A stone might be the key',
		],
		handledMessage: ['Did you find the rare ghost pokemon?'],
		quest: 'catch a spiritomb',
		gifts: { 'dusk-ball': 5 },
		conditionFunction: (s) =>
			s.campUpgrades['invite ghost expert morty'] &&
			s.quests['catch a spiritomb'] !== 'COLLECTED',
	},
	{
		type: 'NPC',
		id: 'morty_2',
		x: 12,
		y: 7,
		orientation: 'LEFT',
		sprite: SpriteEnum.morty,
		unhandledMessage: [
			'Great work with spiritomb',
			'Can i ask you to find out more',
			'about the ghost and dark pokemon of this region',
		],
		handledMessage: [
			'If you complete this quest',
			'I might stop by the training field',
			'and we can see who´s the better trainer',
			'Keep in mind, i am a gym leader back home',
			'So dont feel too bad if you loose',
		],
		quest: 'catch Haunter and Mightyena',
		gifts: { 'dusk-ball': 5 },
		conditionFunction: (s) =>
			s.campUpgrades['invite ghost expert morty'] &&
			s.quests['catch a spiritomb'] === 'COLLECTED',
	},
];
const trainingField: Occupant[] = [
	{
		type: 'OBSTACLE',
		x: 15,
		y: 0,
		src: '/mapObjects/statueTop.png',
		id: 'statue_1',
		conditionFunction: (s) => s.campUpgrades['training field 1'],
	},
	{
		type: 'OBSTACLE',
		x: 15,
		y: 1,
		src: '/mapObjects/statueBottom.png',
		id: 'statue_1',
		conditionFunction: (s) => s.campUpgrades['training field 1'],
	},
	{
		type: 'OBSTACLE',
		x: 17,
		y: 0,
		src: '/mapObjects/statueTop.png',
		id: 'statue_1',
		conditionFunction: (s) => s.campUpgrades['training field 1'],
	},
	{
		type: 'OBSTACLE',
		x: 17,
		y: 1,
		src: '/mapObjects/statueBottom.png',
		id: 'statue_1',
		conditionFunction: (s) => s.campUpgrades['training field 1'],
	},
	{
		type: 'TRAINING_FIELD_MASTER',
		x: 16,
		y: 1,
		orientation: 'DOWN',
		sprite: SpriteEnum.aceFemale,
		id: 'training_field_master',
		dialogue: [
			'Welcome to the training field',
			'Here you can challenge different trainers',
			'and improve your skills',
		],
		conditionFunction: (s) => s.campUpgrades['training field 1'],
	},
];

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
		gifts: { 'poke-ball': 20 },
		quest: 'catch a pokemon',
		sprite: SpriteEnum.oak,
		conditionFunction: (s) => s.quests['catch a pokemon'] !== 'COLLECTED',
	},
	{
		type: 'NPC',
		id: 'oak_2',
		x: 5,
		y: 4,
		orientation: 'DOWN',
		unhandledMessage: [
			'Great work',
			'Check the Bulletin board for more quests',
		],
		sprite: SpriteEnum.oak,
		conditionFunction: (s) => s.quests['catch a pokemon'] === 'COLLECTED',
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
		type: 'BERRY_FARMER',
		id: 'berry_farmer',
		x: 17,
		y: 10,
		orientation: 'LEFT',
		dialogue: ['We can grow all types of berries and apricorns'],
		sprite: SpriteEnum.farmer,
		conditionFunction: (s) => s.campUpgrades.berry_farm,
	},
	{
		type: 'COMBEE_HIVE',
		x: 17,
		y: 11,
		id: 'combee_hive',
		conditionFunction: (s) => s.campUpgrades['build combee hive'],
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
		type: 'ON_STEP_PORTAL',
		x: 10,
		y: 19,
		portal: {
			mapId: 'routeS1',
			x: 25,
			y: 1,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		id: 'camp_to_routeS1',
		conditionFunction: (s) => s.campUpgrades['access routeS1'],
	},
	{
		type: 'SIGN',
		x: 10,
		y: 19,
		dialogue: ['Route S1', 'No Access for inexperienced Researchers'],
		approachDirection: 'DOWN',
		id: 'routeS1Sign',
		conditionFunction: (s) => !s.campUpgrades['access routeS1'],
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
		type: 'BULLETIN_BOARD',
		id: 'camp_bulletin_board',
		x: 10,
		y: 10,
		approachDirection: 'UP',
		dialogue: ['Looking for new Quests ...'],
		conditionFunction: (s) => s.campUpgrades.bulletin_board,
	},
	{
		type: 'APRICORN_SMITH',
		sprite: SpriteEnum.kurt,
		x: 8,
		y: 13,
		orientation: 'UP',
		id: 'campUpgrade_kurt',
		dialogue: [
			'My name is kurt',
			'Professor Oak and I started out together',
			'I practice the ancient art',
			'of turning apricorns into pokeballs',
		],
		conditionFunction: (s) => s.campUpgrades['invite apricorn smith kurt'],
	},
	...merchants,
	...trainingField,
	...mortyLine,
	...rowanLine,
];
