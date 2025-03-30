import { Occupant, OverworldNpc } from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

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
export const elmLine: Occupant[] = [
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
