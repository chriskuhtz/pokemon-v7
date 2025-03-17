import { calculateLevelData } from '../../functions/calculateLevelData';
import { trainers } from '../../functions/makeRandomTrainer';
import { Quest } from '../../interfaces/Quest';
import { routeN1 } from '../maps/routeN1';
import { routeS1 } from '../maps/routeS1';
import { pokemonNames } from '../pokemonNames';

export const questNames = [
	'catch a pikachu',
	'catch a pokemon',
	'catch a spiritomb',
	'catch Haunter and Mightyena',
	'catch a morning pokemon from routeN1',
	'catch a daytime pokemon from routeN1',
	'catch a evening pokemon from routeN1',
	'catch a nighttime pokemon from routeN1',
	'catch all morning pokemon from routeN1',
	'catch all daytime pokemon from routeN1',
	'catch all evening pokemon from routeN1',
	'catch all nighttime pokemon from routeN1',
	'catch a ultra rare pokemon on routeN1',
	'catch a morning pokemon from routeS1',
	'catch a daytime pokemon from routeS1',
	'catch a evening pokemon from routeS1',
	'catch a nighttime pokemon from routeS1',
	'catch all morning pokemon from routeS1',
	'catch all daytime pokemon from routeS1',
	'catch all evening pokemon from routeS1',
	'catch all nighttime pokemon from routeS1',
	'catch a ultra rare pokemon on routeS1',
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
	'craft a apricorn ball',
	'lure a pokemon with honey',
	'evolve a pokemon',
	'train a pokemon to level 10',
	'train a pokemon to level 20',
	'train a pokemon to level 30',
	'defeat a training field trainer',
	'defeat five training field trainers',
	'grow a berry',
	'grow a apricorn',
] as const;
/**
 * Ideas:
 * catch Baby Pokemon
 * weight/height based
 * catch a pokemon in a apricorn ball
 * defeat morty
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
	'catch a ultra rare pokemon on routeN1': {
		rewardItems: { 'berry-juice': 5 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				[
					...routeN1.possibleEncounters.NIGHT,
					...routeN1.possibleEncounters.MORNING,
					...routeN1.possibleEncounters.DAY,
					...routeN1.possibleEncounters.EVENING,
				].some((e) => e.rarity === 'ultra-rare' && e.name === p.name)
			);
		},
		kind: 'BULLETIN',
	},
	'catch all morning pokemon from routeN1': {
		rewardItems: { 'hyper-potion': 2 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeN1.possibleEncounters.EVENING.every((e) =>
				s.pokemon.some((p) => p.name === e.name)
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'catch a morning pokemon from routeN1',
	},
	'catch all daytime pokemon from routeN1': {
		rewardItems: { honey: 10 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeN1.possibleEncounters.DAY.every((e) =>
				s.pokemon.some((p) => p.name === e.name)
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'catch a daytime pokemon from routeN1',
	},
	'catch all evening pokemon from routeN1': {
		rewardItems: { 'full-heal': 5 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeN1.possibleEncounters.MORNING.every((e) =>
				s.pokemon.some((p) => p.name === e.name)
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'catch a evening pokemon from routeN1',
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
		availableAfter: 'catch a nighttime pokemon from routeN1',
	},
	'catch a morning pokemon from routeS1': {
		rewardItems: { 'sun-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				routeS1.possibleEncounters.MORNING.some((e) => e.name === p.name)
			);
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'access routeS1',
	},
	'catch a daytime pokemon from routeS1': {
		rewardItems: { 'fire-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				routeS1.possibleEncounters.DAY.some((e) => e.name === p.name)
			);
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'access routeS1',
	},
	'catch a evening pokemon from routeS1': {
		rewardItems: { 'dusk-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				routeS1.possibleEncounters.EVENING.some((e) => e.name === p.name)
			);
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'access routeS1',
	},
	'catch a nighttime pokemon from routeS1': {
		rewardItems: { 'moon-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				routeS1.possibleEncounters.NIGHT.some((e) => e.name === p.name)
			);
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'access routeS1',
	},
	'catch a ultra rare pokemon on routeS1': {
		rewardItems: { 'berry-juice': 5 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				[
					...routeS1.possibleEncounters.NIGHT,
					...routeS1.possibleEncounters.MORNING,
					...routeS1.possibleEncounters.DAY,
					...routeS1.possibleEncounters.EVENING,
				].some((e) => e.rarity === 'ultra-rare' && e.name === p.name)
			);
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'access routeS1',
	},
	'catch all morning pokemon from routeS1': {
		rewardItems: { 'hyper-potion': 2 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeS1.possibleEncounters.EVENING.every((e) =>
				s.pokemon.some((p) => p.name === e.name)
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'catch a morning pokemon from routeS1',
		requiredUpgrade: 'access routeS1',
	},
	'catch all daytime pokemon from routeS1': {
		rewardItems: { honey: 10 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeS1.possibleEncounters.DAY.every((e) =>
				s.pokemon.some((p) => p.name === e.name)
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'catch a daytime pokemon from routeS1',
		requiredUpgrade: 'access routeS1',
	},
	'catch all evening pokemon from routeS1': {
		rewardItems: { 'full-heal': 5 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeS1.possibleEncounters.MORNING.every((e) =>
				s.pokemon.some((p) => p.name === e.name)
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'catch a evening pokemon from routeS1',
		requiredUpgrade: 'access routeS1',
	},
	'catch all nighttime pokemon from routeS1': {
		rewardItems: { 'odd-keystone': 1 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeS1.possibleEncounters.NIGHT.every((e) =>
				s.pokemon.some((p) => p.name === e.name)
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'catch a nighttime pokemon from routeS1',
		requiredUpgrade: 'access routeS1',
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
	'craft a apricorn ball': {
		kind: 'BULLETIN',
		rewardItems: {
			'black-apricorn': 1,
			'blue-apricorn': 1,
			'green-apricorn': 1,
			'pink-apricorn': 1,
			'red-apricorn': 1,
			'white-apricorn': 1,
			'yellow-apricorn': 1,
		},
		researchPoints: 10,
		conditionFunction: (s) => s.mileStones.hasCraftedApricorn,
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
	'train a pokemon to level 10': {
		rewardItems: { 'rare-candy': 1 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.some((p) => calculateLevelData(p.xp).level >= 10);
		},
		kind: 'BULLETIN',
	},
	'train a pokemon to level 20': {
		rewardItems: { 'rare-candy': 2 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.some((p) => calculateLevelData(p.xp).level >= 20);
		},
		kind: 'BULLETIN',
		availableAfter: 'train a pokemon to level 10',
	},
	'train a pokemon to level 30': {
		rewardItems: { 'rare-candy': 3 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.some((p) => calculateLevelData(p.xp).level >= 30);
		},
		kind: 'BULLETIN',
		availableAfter: 'train a pokemon to level 20',
	},
	'defeat a training field trainer': {
		rewardItems: {
			'dire-hit': 1,
			'x-accuracy': 1,
			'x-attack': 1,
			'x-defense': 1,
			'x-sp-atk': 1,
			'x-sp-def': 1,
			'x-speed': 1,
			'guard-spec': 1,
		},
		researchPoints: 5,
		conditionFunction: (s) => {
			const defeatedTrainers = s.handledOccupants.filter((h) =>
				trainers.some((t) => t.id === h.id)
			).length;
			return defeatedTrainers > 0;
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
	},
	'defeat five training field trainers': {
		rewardItems: {
			'dire-hit': 2,
			'x-accuracy': 2,
			'x-attack': 2,
			'x-defense': 2,
			'x-sp-atk': 2,
			'x-sp-def': 2,
			'x-speed': 2,
			'guard-spec': 2,
		},
		researchPoints: 20,
		conditionFunction: (s) => {
			const defeatedTrainers = s.handledOccupants.filter((h) =>
				trainers.some((t) => t.id === h.id)
			).length;
			return defeatedTrainers > 4;
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'defeat a training field trainer',
	},
	'grow a berry': {
		rewardItems: {
			'damp-mulch': 2,
			'growth-mulch': 2,
			'gooey-mulch': 2,
			'stable-mulch': 2,
		},
		researchPoints: 10,
		conditionFunction: (s) => s.mileStones.hasGrownABerry,
		kind: 'BULLETIN',
		requiredUpgrade: 'berry_farm',
	},
	'grow a apricorn': {
		rewardItems: {
			'damp-mulch': 2,
			'growth-mulch': 2,
			'gooey-mulch': 2,
			'stable-mulch': 2,
		},
		researchPoints: 10,
		conditionFunction: (s) => s.mileStones.hasGrownAnApricorn,
		kind: 'BULLETIN',
		requiredUpgrade: 'berry_farm',
	},
};
