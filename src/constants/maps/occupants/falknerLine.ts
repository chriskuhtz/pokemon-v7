import { Occupant, OverworldNpc } from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

const falknerBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 9,
	y: 3,
	orientation: 'DOWN',
	type: 'NPC',
	sprite: SpriteEnum.falkner,
};
export const falknerLine: Occupant[] = [
	{
		...falknerBase,
		id: 'falkner_1',

		unhandledMessage: [
			'My name is falkner, from violet city',
			'My favorite pokemon are flying types',
			'they soar through the air with complete freedom',
			'lets find out more about them',
		],
		handledMessage: ['Weaker flying pokemon can be shy'],
		quest: 'catch some local flying pokemon',
		conditionFunction: (s) =>
			s.campUpgrades['invite flying pokemon expert falkner'] &&
			s.quests['catch some local flying pokemon'] !== 'COLLECTED',
	},
	{
		...falknerBase,
		id: 'falkner_2',

		unhandledMessage: [
			'Great work',
			'I think some of these pokemon can evolve',
		],
		handledMessage: ['I wish i could fly'],
		quest: 'evolve some local flying pokemon',
		conditionFunction: (s) =>
			s.quests['catch some local flying pokemon'] === 'COLLECTED' &&
			s.quests['evolve some local flying pokemon'] !== 'COLLECTED',
	},
	{
		...falknerBase,
		id: 'falkner_3',
		unhandledMessage: [
			'Pidgeotto and Staravia can both evolve one more time',
			'can you train one of them to their final form?',
		],
		handledMessage: ['I wish i could fly'],
		quest: 'evolve a flying pokemon to its final stage',
		conditionFunction: (s) =>
			s.quests['evolve some local flying pokemon'] === 'COLLECTED' &&
			s.quests['evolve a flying pokemon to its final stage'] !== 'COLLECTED',
	},
	{
		...falknerBase,
		id: 'falkner_4',
		unhandledMessage: [
			'Now I believe you are strong enough for a secret',
			'I came here to find a legendary flying pokemon',
			'The myths refer to it as the bird of ice',
			'More modern sources say,',
			'That it sometimes reveals itself to strong flying trainers',
		],
		handledMessage: [
			'Now I believe you are strong enough for a secret',
			'I came here to find a legendary flying pokemon',
			'The myths refer to it as the bird of ice',
			'More modern sources say,',
			'That it sometimes reveals itself to strong flying trainers',
		],
		quest: 'catch the legendary bird of ice',
		conditionFunction: (s) =>
			s.quests['evolve some local flying pokemon'] === 'COLLECTED' &&
			s.quests['evolve a flying pokemon to its final stage'] === 'COLLECTED' &&
			s.quests['catch the legendary bird of ice'] !== 'COLLECTED',
	},
];
