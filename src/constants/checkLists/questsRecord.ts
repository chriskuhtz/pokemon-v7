import { calculateLevelData } from '../../functions/calculateLevelData';
import { timesOfDay } from '../../functions/getTimeOfDay';
import { trainers } from '../../functions/makeRandomTrainer';
import { honeyPokemon } from '../../hooks/useHoneyTree';
import { Inventory } from '../../interfaces/Inventory';
import {
	apricorns,
	apricornTable,
	berries,
	fossilTable,
} from '../../interfaces/Item';
import { OverworldMap } from '../../interfaces/OverworldMap';
import { Quest } from '../../interfaces/Quest';
import {
	EmptyStatObject,
	generateRandomStatObject,
} from '../../interfaces/StatObject';
import { routeE1 } from '../maps/routeE1';
import { routeN1 } from '../maps/routeN1';
import { routeN1E1 } from '../maps/routeN1E1';
import { pokemonNames } from '../pokemonNames';
import { CampUpgrade, campUpgradePrices } from './campUpgrades';

const rewardsMap: Partial<Record<QuestName, Partial<Inventory>>> = {
	//routeN1
	'catch a MORNING-time exclusive pokemon from routeN1': {
		'poke-ball': 5,
		'sitrus-berry': 2,
	},
	'catch a DAY-time exclusive pokemon from routeN1': {
		'poke-ball': 5,
		'cheri-berry': 2,
	},
	'catch a EVENING-time exclusive pokemon from routeN1': {
		'poke-ball': 5,
		'chesto-berry': 2,
	},
	'catch a NIGHT-time exclusive pokemon from routeN1': {
		'poke-ball': 5,
		'pecha-berry': 2,
	},
	'catch all MORNING-time pokemon from routeN1': {
		'poke-ball': 10,
		'rawst-berry': 2,
	},
	'catch all DAY-time pokemon from routeN1': {
		'poke-ball': 10,
		'aspear-berry': 2,
	},
	'catch all EVENING-time pokemon from routeN1': {
		'poke-ball': 10,
		'leppa-berry': 2,
	},
	'catch all NIGHT-time pokemon from routeN1': {
		'poke-ball': 10,
		'oran-berry': 2,
	},
	//routeN1E1
	'catch a MORNING-time exclusive pokemon from routeN1E1': {
		'net-ball': 5,
		'persim-berry': 2,
	},
	'catch a DAY-time exclusive pokemon from routeN1E1': {
		'net-ball': 5,
		'lum-berry': 2,
	},
	'catch a EVENING-time exclusive pokemon from routeN1E1': {
		'net-ball': 5,
		'figy-berry': 2,
	},
	'catch a NIGHT-time exclusive pokemon from routeN1E1': {
		'net-ball': 5,
		'mago-berry': 2,
	},
	'catch all MORNING-time pokemon from routeN1E1': {
		'net-ball': 10,
		'iapapa-berry': 2,
	},
	'catch all DAY-time pokemon from routeN1E1': {
		'net-ball': 10,
		'bluk-berry': 2,
	},
	'catch all EVENING-time pokemon from routeN1E1': {
		'net-ball': 10,
		'nanab-berry': 2,
	},
	'catch all NIGHT-time pokemon from routeN1E1': {
		'net-ball': 10,
		'odd-keystone': 1,
	},
	//routeE1
	'catch a MORNING-time exclusive pokemon from routeE1': {
		'quick-ball': 5,
		'aguav-berry': 2,
	},
	'catch a DAY-time exclusive pokemon from routeE1': {
		'quick-ball': 5,
		'wiki-berry': 2,
	},
	'catch a EVENING-time exclusive pokemon from routeE1': {
		'quick-ball': 5,
		'razz-berry': 2,
	},
	'catch a NIGHT-time exclusive pokemon from routeE1': {
		'quick-ball': 5,
		'wepear-berry': 2,
	},
	'catch all MORNING-time pokemon from routeE1': {
		'quick-ball': 10,
		'pinap-berry': 2,
	},
	'catch all DAY-time pokemon from routeE1': {
		'quick-ball': 10,
		'pomeg-berry': 2,
	},
	'catch all EVENING-time pokemon from routeE1': {
		'quick-ball': 10,
		'kelpsy-berry': 2,
	},
	'catch all NIGHT-time pokemon from routeE1': {
		'quick-ball': 10,
		'qualot-berry': 1,
	},
};

