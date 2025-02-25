import { calculateLevelData } from '../../functions/calculateLevelData';
import { Quest } from '../../interfaces/Quest';

export const questNames = [
	'catch a pokemon in sector1x0',
	'catch a pikachu',
	'catch a gastly',
	'catch a clefairy',
	'evolve a pokemon',
	'train a pokemon to level 10',
] as const;
export type QuestName = (typeof questNames)[number];

export const QuestsRecord: Record<QuestName, Quest> = {
	'catch a pokemon in sector1x0': {
		rewardItems: { 'berry-juice': 5 },
		conditionFunction: (s) => {
			return s.pokemon.some((p) => p.caughtOnMap === 'sector1x0');
		},
	},
	'catch a pikachu': {
		rewardItems: { 'thunder-stone': 1 },
		conditionFunction: (s) => {
			return s.pokemon.some((p) => p.dexId === 25);
		},
	},
	'catch a gastly': {
		rewardItems: { repel: 5 },
		conditionFunction: (s) => {
			return s.pokemon.some((p) => p.dexId === 92);
		},
	},
	'catch a clefairy': {
		rewardItems: { 'moon-stone': 1 },
		conditionFunction: (s) => {
			return s.pokemon.some((p) => p.dexId === 92);
		},
	},
	'evolve a pokemon': {
		rewardItems: { 'lava-cookie': 2 },
		conditionFunction: (s) => {
			return s.mileStones.hasEvolvedAPokemon;
		},
	},
	'train a pokemon to level 10': {
		rewardItems: { 'super-potion': 2 },
		conditionFunction: (s) => {
			return s.pokemon.some((p) => {
				const { level } = calculateLevelData(p.xp);

				return level >= 10;
			});
		},
	},
};
