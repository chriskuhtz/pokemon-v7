import { Occupant, OverworldMap } from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

const oakLine: Occupant[] = [
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

			'Here are some pokeballs to get you started',
			'but we cant rely on our limited supplies',
			'we must establish a self sufficient camp',
			'Camp Manager Kevin can help you with that',
		],
		handledMessage: [
			'Start exploring the area',
			'and prepare the camp for self sufficiency',
		],
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
			s.quests['catch a pokemon orginally found in galar'] !== 'COLLECTED',
		orientation: 'DOWN',
		sprite: SpriteEnum.rowan,
	},
	{
		type: 'NPC',
		id: 'rowan_9',
		x: 5,
		y: 15,
		unhandledMessage: ['Paldea Region uniquely combines future and past'],
		handledMessage: ['How is the catching going'],
		quest: 'catch a pokemon orginally found in paldea',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor rowan'] &&
			s.quests['catch a pokemon orginally found in kanto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in johto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in hoenn'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in sinnoh'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in unova'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in kalos'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in alola'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in galar'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in paldea'] !== 'COLLECTED',
		orientation: 'DOWN',
		sprite: SpriteEnum.rowan,
	},
	{
		type: 'NPC',
		id: 'rowan_10',
		x: 5,
		y: 15,
		unhandledMessage: [
			'Some pokemon have evolved over time',
			'in order to adjust to their environment',
			'The Alolan Isles have many examples of this',
		],
		handledMessage: ['How is the catching going'],
		quest: 'catch a pokemon and its alolan variant',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor rowan'] &&
			s.quests['catch a pokemon orginally found in kanto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in johto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in hoenn'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in sinnoh'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in unova'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in kalos'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in alola'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in galar'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in paldea'] === 'COLLECTED' &&
			s.quests['catch a pokemon and its alolan variant'] !== 'COLLECTED',
		orientation: 'DOWN',
		sprite: SpriteEnum.rowan,
	},
];
const elmLine: Occupant[] = [
	{
		type: 'NPC',
		id: 'elm_1',
		x: 6,
		y: 15,
		unhandledMessage: [
			'I am Professor Elm',
			'Professor Oak was my Teacher',
			'I have always been fascinated by pokemon evolution',
			'can you help me find out more',
		],
		handledMessage: ['Pokemon have different evolution methods'],
		quest: 'evolve a pokemon through level up',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor elm'] &&
			s.quests['evolve a pokemon through level up'] !== 'COLLECTED',
		orientation: 'DOWN',
		sprite: SpriteEnum.elm,
	},
	{
		type: 'NPC',
		id: 'elm_2',
		x: 6,
		y: 15,
		unhandledMessage: ['Some Pokemon evolve when exposed to rare stones'],
		handledMessage: ['Pokemon have different evolution methods'],
		quest: 'evolve a pokemon with a stone',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor elm'] &&
			s.quests['evolve a pokemon through level up'] === 'COLLECTED' &&
			s.quests['evolve a pokemon with a stone'] !== 'COLLECTED',
		orientation: 'DOWN',
		sprite: SpriteEnum.elm,
	},
	{
		type: 'NPC',
		id: 'elm_3',
		x: 6,
		y: 15,
		unhandledMessage: ['Some Pokemon need to hold an item to evolve'],
		handledMessage: ['Pokemon have different evolution methods'],
		quest: 'evolve a pokemon with a held item',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor elm'] &&
			s.quests['evolve a pokemon through level up'] === 'COLLECTED' &&
			s.quests['evolve a pokemon with a stone'] === 'COLLECTED' &&
			s.quests['evolve a pokemon with a held item'] !== 'COLLECTED',
		orientation: 'DOWN',
		sprite: SpriteEnum.elm,
	},
	{
		type: 'NPC',
		id: 'elm_4',
		x: 6,
		y: 15,
		unhandledMessage: [
			'Some Pokemon only evolve if you become good friends with them',
		],
		handledMessage: ['Pokemon have different evolution methods'],
		quest: 'evolve a pokemon through friendship',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor elm'] &&
			s.quests['evolve a pokemon through level up'] === 'COLLECTED' &&
			s.quests['evolve a pokemon with a stone'] === 'COLLECTED' &&
			s.quests['evolve a pokemon with a held item'] === 'COLLECTED' &&
			s.quests['evolve a pokemon through friendship'] !== 'COLLECTED',
		orientation: 'DOWN',
		sprite: SpriteEnum.elm,
	},
	{
		type: 'NPC',
		id: 'elm_5',
		x: 6,
		y: 15,
		unhandledMessage: [
			'Some Pokemon can evolve into different options',
			'Oddish, for example, evolves into gloom',
			'but gloom can take different paths',
		],
		handledMessage: ['Pokemon have different evolution methods'],
		quest: 'catch vileplume and bellosom',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor elm'] &&
			s.quests['evolve a pokemon through level up'] === 'COLLECTED' &&
			s.quests['evolve a pokemon with a stone'] === 'COLLECTED' &&
			s.quests['evolve a pokemon with a held item'] === 'COLLECTED' &&
			s.quests['evolve a pokemon through friendship'] === 'COLLECTED' &&
			s.quests['catch vileplume and bellosom'] !== 'COLLECTED',
		orientation: 'DOWN',
		sprite: SpriteEnum.elm,
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
		type: 'ROUTER_NPC',
		to: 'TRAINING_FIELD',
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
		type: 'ROUTER_NPC',
		to: 'MILTANK_FARM',
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
		conditionFunction: (s) => s.campUpgrades['invite zigzagoon foragers'],
	},
	{
		type: 'ZIGZAGOON_FORAGER',
		dexId: 263,
		x: 13,
		y: 1,
		orientation: 'DOWN',
		id: 'ziggie',
		conditionFunction: (s) => s.campUpgrades['invite zigzagoon foragers'],
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
		conditionFunction: (s) => s.campUpgrades['invite dugtrio explorers'],
	},
	{
		type: 'DUGTRIO_EXPLORER',
		dexId: 51,
		x: 18,
		y: 6,
		orientation: 'LEFT',
		id: 'triotrio',
		conditionFunction: (s) => s.campUpgrades['invite dugtrio explorers'],
	},
];

