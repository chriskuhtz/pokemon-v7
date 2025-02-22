import { calculateLevelData } from '../../functions/calculateLevelData';
import { Quest } from '../../interfaces/Quest';
import { meadow } from '../maps/meadow/meadow';

export const questNames = [
	'catch a pikachu',
	'Train a Pokemon to lvl 10',
	'Catch a Zorua at night in the meadow',
	'Catch a morning pokemon from the meadow',
	'Defeat all the Trainers in the meadow',
	'Catch five different pokemon',
] as const;
export type QuestName = (typeof questNames)[number];

export const QuestsRecord: Record<QuestName, Quest> = {
	'catch a pikachu': {
		rewardItems: { 'thunder-stone': 1 },
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
	'Catch a Zorua at night in the meadow': {
		rewardItems: { 'dusk-stone': 1 },
		conditionFunction: (s) => {
			return s.pokemon.some((p) => p.dexId === 570);
		},
	},
	'Catch a morning pokemon from the meadow': {
		rewardItems: { 'dawn-stone': 1 },
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				meadow.possibleEncounters.MORNING.some(
					(encounter) => encounter.dexId === p.dexId
				)
			);
		},
	},
	'Defeat all the Trainers in the meadow': {
		rewardItems: { lemonade: 10 },
		conditionFunction: (s) => {
			return meadow.occupants
				.filter((o) => o > 200000 && o < 300000)
				.every((o) => s.handledOccupants.some((ho) => ho.id === o));
		},
	},
	'Catch five different pokemon': {
		rewardItems: { 'ultra-ball': 10 },
		conditionFunction: (s) => {
			const dexIds = s.pokemon.map((p) => p.dexId);

			return [...new Set(dexIds)].length >= 5;
		},
	},
};
