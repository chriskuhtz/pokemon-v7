import { makeRandomTeam } from '../../../functions/makeRandomTeam';
import {
	OverworldMap,
	OverworldTrainer,
} from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';
import { randomFieldId } from '../../gameData';

export const randomChallengeFieldOccupants: OverworldMap['occupants'] = [
	{
		type: 'NPC',
		sprite: SpriteEnum.aceFemale,
		x: 1,
		y: 1,
		id: 'challengeField_explainer',
		orientation: 'RIGHT',
		conditionFunction: () => true,
		unhandledMessage: [
			'Welcome to the challenge field',
			'Rule 1:',
			'If you beat a trainer,you can progress',
			'Rule 2:',
			'These trainers use random pokemon and each one is stronger than the next',
			'Rule 3:',
			'you dont get to keep any items you find',
			'so dont hesitate to use them',
			'Rule 4:',
			'You can always leave through the main menu',
		],
	},
	...Array.from({ length: 100 }).map((_, index) => {
		const x = () => {
			const offset = Math.floor(index / 9) * 4;
			return 2 + offset;
		};
		const y = () => {
			const offset = Math.floor(index / 9);

			const factor = index - 9 * offset;
			return 4 + 4 * factor;
		};

		const ori = [2, 10, 18, 26, 34, 42].includes(x()) ? 'UP' : 'DOWN';

		const challengeFieldRank =
			ori === 'UP' ? 1 + index : 10 + Math.floor((9 * (x() - 2)) / 4 - y() / 4);

		const factor = challengeFieldRank;
		const xp = factor * factor * factor;
		const id = `${randomFieldId}_${challengeFieldRank}`;

		const assembled: OverworldTrainer = {
			type: 'TRAINER',
			x: x(),
			y: y(),
			orientation: ori,
			id,
			battleTeamConfig: {
				assignGender: true,
				assignHeldItem: false,
				assignLearnsetMoves: true,
				assignNaturalAbility: true,
			},
			conditionFunction: (s) => !s.handledOccupants.some((h) => h.id === id),
			sprite: Object.values(SpriteEnum)[index],
			unhandledMessage: ['.', '..', '...'],
			team: () => makeRandomTeam({ xp }),
			challengeFieldRank,
		};
		return assembled;
	}),
	{
		type: 'ITEM',
		x: 1,
		y: 39,
		id: `${randomFieldId}_item1`,
		item: 'super-potion',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${randomFieldId}_item1`),
	},
	{
		type: 'ITEM',
		x: 2,
		y: 39,
		id: `${randomFieldId}_item2`,
		item: 'sitrus-berry',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${randomFieldId}_item2`),
	},
	{
		type: 'ITEM',
		x: 3,
		y: 39,
		id: `${randomFieldId}_item3`,
		item: 'lum-berry',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${randomFieldId}_item3`),
	},
	{
		type: 'ITEM',
		x: 9,
		y: 39,
		id: `${randomFieldId}_item4`,
		item: 'moomoo-milk',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${randomFieldId}_item4`),
	},
	{
		type: 'ITEM',
		x: 10,
		y: 39,
		id: `${randomFieldId}_item5`,
		item: 'elixir',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${randomFieldId}_item5`),
	},
	{
		type: 'ITEM',
		x: 11,
		y: 39,
		id: `${randomFieldId}_item6`,
		item: 'lum-berry',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${randomFieldId}_item6`),
	},
	{
		type: 'ITEM',
		x: 17,
		y: 39,
		id: `${randomFieldId}_item7`,
		item: 'full-restore',
		amount: 3,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${randomFieldId}_item7`),
	},
	{
		type: 'ITEM',
		x: 18,
		y: 39,
		id: `${randomFieldId}_item8`,
		item: 'sitrus-berry',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${randomFieldId}_item8`),
	},
	{
		type: 'ITEM',
		x: 19,
		y: 39,
		id: `${randomFieldId}_item9`,
		item: 'elixir',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${randomFieldId}_item9`),
	},
	{
		type: 'ITEM',
		x: 25,
		y: 39,
		id: `${randomFieldId}_item10`,
		item: 'full-restore',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${randomFieldId}_item10`),
	},
	{
		type: 'ITEM',
		x: 26,
		y: 39,
		id: `${randomFieldId}_item11`,
		item: 'sitrus-berry',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${randomFieldId}_item11`),
	},
	{
		type: 'ITEM',
		x: 27,
		y: 39,
		id: `${randomFieldId}_item9`,
		item: 'elixir',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${randomFieldId}_item12`),
	},
];
