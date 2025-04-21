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
			conditionFunction: (s) => !s.handledOccupants.some((h) => h.id === id),
			sprite: t.trainer?.sprite ?? SpriteEnum.aceMale,
			name: id,
			unhandledMessage: ['.', '..', '...'],
			team: t.team,
			challengeFieldRank: 1 + index,
		};
		return assembled;
	}),
];
