import { Occupant, OverworldNpc } from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

const chuckBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 11,
	y: 3,
	orientation: 'DOWN',
	type: 'NPC',
	sprite: SpriteEnum.chuck,
};

export const chuckLine: Occupant[] = [
	{
		...chuckBase,
		id: 'chuck_2',
		unhandledMessage: [
			'My Name is Chuck',
			'My Pokemon and I eat 7000 calories per day',
			'Then we hit the gym together',
		],
		handledMessage: ['Do you even lift?'],
		quest: 'deal 50 damage with one attack',
		conditionFunction: (s) =>
			s.campUpgrades['invite fighting expert chuck'] &&
			s.quests['deal 50 damage with one attack'] !== 'COLLECTED',
	},
	{
		...chuckBase,
		id: 'chuck_3',
		unhandledMessage: ['Lets hit an even hundo'],
		handledMessage: ['Do you even lift?'],
		quest: 'deal 100 damage with one attack',
		conditionFunction: (s) =>
			s.campUpgrades['invite fighting expert chuck'] &&
			s.quests['deal 50 damage with one attack'] === 'COLLECTED' &&
			s.quests['deal 100 damage with one attack'] !== 'COLLECTED',
	},
	{
		...chuckBase,
		id: 'chuck_4',
		unhandledMessage: ['Getting impressive, dawg'],
		handledMessage: ['Do you even lift?'],
		quest: 'deal 200 damage with one attack',
		conditionFunction: (s) =>
			s.campUpgrades['invite fighting expert chuck'] &&
			s.quests['deal 100 damage with one attack'] === 'COLLECTED' &&
			s.quests['deal 200 damage with one attack'] !== 'COLLECTED',
	},
	{
		...chuckBase,
		id: 'chuck_5',
		unhandledMessage: ['Most Trainers never reach this damage output'],
		handledMessage: ['Do you even lift?'],
		quest: 'deal 500 damage with one attack',
		conditionFunction: (s) =>
			s.campUpgrades['invite fighting expert chuck'] &&
			s.quests['deal 200 damage with one attack'] === 'COLLECTED' &&
			s.quests['deal 500 damage with one attack'] !== 'COLLECTED',
	},
	{
		...chuckBase,
		id: 'chuck_6',
		unhandledMessage: ['Only the elite few deal 4 digit damage'],
		handledMessage: ['Do you even lift?'],
		quest: 'deal 1000 damage with one attack',
		conditionFunction: (s) =>
			s.campUpgrades['invite fighting expert chuck'] &&
			s.quests['deal 500 damage with one attack'] === 'COLLECTED' &&
			s.quests['deal 1000 damage with one attack'] !== 'COLLECTED',
	},
	{
		...chuckBase,
		id: 'chuck_7',
		unhandledMessage: ['Increasing your own stats is key'],
		handledMessage: ['Do you even lift?'],
		quest: 'deal 2000 damage with one attack',
		conditionFunction: (s) =>
			s.campUpgrades['invite fighting expert chuck'] &&
			s.quests['deal 1000 damage with one attack'] === 'COLLECTED' &&
			s.quests['deal 2000 damage with one attack'] !== 'COLLECTED',
	},
	{
		...chuckBase,
		id: 'chuck_8',
		unhandledMessage: [
			'Decreasing the Enemies defense is valid',
			'But i like to rely on attack strength',
		],
		handledMessage: ['Do you even lift?'],
		quest: 'deal 5000 damage with one attack',
		conditionFunction: (s) =>
			s.campUpgrades['invite fighting expert chuck'] &&
			s.quests['deal 2000 damage with one attack'] === 'COLLECTED' &&
			s.quests['deal 5000 damage with one attack'] !== 'COLLECTED',
	},
	{
		...chuckBase,
		id: 'chuck_9',
		unhandledMessage: ['Can we get over 9000, big dawg?'],
		handledMessage: ['Do you even lift?'],
		quest: 'deal 10000 damage with one attack',
		conditionFunction: (s) =>
			s.campUpgrades['invite fighting expert chuck'] &&
			s.quests['deal 5000 damage with one attack'] === 'COLLECTED' &&
			s.quests['deal 10000 damage with one attack'] !== 'COLLECTED',
	},
];
