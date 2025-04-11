import { Occupant, OverworldNpc } from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

const pikachuFanBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 11,
	y: 3,
	orientation: 'DOWN',
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
];
