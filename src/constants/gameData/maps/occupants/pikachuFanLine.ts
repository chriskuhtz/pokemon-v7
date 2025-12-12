import { OverworldNpc, Occupant } from '../../../../interfaces/Occupant';
import { SpriteEnum } from '../../../../interfaces/SpriteEnum';

const pikachuFanBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 30,
	y: 6,
	orientation: 'LEFT',
	type: 'NPC',
	sprite: SpriteEnum.pikachuFan,
};

export const pikachuFanLine: Occupant[] = [
	{
		...pikachuFanBase,
		id: 'pikachuFan_1',

		unhandledMessage: [
			'Can you guess my favorite Pokemon?',
			'Its Bidoof',
			'Just kidding',
		],
		handledMessage: ['Pika Pika'],
		quest: 'catch a pikachu',
		conditionFunction: (s) =>
			s.campUpgrades['invite pikachu fan'] &&
			s.quests['catch a pikachu'] !== 'COLLECTED',
	},
	{
		...pikachuFanBase,
		id: 'pikachuFan_2',

		unhandledMessage: [
			'sometimes',
			'pikachu holds a rare item',
			'that makes it much stronger',
		],
		handledMessage: [
			'sometimes',
			'pikachu holds a rare item',
			'that makes it much stronger',
		],
		quest: 'find a lightball',
		conditionFunction: (s) =>
			s.campUpgrades['invite pikachu fan'] &&
			s.quests['catch a pikachu'] === 'COLLECTED' &&
			s.quests['find a lightball'] !== 'COLLECTED',
	},
	{
		...pikachuFanBase,
		id: 'pikachuFan_3',

		unhandledMessage: [
			'There are many pokemon that look similar to pikachu',
			'they are also cute',
			'can you catch them all?',
		],
		handledMessage: [
			'There are many pokemon that look similar to pikachu',
			'they are also cute',
			'can you catch them all?',
		],
		quest: 'catch all mouselike electric pokemon',
		conditionFunction: (s) =>
			s.campUpgrades['invite pikachu fan'] &&
			s.quests['catch a pikachu'] === 'COLLECTED' &&
			s.quests['catch all mouselike electric pokemon'] !== 'COLLECTED',
	},
	{
		...pikachuFanBase,
		id: 'pikachuFan_4',

		unhandledMessage: ['On my way here', 'I saw a pikachu with a hat'],
		handledMessage: ['On my way here', 'I saw a pikachu with a hat'],
		quest: 'catch all pikachus with hats',
		conditionFunction: (s) =>
			s.campUpgrades['invite pikachu fan'] &&
			s.quests['catch a pikachu'] === 'COLLECTED' &&
			s.quests['find a lightball'] === 'COLLECTED' &&
			s.quests['catch all mouselike electric pokemon'] === 'COLLECTED' &&
			s.quests['catch all pikachus with hats'] !== 'COLLECTED',
	},
	{
		...pikachuFanBase,
		id: 'pikachuFan_5',

		unhandledMessage: ['Some pikachu even put on complete costumes'],
		handledMessage: ['Some pikachu even put on complete costumes'],
		quest: 'catch all costumed pikachus',
		conditionFunction: (s) =>
			s.campUpgrades['invite pikachu fan'] &&
			s.quests['catch a pikachu'] === 'COLLECTED' &&
			s.quests['find a lightball'] === 'COLLECTED' &&
			s.quests['catch all mouselike electric pokemon'] === 'COLLECTED' &&
			s.quests['catch all pikachus with hats'] === 'COLLECTED' &&
			s.quests['catch all costumed pikachus'] !== 'COLLECTED',
	},
];
