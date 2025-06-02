import { v4 } from 'uuid';
import { calculateLevelData } from '../functions/calculateLevelData';

import { sumOfIvs } from '../functions/sumOfIvs';

import {
	apricorns,
	apricornTable,
	berries,
	expCandyPackage,
	fossilTable,
	smallExpCandyPackage,
} from '../interfaces/Item';
import { getRandomNature } from '../interfaces/Natures';
import { Quest } from '../interfaces/Quest';
import { SaveFile } from '../interfaces/SaveFile';
import {
	EmptyStatObject,
	generateRandomStatObject,
} from '../interfaces/StatObject';
import { moveUnlockPayments } from '../modules/MoveTutor/MoveTutor';
import { highBstPokemon, lowBstPokemon, midBstPokemon } from './baseStatRecord';
import {
	campUpgradeCategories,
	campUpgradeCostScale,
	campUpgradeNames,
} from './campUpgrades';
import { catchQuests } from './generatedQuests/catchQuests';
import { gymLeaderQuests } from './generatedQuests/gymLeaderQuests';
import { travellingTrainerQuests } from './generatedQuests/travellingTrainersQuests';
import { typeCatchQuests } from './generatedQuests/typeCatchQuests';
import {
	getAllEncountersFor,
	getHoneyEncounters,
	getSwarmOptions,
	getUnderRockEncounters,
} from './internalDex';
import { internalDex } from './internalDexData';
import { allRocketCampTrainersDefeated } from './maps/occupants/rocketCampOccupants';
import { PokemonName, pokemonNames } from './pokemonNames';
import {
	tier1trainers,
	tier2trainers,
	tier3trainers,
	tier4trainers,
	tier5trainers,
	trainers,
} from './trainersRecord';

export const questNames = [
	'catch a fire pokemon',
	'catch 10 different fire pokemon',
	'catch 25 different fire pokemon',
	'catch 50 different fire pokemon',
	'catch a water pokemon',
	'catch 10 different water pokemon',
	'catch 25 different water pokemon',
	'catch 50 different water pokemon',
	'catch a grass pokemon',
	'catch 10 different grass pokemon',
	'catch 25 different grass pokemon',
	'catch 50 different grass pokemon',
	'catch a electric pokemon',
	'catch 10 different electric pokemon',
	'catch 25 different electric pokemon',
	'catch 50 different electric pokemon',
	'catch a ghost pokemon',
	'catch 10 different ghost pokemon',
	'catch 25 different ghost pokemon',
	'catch 50 different ghost pokemon',
	'catch a dark pokemon',
	'catch 10 different dark pokemon',
	'catch 25 different dark pokemon',
	'catch 50 different dark pokemon',
	'catch a psychic pokemon',
	'catch 10 different psychic pokemon',
	'catch 25 different psychic pokemon',
	'catch 50 different psychic pokemon',
	'catch a rock pokemon',
	'catch 10 different rock pokemon',
	'catch 25 different rock pokemon',
	'catch 50 different rock pokemon',
	'catch a ground pokemon',
	'catch 10 different ground pokemon',
	'catch 25 different ground pokemon',
	'catch 50 different ground pokemon',
	'catch a steel pokemon',
	'catch 10 different steel pokemon',
	'catch 25 different steel pokemon',
	'catch 50 different steel pokemon',
	'catch a ice pokemon',
	'catch 10 different ice pokemon',
	'catch 25 different ice pokemon',
	'catch 50 different ice pokemon',
	'catch a dragon pokemon',
	'catch 10 different dragon pokemon',
	'catch 25 different dragon pokemon',
	'catch 50 different dragon pokemon',
	'catch a fighting pokemon',
	'catch 10 different fighting pokemon',
	'catch 25 different fighting pokemon',
	'catch 50 different fighting pokemon',
	'catch a flying pokemon',
	'catch 10 different flying pokemon',
	'catch 25 different flying pokemon',
	'catch 50 different flying pokemon',
	'catch a poison pokemon',
	'catch 10 different poison pokemon',
	'catch 25 different poison pokemon',
	'catch 50 different poison pokemon',
	'catch a bug pokemon',
	'catch 10 different bug pokemon',
	'catch 25 different bug pokemon',
	'catch 50 different bug pokemon',
	'catch a fairy pokemon',
	'catch 10 different fairy pokemon',
	'catch 25 different fairy pokemon',
	'catch 50 different fairy pokemon',
	'catch a normal pokemon',
	'catch 10 different normal pokemon',
	'catch 25 different normal pokemon',
	'catch 50 different normal pokemon',
	'catch a MORNING-time exclusive pokemon from routeN1',
	'catch a DAY-time exclusive pokemon from routeN1',
	'catch a EVENING-time exclusive pokemon from routeN1',
	'catch a NIGHT-time exclusive pokemon from routeN1',
	'catch all MORNING-time pokemon from routeN1',
	'catch all DAY-time pokemon from routeN1',
	'catch all EVENING-time pokemon from routeN1',
	'catch all NIGHT-time pokemon from routeN1',
	'catch a ultra-rare pokemon from routeN1',
	'catch a MORNING-time exclusive pokemon from routeN1E1',
	'catch a DAY-time exclusive pokemon from routeN1E1',
	'catch a EVENING-time exclusive pokemon from routeN1E1',
	'catch a NIGHT-time exclusive pokemon from routeN1E1',
	'catch all MORNING-time pokemon from routeN1E1',
	'catch all DAY-time pokemon from routeN1E1',
	'catch all EVENING-time pokemon from routeN1E1',
	'catch all NIGHT-time pokemon from routeN1E1',
	'catch a ultra-rare pokemon from routeN1E1',
	'catch a MORNING-time exclusive pokemon from routeE1',
	'catch a DAY-time exclusive pokemon from routeE1',
	'catch a EVENING-time exclusive pokemon from routeE1',
	'catch a NIGHT-time exclusive pokemon from routeE1',
	'catch all MORNING-time pokemon from routeE1',
	'catch all DAY-time pokemon from routeE1',
	'catch all EVENING-time pokemon from routeE1',
	'catch all NIGHT-time pokemon from routeE1',
	'catch a ultra-rare pokemon from routeE1',
	'catch a MORNING-time exclusive pokemon from routeS1E1',
	'catch a DAY-time exclusive pokemon from routeS1E1',
	'catch a EVENING-time exclusive pokemon from routeS1E1',
	'catch a NIGHT-time exclusive pokemon from routeS1E1',
	'catch all MORNING-time pokemon from routeS1E1',
	'catch all DAY-time pokemon from routeS1E1',
	'catch all EVENING-time pokemon from routeS1E1',
	'catch all NIGHT-time pokemon from routeS1E1',
	'catch a ultra-rare pokemon from routeS1E1',
	'catch a MORNING-time exclusive pokemon from routeS1',
	'catch a DAY-time exclusive pokemon from routeS1',
	'catch a EVENING-time exclusive pokemon from routeS1',
	'catch a NIGHT-time exclusive pokemon from routeS1',
	'catch all MORNING-time pokemon from routeS1',
	'catch all DAY-time pokemon from routeS1',
	'catch all EVENING-time pokemon from routeS1',
	'catch all NIGHT-time pokemon from routeS1',
	'catch a ultra-rare pokemon from routeS1',
	'catch a MORNING-time exclusive pokemon from routeS1W1',
	'catch a DAY-time exclusive pokemon from routeS1W1',
	'catch a EVENING-time exclusive pokemon from routeS1W1',
	'catch a NIGHT-time exclusive pokemon from routeS1W1',
	'catch all MORNING-time pokemon from routeS1W1',
	'catch all DAY-time pokemon from routeS1W1',
	'catch all EVENING-time pokemon from routeS1W1',
	'catch all NIGHT-time pokemon from routeS1W1',
	'catch a ultra-rare pokemon from routeS1W1',
	'catch a MORNING-time exclusive pokemon from routeW1',
	'catch a DAY-time exclusive pokemon from routeW1',
	'catch a EVENING-time exclusive pokemon from routeW1',
	'catch a NIGHT-time exclusive pokemon from routeW1',
	'catch all MORNING-time pokemon from routeW1',
	'catch all DAY-time pokemon from routeW1',
	'catch all EVENING-time pokemon from routeW1',
	'catch all NIGHT-time pokemon from routeW1',
	'catch a ultra-rare pokemon from routeW1',
	'catch a MORNING-time exclusive pokemon from routeN1W1',
	'catch a DAY-time exclusive pokemon from routeN1W1',
	'catch a EVENING-time exclusive pokemon from routeN1W1',
	'catch a NIGHT-time exclusive pokemon from routeN1W1',
	'catch all MORNING-time pokemon from routeN1W1',
	'catch all DAY-time pokemon from routeN1W1',
	'catch all EVENING-time pokemon from routeN1W1',
	'catch all NIGHT-time pokemon from routeN1W1',
	'catch a ultra-rare pokemon from routeN1W1',
	'catch a pikachu',
	'find a lightball',
	'catch all mouselike electric pokemon',
	'catch all pikachus with hats',
	'catch a feebas',
	'catch a sudowoodo',
	'catch a pokemon',
	'catch a spiritomb',
	'catch Haunter and Mightyena',
	'catch local dark and ghost pokemon',
	'catch some local flying pokemon',
	'evolve some local flying pokemon',
	'evolve a flying pokemon to its final stage',
	'catch the legendary bird of ice',
	'catch the legendary bird of fire',
	'catch the legendary bird of thunder',
	'catch the legendary beast of water',
	'catch the legendary beast of fire',
	'catch the legendary beast of thunder',
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
	'catch all forms of tauros',
	'defeat rowan',
	'craft a apricorn ball',
	'lure a pokemon with honey',
	'evolve a combee',
	'catch all honeytree pokemon',
	'evolve a pokemon through level up',
	'evolve a pokemon with a stone',
	'evolve a pokemon with a held item',
	'evolve a pokemon through friendship',
	'evolve gloom into vileplume and bellosom',
	'evolve male and female nidoran into their final form',
	'evolve a pokemon that only evolves during the day',
	'evolve a pokemon that only evolves at night',
	'defeat elm',
	'train a pokemon to level 10',
	'train a pokemon to level 20',
	'train a pokemon to level 30',
	'train a pokemon to level 40',
	'train a pokemon to level 50',
	'train a pokemon to level 60',
	'train a pokemon to level 70',
	'train a pokemon to level 80',
	'train a pokemon to level 90',
	'train a pokemon to level 100',
	'defeat a training field trainer',
	'defeat all tier 1 field trainers',
	'defeat all tier 2 field trainers',
	'defeat all tier 3 field trainers',
	'defeat all tier 4 field trainers',
	'defeat all tier 5 field trainers',
	'grow a berry',
	'grow a apricorn',
	'catch a pokemon in an apricorn ball',
	'catch a very heavy specimen',
	'catch a very light specimen',
	'catch a tiny specimen',
	'catch a gigantic specimen',
	'catch a pokemon with perfect attack ivs',
	'catch a pokemon with perfect special-attack ivs',
	'catch a pokemon with perfect defense ivs',
	'catch a pokemon with perfect special-defense ivs',
	'catch a pokemon with perfect speed ivs',
	'catch a pokemon with perfect hp ivs',
	'catch a pokemon with top 90% ivs',
	'catch a pokemon in every type of apricorn ball',
	'defeat morty',
	'defeat bugsy',
	'defeat whitney',
	'defeat jasmine',
	'revive a fossil',
	'revive all different fossils',
	'evolve your starter pokemon',
	'catch a shiny pokemon',
	'cook an easy recipe',
	'cook a medium recipe',
	'cook a tricky recipe',
	'catch 10 different species',
	'catch 20 different species',
	'catch 50 different species',
	'catch 100 different species',
	'catch 150 different species',
	'catch 250 different species',
	'catch 350 different species',
	'catch 450 different species',
	'catch 550 different species',
	'find a pokemon under a smashed rock',
	'donate 1 plant to the seed vault',
	'donate 20 plants to the seed vault',
	'donate 50 plants to the seed vault',
	'donate all different plants to the seed vault',
	'catch a pokemon from onix cave',
	'catch all pokemon from onix cave',
	'catch all pokemon from caveW1',
	'defeat falkner',
	'wake a snorlax',
	'catch all evolutions of eevee',
	'reach cooking skill 20',
	'reach cooking skill 50',
	'reach cooking skill 100',
	'lure a pokemon with a berry',
	'berry-lure all different pokemon from routeN1',
	'berry-lure all different pokemon from routeN1E1',
	'berry-lure all different pokemon from routeE1',
	'berry-lure all different pokemon from routeS1E1',
	'berry-lure all different pokemon from routeS1W1',
	'berry-lure all different pokemon from routeW1',
	'catch a pokemon from a swarm',
	'catch 3 different pokemon from swarms',
	'catch 10 different pokemon from swarms',
	'catch 20 different pokemon from swarms',
	'retrieve oaks parcel from raticate',
	'deal 50 damage with one attack',
	'deal 100 damage with one attack',
	'deal 200 damage with one attack',
	'deal 500 damage with one attack',
	'deal 1000 damage with one attack',
	'deal 2000 damage with one attack',
	'deal 5000 damage with one attack',
	'deal 10000 damage with one attack',
	'deal 20000 damage with one attack',
	'deal 30000 damage with one attack',
	'deal 50000 damage with one attack',
	'defeat chuck',
	'catch all pokemon that live under rocks',
	'defeat erika',
	'defeat janine',
	'defeat blaine',
	'defeat surge',
	'defeat misty',
	'defeat sabrina',
	'defeat brock',
	'defeat gary',
	'defeat roark',
	'defeat giovanni',
	'reach challenge field rank 1',
	'reach challenge field rank 18',
	'reach challenge field rank 40',
	'reach challenge field rank 62',
	'reach challenge field rank 85',
	'reach challenge field rank 108',
	'reach random field rank 1',
	'reach random field rank 10',
	'reach random field rank 20',
	'reach random field rank 30',
	'reach random field rank 40',
	'reach random field rank 50',
	'reach random field rank 60',
	'reach random field rank 70',
	'reach random field rank 80',
	'reach random field rank 90',
	'reach random field rank 100',
	'catch the mysterious pokemon in orenji forest',
	'reach ranger level 1',
	'reach ranger level 5',
	'reach ranger level 10',
	'reach ranger level 20',
	'report a bug',
	'train a Pokemon to 200 Attack EV',
	'train a Pokemon to 200 Special Attack EV',
	'train a Pokemon to 200 Defense EV',
	'train a Pokemon to 200 Special Defense EV',
	'train a Pokemon to 200 Speed EV',
	'train a Pokemon to 200 Hp EV',
	'train the EV of two stats over 200 on a Pokemon',
	'train a Pokemon to 510 EV',
	'clear out the rocket camp',
	'catch a weak pokemon',
	'catch 10 weak pokemon',
	'catch 20 weak pokemon',
	'catch 50 weak pokemon',
	'catch 100 weak pokemon',
	'catch all weak pokemon',
	'catch a medium strong pokemon',
	'catch 10 medium strong pokemon',
	'catch 20 medium strong pokemon',
	'catch 50 medium strong pokemon',
	'catch 100 medium strong pokemon',
	'catch all medium strong pokemon',
	'catch a strong pokemon',
	'catch 10 strong pokemon',
	'catch 20 strong pokemon',
	'catch 50 strong pokemon',
	'catch 100 strong pokemon',
	'catch all strong pokemon',
	'catch all costumed pikachus',
	'defeat research assistant barry',
	'defeat barry at lvl 20 or higher',
	'defeat barry at lvl 40 or higher',
	'defeat barry at lvl 60 or higher',
	'defeat barry at lvl 80 or higher',
	'defeat barry at lvl 100',
	'defeat trainer silver',
	'defeat silver at lvl 20 or higher',
	'defeat silver at lvl 40 or higher',
	'defeat silver at lvl 60 or higher',
	'defeat silver at lvl 80 or higher',
	'defeat silver at lvl 100',
	'defeat trainer cynthia',
	'defeat cynthia at lvl 20 or higher',
	'defeat cynthia at lvl 40 or higher',
	'defeat cynthia at lvl 60 or higher',
	'defeat cynthia at lvl 80 or higher',
	'defeat cynthia at lvl 100',
	'defeat trainer n',
	'defeat trainer n at lvl 20 or higher',
	'defeat trainer n at lvl 40 or higher',
	'defeat trainer n at lvl 60 or higher',
	'defeat trainer n at lvl 80 or higher',
	'defeat trainer n at lvl 100',
	'defeat trainer red',
	'defeat trainer red at lvl 20 or higher',
	'defeat trainer red at lvl 40 or higher',
	'defeat trainer red at lvl 60 or higher',
	'defeat trainer red at lvl 80 or higher',
	'defeat trainer red at lvl 100',
	'defeat trainer hugh',
	'defeat trainer hugh at lvl 20 or higher',
	'defeat trainer hugh at lvl 40 or higher',
	'defeat trainer hugh at lvl 60 or higher',
	'defeat trainer hugh at lvl 80 or higher',
	'defeat trainer hugh at lvl 100',
	'achieve a catch streak of 3',
	'achieve a catch streak of 10',
	'achieve a catch streak of 15',
	'achieve a catch streak of 20',
	'achieve a catch streak of 31',
	'catch a future distortion pokemon',
	'catch all future distortion pokemon',
	'catch a past distortion pokemon',
	'catch all past distortion pokemon',
	'catch a space distortion pokemon',
	'catch all space distortion pokemon',
	'train a pidgeot to lvl 70',
	"catch whitney's favorite cute pokemon",
	'catch an exceptional steel pokemon for jasmine',
	'defeat an imported challenger',
	'defeat an imported challenger at lvl 20 or higher',
	'defeat an imported challenger at lvl 40 or higher',
	'defeat an imported challenger at lvl 60 or higher',
	'defeat an imported challenger at lvl 80 or higher',
	'defeat an imported challenger at lvl 100',
] as const;

