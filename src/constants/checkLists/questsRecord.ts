import { Quest } from '../../interfaces/Quest';

export const questNames = [
	'catch a pikachu',
	'lure a pokemon with honey',
	'evolve a pokemon',
] as const;
export type QuestName = (typeof questNames)[number];

export const QuestsRecord: Record<QuestName, Quest> = {
	'catch a pikachu': {
		rewardItems: { 'thunder-stone': 1 },
		conditionFunction: (s) => {
			return s.pokemon.some((p) => p.dexId === 25);
		},
	},
	'lure a pokemon with honey': {
		rewardItems: { 'sitrus-berry': 3 },
		conditionFunction: (s) => {
			return s.mileStones.hasCaughtAPokemonWithHoney;
		},
	},
	'evolve a pokemon': {
		rewardItems: { 'rare-candy': 1 },
		conditionFunction: (s) => {
			return s.mileStones.hasEvolvedAPokemon;
		},
	},
};
