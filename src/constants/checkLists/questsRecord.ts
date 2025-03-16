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
	'catch a pokemon orginally found in johto',
	'catch a spiritomb',
	'catch all nighttime pokemon from routeN1',
	'catch Haunter and Mightyena',
] as const;
export type QuestName = (typeof questNames)[number];

export const QuestsRecord: Record<QuestName, Quest> = {
	'catch a pokemon': {
		rewardItems: { potion: 5 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.length > 1;
		},
		kind: 'STORY',
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
	'catch a pokemon orginally found in johto': {
		rewardItems: { 'super-potion': 5 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) => getMiddleOfThree([151, p.dexId, 251]) === p.dexId
			);
		},
		kind: 'GENERIC',
	},
	'catch all nighttime pokemon from routeN1': {
		rewardItems: { 'odd-keystone': 1 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeN1.possibleEncounters.NIGHT.every((e) =>
				s.pokemon.some((p) => p.dexId === e.dexId)
			);
		},
		kind: 'GENERIC',
	},
	'catch a spiritomb': {
		rewardItems: { 'rare-candy': 3 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokemon.some((p) => p.dexId === 442);
		},
		kind: 'STORY',
	},
	'catch Haunter and Mightyena': {
		rewardItems: { 'rare-bone': 2 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return (
				s.pokemon.some((p) => p.dexId === 93) &&
				s.pokemon.some((p) => p.dexId === 262)
			);
		},
		kind: 'STORY',
	},
};
