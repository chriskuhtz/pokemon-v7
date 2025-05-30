import { Occupant, OverworldNpc } from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

const jasmineBase: Omit<
	OverworldNpc,
	'unhandledMessage' | 'conditionFunction' | 'id'
> = {
	x: 14,
	y: 3,
	orientation: 'DOWN',
	type: 'NPC',
	sprite: SpriteEnum.jasmine,
};

export const jasmineLine: Occupant[] = [
	{
		...jasmineBase,
		id: 'jasmine_1',

		unhandledMessage: [
			'Nice to meet you',
			'my name is jasmine',
			'the elegance of all steel pokemon fascinates me',
			'but some specimen are truly exceptional',
		],
		handledMessage: [
			'Steel pokemon combine sharpness and toughness',
			'like a good blade',
		],
		quest: 'catch an exceptional steel pokemon for jasmine',
		conditionFunction: (s) =>
			s.campUpgrades['invite steel pokemon expert jasmine'] &&
			s.quests['catch an exceptional steel pokemon for jasmine'] !==
				'COLLECTED',
	},
];
