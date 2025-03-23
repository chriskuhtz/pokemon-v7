import { calculateLevelData } from '../../functions/calculateLevelData';
import { trainers } from '../../functions/makeRandomTrainer';
import { honeyPokemon } from '../../hooks/useHoneyTree';
import { apricornTable, fossilTable } from '../../interfaces/Item';
import { Quest } from '../../interfaces/Quest';
import { routeE1 } from '../maps/routeE1';
import { routeN1 } from '../maps/routeN1';
import { routeN1E1 } from '../maps/routeN1E1';
import { pokemonNames } from '../pokemonNames';
import { campUpgradePrices } from './campUpgrades';

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
	'catch a morning pokemon from routeN1E1',
	'catch a daytime pokemon from routeN1E1',
	'catch a evening pokemon from routeN1E1',
	'catch a nighttime pokemon from routeN1E1',
	'catch all morning pokemon from routeN1E1',
	'catch all daytime pokemon from routeN1E1',
	'catch all evening pokemon from routeN1E1',
	'catch all nighttime pokemon from routeN1E1',
	'catch a ultra rare pokemon on routeN1E1',
	'catch a morning pokemon from routeE1',
	'catch a daytime pokemon from routeE1',
	'catch a evening pokemon from routeE1',
	'catch a nighttime pokemon from routeE1',
	'catch all morning pokemon from routeE1',
	'catch all daytime pokemon from routeE1',
	'catch all evening pokemon from routeE1',
	'catch all nighttime pokemon from routeE1',
	'catch a ultra rare pokemon on routeE1',
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
	'catch all honeytree pokemon',
	'evolve a pokemon through level up',
	'evolve a pokemon with a stone',
	'evolve a pokemon with a held item',
	'evolve a pokemon through friendship',
	'catch vileplume and bellosom',
	'train a pokemon to level 10',
	'train a pokemon to level 20',
	'train a pokemon to level 30',
	'defeat a training field trainer',
	'defeat five training field trainers',
	'defeat ten training field trainers',
	'grow a berry',
	'grow a apricorn',
	'catch a pokemon in an apricorn ball',
	'catch a very heavy specimen',
	'catch a very light specimen',
	'catch a tiny specimen',
	'catch a gigantic specimen',
	'catch a pokemon in every type of apricorn ball',
	'defeat morty',
	'revive a fossil',
	'revive all different fossils',
] as const;
/**
 * Ideas:
 * also check "caught on" for catch quests
 * include base in "catch all" quests
 * elm line (night and day,all eeveelutions)
 * add elm and rowan to training field
 * shiny Pokemon
 * cook a recipe
 * cook all recipes
 * catch Baby Pokemon
 * catch x different pokemon
 * catch x swarm pokemon
 * catch x pokemon by smashing rocks
 * evolve your starter
 */
export type QuestName = (typeof questNames)[number];

