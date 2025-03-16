import { Quest } from '../../interfaces/Quest';
import { routeN1 } from '../maps/routeN1';
import { pokemonNames } from '../pokemonNames';

export const questNames = [
	'catch a pikachu',
	'catch a pokemon',
	'lure a pokemon with honey',
	'evolve a pokemon',
	'catch a morning pokemon from routeN1',
	'catch a daytime pokemon from routeN1',
	'catch a evening pokemon from routeN1',
	'catch a nighttime pokemon from routeN1',
	'catch a spiritomb',
	'catch all nighttime pokemon from routeN1',
	'catch Haunter and Mightyena',
	'catch a pokemon orginally found in kanto',
	'catch a pokemon orginally found in johto',
	'catch a pokemon orginally found in hoenn',
	'catch a pokemon orginally found in sinnoh',
	'catch a pokemon orginally found in unova',
	'catch a pokemon orginally found in kalos',
	'catch a pokemon orginally found in alola',
	'catch a pokemon orginally found in galar',
	'catch a pokemon orginally found in paldea',
	'catch a pokemon and its galarian variant',
	'catch a pokemon and its alolan variant',
	'catch a pokemon and its hisui variant',
	'catch a pokemon and its paldea variant',
] as const;
/**
 * Ideas:
 * catch Baby Pokemon
 * weight/height based
 * catch a ultra rare pokemon
 */
export type QuestName = (typeof questNames)[number];

export const QuestsRecord: Record<QuestName, Quest> = {
	'catch a pokemon': {
		rewardItems: { potion: 5 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.length > 1;
		},
		kind: 'QUEST_LINE',
	},
	'catch a pikachu': {
		rewardItems: { 'thunder-stone': 1 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.some((p) => p.name === 'pikachu');
		},
		kind: 'BULLETIN',
	},
	'catch a morning pokemon from routeN1': {
		rewardItems: { 'sun-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				routeN1.possibleEncounters.MORNING.some((e) => e.name === p.name)
			);
		},
		kind: 'BULLETIN',
	},
	'catch a daytime pokemon from routeN1': {
		rewardItems: { 'fire-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				routeN1.possibleEncounters.DAY.some((e) => e.name === p.name)
			);
		},
		kind: 'BULLETIN',
	},
	'catch a evening pokemon from routeN1': {
		rewardItems: { 'dusk-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				routeN1.possibleEncounters.EVENING.some((e) => e.name === p.name)
			);
		},
		kind: 'BULLETIN',
	},
	'catch a nighttime pokemon from routeN1': {
		rewardItems: { 'moon-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				routeN1.possibleEncounters.NIGHT.some((e) => e.name === p.name)
			);
		},
		kind: 'BULLETIN',
	},
	'lure a pokemon with honey': {
		rewardItems: { 'sitrus-berry': 3 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.mileStones.hasCaughtAPokemonWithHoney;
		},
		kind: 'BULLETIN',
	},
	'evolve a pokemon': {
		rewardItems: { 'rare-candy': 1 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.mileStones.hasEvolvedAPokemon;
		},
		kind: 'BULLETIN',
	},

	'catch all nighttime pokemon from routeN1': {
		rewardItems: { 'odd-keystone': 1 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeN1.possibleEncounters.NIGHT.every((e) =>
				s.pokemon.some((p) => p.name === e.name)
			);
		},
		kind: 'BULLETIN',
	},
	'catch a spiritomb': {
		rewardItems: { 'rare-candy': 3 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokemon.some((p) => p.name === 'spiritomb');
		},
		kind: 'QUEST_LINE',
	},
	'catch Haunter and Mightyena': {
		rewardItems: { 'rare-bone': 2 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return (
				s.pokemon.some((p) => p.name === 'haunter') &&
				s.pokemon.some((p) => p.name === 'mightyena')
			);
		},
		kind: 'QUEST_LINE',
	},
	'catch a pokemon orginally found in kanto': {
		rewardItems: { protein: 2 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.some((p) => pokemonNames.slice(0, 151).includes(p.name));
		},
		kind: 'QUEST_LINE',
	},
	'catch a pokemon orginally found in johto': {
		rewardItems: { iron: 2 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				pokemonNames.slice(150, 251).includes(p.name)
			);
		},
		kind: 'QUEST_LINE',
	},
	'catch a pokemon orginally found in hoenn': {
		rewardItems: { calcium: 2 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				pokemonNames.slice(250, 387).includes(p.name)
			);
		},
		kind: 'QUEST_LINE',
	},
	'catch a pokemon orginally found in sinnoh': {
		rewardItems: { zinc: 2 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				pokemonNames.slice(386, 494).includes(p.name)
			);
		},
		kind: 'QUEST_LINE',
	},
	'catch a pokemon orginally found in unova': {
		rewardItems: { carbos: 2 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				pokemonNames.slice(493, 650).includes(p.name)
			);
		},
		kind: 'QUEST_LINE',
	},
	'catch a pokemon orginally found in kalos': {
		rewardItems: { 'hp-up': 2 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				pokemonNames.slice(649, 722).includes(p.name)
			);
		},
		kind: 'QUEST_LINE',
	},
	'catch a pokemon orginally found in alola': {
		rewardItems: { 'pp-max': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				pokemonNames.slice(721, 810).includes(p.name)
			);
		},
		kind: 'QUEST_LINE',
	},
	'catch a pokemon orginally found in galar': {
		rewardItems: { 'pp-max': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				pokemonNames.slice(809, 906).includes(p.name)
			);
		},
		kind: 'QUEST_LINE',
	},
	'catch a pokemon orginally found in paldea': {
		rewardItems: { 'pp-max': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				pokemonNames.slice(905, 1025).includes(p.name)
			);
		},
		kind: 'QUEST_LINE',
	},
	'catch a pokemon and its galarian variant': {
		rewardItems: { 'sitrus-berry': 10 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return s.pokemon.some((search) =>
				s.pokemon.some((result) =>
					[search.name + '-galar'].includes(result.name)
				)
			);
		},
		kind: 'QUEST_LINE',
	},
	'catch a pokemon and its alolan variant': {
		rewardItems: { 'ultra-ball': 10 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return s.pokemon.some((search) =>
				s.pokemon.some((result) =>
					[search.name + '-alola'].includes(result.name)
				)
			);
		},
		kind: 'QUEST_LINE',
	},
	'catch a pokemon and its hisui variant': {
		rewardItems: { 'black-augurite': 1 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return s.pokemon.some((search) =>
				s.pokemon.some((result) =>
					[search.name + '-hisui'].includes(result.name)
				)
			);
		},
		kind: 'QUEST_LINE',
	},
	'catch a pokemon and its paldea variant': {
		rewardItems: { elixir: 3 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return s.pokemon.some((search) =>
				s.pokemon.some((result) =>
					[search.name + '-paldea'].includes(result.name)
				)
			);
		},
		kind: 'QUEST_LINE',
	},
};
