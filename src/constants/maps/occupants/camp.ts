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
import { dragoniteTaxi } from '../../../modules/DragoniteTaxi/DragoniteTaxi';
import { miltankFarm } from '../../../modules/MiltankFarm/MiltankFarm';
import { seedvaultResearcher } from '../../../modules/SeedVault/SeedVault';
import { vileplumeResearchers } from '../../../modules/VilePlumeScentResearcher/VilePlumeScentResearcher';
import { elmLine } from './elmLine';
import { falknerLine } from './falknerLine';
import { mortyLine } from './mortyLine';
import { pikachuFanLine } from './pikachuFanLine';
import { rowanLine } from './rowanLine';

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
	{
		type: 'ROUTER_NPC',
		to: 'MOVE_TUTOR',
		x: 2,
		y: 17,
		orientation: 'RIGHT',
		sprite: SpriteEnum.aceMale,
		id: 'move_tutor',
		dialogue: [
			'I can teach your Pokemon new moves',
			'But I expect some snacks as payment',
		],
		conditionFunction: (s) => s.campUpgrades['invite move tutor'],
	},
];

export const campOccupants: OverworldMap['occupants'] = [
	{
		type: 'NURSE',
		id: 'camp_nurse',
		x: 6,
		y: 3,
		orientation: 'DOWN',
		sprite: SpriteEnum.nurse,
		dialogue: ['Lets heal your Pokemon'],
		conditionFunction: () => true,
	},
	{
		type: 'POKEMON',
		id: 'camp_nurse_blissey',
		x: 7,
		y: 3,
		orientation: 'DOWN',
		dexId: 242,
		dialogue: ['Blissey is assisting Nurse Joy'],
		conditionFunction: () => true,
	},
	{
		type: 'ROUTER_NPC',
		to: 'CAMP_UPGRADES',
		id: 'camp_manager',
		x: 6,
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
		type: 'ON_STEP_PORTAL',
		x: 0,
		y: 10,
		portal: {
			mapId: 'routeW1',
			x: 49,
			y: 25,
			orientation: 'LEFT',
			forwardFoot: 'CENTER1',
		},
		id: 'camp_to_routeW1',
		conditionFunction: (s) => !isBagOverloaded(s),
	},
	{
		type: 'NPC',
		x: 0,
		y: 10,
		unhandledMessage: [
			'You cant go out carrying this much stuff',
			'Store some items in your chest',
		],
		id: 'bag_blocker_W1',
		sprite: SpriteEnum.scientistMale,
		orientation: 'RIGHT',
		conditionFunction: (s) => isBagOverloaded(s),
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
		sprite: SpriteEnum.roark,
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
	...pikachuFanLine,
	...falknerLine,
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
	...dragoniteTaxi,
];
