import { calculateLevelData } from '../../functions/calculateLevelData';
import { Quest } from '../../interfaces/Quest';

export const questNames = [
	'catch a pikachu',
	'Train a Pokemon to lvl 10',
] as const;
export type QuestName = (typeof questNames)[number];

export const QuestsRecord: Record<QuestName, Quest> = {
	'catch a pikachu': {
		rewardItems: { 'quick-ball': 5 },
		conditionFunction: (s) => {
			return s.pokemon.some((p) => p.dexId === 25);
		},
	},
	'Train a Pokemon to lvl 10': {
		rewardItems: { potion: 5 },
		conditionFunction: (s) => {
			return s.pokemon.some((p) => {
				const { level } = calculateLevelData(p.xp);
				return level >= 10;
			});
		},
	},
};
