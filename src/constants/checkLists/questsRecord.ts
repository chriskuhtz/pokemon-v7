import { Quest } from '../../interfaces/Quest';

export const questNames = [
	'catch a pokemon in sector1x0',
	'catch a pikachu',
] as const;
export type QuestName = (typeof questNames)[number];

export const QuestsRecord: Record<QuestName, Quest> = {
	'catch a pokemon in sector1x0': {
		rewardItems: { 'berry-juice': 10 },
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
};
