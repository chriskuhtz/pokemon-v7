import { trainersWeakToStrong } from '../../../functions/makeRandomTrainer';
import {
	OverworldMap,
	OverworldTrainer,
} from '../../../interfaces/OverworldMap';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';
import { challengeFieldId } from '../../gameData';

export const challengeFieldOccupants: OverworldMap['occupants'] = [
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
			'you dont get to keep any items you find',
			'so dont hesitate to use them',
			'Rule 3:',
			'You can always leave through the main menu',
		],
	},
	...trainersWeakToStrong.map((t, index) => {
		const id = `${challengeFieldId}_${t.id}`;

		const x = () => {
			const offset = Math.floor(index / 9) * 4;
			return 2 + offset;
		};
		const y = () => {
			const offset = Math.floor(index / 9);

			const factor = index - 9 * offset;
			return 4 + 4 * factor;
		};

		const assembled: OverworldTrainer = {
			type: 'TRAINER',
			x: x(),
			y: y(),
			orientation: [2, 10, 18, 26, 34, 42].includes(x()) ? 'UP' : 'DOWN',
			id,
			conditionFunction: (s) =>
				!s.handledOccupants.some((h) => h.id === id) &&
				(!t.requiredUpgrade || s.campUpgrades[t.requiredUpgrade]),
			sprite: t.trainer?.sprite ?? SpriteEnum.aceMale,
			name: id,
			unhandledMessage: ['.', '..', '...'],
			team: t.team,
			challengeFieldRank: 1 + index,
		};
		return assembled;
	}),
	{
		type: 'ITEM',
		x: 1,
		y: 39,
		id: `${challengeFieldId}_item1`,
		item: 'super-potion',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${challengeFieldId}_item1`),
	},
	{
		type: 'ITEM',
		x: 2,
		y: 39,
		id: `${challengeFieldId}_item2`,
		item: 'sitrus-berry',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${challengeFieldId}_item2`),
	},
	{
		type: 'ITEM',
		x: 3,
		y: 39,
		id: `${challengeFieldId}_item3`,
		item: 'lum-berry',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${challengeFieldId}_item3`),
	},
	{
		type: 'ITEM',
		x: 9,
		y: 39,
		id: `${challengeFieldId}_item4`,
		item: 'moomoo-milk',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${challengeFieldId}_item4`),
	},
	{
		type: 'ITEM',
		x: 10,
		y: 39,
		id: `${challengeFieldId}_item5`,
		item: 'elixir',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${challengeFieldId}_item5`),
	},
	{
		type: 'ITEM',
		x: 11,
		y: 39,
		id: `${challengeFieldId}_item6`,
		item: 'lum-berry',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${challengeFieldId}_item6`),
	},
	{
		type: 'ITEM',
		x: 17,
		y: 39,
		id: `${challengeFieldId}_item7`,
		item: 'full-restore',
		amount: 3,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${challengeFieldId}_item7`),
	},
	{
		type: 'ITEM',
		x: 18,
		y: 39,
		id: `${challengeFieldId}_item8`,
		item: 'sitrus-berry',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${challengeFieldId}_item8`),
	},
	{
		type: 'ITEM',
		x: 19,
		y: 39,
		id: `${challengeFieldId}_item9`,
		item: 'elixir',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${challengeFieldId}_item9`),
	},
	{
		type: 'ITEM',
		x: 25,
		y: 39,
		id: `${challengeFieldId}_item10`,
		item: 'full-restore',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${challengeFieldId}_item10`),
	},
	{
		type: 'ITEM',
		x: 26,
		y: 39,
		id: `${challengeFieldId}_item11`,
		item: 'sitrus-berry',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${challengeFieldId}_item11`),
	},
	{
		type: 'ITEM',
		x: 27,
		y: 39,
		id: `${challengeFieldId}_item9`,
		item: 'elixir',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === `${challengeFieldId}_item12`),
	},
];