const catchQuestsForRoute = (
	route: OverworldMap,
	requiredUpgrade?: CampUpgrade
): Partial<Record<string, Quest>> => {
	return {
		...Object.fromEntries(
			timesOfDay.map((time) => {
				const id = `catch a ${time}-time exclusive pokemon from ${route.id}`;
				return [
					id,
					{
						rewardItems: rewardsMap[id] ?? { 'poke-ball': 10 },
						researchPoints: 5,
						conditionFunction: (s) => {
							return route.possibleEncounters[time].some((e) =>
								s.pokedex[e.name].caughtOnRoutes.includes(route.id)
							);
						},
						targetPokemon: [
							...new Set(route.possibleEncounters[time].map((p) => p.name)),
						],
						targetRoute: route.id,
						kind: 'BULLETIN',
						requiredUpgrade: requiredUpgrade,
					},
				] as [QuestName, Quest];
			})
		),
		...Object.fromEntries(
			timesOfDay.map((time) => {
				const id: QuestName = `catch all ${time}-time pokemon from ${route.id}`;
				return [
					id,
					{
						rewardItems: rewardsMap[id] ?? { 'poke-ball': 10 },
						availableAfter: `catch a ${time}-time exclusive pokemon from ${route.id}`,
						researchPoints: 20,
						conditionFunction: (s) => {
							return [
								...route.possibleEncounters.BASE,
								...route.possibleEncounters[time],
							].every((e) =>
								s.pokedex[e.name].caughtOnRoutes.includes(route.id)
							);
						},
						targetPokemon: [
							...new Set(
								[
									...route.possibleEncounters.BASE,
									...route.possibleEncounters[time],
								].map((p) => p.name)
							),
						],
						targetRoute: route.id,
						kind: 'BULLETIN',
						requiredUpgrade: requiredUpgrade,
					},
				] as [QuestName, Quest];
			})
		),
		[`catch a ultra-rare pokemon from ${route.id}`]: {
			rewardItems: { 'rare-candy': 1 },
			researchPoints: 20,
			conditionFunction: (s) => {
				return [
					...routeN1.possibleEncounters.NIGHT,
					...routeN1.possibleEncounters.MORNING,
					...routeN1.possibleEncounters.DAY,
					...routeN1.possibleEncounters.EVENING,
				].some(
					(e) =>
						e.rarity === 'ultra-rare' &&
						s.pokedex[e.name].caughtOnRoutes.includes('routeN1')
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
			targetRoute: 'routeN1',
			kind: 'BULLETIN',
			requiredUpgrade: requiredUpgrade,
		},
	};
};

const catchQuests = {
	...catchQuestsForRoute(routeN1),
	...catchQuestsForRoute(routeN1E1, 'machete certification'),
	...catchQuestsForRoute(routeE1, 'sledge hammer certification'),
};

export const questNames = [
	...Object.keys(catchQuests),
	'catch a pikachu',
	'catch a pokemon',
	'catch a spiritomb',
	'catch Haunter and Mightyena',
	'catch some local bird pokemon',
	'catch a pokemon orginally found in kanto',
	'catch a pokemon orginally found in johto',
	'catch a pokemon orginally found in hoenn',
	'catch a pokemon orginally found in sinnoh',
	'catch a pokemon orginally found in unova',
	'catch a pokemon orginally found in kalos',
	'catch a pokemon orginally found in alola',
	'catch a pokemon orginally found in galar',
	'catch a pokemon orginally found in paldea',
	'catch a pokemon and its alolan variant',
	'catch a pokemon and its galarian variant',
	'catch a pokemon and its hisui variant',
	'catch a pokemon and its paldea variant',
	'defeat rowan',
	'craft a apricorn ball',
	'lure a pokemon with honey',
	'catch all honeytree pokemon',
	'evolve a pokemon through level up',
	'evolve a pokemon with a stone',
	'evolve a pokemon with a held item',
	'evolve a pokemon through friendship',
	'catch vileplume and bellosom',
	'evolve a pokemon that only evolves during the day',
	'evolve a pokemon that only evolves at night',
	'defeat elm',
	'train a pokemon to level 10',
	'train a pokemon to level 20',
	'train a pokemon to level 30',
	'defeat a training field trainer',
	'defeat five training field trainers',
	'defeat ten training field trainers',
	'defeat twenty training field trainers',
	'defeat thirty training field trainers',
	'defeat forty training field trainers',
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
	'evolve your starter pokemon',
	'evolve your starter pokemon to its final form',
	'catch a shiny pokemon',
	'cook an easy recipe',
	'cook a medium recipe',
	'cook a tricky recipe',
	'catch 10 different species',
	'catch 20 different species',
	'catch 50 different species',
	'catch a swarm pokemon',
	'find a pokemon under a smashed rock',
	'donate 1 plant to the seed vault',
	'donate 20 plants to the seed vault',
	'donate 50 plants to the seed vault',
	'donate all different plants to the seed vault',
] as const;
/**
 * Ideas:
 * falkner evolve single stage birds
 * falkner evolve stronger birds
 * falkner roaming arcticuno quest
 * defeat falkner
 * all eeveelutions as final elm quest
 * onix cave some
 * onix cave all
 * achieve cooking level x
 * retrieve item from wild pokemon (special encounter)
 */
export type QuestName = (typeof questNames)[number];

export const QuestsRecord: Record<QuestName, Quest> = {
	...catchQuests,
	'catch a pokemon': {
		rewardItems: { 'poke-ball': 5 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.length > 1;
		},
		kind: 'QUEST_LINE',
	},
	'catch a pikachu': {
		rewardItems: { 'berry-juice': 2 },
		researchPoints: 10,
		targetPokemon: ['pikachu'],
		conditionFunction: (s) => {
			return s.pokedex.pikachu.caughtOnRoutes.length > 0;
		},
		kind: 'BULLETIN',
	},
	'catch all honeytree pokemon': {
		rewardItems: { 'sun-stone': 2, 'leaf-stone': 2, 'berry-juice': 5 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return honeyPokemon.every((e) => s.pokedex[e].caughtOnRoutes.length > 0);
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
		conditionFunction: (s) => !!s.mileStones.hasCraftedApricorn,
	},
	'lure a pokemon with honey': {
		rewardItems: { 'sitrus-berry': 3 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return !!s.mileStones.hasCaughtAPokemonWithHoney;
		},
		kind: 'BULLETIN',
	},
	'evolve a pokemon through level up': {
		rewardItems: { 'thunder-stone': 1 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return !!s.mileStones.hasEvolvedAPokemonThroughLevelUp;
		},
		kind: 'QUEST_LINE',
	},
	'evolve a pokemon with a stone': {
		rewardItems: { 'metal-coat': 1 },
		researchPoints: 15,
		conditionFunction: (s) => {
			return !!s.mileStones.hasEvolvedAPokemonWithAStone;
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon through level up',
	},
	'evolve a pokemon with a held item': {
		rewardItems: { 'rare-candy': 1 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return !!s.mileStones.hasEvolvedAPokemonWithAHeldItem;
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon with a stone',
	},
	'evolve a pokemon through friendship': {
		rewardItems: { 'leaf-stone': 1, 'sun-stone': 1 },
		researchPoints: 25,
		conditionFunction: (s) => {
			return !!s.mileStones.hasEvolvedAPokemonWithAHeldItem;
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon with a held item',
	},
	'catch vileplume and bellosom': {
		rewardItems: { 'metal-coat': 1, 'black-augurite': 1 },
		researchPoints: 30,
		targetPokemon: ['bellossom', 'vileplume'],
		conditionFunction: (s) => {
			return (
				s.pokedex['bellossom'].caughtOnRoutes.length > 0 &&
				s.pokedex['vileplume'].caughtOnRoutes.length > 0
			);
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon through friendship',
	},
	'evolve a pokemon that only evolves during the day': {
		rewardItems: { 'ultra-ball': 20 },
		researchPoints: 25,
		conditionFunction: (s) => {
			return !!s.mileStones.hasEvolvedAPokemonThatNeedsDaytime;
		},
		kind: 'QUEST_LINE',
		availableAfter: 'catch vileplume and bellosom',
	},
	'evolve a pokemon that only evolves at night': {
		rewardItems: { 'ultra-ball': 20 },
		researchPoints: 25,
		conditionFunction: (s) => {
			return !!s.mileStones.hasEvolvedAPokemonThatNeedsNighttime;
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon that only evolves during the day',
	},
	'train a pokemon to level 10': {
		rewardItems: { 'exp-share': 1 },
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
		researchPoints: 10,
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
		researchPoints: 15,
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
	'defeat twenty training field trainers': {
		rewardItems: {
			calcium: 1,
			zinc: 1,
			iron: 1,
			carbos: 1,
			protein: 1,
			'hp-up': 1,
		},
		researchPoints: 20,
		conditionFunction: (s) => {
			const defeatedTrainers = s.handledOccupants.filter((h) =>
				trainers.some((t) => t.id === h.id)
			).length;
			return defeatedTrainers > 19;
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 2',
		availableAfter: 'defeat ten training field trainers',
	},
	'defeat thirty training field trainers': {
		rewardItems: {
			calcium: 1,
			zinc: 1,
			iron: 1,
			carbos: 1,
			protein: 1,
			'hp-up': 1,
		},
		researchPoints: 25,
		conditionFunction: (s) => {
			const defeatedTrainers = s.handledOccupants.filter((h) =>
				trainers.some((t) => t.id === h.id)
			).length;
			return defeatedTrainers > 29;
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 2',
		availableAfter: 'defeat twenty training field trainers',
	},
	'defeat forty training field trainers': {
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
			return defeatedTrainers > 39;
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 2',
		availableAfter: 'defeat thirty training field trainers',
	},
	'grow a berry': {
		rewardItems: {
			'damp-mulch': 2,
			'growth-mulch': 2,
			'gooey-mulch': 2,
			'stable-mulch': 2,
		},
		researchPoints: 10,
		conditionFunction: (s) => !!s.mileStones.hasGrownABerry,
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
		conditionFunction: (s) => !!s.mileStones.hasGrownAnApricorn,
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
				s.pokedex['haunter'].caughtOnRoutes.length > 0 &&
				s.pokedex['mightyena'].caughtOnRoutes.length > 0
			);
		},
		targetPokemon: ['haunter', 'mightyena'],
		kind: 'QUEST_LINE',
	},
	'catch a spiritomb': {
		rewardItems: { 'rare-candy': 3 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokedex['spiritomb'].caughtOnRoutes.length > 0;
		},
		targetPokemon: ['spiritomb'],
		kind: 'QUEST_LINE',
	},
	'defeat morty': {
		rewardItems: {
			'ultra-ball': 10,
			'full-restore': 5,
		},
		rewardPokemon: {
			fixedAbility: true,
			shiny: true,
			maxHp: 30,
			effortValues: EmptyStatObject,
			ppBoostedMoves: [],
			caughtOnMap: 'camp',
			gender: 'MALE',
			stepsWalked: 0,
			ownerId: '',
			damage: 0,
			id: '',
			ball: 'poke-ball',
			ability: 'serene-grace',
			name: 'dreepy',
			xp: 125,
			nature: 'adamant',
			intrinsicValues: generateRandomStatObject(31),
			happiness: 70,
			firstMove: { name: 'ominous-wind', usedPP: 0 },
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Morty');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'catch Haunter and Mightyena',
	},
	'catch some local flying pokemon': {
		rewardItems: { 'white-herb': 2 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return (
				s.pokedex['pidgey'].caughtOnRoutes.length > 0 &&
				s.pokedex['spearow'].caughtOnRoutes.length > 0 &&
				s.pokedex['taillow'].caughtOnRoutes.length > 0 &&
				s.pokedex['murkrow'].caughtOnRoutes.length > 0 &&
				s.pokedex['starly'].caughtOnRoutes.length > 0
			);
		},
		targetPokemon: ['pidgey', 'spearow', 'taillow', 'murkrow'],
		kind: 'QUEST_LINE',
	},
	'evolve some local flying pokemon': {
		rewardItems: { 'coba-berry': 2 },
		researchPoints: 15,
		conditionFunction: (s) => {
			return (
				s.pokedex['pidgeotto'].caughtOnRoutes.length > 0 &&
				s.pokedex['staravia'].caughtOnRoutes.length > 0
			);
		},
		targetPokemon: ['pidgeotto', 'staravia'],
		kind: 'QUEST_LINE',
	},
	'defeat rowan': {
		rewardItems: {
			'ultra-ball': 10,
			'full-restore': 5,
		},
		rewardPokemon: {
			fixedAbility: true,
			shiny: true,
			maxHp: 30,
			effortValues: EmptyStatObject,
			ppBoostedMoves: [],
			caughtOnMap: 'camp',
			gender: 'MALE',
			stepsWalked: 0,
			ownerId: '',
			damage: 0,
			id: '',
			ball: 'poke-ball',
			ability: 'huge-power',
			name: 'gible',
			xp: 125,
			nature: 'adamant',
			intrinsicValues: generateRandomStatObject(31),
			happiness: 70,
			firstMove: { name: 'earthquake', usedPP: 0 },
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Professor Rowan');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'catch a pokemon and its paldea variant',
	},
	'defeat elm': {
		rewardItems: {
			'ultra-ball': 10,
			'full-restore': 5,
		},
		rewardPokemon: {
			fixedAbility: true,
			shiny: true,
			maxHp: 30,
			effortValues: EmptyStatObject,
			ppBoostedMoves: [],
			caughtOnMap: 'camp',
			gender: 'MALE',
			stepsWalked: 0,
			ownerId: '',
			damage: 0,
			id: '',
			ball: 'poke-ball',
			ability: 'speed-boost',
			name: 'larvitar',
			xp: 125,
			nature: 'adamant',
			intrinsicValues: generateRandomStatObject(31),
			happiness: 70,
			firstMove: { name: 'earthquake', usedPP: 0 },
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Professor Elm');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'catch a pokemon and its paldea variant',
	},
	'revive a fossil': {
		kind: 'BULLETIN',
		rewardItems: {
			honey: 6,
			'great-ball': 10,
		},
		researchPoints: 10,
		conditionFunction: (s) => {
			return Object.values(fossilTable).some(
				(fossil) => s.pokedex[fossil].caughtOnRoutes.length > 0
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
			return Object.values(fossilTable).every(
				(fossil) => s.pokedex[fossil].caughtOnRoutes.length > 0
			);
		},
		requiredUpgrade: 'invite fossil expert',
		availableAfter: 'revive a fossil',
	},
	'evolve your starter pokemon': {
		kind: 'QUEST_LINE',
		rewardItems: {
			'rare-candy': 2,
		},
		researchPoints: 10,
		conditionFunction: (s) => {
			if (s.starterPokemon === 'bulbasaur') {
				return s.pokemon.some(
					(p) => p.name === 'ivysaur' || p.name === 'venusaur'
				);
			}
			if (s.starterPokemon === 'squirtle') {
				return s.pokemon.some(
					(p) => p.name === 'wartortle' || p.name === 'blastoise'
				);
			}
			if (s.starterPokemon === 'charmander') {
				return s.pokemon.some(
					(p) => p.name === 'charmeleon' || p.name === 'charizard'
				);
			}

			return false;
		},
	},
	'evolve your starter pokemon to its final form': {
		kind: 'QUEST_LINE',
		rewardItems: {
			'rare-candy': 5,
		},
		researchPoints: 25,
		conditionFunction: (s) => {
			if (s.starterPokemon === 'bulbasaur') {
				return s.pokemon.some((p) => p.name === 'venusaur');
			}
			if (s.starterPokemon === 'squirtle') {
				return s.pokemon.some((p) => p.name === 'blastoise');
			}
			if (s.starterPokemon === 'charmander') {
				return s.pokemon.some((p) => p.name === 'charizard');
			}

			return false;
		},
	},
	'catch a shiny pokemon': {
		kind: 'BULLETIN',
		rewardItems: {
			'master-ball': 1,
		},
		researchPoints: 50,
		conditionFunction: (s) => s.pokemon.some((p) => p.shiny),
	},
	'cook an easy recipe': {
		kind: 'BULLETIN',
		researchPoints: 10,
		rewardItems: {
			'nanab-berry': 1,
			'bluk-berry': 1,
			'kelpsy-berry': 1,
			'pomeg-berry': 1,
			'oran-berry': 1,
		},
		requiredUpgrade: 'invite chef grandma',
		conditionFunction: (s) => !!s.mileStones.cookedEasyRecipe,
	},
	'cook a medium recipe': {
		kind: 'BULLETIN',
		researchPoints: 15,
		rewardItems: {
			'pecha-berry': 1,
			'chesto-berry': 1,
			'cheri-berry': 1,
		},
		requiredUpgrade: 'invite chef grandma',
		availableAfter: 'cook an easy recipe',
		conditionFunction: (s) => !!s.mileStones.cookedMediumRecipe,
	},
	'cook a tricky recipe': {
		kind: 'BULLETIN',
		researchPoints: 25,
		rewardItems: {
			'sitrus-berry': 1,
			'leppa-berry': 1,
			'lum-berry': 1,
		},
		requiredUpgrade: 'invite chef grandma',
		availableAfter: 'cook a medium recipe',
		conditionFunction: (s) => !!s.mileStones.cookedTrickyRecipe,
	},
	'catch 10 different species': {
		kind: 'BULLETIN',
		researchPoints: 10,
		rewardItems: {
			'poke-ball': 20,
		},
		conditionFunction: (s) =>
			Object.values(s.pokedex).filter((p) => p.caughtOnRoutes.length > 0)
				.length >= 10,
	},
	'catch 20 different species': {
		kind: 'BULLETIN',
		researchPoints: 25,
		rewardItems: {
			'great-ball': 20,
		},
		availableAfter: 'catch 10 different species',
		conditionFunction: (s) =>
			Object.values(s.pokedex).filter((p) => p.caughtOnRoutes.length > 0)
				.length >= 20,
	},
	'catch 50 different species': {
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: {
			'master-ball': 1,
		},
		availableAfter: 'catch 50 different species',
		conditionFunction: (s) =>
			Object.values(s.pokedex).filter((p) => p.caughtOnRoutes.length > 0)
				.length >= 50,
	},
	'catch a swarm pokemon': {
		kind: 'BULLETIN',
		researchPoints: 20,
		rewardItems: {
			'sitrus-berry': 5,
		},
		requiredUpgrade: 'pokemon swarm radar',
		conditionFunction: (s) => !!s.mileStones.hasCaughtASwarmPokemon,
	},
	'find a pokemon under a smashed rock': {
		kind: 'BULLETIN',
		researchPoints: 20,
		rewardItems: {
			'sitrus-berry': 5,
		},
		requiredUpgrade: 'sledge hammer certification',
		conditionFunction: (s) => !!s.mileStones.hasfoundAPokemonBySmashingRocks,
	},
	'donate 1 plant to the seed vault': {
		kind: 'BULLETIN',
		requiredUpgrade: 'create seed vault',
		researchPoints: 5,
		rewardItems: { 'moomoo-milk': 3 },
		conditionFunction: (s) => !!(s.seedVault && s.seedVault.length > 0),
	},
	'donate 20 plants to the seed vault': {
		kind: 'BULLETIN',
		requiredUpgrade: 'create seed vault',
		availableAfter: 'donate 1 plant to the seed vault',
		researchPoints: 10,
		rewardItems: { 'moomoo-milk': 10 },
		conditionFunction: (s) => !!(s.seedVault && s.seedVault.length >= 20),
	},
	'donate 50 plants to the seed vault': {
		kind: 'BULLETIN',
		requiredUpgrade: 'create seed vault',
		availableAfter: 'donate 20 plants to the seed vault',
		researchPoints: 50,
		rewardItems: { 'moomoo-milk': 10, 'ultra-ball': 20 },
		conditionFunction: (s) => !!(s.seedVault && s.seedVault.length >= 50),
	},
	'donate all different plants to the seed vault': {
		kind: 'BULLETIN',
		requiredUpgrade: 'create seed vault',
		availableAfter: 'donate 50 plants to the seed vault',
		researchPoints: 200,
		rewardItems: { 'master-ball': 1 },
		conditionFunction: (s) =>
			[...berries, ...apricorns].every((item) => s.seedVault?.includes(item)),
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
