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
];
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
		type: 'SIGN',
		x: 25,
		y: 50,
		dialogue: ['No Access', 'Ongoing development'],
		approachDirection: 'UP',
		conditionFunction: () => true,
		id: 'development stopper',
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
		y: 5,
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
];
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
		id: 'routeN1E1_to_routeS1E1',
	},
];
export const routeS1E1Occupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		x: 25,
		y: 0,
		portal: {
			mapId: 'routeE1',
			x: 25,
			y: 49,
			orientation: 'UP',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1E1_to_routeE1',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 0,
		y: 25,
		portal: {
			mapId: 'routeS1',
			y: 25,
			x: 49,
			orientation: 'LEFT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1E1_to_routeS1',
	},
];
export const routeS1Occupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		x: 50,
		y: 25,
		portal: {
			mapId: 'routeS1E1',
			x: 1,
			y: 25,
			orientation: 'RIGHT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1_to_routeS1E1',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 0,
		y: 25,
		portal: {
			mapId: 'routeS1W1',
			y: 25,
			x: 49,
			orientation: 'LEFT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1_to_routeS1W1',
	},
];
export const routeS1W1Occupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		x: 25,
		y: 0,
		portal: {
			mapId: 'routeW1',
			x: 25,
			y: 49,
			orientation: 'UP',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1W1_to_routeW1',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 50,
		y: 25,
		portal: {
			mapId: 'routeS1',
			y: 25,
			x: 1,
			orientation: 'RIGHT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1W1_to_routeS1',
	},
];
export const routeW1Occupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		x: 25,
		y: 0,
		portal: {
			mapId: 'routeN1W1',
			x: 25,
			y: 49,
			orientation: 'UP',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeW1_to_routeN1W1',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 25,
		y: 50,
		portal: {
			mapId: 'routeS1W1',
			y: 1,
			x: 25,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeN1W1_to_routeS1W1',
	},
];
export const routeN1W1Occupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		x: 25,
		y: 50,
		portal: {
			mapId: 'routeW1',
			x: 25,
			y: 1,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeN1W1_to_routeW1',
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
	{
		type: 'NPC',
		id: 'rowan_5',
		x: 5,
		y: 15,
		unhandledMessage: [
			'Even though most of Unova is one big city',
			'there are still interesting pokemon to be found',
		],
		handledMessage: ['How is the catching going'],
		quest: 'catch a pokemon orginally found in unova',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor rowan'] &&
			s.quests['catch a pokemon orginally found in kanto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in johto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in hoenn'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in sinnoh'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in unova'] !== 'COLLECTED',
		orientation: 'DOWN',
		sprite: SpriteEnum.rowan,
	},
	{
		type: 'NPC',
		id: 'rowan_6',
		x: 5,
		y: 15,
		unhandledMessage: [
			'In Kalos, trainers use special stones',
			'To make their pokemon even stronger',
		],
		handledMessage: ['How is the catching going'],
		quest: 'catch a pokemon orginally found in kalos',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor rowan'] &&
			s.quests['catch a pokemon orginally found in kanto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in johto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in hoenn'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in sinnoh'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in unova'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in kalos'] !== 'COLLECTED',
		orientation: 'DOWN',
		sprite: SpriteEnum.rowan,
	},
	{
		type: 'NPC',
		id: 'rowan_7',
		x: 5,
		y: 15,
		unhandledMessage: [
			'The alola region is always worth a visit',
			'So many fascinating pokemon',
		],
		handledMessage: ['How is the catching going'],
		quest: 'catch a pokemon orginally found in alola',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor rowan'] &&
			s.quests['catch a pokemon orginally found in kanto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in johto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in hoenn'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in sinnoh'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in unova'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in kalos'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in alola'] !== 'COLLECTED',
		orientation: 'DOWN',
		sprite: SpriteEnum.rowan,
	},
	{
		type: 'NPC',
		id: 'rowan_8',
		x: 5,
		y: 15,
		unhandledMessage: [
			'The best tea comes from galar',
			'They even have a pokemon that resembles a teacup',
		],
		handledMessage: ['How is the catching going'],
		quest: 'catch a pokemon orginally found in galar',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor rowan'] &&
			s.quests['catch a pokemon orginally found in kanto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in johto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in hoenn'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in sinnoh'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in unova'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in kalos'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in alola'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in galar'] === 'COLLECTED',
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
const miltankFarm: Occupant[] = [
	{
		type: 'MILTANK_FARMER',
		dialogue: [
			'All Pokemon seem to enjoy Miltank milk',
			'And miltank love to eat berries',
			'we can trade',
		],
		x: 4,
		y: 1,
		orientation: 'DOWN',
		sprite: SpriteEnum.cowgirl,
		id: 'miltank_farmer',
		conditionFunction: (s) => s.campUpgrades['build miltank farm'],
	},
	{
		type: 'POKEMON',
		dexId: 241,
		dialogue: ['Muuh'],
		x: 5,
		y: 1,
		orientation: 'DOWN',
		id: 'miltank',
		conditionFunction: (s) => s.campUpgrades['build miltank farm'],
	},
];
const zigzagoonForagers: Occupant[] = [
	{
		type: 'NPC',
		unhandledMessage: [
			'My zigzagoon loves moomoo milk',
			'if you give him some',
			'He will zoom off',
			'and come back with an item',
			'I dont ask where he finds them',
		],
		gifts: { 'moomoo-milk': 3 },
		x: 14,
		y: 1,
		orientation: 'DOWN',
		sprite: SpriteEnum.bugCatcher,
		id: 'zigzagoon trainer',
		conditionFunction: (s) => s.campUpgrades['hire zigzagoon foragers'],
	},
	{
		type: 'ZIGZAGOON_FORAGER',
		dexId: 263,
		x: 13,
		y: 1,
		orientation: 'DOWN',
		id: 'ziggie',
		conditionFunction: (s) => s.campUpgrades['hire zigzagoon foragers'],
	},
];
const dugtrioExplorers: Occupant[] = [
	{
		type: 'NPC',
		unhandledMessage: [
			'Dugtrio is lightning fast underground',
			'and finds really rare items',
			'just feed each head some honey',
			'and watch them dig',
		],
		gifts: { honey: 3 },
		x: 18,
		y: 5,
		orientation: 'LEFT',
		sprite: SpriteEnum.explorer,
		id: 'dugtrio trainer',
		conditionFunction: (s) => s.campUpgrades['hire dugtrio explorers'],
	},
	{
		type: 'DUGTRIO_EXPLORER',
		dexId: 51,
		x: 18,
		y: 6,
		orientation: 'LEFT',
		id: 'triotrio',
		conditionFunction: (s) => s.campUpgrades['hire dugtrio explorers'],
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
		type: 'POKEMON',
		id: 'camp_nurse',
		x: 7,
		y: 4,
		orientation: 'DOWN',
		dexId: 242,
		dialogue: ['Blissey is assisting Nurse Joy'],
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
		type: 'SIGN',
		x: 11,
		y: 1,
		dialogue: [`Akai Route, beware of wild pokemon`],
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
	...trainingField,
	...mortyLine,
	...rowanLine,
	...miltankFarm,
	...zigzagoonForagers,
	...dugtrioExplorers,
];
