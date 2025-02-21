import { calculateLevelData } from '../../functions/calculateLevelData';
import { Quest } from '../../interfaces/Quest';
import { meadow } from '../maps/meadow';

export const questNames = [
	'catch a pikachu',
	'Train a Pokemon to lvl 10',
	'Catch a nocturnal pokemon from the meadow',
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
	'Catch a nocturnal pokemon from the meadow': {
		rewardItems: { 'dusk-stone': 1 },
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				meadow.possibleEncounters.NIGHT.some(
					(encounter) => encounter.dexId === p.dexId
				)
			);
		},
	},
};