export const campOccupants: OverworldMap['occupants'] = [
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
		id: 'camp_nurse_blissey',
		x: 7,
		y: 4,
		orientation: 'DOWN',
		dexId: 242,
		dialogue: ['Blissey is assisting Nurse Joy'],
		conditionFunction: () => true,
	},
	{
		type: 'ROUTER_NPC',
		to: 'CAMP_UPGRADES',
		id: 'camp_manager',
		x: 4,
		y: 4,
		orientation: 'DOWN',
		dialogue: ['How should we expand our camp?'],
		sprite: SpriteEnum.butler,
		conditionFunction: () => true,
	},
	{
		type: 'ROUTER_NPC',
		to: 'FARM',
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
		x: 19,
		y: 10,
		portal: {
			mapId: 'routeE1',
			x: 1,
			y: 25,
			orientation: 'RIGHT',
			forwardFoot: 'CENTER1',
		},
		id: 'camp_to_routeE1',
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
		type: 'ROUTER_NPC',
		to: 'APRICORN_SMITHY',
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
	{
		type: 'ROUTER_NPC',
		to: 'FOSSIL_REVIVER',
		orientation: 'UP',
		y: 18,
		x: 3,
		dialogue: ['Fossils are fascinating', 'These Pokemon lived aeons ago'],
		sprite: SpriteEnum.grandFather,
		conditionFunction: (s) => s.campUpgrades['invite fossil expert'],
		id: 'fossil expert',
	},
	{
		type: 'ROUTER_NPC',
		to: 'CHEF_GRANDMA',
		orientation: 'UP',
		y: 18,
		x: 4,
		dialogue: [
			'Some Berries are not very useful raw',
			'but they are still good ingredients',
		],
		sprite: SpriteEnum.grandma,
		conditionFunction: (s) => s.campUpgrades['invite chef grandma'],
		id: 'chef grandma',
	},
	{
		type: 'SWARM_RADAR',
		y: 10,
		x: 11,
		conditionFunction: (s) => s.campUpgrades['pokemon swarm radar'],
		id: 'swarm radar',
	},
	...oakLine,
	...trainingField,
	...mortyLine,
	...rowanLine,
	...elmLine,
	...miltankFarm,
	...zigzagoonForagers,
	...dugtrioExplorers,
];
