import { isBagOverloaded } from '../../../components/BagLimitBar/BagLimitBar';
import { dugtrioExplorers } from '../../../hooks/useDugtrioExplorers';
import { zigzagoonForagers } from '../../../hooks/useZigzagoonForagers';
import {
	Occupant,
	OverworldMap,
	OverworldNpc,
} from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';
import { amoongussCompostResearchers } from '../../../modules/AmoongussResearcher/AmoongussResearcher';
import { miltankFarm } from '../../../modules/MiltankFarm/MiltankFarm';
import { seedvaultResearcher } from '../../../modules/SeedVault/SeedVault';
import { vileplumeResearchers } from '../../../modules/VilePlumeScentResearcher/VilePlumeScentResearcher';

const oakBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 5,
	y: 3,
	orientation: 'DOWN',
	type: 'NPC',
	sprite: SpriteEnum.oak,
};
const oakLine: Occupant[] = [
	{
		...oakBase,
		id: 'oak_1',
		unhandledMessage: [
			'Ah, you made it',
			'Outside of the fence, the wild Kuma Region awaits',
			'If your Pokemon are hurt, talk to nurse joy',

			'There is some equipment for you in the storage chest',
			'but we cant rely on our limited supplies',
			'we must establish a self sufficient camp',
			'Camp Manager Kevin can help you with that',
		],
		handledMessage: [
			'Start exploring the area',
			'and prepare the camp for self sufficiency',
		],

		quest: 'catch a pokemon',
		conditionFunction: (s) => s.quests['catch a pokemon'] !== 'COLLECTED',
	},
	{
		...oakBase,
		id: 'oak_2',
		unhandledMessage: [
			'Well done',
			'To navigate the wilderness successfully',
			'It is important to train your pokemon',
		],
		handledMessage: ['Battle wild pokemon to grow stronger'],
		quest: 'evolve your starter pokemon',

		conditionFunction: (s) =>
			s.quests['catch a pokemon'] === 'COLLECTED' &&
			s.quests['evolve your starter pokemon'] !== 'COLLECTED',
	},
	{
		...oakBase,
		id: 'oak_3',
		unhandledMessage: [
			'Very impressive',
			'Your Pokemon should be able to evolve one more time',
		],
		handledMessage: ['Battle wild pokemon to grow stronger'],
		quest: 'evolve your starter pokemon to its final form',
		conditionFunction: (s) =>
			s.quests['catch a pokemon'] === 'COLLECTED' &&
			s.quests['evolve your starter pokemon'] === 'COLLECTED' &&
			s.quests['evolve your starter pokemon to its final form'] !== 'COLLECTED',
	},
	{
		...oakBase,
		id: 'oak_4',
		unhandledMessage: [
			'Great work',
			'Check the Bulletin board for more quests',
		],
		conditionFunction: (s) =>
			s.quests['catch a pokemon'] === 'COLLECTED' &&
			s.quests['evolve your starter pokemon'] === 'COLLECTED' &&
			s.quests['evolve your starter pokemon to its final form'] === 'COLLECTED',
	},
];

const rowanBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 4,
	y: 3,
	orientation: 'DOWN',
	type: 'NPC',
	sprite: SpriteEnum.rowan,
};
const rowanLine: Occupant[] = [
	{
		...rowanBase,
		id: 'rowan_1',

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
	},
	{
		...rowanBase,
		id: 'rowan_2',

		unhandledMessage: ['Great', 'Next, my travels took me to johto'],
		handledMessage: ['How is the catching going'],
		quest: 'catch a pokemon orginally found in johto',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor rowan'] &&
			s.quests['catch a pokemon orginally found in kanto'] === 'COLLECTED' &&
			s.quests['catch a pokemon orginally found in johto'] !== 'COLLECTED',
	},
	{
		...rowanBase,
		id: 'rowan_3',

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
	},
	{
		...rowanBase,
		id: 'rowan_4',

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
	},
	{
		...rowanBase,
		id: 'rowan_5',

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
	},
	{
		...rowanBase,
		id: 'rowan_6',

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
	},
	{
		...rowanBase,
		id: 'rowan_7',

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
	},
	{
		...rowanBase,
		id: 'rowan_8',

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
	},
	{
		...rowanBase,
		id: 'rowan_9',

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
	},
	{
		...rowanBase,
		id: 'rowan_10',

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
	},
	{
		...rowanBase,
		id: 'rowan_11',

		unhandledMessage: ['The Galar region also has some interesting variants'],
		handledMessage: ['How is the catching going'],
		quest: 'catch a pokemon and its galarian variant',
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
			s.quests['catch a pokemon and its alolan variant'] === 'COLLECTED' &&
			s.quests['catch a pokemon and its galarian variant'] !== 'COLLECTED',
	},
	{
		...rowanBase,
		id: 'rowan_12',

		unhandledMessage: [
			'The regional Hisui Pokemon branched off a long time ago',
		],
		handledMessage: ['How is the catching going'],
		quest: 'catch a pokemon and its hisui variant',
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
			s.quests['catch a pokemon and its alolan variant'] === 'COLLECTED' &&
			s.quests['catch a pokemon and its galarian variant'] === 'COLLECTED' &&
			s.quests['catch a pokemon and its hisui variant'] !== 'COLLECTED',
	},
	{
		...rowanBase,
		id: 'rowan_13',

		unhandledMessage: [
			'In Paldea, tauros has even split into multiple different species',
		],
		handledMessage: ['How is the catching going'],
		quest: 'catch a pokemon and its paldea variant',
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
			s.quests['catch a pokemon and its alolan variant'] === 'COLLECTED' &&
			s.quests['catch a pokemon and its galarian variant'] === 'COLLECTED' &&
			s.quests['catch a pokemon and its hisui variant'] === 'COLLECTED' &&
			s.quests['catch a pokemon and its paldea variant'] !== 'COLLECTED',
	},
];
const elmBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 6,
	y: 3,
	orientation: 'DOWN',
	type: 'NPC',
	sprite: SpriteEnum.elm,
};
const elmLine: Occupant[] = [
	{
		...elmBase,
		id: 'elm_1',

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
	},
	{
		...elmBase,
		id: 'elm_2',

		unhandledMessage: ['Some Pokemon evolve when exposed to rare stones'],
		handledMessage: ['Pokemon have different evolution methods'],
		quest: 'evolve a pokemon with a stone',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor elm'] &&
			s.quests['evolve a pokemon through level up'] === 'COLLECTED' &&
			s.quests['evolve a pokemon with a stone'] !== 'COLLECTED',
	},
	{
		...elmBase,
		id: 'elm_3',

		unhandledMessage: ['Some Pokemon need to hold an item to evolve'],
		handledMessage: ['Pokemon have different evolution methods'],
		quest: 'evolve a pokemon with a held item',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor elm'] &&
			s.quests['evolve a pokemon through level up'] === 'COLLECTED' &&
			s.quests['evolve a pokemon with a stone'] === 'COLLECTED' &&
			s.quests['evolve a pokemon with a held item'] !== 'COLLECTED',
	},
	{
		...elmBase,
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
	},
	{
		...elmBase,
		id: 'elm_5',

		unhandledMessage: [
			'Some Pokemon can evolve into different species',
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
	},
	{
		...elmBase,
		id: 'elm_6',

		unhandledMessage: ['Some Pokemon only evolve in the day time'],
		handledMessage: ['Pokemon have different evolution methods'],
		quest: 'evolve a pokemon that only evolves during the day',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor elm'] &&
			s.quests['evolve a pokemon through level up'] === 'COLLECTED' &&
			s.quests['evolve a pokemon with a stone'] === 'COLLECTED' &&
			s.quests['evolve a pokemon with a held item'] === 'COLLECTED' &&
			s.quests['evolve a pokemon through friendship'] === 'COLLECTED' &&
			s.quests['catch vileplume and bellosom'] === 'COLLECTED' &&
			s.quests['evolve a pokemon that only evolves during the day'] !==
				'COLLECTED',
	},
	{
		...elmBase,
		id: 'elm_7',

		unhandledMessage: ['Some Pokemon only evolve at night'],
		handledMessage: ['Pokemon have different evolution methods'],
		quest: 'evolve a pokemon that only evolves at night',
		conditionFunction: (s) =>
			s.campUpgrades['invite professor elm'] &&
			s.quests['evolve a pokemon through level up'] === 'COLLECTED' &&
			s.quests['evolve a pokemon with a stone'] === 'COLLECTED' &&
			s.quests['evolve a pokemon with a held item'] === 'COLLECTED' &&
			s.quests['evolve a pokemon through friendship'] === 'COLLECTED' &&
			s.quests['catch vileplume and bellosom'] === 'COLLECTED' &&
			s.quests['evolve a pokemon that only evolves during the day'] ===
				'COLLECTED' &&
			s.quests['evolve a pokemon that only evolves at night'] !== 'COLLECTED',
	},
];
const mortyBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 8,
	y: 3,
	orientation: 'DOWN',
	type: 'NPC',
	sprite: SpriteEnum.morty,
};
const mortyLine: Occupant[] = [
	{
		...mortyBase,
		id: 'morty_1',

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
		...mortyBase,
		id: 'morty_2',

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
		type: 'ROUTER_NPC',
		to: 'TRAINING_FIELD',
		x: 2,
		y: 16,
		orientation: 'RIGHT',
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
		type: 'NURSE',
		id: 'camp_nurse',
		x: 5,
		y: 5,
		orientation: 'UP',
		sprite: SpriteEnum.nurse,
		dialogue: ['Lets heal your Pokemon'],
		conditionFunction: () => true,
	},
	{
		type: 'POKEMON',
		id: 'camp_nurse_blissey',
		x: 6,
		y: 5,
		orientation: 'UP',
		dexId: 242,
		dialogue: ['Blissey is assisting Nurse Joy'],
		conditionFunction: () => true,
	},
	{
		type: 'ROUTER_NPC',
		to: 'CAMP_UPGRADES',
		id: 'camp_manager',
		x: 4,
		y: 5,
		orientation: 'UP',
		dialogue: ['How should we expand our camp?'],
		sprite: SpriteEnum.butler,
		conditionFunction: () => true,
	},
	{
		type: 'ROUTER_NPC',
		to: 'FARM',
		id: 'berry_farmer',
		x: 15,
		y: 17,
		orientation: 'UP',
		dialogue: ['We can grow all types of berries and apricorns'],
		sprite: SpriteEnum.farmer,
		conditionFunction: (s) => s.campUpgrades.berry_farm,
	},
	{
		type: 'COMBEE_HIVE',
		x: 16,
		y: 17,
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
		conditionFunction: (s) => !isBagOverloaded(s),
	},
	{
		type: 'NPC',
		x: 10,
		y: 0,
		unhandledMessage: [
			'You cant go out carrying this much stuff',
			'Store some items in your chest',
		],
		id: 'bag_blocker_1',
		sprite: SpriteEnum.scientistMale,
		orientation: 'DOWN',
		conditionFunction: (s) => isBagOverloaded(s),
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
		conditionFunction: (s) => !isBagOverloaded(s),
	},
	{
		type: 'NPC',
		x: 19,
		y: 10,
		unhandledMessage: [
			'You cant go out carrying this much stuff',
			'Store some items in your chest',
		],
		id: 'bag_blocker_E1',
		sprite: SpriteEnum.scientistFemale,
		orientation: 'LEFT',
		conditionFunction: (s) => isBagOverloaded(s),
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
		x: 8,
		y: 7,

		id: 'camp_pc',
		conditionFunction: () => true,
	},
	{
		type: 'STORAGE_CHEST',
		x: 9,
		y: 7,
		id: 'camp_storage',
		conditionFunction: () => true,
	},
	{
		type: 'BULLETIN_BOARD',
		id: 'camp_bulletin_board',
		x: 10,
		y: 7,
		approachDirection: 'UP',
		dialogue: ['Looking for new Quests ...'],
		conditionFunction: (s) => s.campUpgrades.bulletin_board,
	},
	{
		type: 'ROUTER_NPC',
		to: 'APRICORN_SMITHY',
		sprite: SpriteEnum.kurt,
		x: 3,
		y: 11,
		orientation: 'DOWN',
		id: 'campUpgrade_kurt',
		dialogue: [
			'My name is kurt',
			'I practice the ancient art',
			'of turning apricorns into pokeballs',
			'Each type of ball has a different specialty',
		],
		conditionFunction: (s) => s.campUpgrades['invite apricorn smith kurt'],
	},
	{
		type: 'ROUTER_NPC',
		to: 'FOSSIL_REVIVER',
		orientation: 'UP',
		y: 13,
		x: 3,
		dialogue: ['Fossils are fascinating', 'These Pokemon lived aeons ago'],
		sprite: SpriteEnum.grandFather,
		conditionFunction: (s) => s.campUpgrades['invite fossil expert'],
		id: 'fossil expert',
	},
	{
		type: 'ROUTER_NPC',
		to: 'CHEF_GRANDMA',
		orientation: 'DOWN',
		y: 11,
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
		type: 'ROUTER_NPC',
		to: 'CURATOR',
		orientation: 'UP',
		y: 13,
		x: 4,
		dialogue: [
			'I am from the pewter city museum',
			'i heard you discovered some items',
			'that might be worth displaying',
		],
		sprite: SpriteEnum.gentleman,
		conditionFunction: (s) => s.campUpgrades['invite museum curator'],
		id: 'curator',
	},
	{
		type: 'SWARM_RADAR',
		y: 7,
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
	...vileplumeResearchers,
	...amoongussCompostResearchers,
	...seedvaultResearcher,
];