export const QuestsRecord: Record<QuestName, Quest> = {
	'catch a pokemon': {
		rewardItems: { 'poke-ball': 20 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.length > 1;
		},
		kind: 'QUEST_LINE',
	},
	'catch a pikachu': {
		rewardItems: { 'thunder-stone': 1 },
		researchPoints: 10,
		targetPokemon: ['pikachu'],
		conditionFunction: (s) => {
			return s.pokemon.some((p) => p.name === 'pikachu');
		},
		kind: 'BULLETIN',
	},
	'catch a morning pokemon from routeN1': {
		rewardItems: { 'nest-ball': 10 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) =>
					routeN1.possibleEncounters.MORNING.some((e) => e.name === p.name) &&
					p.caughtOnMap === 'routeN1'
			);
		},
		targetPokemon: [
			...new Set(routeN1.possibleEncounters.MORNING.map((p) => p.name)),
		],
		kind: 'BULLETIN',
	},
	'catch a daytime pokemon from routeN1': {
		rewardItems: { 'quick-ball': 10 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) =>
					routeN1.possibleEncounters.DAY.some((e) => e.name === p.name) &&
					p.caughtOnMap === 'routeN1'
			);
		},
		targetPokemon: [
			...new Set(routeN1.possibleEncounters.DAY.map((p) => p.name)),
		],
		kind: 'BULLETIN',
	},
	'catch a evening pokemon from routeN1': {
		rewardItems: { 'net-ball': 10 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) =>
					routeN1.possibleEncounters.EVENING.some((e) => e.name === p.name) &&
					p.caughtOnMap === 'routeN1'
			);
		},
		targetPokemon: [
			...new Set(routeN1.possibleEncounters.EVENING.map((p) => p.name)),
		],
		kind: 'BULLETIN',
	},
	'catch a nighttime pokemon from routeN1': {
		rewardItems: { 'dusk-ball': 10 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) =>
					routeN1.possibleEncounters.NIGHT.some((e) => e.name === p.name) &&
					p.caughtOnMap === 'routeN1'
			);
		},
		targetPokemon: [
			...new Set(routeN1.possibleEncounters.NIGHT.map((p) => p.name)),
		],
		kind: 'BULLETIN',
	},
	'catch a ultra rare pokemon on routeN1': {
		rewardItems: { 'berry-juice': 5 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) =>
					[
						...routeN1.possibleEncounters.NIGHT,
						...routeN1.possibleEncounters.MORNING,
						...routeN1.possibleEncounters.DAY,
						...routeN1.possibleEncounters.EVENING,
					].some((e) => e.rarity === 'ultra-rare' && e.name === p.name) &&
					p.caughtOnMap === 'routeN1'
			);
		},
		targetPokemon: [
			...new Set(
				[
					...routeN1.possibleEncounters.NIGHT,
					...routeN1.possibleEncounters.MORNING,
					...routeN1.possibleEncounters.DAY,
					...routeN1.possibleEncounters.EVENING,
				]
					.filter((p) => p.rarity === 'ultra-rare')
					.map((p) => p.name)
			),
		],
		kind: 'BULLETIN',
	},
	'catch all morning pokemon from routeN1': {
		rewardItems: { 'hyper-potion': 2 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeN1.possibleEncounters.MORNING.every((e) =>
				s.pokemon.some((p) => p.name === e.name && p.caughtOnMap === 'routeN1')
			);
		},
		targetPokemon: [
			...new Set(routeN1.possibleEncounters.MORNING.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		availableAfter: 'catch a morning pokemon from routeN1',
	},
	'catch all daytime pokemon from routeN1': {
		rewardItems: { honey: 10 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeN1.possibleEncounters.DAY.every((e) =>
				s.pokemon.some((p) => p.name === e.name && p.caughtOnMap === 'routeN1')
			);
		},
		targetPokemon: [
			...new Set(routeN1.possibleEncounters.DAY.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		availableAfter: 'catch a daytime pokemon from routeN1',
	},
	'catch all evening pokemon from routeN1': {
		rewardItems: { 'full-heal': 5 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeN1.possibleEncounters.EVENING.every((e) =>
				s.pokemon.some((p) => p.name === e.name && p.caughtOnMap === 'routeN1')
			);
		},
		targetPokemon: [
			...new Set(routeN1.possibleEncounters.EVENING.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		availableAfter: 'catch a evening pokemon from routeN1',
	},
	'catch all nighttime pokemon from routeN1': {
		rewardItems: { 'moon-stone': 1 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeN1.possibleEncounters.NIGHT.every((e) =>
				s.pokemon.some((p) => p.name === e.name && p.caughtOnMap === 'routeN1')
			);
		},
		targetPokemon: [
			...new Set(routeN1.possibleEncounters.NIGHT.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		availableAfter: 'catch a nighttime pokemon from routeN1',
	},
	'catch a morning pokemon from routeN1E1': {
		rewardItems: { 'sun-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) =>
					routeN1E1.possibleEncounters.MORNING.some((e) => e.name === p.name) &&
					p.caughtOnMap === 'routeN1E1'
			);
		},
		targetPokemon: [
			...new Set(routeN1E1.possibleEncounters.MORNING.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		requiredUpgrade: 'machete certification',
	},
	'catch a daytime pokemon from routeN1E1': {
		rewardItems: { 'fire-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) =>
					routeN1E1.possibleEncounters.DAY.some((e) => e.name === p.name) &&
					p.caughtOnMap === 'routeN1E1'
			);
		},
		targetPokemon: [
			...new Set(routeN1E1.possibleEncounters.DAY.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		requiredUpgrade: 'machete certification',
	},
	'catch a evening pokemon from routeN1E1': {
		rewardItems: { 'dusk-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) =>
					routeN1E1.possibleEncounters.EVENING.some((e) => e.name === p.name) &&
					p.caughtOnMap === 'routeN1E1'
			);
		},
		targetPokemon: [
			...new Set(routeN1E1.possibleEncounters.EVENING.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		requiredUpgrade: 'machete certification',
	},
	'catch a nighttime pokemon from routeN1E1': {
		rewardItems: { 'moon-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) =>
					routeN1E1.possibleEncounters.NIGHT.some((e) => e.name === p.name) &&
					p.caughtOnMap === 'routeN1E1'
			);
		},
		targetPokemon: [
			...new Set(routeN1E1.possibleEncounters.NIGHT.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		requiredUpgrade: 'machete certification',
	},
	'catch a ultra rare pokemon on routeN1E1': {
		rewardItems: { 'berry-juice': 5 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) =>
					[
						...routeN1E1.possibleEncounters.NIGHT,
						...routeN1E1.possibleEncounters.MORNING,
						...routeN1E1.possibleEncounters.DAY,
						...routeN1E1.possibleEncounters.EVENING,
					].some((e) => e.rarity === 'ultra-rare' && e.name === p.name) &&
					p.caughtOnMap === 'routeN1E1'
			);
		},
		targetPokemon: [
			...new Set(
				[
					...routeN1E1.possibleEncounters.NIGHT,
					...routeN1E1.possibleEncounters.MORNING,
					...routeN1E1.possibleEncounters.DAY,
					...routeN1E1.possibleEncounters.EVENING,
				]
					.filter((p) => p.rarity === 'ultra-rare')
					.map((p) => p.name)
			),
		],
		kind: 'BULLETIN',
		requiredUpgrade: 'machete certification',
	},
	'catch all morning pokemon from routeN1E1': {
		rewardItems: { 'hyper-potion': 2 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeN1E1.possibleEncounters.EVENING.every((e) =>
				s.pokemon.some(
					(p) => p.name === e.name && p.caughtOnMap === 'routeN1E1'
				)
			);
		},
		targetPokemon: [
			...new Set(routeN1E1.possibleEncounters.MORNING.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		availableAfter: 'catch a morning pokemon from routeN1E1',
		requiredUpgrade: 'machete certification',
	},
	'catch all daytime pokemon from routeN1E1': {
		rewardItems: { honey: 10 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeN1E1.possibleEncounters.DAY.every((e) =>
				s.pokemon.some(
					(p) => p.name === e.name && p.caughtOnMap === 'routeN1E1'
				)
			);
		},
		targetPokemon: [
			...new Set(routeN1E1.possibleEncounters.DAY.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		availableAfter: 'catch a daytime pokemon from routeN1E1',
		requiredUpgrade: 'machete certification',
	},
	'catch all evening pokemon from routeN1E1': {
		rewardItems: { 'full-heal': 5 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeN1E1.possibleEncounters.MORNING.every((e) =>
				s.pokemon.some(
					(p) => p.name === e.name && p.caughtOnMap === 'routeN1E1'
				)
			);
		},
		targetPokemon: [
			...new Set(routeN1E1.possibleEncounters.EVENING.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		availableAfter: 'catch a evening pokemon from routeN1E1',
		requiredUpgrade: 'machete certification',
	},
	'catch all nighttime pokemon from routeN1E1': {
		rewardItems: { 'odd-keystone': 1 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeN1E1.possibleEncounters.NIGHT.every((e) =>
				s.pokemon.some(
					(p) => p.name === e.name && p.caughtOnMap === 'routeN1E1'
				)
			);
		},
		targetPokemon: [
			...new Set(routeN1E1.possibleEncounters.NIGHT.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		availableAfter: 'catch a nighttime pokemon from routeN1E1',
		requiredUpgrade: 'machete certification',
	},
	'catch a morning pokemon from routeE1': {
		rewardItems: { 'sun-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) =>
					routeE1.possibleEncounters.MORNING.some((e) => e.name === p.name) &&
					p.caughtOnMap === 'routeE1'
			);
		},
		targetPokemon: [
			...new Set(routeE1.possibleEncounters.MORNING.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		requiredUpgrade: 'sledge hammer certification',
	},
	'catch a daytime pokemon from routeE1': {
		rewardItems: { 'fire-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) =>
					routeE1.possibleEncounters.DAY.some((e) => e.name === p.name) &&
					p.caughtOnMap === 'routeE1'
			);
		},
		targetPokemon: [
			...new Set(routeE1.possibleEncounters.DAY.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		requiredUpgrade: 'sledge hammer certification',
	},
	'catch a evening pokemon from routeE1': {
		rewardItems: { 'dusk-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) =>
					routeE1.possibleEncounters.EVENING.some((e) => e.name === p.name) &&
					p.caughtOnMap === 'routeE1'
			);
		},
		targetPokemon: [
			...new Set(routeE1.possibleEncounters.EVENING.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		requiredUpgrade: 'sledge hammer certification',
	},
	'catch a nighttime pokemon from routeE1': {
		rewardItems: { 'moon-stone': 1 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) =>
					routeE1.possibleEncounters.NIGHT.some((e) => e.name === p.name) &&
					p.caughtOnMap === 'routeE1'
			);
		},
		targetPokemon: [
			...new Set(routeE1.possibleEncounters.NIGHT.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		requiredUpgrade: 'sledge hammer certification',
	},
	'catch a ultra rare pokemon on routeE1': {
		rewardItems: { 'berry-juice': 5 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) =>
					[
						...routeE1.possibleEncounters.NIGHT,
						...routeE1.possibleEncounters.MORNING,
						...routeE1.possibleEncounters.DAY,
						...routeE1.possibleEncounters.EVENING,
					].some((e) => e.rarity === 'ultra-rare' && e.name === p.name) &&
					p.caughtOnMap === 'routeE1'
			);
		},
		targetPokemon: [
			...new Set(
				[
					...routeE1.possibleEncounters.NIGHT,
					...routeE1.possibleEncounters.MORNING,
					...routeE1.possibleEncounters.DAY,
					...routeE1.possibleEncounters.EVENING,
				]
					.filter((p) => p.rarity === 'ultra-rare')
					.map((p) => p.name)
			),
		],
		kind: 'BULLETIN',
		requiredUpgrade: 'sledge hammer certification',
	},
	'catch all morning pokemon from routeE1': {
		rewardItems: { 'hyper-potion': 2 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeE1.possibleEncounters.EVENING.every((e) =>
				s.pokemon.some((p) => p.name === e.name && p.caughtOnMap === 'routeE1')
			);
		},
		targetPokemon: [
			...new Set(routeE1.possibleEncounters.MORNING.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		availableAfter: 'catch a morning pokemon from routeE1',
		requiredUpgrade: 'sledge hammer certification',
	},
	'catch all daytime pokemon from routeE1': {
		rewardItems: { honey: 10 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeE1.possibleEncounters.DAY.every((e) =>
				s.pokemon.some((p) => p.name === e.name && p.caughtOnMap === 'routeE1')
			);
		},
		targetPokemon: [
			...new Set(routeE1.possibleEncounters.DAY.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		availableAfter: 'catch a daytime pokemon from routeE1',
		requiredUpgrade: 'sledge hammer certification',
	},
	'catch all evening pokemon from routeE1': {
		rewardItems: { 'full-heal': 5 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeE1.possibleEncounters.MORNING.every((e) =>
				s.pokemon.some((p) => p.name === e.name && p.caughtOnMap === 'routeE1')
			);
		},
		targetPokemon: [
			...new Set(routeE1.possibleEncounters.EVENING.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		availableAfter: 'catch a evening pokemon from routeE1',
		requiredUpgrade: 'sledge hammer certification',
	},
	'catch all nighttime pokemon from routeE1': {
		rewardItems: { 'ultra-ball': 10 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return routeE1.possibleEncounters.NIGHT.every((e) =>
				s.pokemon.some((p) => p.name === e.name && p.caughtOnMap === 'routeE1')
			);
		},
		targetPokemon: [
			...new Set(routeE1.possibleEncounters.NIGHT.map((p) => p.name)),
		],
		kind: 'BULLETIN',
		availableAfter: 'catch a nighttime pokemon from routeE1',
		requiredUpgrade: 'sledge hammer certification',
	},
	'catch all honeytree pokemon': {
		rewardItems: { 'sun-stone': 2, 'leaf-stone': 2, 'berry-juice': 5 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return honeyPokemon.every((e) => s.pokemon.some((p) => p.name === e));
		},
		targetPokemon: honeyPokemon,
		kind: 'BULLETIN',
		availableAfter: 'lure a pokemon with honey',
		requiredUpgrade: 'build combee hive',
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
		rewardItems: { 'ultra-ball': 10 },
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
		requiredUpgrade: 'invite apricorn smith kurt',
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
	'evolve a pokemon through level up': {
		rewardItems: { 'thunder-stone': 1 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.mileStones.hasEvolvedAPokemonThroughLevelUp;
		},
		kind: 'QUEST_LINE',
	},
	'evolve a pokemon with a stone': {
		rewardItems: { 'metal-coat': 1 },
		researchPoints: 15,
		conditionFunction: (s) => {
			return s.mileStones.hasEvolvedAPokemonWithAStone;
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon through level up',
	},
	'evolve a pokemon with a held item': {
		rewardItems: { 'rare-candy': 1 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return s.mileStones.hasEvolvedAPokemonWithAHeldItem;
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon with a stone',
	},
	'evolve a pokemon through friendship': {
		rewardItems: { 'leaf-stone': 1, 'sun-stone': 1 },
		researchPoints: 25,
		conditionFunction: (s) => {
			return s.mileStones.hasEvolvedAPokemonWithAHeldItem;
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon with a held item',
	},
	'catch vileplume and bellosom': {
		rewardItems: { 'rare-candy': 5 },
		researchPoints: 30,
		targetPokemon: ['bellossom', 'vileplume'],
		conditionFunction: (s) => {
			return (
				s.pokemon.some((p) => p.name === 'bellossom') &&
				s.pokemon.some((p) => p.name === 'vileplume')
			);
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon through friendship',
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
	'defeat ten training field trainers': {
		rewardItems: {
			calcium: 1,
			zinc: 1,
			iron: 1,
			carbos: 1,
			protein: 1,
			'hp-up': 1,
		},
		researchPoints: 30,
		conditionFunction: (s) => {
			const defeatedTrainers = s.handledOccupants.filter((h) =>
				trainers.some((t) => t.id === h.id)
			).length;
			return defeatedTrainers > 9;
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'defeat five training field trainers',
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
	'catch a pokemon in an apricorn ball': {
		kind: 'BULLETIN',
		rewardItems: {
			'black-apricorn': 5,
			'blue-apricorn': 5,
			'green-apricorn': 5,
			'pink-apricorn': 5,
			'red-apricorn': 5,
			'white-apricorn': 5,
			'yellow-apricorn': 5,
		},
		researchPoints: 10,
		availableAfter: 'craft a apricorn ball',
		conditionFunction: (s) =>
			s.pokemon.some((p) => Object.values(apricornTable).includes(p.ball)),
	},
	'catch a pokemon in every type of apricorn ball': {
		kind: 'BULLETIN',
		rewardItems: {
			'black-apricorn': 5,
			'blue-apricorn': 5,
			'green-apricorn': 5,
			'pink-apricorn': 5,
			'red-apricorn': 5,
			'white-apricorn': 5,
			'yellow-apricorn': 5,
		},
		researchPoints: 30,
		availableAfter: 'catch a pokemon in an apricorn ball',
		conditionFunction: (s) =>
			Object.values(apricornTable).every((apricornBall) =>
				s.pokemon.some((p) => p.ball === apricornBall)
			),
	},
	'catch a very heavy specimen': {
		kind: 'BULLETIN',
		rewardItems: {
			'pp-up': 1,
		},
		researchPoints: 10,
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.weightModifier && p.weightModifier > 0.9),
	},

	'catch a very light specimen': {
		kind: 'BULLETIN',
		rewardItems: {
			'sitrus-berry': 5,
		},
		researchPoints: 10,
		availableAfter: 'catch a very heavy specimen',
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.weightModifier && p.weightModifier < 0.1),
	},
	'catch a tiny specimen': {
		kind: 'BULLETIN',
		rewardItems: {
			'yellow-apricorn': 5,
		},
		researchPoints: 10,
		availableAfter: 'catch a very light specimen',
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.heightModifier && p.heightModifier < 0.1),
	},
	'catch a gigantic specimen': {
		kind: 'BULLETIN',
		rewardItems: {
			'green-apricorn': 5,
		},
		researchPoints: 10,
		availableAfter: 'catch a tiny specimen',
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.heightModifier && p.heightModifier > 0.9),
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
		targetPokemon: ['haunter', 'mightyena'],
		kind: 'QUEST_LINE',
	},
	'catch a spiritomb': {
		rewardItems: { 'rare-candy': 3 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokemon.some((p) => p.name === 'spiritomb');
		},
		targetPokemon: ['spiritomb'],
		kind: 'QUEST_LINE',
	},
	'defeat morty': {
		rewardItems: {
			'ultra-ball': 10,
			'full-restore': 5,
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Morty');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'catch Haunter and Mightyena',
	},
	'revive a fossil': {
		kind: 'BULLETIN',
		rewardItems: {
			honey: 6,
			'great-ball': 10,
		},
		researchPoints: 10,
		conditionFunction: (s) => {
			return Object.values(fossilTable).every((fossil) =>
				s.pokemon.some((p) => fossil === p.name)
			);
		},
		requiredUpgrade: 'invite fossil expert',
	},
	'revive all different fossils': {
		kind: 'BULLETIN',
		rewardItems: {
			'rare-candy': 5,
			'ultra-ball': 20,
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return Object.values(fossilTable).every((fossil) =>
				s.pokemon.some((p) => fossil === p.name)
			);
		},
		requiredUpgrade: 'invite fossil expert',
		availableAfter: 'revive a fossil',
	},
};

console.log(
	'total research points',
	Object.values(QuestsRecord).reduce(
		(sum, summand) => sum + summand.researchPoints,
		0
	),
	'total costs',
	Object.values(campUpgradePrices).reduce((sum, summand) => sum + summand, 0)
);
