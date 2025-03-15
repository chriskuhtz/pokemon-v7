import { getMiddleOfThree } from '../../functions/getMiddleOfThree';
import { Quest } from '../../interfaces/Quest';
import { routeN1 } from '../maps/routeN1';

export const questNames = [
	'catch a pikachu',
	'catch a pokemon',
	'lure a pokemon with honey',
	'evolve a pokemon',
	'catch a morning pokemon from routeN1',
	'catch a daytime pokemon from routeN1',
	'catch a evening pokemon from routeN1',
	'catch a nighttime pokemon from routeN1',
	'catch a pokemon orginally found in kanto',
] as const;
export type QuestName = (typeof questNames)[number];

export const QuestsRecord: Record<QuestName, Quest> = {
	'catch a pokemon': {
		rewardItems: { potion: 5 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.length > 1;
		},
		kind: 'GENERIC',
	},
	'catch a pikachu': {
		rewardItems: { 'thunder-stone': 1 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.some((p) => p.dexId === 25);
		},
		kind: 'GENERIC',
	},
	'catch a morning pokemon from routeN1': {
		rewardItems: { 'sun-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				routeN1.possibleEncounters.MORNING.some((e) => e.dexId === p.dexId)
			);
		},
		kind: 'GENERIC',
	},
	'catch a daytime pokemon from routeN1': {
		rewardItems: { 'fire-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				routeN1.possibleEncounters.DAY.some((e) => e.dexId === p.dexId)
			);
		},
		kind: 'GENERIC',
	},
	'catch a evening pokemon from routeN1': {
		rewardItems: { 'dusk-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				routeN1.possibleEncounters.EVENING.some((e) => e.dexId === p.dexId)
			);
		},
		kind: 'GENERIC',
	},
	'catch a nighttime pokemon from routeN1': {
		rewardItems: { 'moon-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				routeN1.possibleEncounters.NIGHT.some((e) => e.dexId === p.dexId)
			);
		},
		kind: 'GENERIC',
	},
	'lure a pokemon with honey': {
		rewardItems: { 'sitrus-berry': 3 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.mileStones.hasCaughtAPokemonWithHoney;
		},
		kind: 'GENERIC',
	},
	'evolve a pokemon': {
		rewardItems: { 'rare-candy': 1 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.mileStones.hasEvolvedAPokemon;
		},
		kind: 'GENERIC',
	},
	'catch a pokemon orginally found in kanto': {
		rewardItems: { 'great-ball': 10 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) => getMiddleOfThree([0, p.dexId, 151]) === p.dexId
			);
		},
		kind: 'GENERIC',
	},
};