export type QuestName = (typeof questNames)[number];

export const QuestsRecord: Record<QuestName, Quest> = {
	...catchQuests,
	...typeCatchQuests,
	...travellingTrainerQuests,
	...gymLeaderQuests,
	'catch a pokemon': {
		category: 'RESEARCH',
		rewardItems: { 'poke-ball': 10 },
		researchPoints: campUpgradeCostScale,
		conditionFunction: (s) => {
			return s.pokemon.length > 1;
		},
		kind: 'QUEST_LINE',
	},
	'catch a pikachu': {
		category: 'RESEARCH',
		rewardItems: { 'berry-juice': 2 },
		researchPoints: 10,
		targetPokemon: ['pikachu'],
		conditionFunction: (s) => {
			return s.pokedex.pikachu.caughtOnRoutes.length > 0;
		},
		kind: 'QUEST_LINE',
	},
	'find a lightball': {
		category: 'EXPLORATION',
		rewardItems: { 'thunder-stone': 1 },
		researchPoints: 30,
		conditionFunction: (s) => {
			return s.bag['light-ball'] > 0;
		},
		kind: 'QUEST_LINE',
	},
	'retrieve oaks parcel from raticate': {
		category: 'EXPLORATION',
		rewardItems: { 'big-malasada': 1, 'ultra-ball': 5 },
		researchPoints: 25,
		conditionFunction: (s) => {
			return s.bag['oaks-parcel'] > 0;
		},
		kind: 'QUEST_LINE',
	},
	'catch all mouselike electric pokemon': {
		category: 'EXPLORATION',
		rewardItems: {
			'big-malasada': 5,
			'belue-berry': 1,
			'wepear-berry': 1,
			'watmel-berry': 1,
			'nanab-berry': 1,
		},
		targetPokemon: [
			'pikachu',
			'plusle',
			'minun',
			'emolga',
			'pachirisu',
			'dedenne',
			'togedemaru',
			'pawmi',
			'morpeko-full-belly',
			'morpeko-hangry',
		],
		researchPoints: 100,
		conditionFunction: (s) => {
			const pikas: PokemonName[] = [
				'pikachu',
				'plusle',
				'minun',
				'emolga',
				'pachirisu',
				'dedenne',
				'togedemaru',
				'pawmi',
				'morpeko-full-belly',
				'morpeko-hangry',
			];
			return pikas.every((pika) => s.pokedex[pika].caughtOnRoutes.length > 0);
		},
		kind: 'QUEST_LINE',
	},
	'catch all pikachus with hats': {
		category: 'EXPLORATION',
		rewardItems: {
			'electric-gem': 5,
			'thunder-stone': 1,
			magnet: 1,
			'watmel-berry': 5,
			'roseli-berry': 5,
		},
		targetPokemon: [
			'pikachu-original-cap',
			'pikachu-hoenn-cap',
			'pikachu-sinnoh-cap',
			'pikachu-unova-cap',
			'pikachu-kalos-cap',
			'pikachu-alola-cap',
			'pikachu-world-cap',
			'pikachu-partner-cap',
		],
		researchPoints: 50,
		conditionFunction: (s) => {
			const pikas: PokemonName[] = [
				'pikachu-original-cap',
				'pikachu-hoenn-cap',
				'pikachu-sinnoh-cap',
				'pikachu-unova-cap',
				'pikachu-kalos-cap',
				'pikachu-alola-cap',
				'pikachu-world-cap',
				'pikachu-partner-cap',
			];
			return pikas.every((pika) => s.pokedex[pika].caughtOnRoutes.length > 0);
		},
		kind: 'QUEST_LINE',
	},
	'catch all costumed pikachus': {
		category: 'EXPLORATION',
		rewardItems: {},
		rewardPokemon: {
			caughtAtDate: new Date().getTime(),
			growthRate: 'medium',
			unlockedMoves: ['extrasensory'],
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
			ability: 'download',
			name: 'raichu-alola',
			xp: 8000,
			nature: 'adamant',
			intrinsicValues: generateRandomStatObject(31),
			happiness: 70,
			firstMove: { name: 'extrasensory', usedPP: 0 },
		},
		targetPokemon: [
			'pikachu-rock-star',
			'pikachu-belle',
			'pikachu-pop-star',
			'pikachu-phd',
			'pikachu-libre',
			'pikachu-cosplay',
		],
		researchPoints: 100,
		conditionFunction: (s) => {
			const pikas: PokemonName[] = [
				'pikachu-rock-star',
				'pikachu-belle',
				'pikachu-pop-star',
				'pikachu-phd',
				'pikachu-libre',
				'pikachu-cosplay',
			];
			return pikas.every((pika) => s.pokedex[pika].caughtOnRoutes.length > 0);
		},
		kind: 'QUEST_LINE',
	},
	'catch a feebas': {
		category: 'EXPLORATION',
		rewardItems: { 'net-ball': 10, 'old-gateau': 2 },
		researchPoints: 25,
		targetPokemon: ['feebas'],
		conditionFunction: (s) => {
			return s.pokedex.feebas.caughtOnRoutes.length > 0;
		},
		requiredUpgrade: 'swimming certification',
		kind: 'BULLETIN',
	},
	'catch a sudowoodo': {
		category: 'EXPLORATION',
		rewardItems: { 'ultra-ball': 5, 'pewter-crunchies': 2 },
		researchPoints: 25,
		targetPokemon: ['sudowoodo'],
		conditionFunction: (s) => {
			return s.pokedex.sudowoodo.caughtOnRoutes.length > 0;
		},
		requiredUpgrade: 'swimming certification',
		kind: 'BULLETIN',
	},
	'catch all honeytree pokemon': {
		category: 'RESEARCH',
		rewardItems: { 'sun-stone': 2, 'leaf-stone': 2, 'berry-juice': 5 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return getHoneyEncounters().every(
				(e) => s.pokedex[e].caughtOnRoutes.length > 0
			);
		},
		targetPokemon: getHoneyEncounters(),
		kind: 'BULLETIN',
		availableAfter: 'lure a pokemon with honey',
		requiredUpgrade: 'build combee hive',
	},
	'catch all pokemon that live under rocks': {
		category: 'RESEARCH',
		rewardItems: {
			'black-augurite': 1,
			'peat-block': 1,
			'lumiose-galette': 5,
			'fossilized-bird': 2,
		},
		researchPoints: 20,
		conditionFunction: (s) => {
			return getUnderRockEncounters().every(
				(e) => s.pokedex[e].caughtOnRoutes.length > 0
			);
		},
		targetPokemon: getUnderRockEncounters(),
		kind: 'BULLETIN',
		availableAfter: 'find a pokemon under a smashed rock',
		requiredUpgrade: 'sledge hammer certification',
	},
	'catch a pokemon orginally found in kanto': {
		category: 'POKEDEX',
		rewardItems: { protein: 2 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.some((p) => pokemonNames.slice(0, 151).includes(p.name));
		},
		kind: 'QUEST_LINE',
	},
	'catch a pokemon orginally found in johto': {
		category: 'POKEDEX',
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
		category: 'POKEDEX',
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
		category: 'POKEDEX',
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
		category: 'POKEDEX',
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
		category: 'POKEDEX',
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
		category: 'POKEDEX',
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
		category: 'POKEDEX',
		rewardItems: { 'ultra-ball': 5 },
		researchPoints: 5,
		conditionFunction: (s) => {
			return s.pokemon.some((p) =>
				pokemonNames.slice(809, 906).includes(p.name)
			);
		},
		kind: 'QUEST_LINE',
	},
	'catch a pokemon orginally found in paldea': {
		category: 'POKEDEX',
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
		category: 'POKEDEX',
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
		category: 'POKEDEX',
		rewardItems: { 'ultra-ball': 5 },
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
		category: 'POKEDEX',
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
		category: 'POKEDEX',
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
	'catch all forms of tauros': {
		category: 'RESEARCH',
		rewardItems: { 'big-malasada': 2 },
		researchPoints: 20,
		targetPokemon: [
			'tauros',
			'tauros-paldea-aqua-breed',
			'tauros-paldea-blaze-breed',
			'tauros-paldea-combat-breed',
		],
		conditionFunction: (s) => {
			const alltauros: PokemonName[] = [
				'tauros',
				'tauros-paldea-aqua-breed',
				'tauros-paldea-blaze-breed',
				'tauros-paldea-combat-breed',
			];
			return alltauros.every(
				(name) => s.pokedex[name].caughtOnRoutes.length > 0
			);
		},
		kind: 'QUEST_LINE',
	},
	'craft a apricorn ball': {
		category: 'EXPLORATION',
		kind: 'BULLETIN',
		rewardItems: {
			'black-apricorn': 1,
			'blue-apricorn': 1,
			'green-apricorn': 1,
			'pink-apricorn': 1,
			'red-apricorn': 1,
			'white-apricorn': 1,
			'yellow-apricorn': 1,
			'orange-apricorn': 1,
		},
		researchPoints: 10,
		requiredUpgrade: 'invite apricorn smith kurt',
		conditionFunction: (s) => !!s.mileStones.hasCraftedApricorn,
	},
	'lure a pokemon with honey': {
		category: 'RESEARCH',
		rewardItems: { 'sitrus-berry': 3 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return !!s.mileStones.hasCaughtAPokemonWithHoney;
		},
		kind: 'BULLETIN',
	},
	'evolve a combee': {
		category: 'RESEARCH',
		rewardItems: {
			'golden-nanab-berry': 3,
			'golden-razz-berry': 3,
			'golden-pinap-berry': 3,
			'silver-nanab-berry': 3,
			'silver-razz-berry': 3,
			'silver-pinap-berry': 3,
		},
		researchPoints: 30,
		availableAfter: 'lure a pokemon with honey',
		conditionFunction: (s) => {
			return s.pokedex.vespiquen.caughtOnRoutes.length > 0;
		},
		kind: 'BULLETIN',
	},
	'evolve a pokemon through level up': {
		category: 'RESEARCH',
		rewardItems: { 'thunder-stone': 1 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return !!s.mileStones.hasEvolvedAPokemonThroughLevelUp;
		},
		kind: 'QUEST_LINE',
	},
	'evolve a pokemon with a stone': {
		category: 'RESEARCH',
		rewardItems: { 'metal-coat': 1 },
		researchPoints: 15,
		conditionFunction: (s) => {
			return !!s.mileStones.hasEvolvedAPokemonWithAStone;
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon through level up',
	},
	'evolve a pokemon with a held item': {
		category: 'RESEARCH',
		rewardItems: { 'soothe-bell': 1 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return !!s.mileStones.hasEvolvedAPokemonWithAHeldItem;
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon with a stone',
	},
	'evolve a pokemon through friendship': {
		category: 'RESEARCH',
		rewardItems: { 'moon-stone': 2 },
		researchPoints: 25,
		conditionFunction: (s) => {
			return !!s.mileStones.hasEvolvedAPokemonThroughFriendship;
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon with a held item',
	},
	'evolve male and female nidoran into their final form': {
		category: 'RESEARCH',
		rewardItems: { 'leaf-stone': 1, 'sun-stone': 1 },
		researchPoints: 30,
		targetPokemon: ['nidoking', 'nidoqueen'],
		conditionFunction: (s) => {
			return (
				s.pokedex['nidoking'].caughtOnRoutes.length > 0 &&
				s.pokedex['nidoqueen'].caughtOnRoutes.length > 0
			);
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon through friendship',
	},
	'evolve gloom into vileplume and bellosom': {
		category: 'RESEARCH',
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
		category: 'RESEARCH',
		rewardItems: { 'ultra-ball': 10 },
		researchPoints: 25,
		conditionFunction: (s) => {
			return !!s.mileStones.hasEvolvedAPokemonThatNeedsDaytime;
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve gloom into vileplume and bellosom',
	},
	'evolve a pokemon that only evolves at night': {
		category: 'RESEARCH',
		rewardItems: { 'ultra-ball': 10 },
		researchPoints: 25,
		conditionFunction: (s) => {
			return !!s.mileStones.hasEvolvedAPokemonThatNeedsNighttime;
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon that only evolves during the day',
	},
	'train a pokemon to level 10': {
		category: 'TRAINING',
		rewardItems: { 'exp-share': 1, 'big-malasada': 1 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) => calculateLevelData(p.xp, p.growthRate).level >= 10
			);
		},
		kind: 'BULLETIN',
	},
	'train a pokemon to level 20': {
		category: 'TRAINING',
		rewardItems: { 'rare-candy': 2, 'pewter-crunchies': 2 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) => calculateLevelData(p.xp, p.growthRate).level >= 20
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'train a pokemon to level 10',
	},
	'train a pokemon to level 30': {
		category: 'TRAINING',
		rewardItems: { 'rare-candy': 3, 'moomoo-cheese': 3 },
		researchPoints: 30,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) => calculateLevelData(p.xp, p.growthRate).level >= 30
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'train a pokemon to level 20',
	},
	'train a pokemon to level 40': {
		category: 'TRAINING',
		rewardItems: { 'rare-candy': 4, 'lumiose-galette': 4 },
		researchPoints: 40,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) => calculateLevelData(p.xp, p.growthRate).level >= 40
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'train a pokemon to level 30',
	},
	'train a pokemon to level 50': {
		category: 'TRAINING',
		rewardItems: { 'rare-candy': 5, casteliacone: 5 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) => calculateLevelData(p.xp, p.growthRate).level >= 50
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'train a pokemon to level 40',
	},
	'train a pokemon to level 60': {
		category: 'TRAINING',
		rewardItems: { 'rare-candy': 6, 'rage-candy-bar': 6 },
		researchPoints: 60,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) => calculateLevelData(p.xp, p.growthRate).level >= 60
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'train a pokemon to level 50',
	},
	'train a pokemon to level 70': {
		category: 'TRAINING',
		rewardItems: { 'rare-candy': 7, 'big-malasada': 7 },
		researchPoints: 70,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) => calculateLevelData(p.xp, p.growthRate).level >= 70
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'train a pokemon to level 60',
	},
	'train a pokemon to level 80': {
		category: 'TRAINING',
		rewardItems: { 'rare-candy': 8, 'pewter-crunchies': 8 },
		researchPoints: 80,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) => calculateLevelData(p.xp, p.growthRate).level >= 80
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'train a pokemon to level 70',
	},
	'train a pokemon to level 90': {
		category: 'TRAINING',
		rewardItems: { 'rare-candy': 9, casteliacone: 9 },
		researchPoints: 90,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) => calculateLevelData(p.xp, p.growthRate).level >= 90
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'train a pokemon to level 90',
	},
	'train a pokemon to level 100': {
		category: 'TRAINING',
		rewardItems: { 'rare-candy': 10, 'lumiose-galette': 10 },
		researchPoints: 100,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) => calculateLevelData(p.xp, p.growthRate).level >= 100
			);
		},
		kind: 'BULLETIN',
		availableAfter: 'train a pokemon to level 100',
	},
	'defeat a training field trainer': {
		category: 'BATTLE',
		rewardItems: {
			'big-malasada': 1,
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
	'defeat all tier 1 field trainers': {
		category: 'BATTLE',
		rewardItems: {
			'moomoo-cheese': 2,
			'exp-candy-xs': 10,
		},
		researchPoints: 25,
		conditionFunction: (s) => {
			return tier1trainers.every((trainer) =>
				s.handledOccupants.some((h) => h.id === trainer.id)
			);
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'defeat a training field trainer',
	},
	'defeat all tier 2 field trainers': {
		category: 'BATTLE',
		rewardItems: {
			casteliacone: 2,
			'exp-candy-s': 10,
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return tier2trainers.every((trainer) =>
				s.handledOccupants.some((h) => h.id === trainer.id)
			);
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 2',
		availableAfter: 'defeat all tier 1 field trainers',
	},
	'defeat all tier 3 field trainers': {
		category: 'BATTLE',
		rewardItems: {
			'pewter-crunchies': 2,
			'exp-candy-m': 10,
		},
		researchPoints: 75,
		conditionFunction: (s) => {
			return tier3trainers.every((trainer) =>
				s.handledOccupants.some((h) => h.id === trainer.id)
			);
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 3',
		availableAfter: 'defeat all tier 2 field trainers',
	},
	'defeat all tier 4 field trainers': {
		category: 'BATTLE',
		rewardItems: {
			'lumiose-galette': 2,
			'exp-candy-l': 10,
		},
		researchPoints: 100,
		conditionFunction: (s) => {
			return tier4trainers.every((trainer) =>
				s.handledOccupants.some((h) => h.id === trainer.id)
			);
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 4',
		availableAfter: 'defeat all tier 3 field trainers',
	},
	'defeat all tier 5 field trainers': {
		category: 'BATTLE',
		rewardItems: {
			'big-malasada': 10,
			'moomoo-cheese': 10,
			casteliacone: 10,
			'pewter-crunchies': 10,
			'lumiose-galette': 10,
			'rage-candy-bar': 10,
			'lava-cookie': 10,
			'old-gateau': 10,
			'exp-candy-xl': 10,
		},
		researchPoints: 125,
		conditionFunction: (s) => {
			return tier5trainers.every((trainer) =>
				s.handledOccupants.some((h) => h.id === trainer.id)
			);
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 5',
		availableAfter: 'defeat all tier 4 field trainers',
	},
	'grow a berry': {
		category: 'RESEARCH',
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
		category: 'RESEARCH',
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
		category: 'EXPLORATION',
		kind: 'BULLETIN',
		rewardItems: {
			'black-apricorn': 1,
			'blue-apricorn': 1,
			'green-apricorn': 1,
			'pink-apricorn': 1,
			'red-apricorn': 1,
			'white-apricorn': 1,
			'yellow-apricorn': 1,
			'orange-apricorn': 1,
		},
		researchPoints: 10,
		availableAfter: 'craft a apricorn ball',
		conditionFunction: (s) =>
			s.pokemon.some((p) => Object.values(apricornTable).includes(p.ball)),
	},
	'catch a pokemon in every type of apricorn ball': {
		category: 'EXPLORATION',
		kind: 'BULLETIN',
		rewardItems: {
			'green-apricorn': 1,
			'blue-apricorn': 1,
			'yellow-apricorn': 1,
			'black-apricorn': 1,
			'pink-apricorn': 1,
			'red-apricorn': 1,
			'white-apricorn': 1,
			'orange-apricorn': 1,
		},
		researchPoints: 50,
		availableAfter: 'catch a pokemon in an apricorn ball',
		conditionFunction: (s) =>
			Object.values(apricornTable).every((apricornBall) =>
				s.pokemon.some((p) => p.ball === apricornBall)
			),
	},
	'catch a very heavy specimen': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		rewardItems: {
			'pp-up': 1,
		},
		researchPoints: 10,
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.weightModifier && p.weightModifier > 0.9),
	},
	'catch a very light specimen': {
		category: 'RESEARCH',
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
		category: 'RESEARCH',
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
		category: 'RESEARCH',
		kind: 'BULLETIN',
		rewardItems: {
			'green-apricorn': 5,
		},
		researchPoints: 10,
		availableAfter: 'catch a tiny specimen',
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.heightModifier && p.heightModifier > 0.9),
	},
	'catch a pokemon with perfect attack ivs': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		rewardItems: {
			'muscle-mochi': 2,
		},
		researchPoints: 15,
		availableAfter: 'catch a gigantic specimen',
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.intrinsicValues.attack === 31),
	},
	'catch a pokemon with perfect special-attack ivs': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		rewardItems: {
			'clever-mochi': 2,
		},
		researchPoints: 15,
		availableAfter: 'catch a pokemon with perfect attack ivs',
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.intrinsicValues['special-attack'] === 31),
	},
	'catch a pokemon with perfect defense ivs': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		rewardItems: {
			'resist-mochi': 2,
		},
		researchPoints: 15,
		availableAfter: 'catch a pokemon with perfect special-attack ivs',
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.intrinsicValues['defense'] === 31),
	},
	'catch a pokemon with perfect special-defense ivs': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		rewardItems: {
			'genius-mochi': 2,
		},
		researchPoints: 15,
		availableAfter: 'catch a pokemon with perfect defense ivs',
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.intrinsicValues['special-defense'] === 31),
	},
	'catch a pokemon with perfect speed ivs': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		rewardItems: {
			'swift-mochi': 2,
		},
		researchPoints: 15,
		availableAfter: 'catch a pokemon with perfect special-defense ivs',
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.intrinsicValues['speed'] === 31),
	},
	'catch a pokemon with perfect hp ivs': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		rewardItems: {
			'health-mochi': 2,
		},
		researchPoints: 15,
		availableAfter: 'catch a pokemon with perfect speed ivs',
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.intrinsicValues['hp'] === 31),
	},
	'catch a pokemon with top 90% ivs': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		rewardItems: {
			'muscle-mochi': 3,
			'genius-mochi': 3,
			'clever-mochi': 3,
			'swift-mochi': 3,
			'health-mochi': 3,
			'resist-mochi': 3,
		},
		researchPoints: 50,
		availableAfter: 'catch a pokemon with perfect attack ivs',
		conditionFunction: (s) =>
			s.pokemon.some((p) => sumOfIvs(p.intrinsicValues) > 168),
	},
	'catch local dark and ghost pokemon': {
		category: 'EXPLORATION',
		rewardItems: { 'odd-keystone': 1 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return (
				s.pokedex['gastly'].caughtOnRoutes.length > 0 &&
				s.pokedex['poochyena'].caughtOnRoutes.length > 0 &&
				s.pokedex['murkrow'].caughtOnRoutes.length > 0 &&
				s.pokedex['houndour'].caughtOnRoutes.length > 0 &&
				s.pokedex['drifloon'].caughtOnRoutes.length > 0
			);
		},
		targetPokemon: ['gastly', 'poochyena', 'murkrow', 'drifloon', 'houndour'],
		kind: 'QUEST_LINE',
	},
	"catch whitney's favorite cute pokemon": {
		category: 'EXPLORATION',
		rewardItems: { 'clear-amulet': 1 },
		researchPoints: 100,
		conditionFunction: (s) => {
			return (
				s.pokedex['clefairy'].caughtOnRoutes.length > 0 &&
				s.pokedex['jigglypuff'].caughtOnRoutes.length > 0 &&
				s.pokedex['vulpix-alola'].caughtOnRoutes.length > 0 &&
				s.pokedex['pikachu-belle'].caughtOnRoutes.length > 0
			);
		},
		targetPokemon: ['pikachu-belle', 'clefairy', 'vulpix-alola', 'jigglypuff'],
		kind: 'QUEST_LINE',
	},
	'catch an exceptional steel pokemon for jasmine': {
		category: 'EXPLORATION',
		rewardItems: { 'steel-gem': 10, 'babiri-berry': 10 },
		researchPoints: 100,
		conditionFunction: (s: SaveFile) => {
			return s.pokemon.some(
				(p) =>
					internalDex[p.name].types.includes('steel') &&
					Object.values(p.intrinsicValues).some((v) => v === 31)
			);
		},
		kind: 'QUEST_LINE',
	},
	'catch Haunter and Mightyena': {
		category: 'EXPLORATION',
		rewardItems: { 'dusk-ball': 5, 'dusk-stone': 1 },
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
		category: 'EXPLORATION',
		rewardItems: { 'rare-candy': 3 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokedex['spiritomb'].caughtOnRoutes.length > 0;
		},
		targetPokemon: ['spiritomb'],
		kind: 'QUEST_LINE',
	},
	'defeat roark': {
		category: 'BATTLE',
		rewardItems: {
			'full-restore': 5,
			'rare-candy': 3,
			'hard-stone': 1,
			...expCandyPackage,
		},
		rewardPokemon: {
			caughtAtDate: new Date().getTime(),
			growthRate: 'medium',
			unlockedMoves: ['drill-peck', 'swords-dance'],
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
			ability: 'volt-absorb',
			name: 'aerodactyl',
			xp: 125,
			nature: 'adamant',
			intrinsicValues: generateRandomStatObject(31),
			happiness: 70,
			firstMove: { name: 'drill-peck', usedPP: 0 },
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Roark');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'revive all different fossils',
	},
	'defeat rowan': {
		category: 'BATTLE',
		rewardItems: {
			'ultra-ball': 5,
			'full-restore': 5,
			...expCandyPackage,
		},
		rewardPokemon: {
			caughtAtDate: new Date().getTime(),
			growthRate: 'medium',
			unlockedMoves: ['earthquake'],
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
		availableAfter: 'catch all forms of tauros',
	},
	'defeat elm': {
		category: 'BATTLE',
		rewardItems: {
			'ultra-ball': 5,
			'full-restore': 5,
			...expCandyPackage,
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
			unlockedMoves: [],
			growthRate: 'medium',
			caughtAtDate: new Date().getTime(),
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Professor Elm');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'catch all evolutions of eevee',
	},
	'catch some local flying pokemon': {
		category: 'EXPLORATION',
		rewardItems: { 'yache-berry': 2 },
		researchPoints: 10,
		conditionFunction: (s) => {
			return (
				s.pokedex['pidgey'].caughtOnRoutes.length > 0 &&
				s.pokedex['spearow'].caughtOnRoutes.length > 0 &&
				s.pokedex['taillow'].caughtOnRoutes.length > 0 &&
				s.pokedex['murkrow'].caughtOnRoutes.length > 0 &&
				s.pokedex['starly'].caughtOnRoutes.length > 0 &&
				s.pokedex['fletchling'].caughtOnRoutes.length > 0 &&
				s.pokedex['pikipek'].caughtOnRoutes.length > 0
			);
		},
		targetPokemon: [
			'pidgey',
			'spearow',
			'taillow',
			'murkrow',
			'starly',
			'fletchling',
			'pikipek',
		],
		kind: 'QUEST_LINE',
	},
	'evolve some local flying pokemon': {
		category: 'EXPLORATION',
		rewardItems: { 'charti-berry': 2 },
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
	'evolve a flying pokemon to its final stage': {
		category: 'EXPLORATION',
		rewardItems: { 'wacan-berry': 5 },
		researchPoints: 25,
		conditionFunction: (s) => {
			return (
				s.pokedex['pidgeot'].caughtOnRoutes.length > 0 ||
				s.pokedex['staraptor'].caughtOnRoutes.length > 0
			);
		},
		targetPokemon: ['pidgeot', 'staraptor'],
		kind: 'QUEST_LINE',
	},
	'catch the legendary bird of ice': {
		category: 'EXPLORATION',
		rewardItems: { 'rare-candy': 10 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokedex['articuno'].caughtOnRoutes.length > 0;
		},
		targetPokemon: ['articuno'],
		kind: 'QUEST_LINE',
	},
	'catch the legendary bird of fire': {
		category: 'EXPLORATION',
		rewardItems: { 'rare-candy': 10 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokedex['moltres'].caughtOnRoutes.length > 0;
		},
		targetPokemon: ['moltres'],
		requiredUpgrade: 'invite historian',
		kind: 'BULLETIN',
	},
	'catch the legendary bird of thunder': {
		category: 'EXPLORATION',
		rewardItems: { 'rare-candy': 10 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokedex['zapdos'].caughtOnRoutes.length > 0;
		},
		targetPokemon: ['zapdos'],
		requiredUpgrade: 'invite historian',
		kind: 'BULLETIN',
	},
	'catch the mysterious pokemon in orenji forest': {
		category: 'EXPLORATION',
		rewardItems: { 'rare-candy': 10 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokedex['mew'].caughtOnRoutes.length > 0;
		},
		targetPokemon: ['mew'],
		requiredUpgrade: 'invite historian',
		kind: 'BULLETIN',
	},
	'catch the legendary beast of water': {
		category: 'EXPLORATION',
		rewardItems: { 'rare-candy': 10 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokedex['suicune'].caughtOnRoutes.length > 0;
		},
		targetPokemon: ['suicune'],
		kind: 'BULLETIN',
		requiredUpgrade: 'pidgeot rider certification',
	},
	'catch the legendary beast of fire': {
		category: 'EXPLORATION',
		rewardItems: { 'rare-candy': 10 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokedex['entei'].caughtOnRoutes.length > 0;
		},
		targetPokemon: ['suicune'],
		kind: 'BULLETIN',
		requiredUpgrade: 'pidgeot rider certification',
	},
	'catch the legendary beast of thunder': {
		category: 'EXPLORATION',
		rewardItems: { 'rare-candy': 10 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokedex['suicune'].caughtOnRoutes.length > 0;
		},
		targetPokemon: ['raikou'],
		kind: 'BULLETIN',
		requiredUpgrade: 'pidgeot rider certification',
	},
	'revive a fossil': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		rewardItems: {
			honey: 6,
			'great-ball': 10,
		},
		targetPokemon: Object.keys(fossilTable) as PokemonName[],
		researchPoints: 10,
		conditionFunction: (s) => {
			return Object.keys(fossilTable).some(
				(fossil) => s.pokedex[fossil as PokemonName].caughtOnRoutes.length > 0
			);
		},
		requiredUpgrade: 'invite fossil expert',
	},
	'revive all different fossils': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		rewardItems: {
			'rare-candy': 5,
			'ultra-ball': 5,
		},
		researchPoints: 100,
		conditionFunction: (s) => {
			return Object.keys(fossilTable).every(
				(fossil) => s.pokedex[fossil as PokemonName].caughtOnRoutes.length > 0
			);
		},
		targetPokemon: Object.keys(fossilTable) as PokemonName[],
		requiredUpgrade: 'invite fossil expert',
		availableAfter: 'revive a fossil',
	},
	'evolve your starter pokemon': {
		category: 'RESEARCH',
		kind: 'QUEST_LINE',
		rewardItems: {
			'rare-candy': 2,
		},
		researchPoints: 25,
		conditionFunction: (s) => {
			return !!s.mileStones.hasEvolvedStarter;
		},
	},
	'catch a shiny pokemon': {
		category: 'EXPLORATION',
		kind: 'BULLETIN',
		rewardItems: {
			'master-ball': 1,
			'shiny-charm': 1,
		},
		researchPoints: 50,
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.shiny && p.caughtOnMap !== 'camp'),
	},
	'cook an easy recipe': {
		category: 'RESEARCH',
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
		category: 'RESEARCH',
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
		category: 'RESEARCH',
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
		category: 'POKEDEX',
		kind: 'BULLETIN',
		researchPoints: 10,
		rewardItems: {
			'poke-ball': 10,
		},
		conditionFunction: (s) =>
			Object.values(s.pokedex).filter((p) => p.caughtOnRoutes.length > 0)
				.length >= 10,
	},
	'catch 20 different species': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		researchPoints: 20,
		rewardItems: {
			'great-ball': 10,
		},
		availableAfter: 'catch 10 different species',
		conditionFunction: (s) =>
			Object.values(s.pokedex).filter((p) => p.caughtOnRoutes.length > 0)
				.length >= 20,
	},
	'catch 50 different species': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		researchPoints: 50,
		rewardItems: {
			'ultra-ball': 10,
		},
		availableAfter: 'catch 20 different species',
		conditionFunction: (s) =>
			Object.values(s.pokedex).filter((p) => p.caughtOnRoutes.length > 0)
				.length >= 50,
	},
	'catch 100 different species': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: {
			'master-ball': 1,
		},
		availableAfter: 'catch 50 different species',
		conditionFunction: (s) =>
			Object.values(s.pokedex).filter((p) => p.caughtOnRoutes.length > 0)
				.length >= 100,
	},
	'catch 150 different species': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: {
			'master-ball': 1,
		},
		availableAfter: 'catch 100 different species',
		conditionFunction: (s) =>
			Object.values(s.pokedex).filter((p) => p.caughtOnRoutes.length > 0)
				.length >= 150,
	},
	'catch 250 different species': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: {
			'master-ball': 1,
		},
		availableAfter: 'catch 150 different species',
		conditionFunction: (s) =>
			Object.values(s.pokedex).filter((p) => p.caughtOnRoutes.length > 0)
				.length >= 250,
	},
	'catch 350 different species': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: {
			'master-ball': 1,
		},
		availableAfter: 'catch 250 different species',
		conditionFunction: (s) =>
			Object.values(s.pokedex).filter((p) => p.caughtOnRoutes.length > 0)
				.length >= 350,
	},
	'catch 450 different species': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: {
			'master-ball': 1,
			...expCandyPackage,
		},
		availableAfter: 'catch 450 different species',
		conditionFunction: (s) =>
			Object.values(s.pokedex).filter((p) => p.caughtOnRoutes.length > 0)
				.length >= 450,
	},
	'catch 550 different species': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: {
			'master-ball': 1,
			...expCandyPackage,
		},
		availableAfter: 'catch 450 different species',
		conditionFunction: (s) =>
			Object.values(s.pokedex).filter((p) => p.caughtOnRoutes.length > 0)
				.length >= 550,
	},
	'find a pokemon under a smashed rock': {
		category: 'EXPLORATION',
		kind: 'BULLETIN',
		researchPoints: 20,
		rewardItems: {
			'sitrus-berry': 5,
		},
		requiredUpgrade: 'sledge hammer certification',
		conditionFunction: (s) => !!s.mileStones.hasfoundAPokemonBySmashingRocks,
	},
	'donate 1 plant to the seed vault': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		requiredUpgrade: 'create seed vault',
		researchPoints: 5,
		rewardItems: { 'moomoo-milk': 3 },
		conditionFunction: (s) => !!(s.seedVault && s.seedVault.length > 0),
	},
	'donate 20 plants to the seed vault': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		requiredUpgrade: 'create seed vault',
		availableAfter: 'donate 1 plant to the seed vault',
		researchPoints: 10,
		rewardItems: { 'moomoo-milk': 10 },
		conditionFunction: (s) => !!(s.seedVault && s.seedVault.length >= 20),
	},
	'donate 50 plants to the seed vault': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		requiredUpgrade: 'create seed vault',
		availableAfter: 'donate 20 plants to the seed vault',
		researchPoints: 50,
		rewardItems: { 'moomoo-milk': 10, 'ultra-ball': 5 },
		conditionFunction: (s) => !!(s.seedVault && s.seedVault.length >= 50),
	},
	'donate all different plants to the seed vault': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		requiredUpgrade: 'create seed vault',
		availableAfter: 'donate 50 plants to the seed vault',
		researchPoints: 100,
		rewardItems: { 'master-ball': 1 },
		conditionFunction: (s) =>
			[...berries, ...apricorns].every((item) => s.seedVault?.includes(item)),
	},
	'catch a pokemon from onix cave': {
		category: 'EXPLORATION',
		kind: 'BULLETIN',
		requiredUpgrade: 'shovel certification',
		researchPoints: 10,
		rewardItems: { 'babiri-berry': 2, 'kee-berry': 2, 'fossilized-dino': 2 },
		targetRoute: 'onixCave',
		targetPokemon: getAllEncountersFor('onixCave', {}).map((p) => p.name),
		conditionFunction: (s: SaveFile) =>
			getAllEncountersFor('onixCave', {}).some((o) =>
				s.pokedex[o.name].caughtOnRoutes.includes('onixCave')
			),
	},
	'catch all pokemon from onix cave': {
		category: 'EXPLORATION',
		kind: 'BULLETIN',
		requiredUpgrade: 'shovel certification',
		availableAfter: 'catch a pokemon from onix cave',
		targetRoute: 'onixCave',
		researchPoints: 25,
		rewardItems: {
			'yellow-apricorn': 10,
			'black-apricorn': 10,
			'moon-stone': 2,
			'fossilized-drake': 2,
		},
		targetPokemon: getAllEncountersFor('onixCave', {}).map((p) => p.name),
		conditionFunction: (s: SaveFile) =>
			getAllEncountersFor('onixCave', {}).every((o) =>
				s.pokedex[o.name].caughtOnRoutes.includes('onixCave')
			),
	},
	'catch all pokemon from caveW1': {
		category: 'EXPLORATION',
		kind: 'BULLETIN',
		requiredUpgrade: 'swimming certification',
		targetRoute: 'caveW1',
		researchPoints: 50,
		rewardItems: {
			'power-herb': 2,
			'white-herb': 2,
			'mental-herb': 2,
			'big-malasada': 2,
			'fossilized-fish': 2,
		},
		targetPokemon: getAllEncountersFor('caveW1', {}).map((p) => p.name),
		conditionFunction: (s: SaveFile) =>
			getAllEncountersFor('caveW1', {}).every((o) =>
				s.pokedex[o.name].caughtOnRoutes.includes('caveW1')
			),
	},
	'catch all pokemon from victory road': {
		category: 'EXPLORATION',
		kind: 'BULLETIN',
		requiredUpgrade: 'rock climbing certification',
		targetRoute: 'victoryRoad',
		researchPoints: 50,
		rewardItems: {},
		targetPokemon: getAllEncountersFor('victoryRoad', {}).map((p) => p.name),
		conditionFunction: (s: SaveFile) =>
			getAllEncountersFor('victoryRoad', {}).every((o) =>
				s.pokedex[o.name].caughtOnRoutes.includes('victoryRoad')
			),
	},
	'wake a snorlax': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		requiredUpgrade: 'shovel certification',
		researchPoints: 25,
		rewardItems: {
			'enigma-berry': 2,
		},
		conditionFunction: (s) => !!s.mileStones.hasWokenASnorlax,
	},
	'catch all evolutions of eevee': {
		category: 'RESEARCH',
		rewardItems: {},
		researchPoints: 100,
		conditionFunction: (s) => {
			return (
				s.pokedex['vaporeon'].caughtOnRoutes.length > 0 &&
				s.pokedex['jolteon'].caughtOnRoutes.length > 0 &&
				s.pokedex['leafeon'].caughtOnRoutes.length > 0 &&
				s.pokedex['flareon'].caughtOnRoutes.length > 0 &&
				s.pokedex['umbreon'].caughtOnRoutes.length > 0 &&
				s.pokedex['espeon'].caughtOnRoutes.length > 0 &&
				s.pokedex['glaceon'].caughtOnRoutes.length > 0 &&
				s.pokedex['sylveon'].caughtOnRoutes.length > 0
			);
		},
		targetPokemon: [
			'vaporeon',
			'jolteon',
			'flareon',
			'leafeon',
			'glaceon',
			'umbreon',
			'espeon',
			'sylveon',
		],
		kind: 'QUEST_LINE',
	},
	'reach cooking skill 20': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		requiredUpgrade: 'invite chef grandma',
		researchPoints: 20,
		rewardItems: {
			'aguav-berry': 1,
			'babiri-berry': 1,
			'charti-berry': 1,
			'mago-berry': 1,
			'grepa-berry': 1,
		},
		conditionFunction: (s) => !!s.cookingSkill && s.cookingSkill >= 20,
	},
	'reach cooking skill 50': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		requiredUpgrade: 'invite chef grandma',
		availableAfter: 'reach cooking skill 20',
		researchPoints: 50,
		rewardItems: {
			'figy-berry': 1,
			'leppa-berry': 1,
			'pomeg-berry': 1,
			'chople-berry': 1,
			'maranga-berry': 1,
		},
		conditionFunction: (s) => !!s.cookingSkill && s.cookingSkill >= 50,
	},
	'reach cooking skill 100': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		requiredUpgrade: 'invite chef grandma',
		availableAfter: 'reach cooking skill 50',
		researchPoints: 100,
		rewardItems: {
			'enigma-berry': 1,
			'kee-berry': 1,
			'magost-berry': 1,
		},
		conditionFunction: (s) => !!s.cookingSkill && s.cookingSkill >= 100,
	},
	'lure a pokemon with a berry': {
		category: 'RESEARCH',
		kind: 'BULLETIN',
		requiredUpgrade: 'berry lure station routeN1',
		researchPoints: 40,
		rewardItems: {
			'roseli-berry': 1,
			'passho-berry': 1,
			'wacan-berry': 1,
			'yache-berry': 1,
			...smallExpCandyPackage,
		},
		conditionFunction: (s) => s.mileStones.luredWithBerries.length > 0,
	},
	'catch a pokemon from a swarm': {
		category: 'EXPLORATION',
		kind: 'BULLETIN',
		requiredUpgrade: 'pokemon swarm radar',
		researchPoints: 20,
		rewardItems: { 'nest-ball': 20 },
		conditionFunction: (s) => s.mileStones.caughtFromSwarms.length > 0,
	},
	'catch 3 different pokemon from swarms': {
		category: 'EXPLORATION',
		kind: 'BULLETIN',
		requiredUpgrade: 'pokemon swarm radar',
		availableAfter: 'catch a pokemon from a swarm',
		researchPoints: 50,
		rewardItems: { 'dusk-ball': 20 },
		conditionFunction: (s) => s.mileStones.caughtFromSwarms.length >= 3,
	},
	'catch 10 different pokemon from swarms': {
		category: 'EXPLORATION',
		kind: 'BULLETIN',
		requiredUpgrade: 'pokemon swarm radar',
		availableAfter: 'catch 3 different pokemon from swarms',
		researchPoints: 100,
		rewardItems: {
			'quick-ball': 10,
		},
		conditionFunction: (s) => s.mileStones.caughtFromSwarms.length >= 10,
	},
	'catch 20 different pokemon from swarms': {
		category: 'EXPLORATION',
		kind: 'BULLETIN',
		requiredUpgrade: 'pokemon swarm radar',
		availableAfter: 'catch 10 different pokemon from swarms',
		researchPoints: 100,
		rewardItems: {
			'ultra-ball': 5,
		},
		conditionFunction: (s) => s.mileStones.caughtFromSwarms.length >= 20,
	},
	'deal 50 damage with one attack': {
		category: 'BATTLE',
		kind: 'QUEST_LINE',
		researchPoints: 10,
		conditionFunction: (s) => s.mileStones.damageRecord >= 50,
		rewardItems: { 'big-malasada': 1, 'x-attack': 1 },
	},
	'deal 100 damage with one attack': {
		category: 'BATTLE',
		kind: 'QUEST_LINE',
		researchPoints: 20,
		conditionFunction: (s) => s.mileStones.damageRecord >= 100,
		rewardItems: { casteliacone: 1, 'wise-glasses': 1 },
	},
	'deal 200 damage with one attack': {
		category: 'BATTLE',
		kind: 'QUEST_LINE',
		researchPoints: 30,
		conditionFunction: (s) => s.mileStones.damageRecord >= 200,
		rewardItems: { 'lava-cookie': 1, 'scope-lens': 1 },
	},
	'deal 500 damage with one attack': {
		category: 'BATTLE',
		kind: 'QUEST_LINE',
		researchPoints: 40,
		conditionFunction: (s) => s.mileStones.damageRecord >= 500,
		rewardItems: { 'old-gateau': 1, 'choice-band': 1 },
	},
	'deal 1000 damage with one attack': {
		category: 'BATTLE',
		kind: 'QUEST_LINE',
		researchPoints: 50,
		conditionFunction: (s) => s.mileStones.damageRecord >= 1000,
		rewardItems: { 'rage-candy-bar': 1, 'choice-band': 1 },
	},
	'deal 2000 damage with one attack': {
		category: 'BATTLE',
		kind: 'QUEST_LINE',
		researchPoints: 100,
		conditionFunction: (s) => s.mileStones.damageRecord >= 2000,
		rewardItems: { 'big-malasada': 1, 'choice-specs': 1 },
	},
	'deal 5000 damage with one attack': {
		category: 'BATTLE',
		kind: 'QUEST_LINE',
		researchPoints: 100,
		conditionFunction: (s) => s.mileStones.damageRecord >= 5000,
		rewardItems: { 'big-malasada': 1 },
	},
	'deal 10000 damage with one attack': {
		category: 'BATTLE',
		kind: 'QUEST_LINE',
		researchPoints: 100,
		conditionFunction: (s) => s.mileStones.damageRecord >= 10000,
		rewardItems: { 'big-malasada': 1 },
		availableAfter: 'deal 5000 damage with one attack',
	},
	'deal 20000 damage with one attack': {
		category: 'BATTLE',
		kind: 'BULLETIN',
		researchPoints: 100,
		conditionFunction: (s) => s.mileStones.damageRecord >= 20000,
		rewardItems: { 'weakness-policy': 1 },
		availableAfter: 'deal 10000 damage with one attack',
	},
	'deal 30000 damage with one attack': {
		category: 'BATTLE',
		kind: 'BULLETIN',
		researchPoints: 100,
		conditionFunction: (s) => s.mileStones.damageRecord >= 30000,
		rewardItems: { 'master-ball': 1 },
		availableAfter: 'deal 20000 damage with one attack',
	},
	'deal 50000 damage with one attack': {
		category: 'BATTLE',
		kind: 'BULLETIN',
		researchPoints: 100,
		conditionFunction: (s) => s.mileStones.damageRecord >= 50000,
		rewardItems: { 'master-ball': 1 },
		availableAfter: 'deal 30000 damage with one attack',
	},
	'reach challenge field rank 1': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 10,
		rewardItems: {
			'fire-gem': 5,
			'water-gem': 5,
			'electric-gem': 5,
		},
		requiredUpgrade: 'training field 1',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.challengeFieldRecord &&
				s.mileStones.challengeFieldRecord >= 1
			);
		},
	},
	'reach challenge field rank 18': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 20,
		rewardItems: {
			'grass-gem': 5,
			'ice-gem': 5,
			'fighting-gem': 5,
		},
		requiredUpgrade: 'training field 1',
		availableAfter: 'reach challenge field rank 1',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.challengeFieldRecord &&
				s.mileStones.challengeFieldRecord >= 18
			);
		},
	},
	'reach challenge field rank 40': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 40,
		rewardItems: {
			'poison-gem': 5,
			'ground-gem': 5,
			'flying-gem': 5,
		},
		requiredUpgrade: 'training field 2',
		availableAfter: 'reach challenge field rank 18',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.challengeFieldRecord &&
				s.mileStones.challengeFieldRecord >= 40
			);
		},
	},
	'reach challenge field rank 62': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 60,
		rewardItems: {
			'psychic-gem': 5,
			'bug-gem': 5,
			'rock-gem': 5,
		},
		requiredUpgrade: 'training field 3',
		availableAfter: 'reach challenge field rank 62',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.challengeFieldRecord &&
				s.mileStones.challengeFieldRecord >= 62
			);
		},
	},
	'reach challenge field rank 85': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 80,
		rewardItems: {
			'ghost-gem': 5,
			'dark-gem': 5,
			'steel-gem': 5,
		},
		requiredUpgrade: 'training field 4',
		availableAfter: 'reach challenge field rank 62',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.challengeFieldRecord &&
				s.mileStones.challengeFieldRecord >= 85
			);
		},
	},
	'reach challenge field rank 108': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: {
			'dragon-gem': 5,
			'normal-gem': 5,
			'fairy-gem': 5,
		},
		requiredUpgrade: 'training field 5',
		availableAfter: 'reach challenge field rank 85',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.challengeFieldRecord &&
				s.mileStones.challengeFieldRecord >= 108
			);
		},
	},
	'reach ranger level 1': {
		category: 'BATTLE',
		kind: 'BULLETIN',
		requiredUpgrade: 'ranger certification',
		researchPoints: 25,
		conditionFunction: (s) => (s.rangerLevel ?? 0) >= 1,
		rewardItems: { 'big-malasada': 1, 'rare-candy': 1, 'moomoo-milk': 2 },
	},
	'reach ranger level 5': {
		category: 'BATTLE',
		kind: 'BULLETIN',
		requiredUpgrade: 'ranger certification',
		availableAfter: 'reach ranger level 1',
		researchPoints: 50,
		conditionFunction: (s) => (s.rangerLevel ?? 0) >= 5,
		rewardItems: { 'old-gateau': 3, 'rare-candy': 3, 'moomoo-milk': 6 },
		campUpgrade: 'warden certification',
	},
	'reach ranger level 10': {
		category: 'BATTLE',
		kind: 'BULLETIN',
		requiredUpgrade: 'ranger certification',
		availableAfter: 'reach ranger level 5',
		researchPoints: 100,
		conditionFunction: (s) => (s.rangerLevel ?? 0) >= 10,
		rewardItems: { 'lumiose-galette': 5, 'rare-candy': 5, 'moomoo-milk': 10 },
	},
	'reach ranger level 20': {
		category: 'BATTLE',
		kind: 'BULLETIN',
		requiredUpgrade: 'ranger certification',
		availableAfter: 'reach ranger level 10',
		researchPoints: 100,
		conditionFunction: (s) => (s.rangerLevel ?? 0) >= 20,
		rewardItems: {
			casteliacone: 5,
			'pewter-crunchies': 5,
			...expCandyPackage,
			'lucky-egg': 1,
		},
		rewardPokemon: {
			caughtAtDate: new Date().getTime(),
			gender: 'MALE',
			intrinsicValues: generateRandomStatObject(31),
			effortValues: EmptyStatObject,
			ppBoostedMoves: [],
			caughtOnMap: 'camp',
			stepsWalked: 0,
			maxHp: 30,
			xp: 125,
			happiness: 70,
			heightModifier: 0.5,
			weightModifier: 0.5,
			nature: 'lonely',
			unlockedMoves: ['flame-charge', 'swords-dance', 'sacred-fire'],
			ability: 'competitive',
			id: v4(),
			damage: 0,
			ownerId: '',
			name: 'growlithe',
			ball: 'poke-ball',
			shiny: true,
			growthRate: 'medium',
			fixedAbility: true,
			firstMove: { name: 'sacred-fire', usedPP: 0 },
		},
	},
	'defeat giovanni': {
		category: 'BATTLE',
		rewardItems: {},
		rewardPokemon: {
			caughtAtDate: new Date().getTime(),
			growthRate: 'medium',
			unlockedMoves: ['calm-mind'],
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
			ball: 'master-ball',
			ability: 'pressure',
			name: 'mewtwo',
			xp: 125,
			nature: getRandomNature(),
			intrinsicValues: generateRandomStatObject(31),
			happiness: 70,
			firstMove: { name: 'calm-mind', usedPP: 0 },
		},
		researchPoints: 100,
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'giovanni');
		},
		kind: 'BULLETIN',
		availableAfter: 'reach ranger level 5',
	},
	'report a bug': {
		category: 'RESEARCH',
		conditionFunction: (s) => !!s.mileStones.hasReportedBug,
		kind: 'QUEST_LINE',
		researchPoints: 20,
		rewardItems: { 'lucky-egg': 1 },
	},
	'train a Pokemon to 200 Attack EV': {
		category: 'TRAINING',
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.onTeam && p.effortValues.attack > 200),
		kind: 'QUEST_LINE',
		researchPoints: 25,
		rewardItems: {
			'power-anklet': 1,
			'power-band': 1,
			'power-belt': 1,
			'power-bracer': 1,
			'power-lens': 1,
			'power-weight': 1,
		},
	},
	'train a Pokemon to 200 Special Attack EV': {
		category: 'TRAINING',
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.onTeam && p.effortValues['special-attack'] > 200),
		kind: 'QUEST_LINE',
		researchPoints: 25,
		rewardItems: {
			'health-mochi': 2,
			'muscle-mochi': 2,
			'resist-mochi': 2,
			'genius-mochi': 2,
			'clever-mochi': 2,
			'swift-mochi': 2,
		},
	},
	'train a Pokemon to 200 Defense EV': {
		category: 'TRAINING',
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.onTeam && p.effortValues['defense'] > 200),
		kind: 'QUEST_LINE',
		researchPoints: 25,
		rewardItems: {
			'health-mochi': 2,
			'muscle-mochi': 2,
			'resist-mochi': 2,
			'genius-mochi': 2,
			'clever-mochi': 2,
			'swift-mochi': 2,
		},
	},
	'train a Pokemon to 200 Special Defense EV': {
		category: 'TRAINING',
		conditionFunction: (s) =>
			s.pokemon.some(
				(p) => p.onTeam && p.effortValues['special-defense'] > 200
			),
		kind: 'QUEST_LINE',
		researchPoints: 25,
		rewardItems: {
			'health-mochi': 2,
			'muscle-mochi': 2,
			'resist-mochi': 2,
			'genius-mochi': 2,
			'clever-mochi': 2,
			'swift-mochi': 2,
		},
	},
	'train a Pokemon to 200 Speed EV': {
		category: 'TRAINING',
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.onTeam && p.effortValues['speed'] > 200),
		kind: 'QUEST_LINE',
		researchPoints: 25,
		rewardItems: {
			'health-mochi': 2,
			'muscle-mochi': 2,
			'resist-mochi': 2,
			'genius-mochi': 2,
			'clever-mochi': 2,
			'swift-mochi': 2,
		},
	},
	'train a Pokemon to 200 Hp EV': {
		category: 'TRAINING',
		conditionFunction: (s) =>
			s.pokemon.some((p) => p.onTeam && p.effortValues['hp'] > 200),
		kind: 'QUEST_LINE',
		researchPoints: 25,
		rewardItems: {
			'health-mochi': 2,
			'muscle-mochi': 2,
			'resist-mochi': 2,
			'genius-mochi': 2,
			'clever-mochi': 2,
			'swift-mochi': 2,
		},
	},
	'train the EV of two stats over 200 on a Pokemon': {
		category: 'TRAINING',
		conditionFunction: (s) =>
			s.pokemon.some(
				(p) =>
					p.onTeam &&
					Object.values(p.effortValues).filter((e) => e > 200).length >= 2
			),
		kind: 'QUEST_LINE',
		researchPoints: 50,
		rewardItems: {
			'health-mochi': 10,
			'muscle-mochi': 10,
			'resist-mochi': 10,
			'genius-mochi': 10,
			'clever-mochi': 10,
			'swift-mochi': 10,
		},
	},
	'train a Pokemon to 510 EV': {
		category: 'TRAINING',
		conditionFunction: (s) =>
			s.pokemon.some((p) => {
				const totalEvs = Object.values(p.effortValues).reduce(
					(sum, summand) => sum + summand,
					0
				);
				return totalEvs >= 510;
			}),
		kind: 'QUEST_LINE',
		researchPoints: 50,
		rewardItems: {
			'health-mochi': 20,
			'muscle-mochi': 20,
			'resist-mochi': 20,
			'genius-mochi': 20,
			'clever-mochi': 20,
			'swift-mochi': 20,
		},
	},
	'clear out the rocket camp': {
		category: 'BATTLE',
		researchPoints: 50,
		rewardItems: { 'moomoo-milk': 5, 'big-malasada': 5 },
		rangerLevels: 5,
		kind: 'QUEST_LINE',
		conditionFunction: allRocketCampTrainersDefeated,
	},
	'catch a weak pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'poke-ball': 2 },
		researchPoints: 5,
		conditionFunction: (s) =>
			Object.keys(lowBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 0,
	},
	'catch 10 weak pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'poke-ball': 5 },
		researchPoints: 10,
		availableAfter: 'catch a weak pokemon',
		conditionFunction: (s) =>
			Object.keys(lowBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 9,
	},
	'catch 20 weak pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'poke-ball': 10 },
		researchPoints: 20,
		availableAfter: 'catch 10 weak pokemon',
		conditionFunction: (s) =>
			Object.keys(lowBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 19,
	},
	'catch 50 weak pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'poke-ball': 10 },
		researchPoints: 50,
		availableAfter: 'catch 20 weak pokemon',
		conditionFunction: (s) =>
			Object.keys(lowBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 49,
	},
	'catch 100 weak pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'poke-ball': 10 },
		researchPoints: 100,
		availableAfter: 'catch 50 weak pokemon',
		conditionFunction: (s) =>
			Object.keys(lowBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 99,
	},
	'catch all weak pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'master-ball': 1 },
		researchPoints: 100,
		availableAfter: 'catch 100 weak pokemon',
		conditionFunction: (s) =>
			Object.keys(lowBstPokemon).every(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			),
	},
	'catch a medium strong pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'great-ball': 3, 'coba-berry': 10 },
		researchPoints: 10,
		availableAfter: 'catch a weak pokemon',
		conditionFunction: (s) =>
			Object.keys(midBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 0,
	},
	'catch 10 medium strong pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'great-ball': 5, 'coba-berry': 10 },
		researchPoints: 20,
		availableAfter: 'catch a medium strong pokemon',
		conditionFunction: (s) =>
			Object.keys(midBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 9,
	},
	'catch 20 medium strong pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'great-ball': 10, 'coba-berry': 10 },
		researchPoints: 40,
		availableAfter: 'catch 10 medium strong pokemon',
		conditionFunction: (s) =>
			Object.keys(midBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 19,
	},
	'catch 50 medium strong pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'great-ball': 10 },
		researchPoints: 100,
		availableAfter: 'catch 20 medium strong pokemon',
		conditionFunction: (s) =>
			Object.keys(midBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 49,
	},
	'catch 100 medium strong pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'great-ball': 10 },
		researchPoints: 100,
		availableAfter: 'catch 50 medium strong pokemon',
		conditionFunction: (s) =>
			Object.keys(midBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 99,
	},
	'catch all medium strong pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'master-ball': 1 },
		researchPoints: 100,
		availableAfter: 'catch 100 medium strong pokemon',
		conditionFunction: (s) =>
			Object.keys(midBstPokemon).every(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			),
	},
	'catch a strong pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'ultra-ball': 3, 'aguav-berry': 10 },
		researchPoints: 10,
		availableAfter: 'catch a medium strong pokemon',
		conditionFunction: (s) =>
			Object.keys(highBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 0,
	},
	'catch 10 strong pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'ultra-ball': 5, 'aguav-berry': 20 },
		researchPoints: 30,
		availableAfter: 'catch a strong pokemon',
		conditionFunction: (s) =>
			Object.keys(highBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 9,
	},
	'catch 20 strong pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'ultra-ball': 10, 'aguav-berry': 20 },
		researchPoints: 60,
		availableAfter: 'catch 10 strong pokemon',
		conditionFunction: (s) =>
			Object.keys(highBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 19,
	},
	'catch 50 strong pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'ultra-ball': 10, 'aguav-berry': 20 },
		researchPoints: 100,
		availableAfter: 'catch 20 strong pokemon',
		conditionFunction: (s) =>
			Object.keys(highBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 49,
	},
	'catch 100 strong pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'ultra-ball': 10 },
		researchPoints: 100,
		availableAfter: 'catch 50 strong pokemon',
		conditionFunction: (s) =>
			Object.keys(highBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 99,
	},
	'catch all strong pokemon': {
		category: 'POKEDEX',
		kind: 'BULLETIN',
		rewardItems: { 'master-ball': 1 },
		researchPoints: 100,
		availableAfter: 'catch 100 strong pokemon',
		conditionFunction: (s) =>
			Object.keys(highBstPokemon).every(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			),
	},
	'reach random field rank 1': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 10,
		rewardItems: {
			[`${moveUnlockPayments.at(0)}`]: 3,
		},
		requiredUpgrade: 'training field 1',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.randomFieldRecord && s.mileStones.randomFieldRecord >= 1
			);
		},
	},
	'reach random field rank 10': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 20,
		rewardItems: {
			[`${moveUnlockPayments.at(1)}`]: 3,
		},
		requiredUpgrade: 'training field 1',
		availableAfter: 'reach random field rank 1',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.randomFieldRecord && s.mileStones.randomFieldRecord >= 10
			);
		},
	},
	'reach random field rank 20': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 40,
		rewardItems: {
			[`${moveUnlockPayments.at(2)}`]: 3,
		},
		requiredUpgrade: 'training field 1',
		availableAfter: 'reach random field rank 10',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.randomFieldRecord && s.mileStones.randomFieldRecord >= 20
			);
		},
	},
	'reach random field rank 30': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 60,
		rewardItems: {
			[`${moveUnlockPayments.at(3)}`]: 3,
		},
		requiredUpgrade: 'training field 1',
		availableAfter: 'reach random field rank 20',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.randomFieldRecord && s.mileStones.randomFieldRecord >= 30
			);
		},
	},
	'reach random field rank 40': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 80,
		rewardItems: {
			[`${moveUnlockPayments.at(4)}`]: 3,
		},
		requiredUpgrade: 'training field 1',
		availableAfter: 'reach random field rank 30',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.randomFieldRecord && s.mileStones.randomFieldRecord >= 40
			);
		},
	},
	'reach random field rank 50': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: {
			[`${moveUnlockPayments.at(5)}`]: 3,
		},
		requiredUpgrade: 'training field 1',
		availableAfter: 'reach random field rank 40',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.randomFieldRecord && s.mileStones.randomFieldRecord >= 50
			);
		},
	},
	'reach random field rank 60': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: {
			[`${moveUnlockPayments.at(6)}`]: 3,
		},
		requiredUpgrade: 'training field 1',
		availableAfter: 'reach random field rank 50',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.randomFieldRecord && s.mileStones.randomFieldRecord >= 60
			);
		},
	},
	'reach random field rank 70': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: {
			[`${moveUnlockPayments.at(7)}`]: 3,
		},
		requiredUpgrade: 'training field 1',
		availableAfter: 'reach random field rank 60',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.randomFieldRecord && s.mileStones.randomFieldRecord >= 70
			);
		},
	},
	'reach random field rank 80': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: {
			'exp-candy-xl': 10,
		},
		requiredUpgrade: 'training field 1',
		availableAfter: 'reach random field rank 70',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.randomFieldRecord && s.mileStones.randomFieldRecord >= 80
			);
		},
	},
	'reach random field rank 90': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: {
			'exp-candy-xl': 10,
		},
		requiredUpgrade: 'training field 1',
		availableAfter: 'reach random field rank 80',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.randomFieldRecord && s.mileStones.randomFieldRecord >= 90
			);
		},
	},
	'reach random field rank 100': {
		category: 'TRAINING',
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: {
			'exp-candy-xl': 20,
		},
		requiredUpgrade: 'training field 1',
		availableAfter: 'reach random field rank 90',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.randomFieldRecord && s.mileStones.randomFieldRecord >= 100
			);
		},
	},
	'achieve a catch streak of 3': {
		kind: 'BULLETIN',
		category: 'EXPLORATION',
		rewardItems: { 'quick-ball': 3 },
		researchPoints: 20,
		conditionFunction: (s) => (s.longestStreak ?? 0) >= 3,
		progress: (s) => ({ goal: 3, current: s.longestStreak ?? 0 }),
	},
	'achieve a catch streak of 10': {
		kind: 'BULLETIN',
		category: 'EXPLORATION',
		rewardItems: { 'quick-ball': 10 },
		availableAfter: 'achieve a catch streak of 3',
		researchPoints: 40,
		conditionFunction: (s) => (s.longestStreak ?? 0) >= 10,
		progress: (s) => ({ goal: 10, current: s.longestStreak ?? 0 }),
	},
	'achieve a catch streak of 15': {
		kind: 'BULLETIN',
		category: 'EXPLORATION',
		rewardItems: { 'quick-ball': 15 },
		availableAfter: 'achieve a catch streak of 10',
		researchPoints: 60,
		conditionFunction: (s) => (s.longestStreak ?? 0) >= 15,
		progress: (s) => ({ goal: 15, current: s.longestStreak ?? 0 }),
	},
	'achieve a catch streak of 20': {
		kind: 'BULLETIN',
		category: 'EXPLORATION',
		rewardItems: { 'quick-ball': 20 },
		availableAfter: 'achieve a catch streak of 15',
		researchPoints: 80,
		conditionFunction: (s) => (s.longestStreak ?? 0) >= 20,
		progress: (s) => ({ goal: 20, current: s.longestStreak ?? 0 }),
	},
	'achieve a catch streak of 31': {
		kind: 'BULLETIN',
		category: 'EXPLORATION',
		rewardItems: { 'quick-ball': 31 },
		availableAfter: 'achieve a catch streak of 20',
		researchPoints: 100,
		conditionFunction: (s) => (s.longestStreak ?? 0) >= 31,
		progress: (s) => ({ goal: 31, current: s.longestStreak ?? 0 }),
	},
	'catch a future distortion pokemon': {
		kind: 'BULLETIN',
		category: 'RESEARCH',
		targetPokemon: getSwarmOptions('FUTURE_DISTORTION'),
		rewardItems: { 'rare-candy': 3, 'quick-ball': 5 },
		researchPoints: 25,
		requiredUpgrade: 'time distortion radar',
		conditionFunction: (s) =>
			getSwarmOptions('FUTURE_DISTORTION').some(
				(f) => s.pokedex[f].caughtOnRoutes.length > 0
			),
	},
	'catch a past distortion pokemon': {
		kind: 'BULLETIN',
		category: 'RESEARCH',
		targetPokemon: getSwarmOptions('PAST_DISTORTION'),
		rewardItems: { 'rare-candy': 3, 'quick-ball': 5 },
		researchPoints: 25,
		requiredUpgrade: 'time distortion radar',
		conditionFunction: (s) =>
			getSwarmOptions('PAST_DISTORTION').some(
				(f) => s.pokedex[f].caughtOnRoutes.length > 0
			),
	},
	'catch all future distortion pokemon': {
		kind: 'BULLETIN',
		category: 'RESEARCH',
		targetPokemon: getSwarmOptions('FUTURE_DISTORTION'),
		rewardItems: { 'rare-candy': 10, 'quick-ball': 20 },
		researchPoints: 100,
		requiredUpgrade: 'time distortion radar',
		conditionFunction: (s) =>
			getSwarmOptions('FUTURE_DISTORTION').every(
				(f) => s.pokedex[f].caughtOnRoutes.length > 0
			),
	},
	'catch all past distortion pokemon': {
		kind: 'BULLETIN',
		category: 'RESEARCH',
		targetPokemon: getSwarmOptions('PAST_DISTORTION'),
		rewardItems: { 'rare-candy': 10, 'quick-ball': 20 },
		researchPoints: 100,
		requiredUpgrade: 'time distortion radar',
		conditionFunction: (s) =>
			getSwarmOptions('PAST_DISTORTION').every(
				(f) => s.pokedex[f].caughtOnRoutes.length > 0
			),
	},
	'catch a space distortion pokemon': {
		kind: 'BULLETIN',
		category: 'RESEARCH',
		targetPokemon: getSwarmOptions('SPACE_DISTORTION'),
		rewardItems: { 'rare-candy': 3, 'quick-ball': 5 },
		researchPoints: 25,
		requiredUpgrade: 'space distortion radar',
		conditionFunction: (s) =>
			getSwarmOptions('SPACE_DISTORTION').some(
				(f) => s.pokedex[f].caughtOnRoutes.length > 0
			),
	},
	'catch all space distortion pokemon': {
		kind: 'BULLETIN',
		category: 'RESEARCH',
		targetPokemon: getSwarmOptions('SPACE_DISTORTION'),
		rewardItems: { 'rare-candy': 10, 'quick-ball': 20 },
		researchPoints: 100,
		requiredUpgrade: 'space distortion radar',
		conditionFunction: (s) =>
			getSwarmOptions('SPACE_DISTORTION').every(
				(f) => s.pokedex[f].caughtOnRoutes.length > 0
			),
	},
	'train a pidgeot to lvl 70': {
		kind: 'BULLETIN',
		category: 'TRAINING',
		researchPoints: 100,
		campUpgrade: 'pidgeot rider certification',
		rewardItems: {},
		conditionFunction: (s) =>
			s.pokemon.some(
				(p) =>
					p.name === 'pidgeot' &&
					calculateLevelData(p.xp, p.growthRate).level >= 70
			),
	},
	'defeat an imported challenger': {
		category: 'BATTLE',
		kind: 'BULLETIN',
		conditionFunction: (s: SaveFile) =>
			!!s.mileStones.importedChallengerDefeatedAt,
		researchPoints: 10,
		rewardItems: { 'exp-candy-xs': 10 },
	},
	'defeat an imported challenger at lvl 20 or higher': {
		category: 'BATTLE',
		kind: 'BULLETIN',
		conditionFunction: (s: SaveFile) =>
			(s.mileStones.importedChallengerDefeatedAt ?? 0) >= 8000,
		researchPoints: 20,
		availableAfter: 'defeat an imported challenger',
		rewardItems: { 'exp-candy-s': 10 },
	},
	'defeat an imported challenger at lvl 40 or higher': {
		category: 'BATTLE',
		kind: 'BULLETIN',
		conditionFunction: (s: SaveFile) =>
			(s.mileStones.importedChallengerDefeatedAt ?? 0) >= 64000,
		researchPoints: 40,
		availableAfter: 'defeat an imported challenger at lvl 20 or higher',
		rewardItems: { 'exp-candy-m': 10 },
	},
	'defeat an imported challenger at lvl 60 or higher': {
		category: 'BATTLE',
		kind: 'BULLETIN',
		conditionFunction: (s: SaveFile) =>
			(s.mileStones.importedChallengerDefeatedAt ?? 0) >= 216000,
		researchPoints: 60,
		availableAfter: 'defeat an imported challenger at lvl 40 or higher',
		rewardItems: { 'exp-candy-l': 10 },
	},
	'defeat an imported challenger at lvl 80 or higher': {
		category: 'BATTLE',
		kind: 'BULLETIN',
		conditionFunction: (s: SaveFile) =>
			(s.mileStones.importedChallengerDefeatedAt ?? 0) >= 512000,
		researchPoints: 80,
		availableAfter: 'defeat an imported challenger at lvl 60 or higher',
		rewardItems: { 'exp-candy-xl': 10 },
	},
	'defeat an imported challenger at lvl 100': {
		category: 'BATTLE',
		kind: 'BULLETIN',
		conditionFunction: (s: SaveFile) =>
			(s.mileStones.importedChallengerDefeatedAt ?? 0) >= 1000000,
		researchPoints: 100,
		availableAfter: 'defeat an imported challenger at lvl 80 or higher',
		rewardItems: { 'exp-candy-xl': 10 },
	},
} as Record<QuestName, Quest>;

console.log('number of quests', questNames.length);

console.log(
	'quests w/o questName',
	Object.keys(QuestsRecord).filter(
		(key) => !([...new Set(questNames)] as string[]).includes(key)
	),
	'questNames w/o quest',
	questNames.filter((name) => !Object.keys(QuestsRecord).includes(name))
);
console.log(
	'total research points',
	Object.values(QuestsRecord).reduce(
		(sum, summand) => sum + summand.researchPoints,
		0
	)
);
console.log(
	'total costs',
	['Sustainability', 'Exploration', 'Research', 'Training']
		.map((cat) =>
			campUpgradeNames
				.filter((nam) => campUpgradeCategories[nam] === cat)
				.map((_, i) => campUpgradeCostScale + campUpgradeCostScale * i)
				.reduce((sum, summand) => sum + summand, 0)
		)
		.reduce((sum, summand) => sum + summand, 0)
);
