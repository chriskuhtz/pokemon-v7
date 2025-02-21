import { Quest } from '../../interfaces/Quest';

export const questNames = ['catch a pikachu'] as const;
export type QuestName = (typeof questNames)[number];

export const QuestsRecord: Record<QuestName, Quest> = {
	'catch a pikachu': {
		rewardItems: { 'quick-ball': 5 },
		conditionFunction: (s) => {
			return s.pokemon.some((p) => p.dexId === 25);
		},
	},
};
