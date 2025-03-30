import { OverworldNpc, Occupant } from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

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

export const mortyLine: Occupant[] = [
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
