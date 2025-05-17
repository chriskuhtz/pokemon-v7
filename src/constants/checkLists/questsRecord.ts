import { v4 } from 'uuid';
import { calculateLevelData } from '../../functions/calculateLevelData';
import {
	tier1trainers,
	tier2trainers,
	tier3trainers,
	tier4trainers,
	tier5trainers,
	trainers,
} from '../../functions/makeRandomTrainer';
import { sumOfIvs } from '../../functions/sumOfIvs';
import { honeyPokemon } from '../../hooks/useHoneyTree';
import { Inventory } from '../../interfaces/Inventory';
import {
	apricorns,
	apricornTable,
	berries,
	fossilTable,
} from '../../interfaces/Item';
import { getRandomNature } from '../../interfaces/Natures';
import { Quest } from '../../interfaces/Quest';
import {
	EmptyStatObject,
	generateRandomStatObject,
} from '../../interfaces/StatObject';
import { sledgeHammerPokemon } from '../../modules/Overworld/hooks/useSledgeHammer';
import {
	highBstPokemon,
	lowBstPokemon,
	midBstPokemon,
} from '../baseStatRecord';
import { catchQuests } from '../generatedQuests/catchQuests';
import { typeCatchQuests } from '../generatedQuests/typeCatchQuests';
import { caveW1Encounters } from '../maps/encounters/caveW1';
import { onixCaveEncounters } from '../maps/encounters/onixCave';
import { allRocketCampTrainersDefeated } from '../maps/occupants/rocketCampOccupants';
import { routeS1 } from '../maps/routeS1';
import { PokemonName, pokemonNames } from '../pokemonNames';
import {
	campUpgradeCategories,
	campUpgradeCostScale,
	campUpgradeNames,
} from './campUpgrades';

const expCandyPackage: Partial<Inventory> = {
	'exp-candy-xs': 10,
	'exp-candy-s': 10,
	'exp-candy-m': 10,
	'exp-candy-l': 5,
	'exp-candy-xl': 2,
};
const smallExpCandyPackage: Partial<Inventory> = {
	'exp-candy-xs': 10,
	'exp-candy-s': 10,
	'exp-candy-m': 5,
	'exp-candy-l': 1,
};

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
	'catch all different pokemon on routeS1',
	'lure a pokemon with a berry',
	'lure 10 different pokemon with berries',
	'lure 20 different pokemon with berries',
	'lure 30 different pokemon with berries',
	'lure 40 different pokemon with berries',
	'lure 50 different pokemon with berries',
	'lure 60 different pokemon with berries',
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
] as const;

export type QuestName = (typeof questNames)[number];

export const QuestsRecord: Record<QuestName, Quest> = {
	...catchQuests,
	...typeCatchQuests,
	'catch a pokemon': {
		rewardItems: { 'poke-ball': 10 },
		researchPoints: campUpgradeCostScale,
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
		kind: 'QUEST_LINE',
	},
	'find a lightball': {
		rewardItems: { 'thunder-stone': 1 },
		researchPoints: 30,
		conditionFunction: (s) => {
			return s.bag['light-ball'] > 0;
		},
		kind: 'QUEST_LINE',
	},
	'retrieve oaks parcel from raticate': {
		rewardItems: { 'big-malasada': 1, 'ultra-ball': 5 },
		researchPoints: 25,
		conditionFunction: (s) => {
			return s.pokemon.some(
				(p) => p.name === 'raticate' && p.caughtOnMap === 'routeS1E1'
			);
		},
		kind: 'QUEST_LINE',
	},
	'catch all mouselike electric pokemon': {
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
		rewardItems: { 'ultra-ball': 10, 'pewter-crunchies': 2 },
		researchPoints: 25,
		targetPokemon: ['sudowoodo'],
		conditionFunction: (s) => {
			return s.pokedex.sudowoodo.caughtOnRoutes.length > 0;
		},
		requiredUpgrade: 'swimming certification',
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
	'catch all pokemon that live under rocks': {
		rewardItems: {
			'black-augurite': 1,
			'peat-block': 1,
			'lumiose-galette': 5,
			'fossilized-bird': 2,
		},
		researchPoints: 20,
		conditionFunction: (s) => {
			return sledgeHammerPokemon.every(
				(e) => s.pokedex[e].caughtOnRoutes.length > 0
			);
		},
		targetPokemon: sledgeHammerPokemon,
		kind: 'BULLETIN',
		availableAfter: 'find a pokemon under a smashed rock',
		requiredUpgrade: 'sledge hammer certification',
	},
	'catch all different pokemon on routeS1': {
		rewardItems: {
			'dragon-scale': 1,
			'water-stone': 2,
			'belue-berry': 5,
			'razz-berry': 5,
			'rindo-berry': 5,
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return [
				...routeS1.possibleEncounters.BASE,
				...routeS1.possibleEncounters.WATER,
			].every((e) => s.pokedex[e.name].caughtOnRoutes.includes(routeS1.id));
		},
		targetPokemon: [
			...new Set(
				[
					...routeS1.possibleEncounters.BASE,
					...routeS1.possibleEncounters.WATER,
				].map((p) => p.name)
			),
		],
		kind: 'BULLETIN',
		requiredUpgrade: 'swimming certification',
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
	'catch all forms of tauros': {
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
	'evolve a combee': {
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
		rewardItems: { 'soothe-bell': 1 },
		researchPoints: 20,
		conditionFunction: (s) => {
			return !!s.mileStones.hasEvolvedAPokemonWithAHeldItem;
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon with a stone',
	},
	'evolve a pokemon through friendship': {
		rewardItems: { 'moon-stone': 2 },
		researchPoints: 25,
		conditionFunction: (s) => {
			return !!s.mileStones.hasEvolvedAPokemonThroughFriendship;
		},
		kind: 'QUEST_LINE',
		availableAfter: 'evolve a pokemon with a held item',
	},
	'evolve male and female nidoran into their final form': {
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
		availableAfter: 'evolve gloom into vileplume and bellosom',
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
	'catch a pokemon with perfect attack ivs': {
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
	'catch Haunter and Mightyena': {
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
			'spell-tag': 1,
			...expCandyPackage,
		},
		rewardPokemon: {
			caughtAtDate: new Date().getTime(),
			growthRate: 'medium',
			unlockedMoves: ['ominous-wind'],
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
	'defeat bugsy': {
		rewardItems: {
			'ultra-ball': 10,
			'full-restore': 5,
			'silver-powder': 1,
			...expCandyPackage,
		},
		rewardPokemon: {
			caughtAtDate: new Date().getTime(),
			growthRate: 'medium',
			unlockedMoves: ['tail-glow'],
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
			ability: 'drought',
			name: 'larvesta',
			xp: 125,
			nature: 'adamant',
			intrinsicValues: generateRandomStatObject(31),
			happiness: 70,
			firstMove: { name: 'tail-glow', usedPP: 0 },
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Bugsy');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'report a bug',
	},
	'defeat chuck': {
		rewardItems: {
			'full-restore': 5,
			'black-belt': 1,
			...expCandyPackage,
		},
		rewardPokemon: {
			caughtAtDate: new Date().getTime(),
			growthRate: 'medium',
			unlockedMoves: ['drill-peck'],
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
			name: 'hawlucha',
			xp: 125,
			nature: 'adamant',
			intrinsicValues: generateRandomStatObject(31),
			happiness: 70,
			firstMove: { name: 'drill-peck', usedPP: 0 },
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Chuck');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'deal 10000 damage with one attack',
	},
	'defeat roark': {
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
	'defeat falkner': {
		rewardItems: {
			'ultra-ball': 10,
			'full-restore': 5,
			'sharp-beak': 1,
			...expCandyPackage,
		},
		rewardPokemon: {
			caughtAtDate: new Date().getTime(),
			growthRate: 'medium',
			unlockedMoves: ['drill-peck'],
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
			ability: 'adaptability',
			name: 'rufflet',
			xp: 125,
			nature: 'adamant',
			intrinsicValues: generateRandomStatObject(31),
			happiness: 70,
			firstMove: { name: 'drill-peck', usedPP: 0 },
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Falkner');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'catch the legendary bird of ice',
	},
	'defeat rowan': {
		rewardItems: {
			'ultra-ball': 10,
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
		rewardItems: {
			'ultra-ball': 10,
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
		rewardItems: { 'rare-candy': 10 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokedex['articuno'].caughtOnRoutes.length > 0;
		},
		targetPokemon: ['articuno'],
		kind: 'QUEST_LINE',
	},
	'catch the legendary bird of fire': {
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
		rewardItems: { 'rare-candy': 10 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokedex['mew'].caughtOnRoutes.length > 0;
		},
		targetPokemon: ['mew'],
		requiredUpgrade: 'invite historian',
		kind: 'BULLETIN',
	},
	'revive a fossil': {
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
		kind: 'BULLETIN',
		rewardItems: {
			'rare-candy': 5,
			'ultra-ball': 20,
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
		researchPoints: 20,
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
		researchPoints: 50,
		rewardItems: {
			'ultra-ball': 20,
		},
		availableAfter: 'catch 20 different species',
		conditionFunction: (s) =>
			Object.values(s.pokedex).filter((p) => p.caughtOnRoutes.length > 0)
				.length >= 50,
	},
	'catch 100 different species': {
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
		researchPoints: 100,
		rewardItems: { 'master-ball': 1 },
		conditionFunction: (s) =>
			[...berries, ...apricorns].every((item) => s.seedVault?.includes(item)),
	},
	'catch a pokemon from onix cave': {
		kind: 'BULLETIN',
		requiredUpgrade: 'shovel certification',
		researchPoints: 10,
		rewardItems: { 'babiri-berry': 2, 'kee-berry': 2, 'fossilized-dino': 2 },
		targetRoute: 'onixCave',
		targetPokemon: onixCaveEncounters.BASE.map((p) => p.name),
		conditionFunction: (s) =>
			onixCaveEncounters.BASE.some((o) =>
				s.pokedex[o.name].caughtOnRoutes.includes('onixCave')
			),
	},
	'catch all pokemon from onix cave': {
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
		targetPokemon: onixCaveEncounters.BASE.map((p) => p.name),
		conditionFunction: (s) =>
			onixCaveEncounters.BASE.every((o) =>
				s.pokedex[o.name].caughtOnRoutes.includes('onixCave')
			),
	},
	'catch all pokemon from caveW1': {
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
		targetPokemon: caveW1Encounters.BASE.map((p) => p.name),
		conditionFunction: (s) =>
			caveW1Encounters.BASE.every((o) =>
				s.pokedex[o.name].caughtOnRoutes.includes('caveW1')
			),
	},
	'wake a snorlax': {
		kind: 'BULLETIN',
		requiredUpgrade: 'shovel certification',
		researchPoints: 25,
		rewardItems: {
			'enigma-berry': 2,
		},
		conditionFunction: (s) => !!s.mileStones.hasWokenASnorlax,
	},
	'catch all evolutions of eevee': {
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
		kind: 'BULLETIN',
		requiredUpgrade: 'berry lure station routeN1',
		researchPoints: 20,
		rewardItems: {
			'roseli-berry': 1,
			'passho-berry': 1,
			'wacan-berry': 1,
			'yache-berry': 1,
		},
		conditionFunction: (s) => s.mileStones.luredWithBerries.length > 0,
	},
	'lure 10 different pokemon with berries': {
		kind: 'BULLETIN',
		requiredUpgrade: 'berry lure station routeN1',
		availableAfter: 'lure a pokemon with a berry',
		researchPoints: 30,
		rewardItems: {
			'chople-berry': 1,
			'shuca-berry': 1,
			'coba-berry': 1,
			'payapa-berry': 1,
		},
		conditionFunction: (s) => s.mileStones.luredWithBerries.length > 9,
	},
	'lure 20 different pokemon with berries': {
		kind: 'BULLETIN',
		requiredUpgrade: 'berry lure station routeN1',
		availableAfter: 'lure 10 different pokemon with berries',
		researchPoints: 40,
		rewardItems: {
			'tanga-berry': 1,
			'charti-berry': 1,
			'kasib-berry': 1,
			'colbur-berry': 1,
			'babiri-berry': 1,
		},
		conditionFunction: (s) => s.mileStones.luredWithBerries.length > 19,
	},
	'lure 30 different pokemon with berries': {
		kind: 'BULLETIN',
		requiredUpgrade: 'berry lure station routeN1',
		availableAfter: 'lure 20 different pokemon with berries',
		researchPoints: 50,
		rewardItems: {
			'golden-nanab-berry': 3,
			'golden-pinap-berry': 3,
			'golden-razz-berry': 3,
		},
		conditionFunction: (s) => s.mileStones.luredWithBerries.length > 29,
	},
	'lure 40 different pokemon with berries': {
		kind: 'BULLETIN',
		requiredUpgrade: 'berry lure station routeN1',
		availableAfter: 'lure 30 different pokemon with berries',
		researchPoints: 60,
		rewardItems: {
			'rare-candy': 10,
		},
		conditionFunction: (s) => s.mileStones.luredWithBerries.length > 39,
	},
	'lure 50 different pokemon with berries': {
		kind: 'BULLETIN',
		requiredUpgrade: 'berry lure station routeN1',
		availableAfter: 'lure 40 different pokemon with berries',
		researchPoints: 70,
		rewardItems: {
			'rare-candy': 10,
		},
		conditionFunction: (s) => s.mileStones.luredWithBerries.length > 49,
	},
	'lure 60 different pokemon with berries': {
		kind: 'BULLETIN',
		requiredUpgrade: 'berry lure station routeN1',
		availableAfter: 'lure 50 different pokemon with berries',
		researchPoints: 80,
		rewardItems: {
			'rare-candy': 10,
		},
		conditionFunction: (s) => s.mileStones.luredWithBerries.length > 59,
	},
	'catch a pokemon from a swarm': {
		kind: 'BULLETIN',
		requiredUpgrade: 'pokemon swarm radar',
		researchPoints: 20,
		rewardItems: { 'nest-ball': 20 },
		conditionFunction: (s) => s.mileStones.caughtFromSwarms.length > 0,
	},
	'catch 3 different pokemon from swarms': {
		kind: 'BULLETIN',
		requiredUpgrade: 'pokemon swarm radar',
		availableAfter: 'catch a pokemon from a swarm',
		researchPoints: 50,
		rewardItems: { 'dusk-ball': 20 },
		conditionFunction: (s) => s.mileStones.caughtFromSwarms.length >= 3,
	},
	'catch 10 different pokemon from swarms': {
		kind: 'BULLETIN',
		requiredUpgrade: 'pokemon swarm radar',
		availableAfter: 'catch 3 different pokemon from swarms',
		researchPoints: 100,
		rewardItems: {
			'quick-ball': 20,
		},
		conditionFunction: (s) => s.mileStones.caughtFromSwarms.length >= 10,
	},
	'catch 20 different pokemon from swarms': {
		kind: 'BULLETIN',
		requiredUpgrade: 'pokemon swarm radar',
		availableAfter: 'catch 10 different pokemon from swarms',
		researchPoints: 100,
		rewardItems: {
			'ultra-ball': 20,
		},
		conditionFunction: (s) => s.mileStones.caughtFromSwarms.length >= 20,
	},
	'deal 50 damage with one attack': {
		kind: 'QUEST_LINE',
		researchPoints: 10,
		conditionFunction: (s) => s.mileStones.damageRecord >= 50,
		rewardItems: { 'big-malasada': 1, 'x-attack': 1 },
	},
	'deal 100 damage with one attack': {
		kind: 'QUEST_LINE',
		researchPoints: 20,
		conditionFunction: (s) => s.mileStones.damageRecord >= 100,
		rewardItems: { casteliacone: 1, 'wise-glasses': 1 },
	},
	'deal 200 damage with one attack': {
		kind: 'QUEST_LINE',
		researchPoints: 30,
		conditionFunction: (s) => s.mileStones.damageRecord >= 200,
		rewardItems: { 'lava-cookie': 1, 'scope-lens': 1 },
	},
	'deal 500 damage with one attack': {
		kind: 'QUEST_LINE',
		researchPoints: 40,
		conditionFunction: (s) => s.mileStones.damageRecord >= 500,
		rewardItems: { 'old-gateau': 1, 'choice-band': 1 },
	},
	'deal 1000 damage with one attack': {
		kind: 'QUEST_LINE',
		researchPoints: 50,
		conditionFunction: (s) => s.mileStones.damageRecord >= 1000,
		rewardItems: { 'rage-candy-bar': 1, 'choice-band': 1 },
	},
	'deal 2000 damage with one attack': {
		kind: 'QUEST_LINE',
		researchPoints: 100,
		conditionFunction: (s) => s.mileStones.damageRecord >= 2000,
		rewardItems: { 'big-malasada': 1, 'choice-specs': 1 },
	},
	'deal 5000 damage with one attack': {
		kind: 'QUEST_LINE',
		researchPoints: 100,
		conditionFunction: (s) => s.mileStones.damageRecord >= 5000,
		rewardItems: { 'big-malasada': 1 },
	},
	'deal 10000 damage with one attack': {
		kind: 'QUEST_LINE',
		researchPoints: 100,
		conditionFunction: (s) => s.mileStones.damageRecord >= 10000,
		rewardItems: { 'big-malasada': 1 },
		availableAfter: 'deal 5000 damage with one attack',
	},
	'deal 20000 damage with one attack': {
		kind: 'BULLETIN',
		researchPoints: 100,
		conditionFunction: (s) => s.mileStones.damageRecord >= 20000,
		rewardItems: { 'weakness-policy': 1 },
		availableAfter: 'deal 10000 damage with one attack',
	},
	'deal 30000 damage with one attack': {
		kind: 'BULLETIN',
		researchPoints: 100,
		conditionFunction: (s) => s.mileStones.damageRecord >= 30000,
		rewardItems: { 'master-ball': 1 },
		availableAfter: 'deal 20000 damage with one attack',
	},
	'deal 50000 damage with one attack': {
		kind: 'BULLETIN',
		researchPoints: 100,
		conditionFunction: (s) => s.mileStones.damageRecord >= 50000,
		rewardItems: { 'master-ball': 1 },
		availableAfter: 'deal 30000 damage with one attack',
	},
	'defeat erika': {
		kind: 'BULLETIN',
		researchPoints: 25,
		rewardItems: {
			'rindo-berry': 5,
			'miracle-seed': 1,
			'big-root': 1,
			...smallExpCandyPackage,
		},
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Erika');
		},
	},
	'defeat janine': {
		kind: 'BULLETIN',
		researchPoints: 25,
		rewardItems: {
			'kebia-berry': 5,
			'black-sludge': 1,
			...smallExpCandyPackage,
		},
		requiredUpgrade: 'machete certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Janine');
		},
	},
	'defeat blaine': {
		kind: 'BULLETIN',
		researchPoints: 25,
		rewardItems: { 'occa-berry': 5, charcoal: 1, ...expCandyPackage },
		requiredUpgrade: 'sledge hammer certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Blaine');
		},
	},
	'defeat surge': {
		kind: 'BULLETIN',
		researchPoints: 50,
		rewardItems: { 'wacan-berry': 5, magnet: 1, ...expCandyPackage },
		requiredUpgrade: 'shovel certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Surge');
		},
	},
	'defeat misty': {
		kind: 'BULLETIN',
		researchPoints: 50,
		rewardItems: {
			'passho-berry': 5,
			'mystic-water': 1,
			sprayduck: 1,
			...expCandyPackage,
		},
		requiredUpgrade: 'swimming certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Misty');
		},
	},
	'defeat sabrina': {
		kind: 'BULLETIN',
		researchPoints: 50,
		rewardItems: { 'payapa-berry': 5, 'twisted-spoon': 1, ...expCandyPackage },
		requiredUpgrade: 'swimming certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Sabrina');
		},
	},
	'defeat brock': {
		kind: 'BULLETIN',
		researchPoints: 50,
		rewardItems: { 'charti-berry': 5, 'hard-stone': 1, ...expCandyPackage },
		requiredUpgrade: 'swimming certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Brock');
		},
	},
	'defeat gary': {
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: {
			electirizer: 1,
			magmarizer: 1,
			protector: 1,
			...expCandyPackage,
		},
		requiredUpgrade: 'swimming certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Gary');
		},
	},
	'reach challenge field rank 1': {
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
		kind: 'BULLETIN',
		requiredUpgrade: 'ranger certification',
		researchPoints: 25,
		conditionFunction: (s) => (s.rangerLevel ?? 0) >= 1,
		rewardItems: { 'big-malasada': 1, 'rare-candy': 1, 'moomoo-milk': 2 },
	},
	'reach ranger level 5': {
		kind: 'BULLETIN',
		requiredUpgrade: 'ranger certification',
		availableAfter: 'reach ranger level 1',
		researchPoints: 50,
		conditionFunction: (s) => (s.rangerLevel ?? 0) >= 5,
		rewardItems: { 'old-gateau': 3, 'rare-candy': 3, 'moomoo-milk': 6 },
	},
	'reach ranger level 10': {
		kind: 'BULLETIN',
		requiredUpgrade: 'ranger certification',
		availableAfter: 'reach ranger level 5',
		researchPoints: 100,
		conditionFunction: (s) => (s.rangerLevel ?? 0) >= 10,
		rewardItems: { 'lumiose-galette': 5, 'rare-candy': 5, 'moomoo-milk': 10 },
	},
	'reach ranger level 20': {
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
			ability: 'dancer',
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
		conditionFunction: (s) => !!s.mileStones.hasReportedBug,
		kind: 'QUEST_LINE',
		researchPoints: 20,
		rewardItems: { 'great-ball': 10, 'lucky-egg': 1 },
	},
	'train a Pokemon to 200 Attack EV': {
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
		researchPoints: 50,
		rewardItems: { 'moomoo-milk': 5, 'big-malasada': 5 },
		rangerLevels: 5,
		kind: 'QUEST_LINE',
		conditionFunction: allRocketCampTrainersDefeated,
	},
	'catch a weak pokemon': {
		kind: 'BULLETIN',
		rewardItems: { 'poke-ball': 5 },
		researchPoints: 5,
		conditionFunction: (s) =>
			Object.keys(lowBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 0,
	},
	'catch 10 weak pokemon': {
		kind: 'BULLETIN',
		rewardItems: { 'poke-ball': 10 },
		researchPoints: 10,
		availableAfter: 'catch a weak pokemon',
		conditionFunction: (s) =>
			Object.keys(lowBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 9,
	},
	'catch 20 weak pokemon': {
		kind: 'BULLETIN',
		rewardItems: { 'poke-ball': 20 },
		researchPoints: 20,
		availableAfter: 'catch 10 weak pokemon',
		conditionFunction: (s) =>
			Object.keys(lowBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 19,
	},
	'catch 50 weak pokemon': {
		kind: 'BULLETIN',
		rewardItems: { 'poke-ball': 20 },
		researchPoints: 50,
		availableAfter: 'catch 20 weak pokemon',
		conditionFunction: (s) =>
			Object.keys(lowBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 49,
	},
	'catch 100 weak pokemon': {
		kind: 'BULLETIN',
		rewardItems: { 'poke-ball': 20 },
		researchPoints: 100,
		availableAfter: 'catch 50 weak pokemon',
		conditionFunction: (s) =>
			Object.keys(lowBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 99,
	},
	'catch all weak pokemon': {
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
		kind: 'BULLETIN',
		rewardItems: { 'great-ball': 5, 'coba-berry': 10 },
		researchPoints: 10,
		availableAfter: 'catch a weak pokemon',
		conditionFunction: (s) =>
			Object.keys(midBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 0,
	},
	'catch 10 medium strong pokemon': {
		kind: 'BULLETIN',
		rewardItems: { 'great-ball': 10, 'coba-berry': 10 },
		researchPoints: 20,
		availableAfter: 'catch a medium strong pokemon',
		conditionFunction: (s) =>
			Object.keys(midBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 9,
	},
	'catch 20 medium strong pokemon': {
		kind: 'BULLETIN',
		rewardItems: { 'great-ball': 20, 'coba-berry': 10 },
		researchPoints: 40,
		availableAfter: 'catch 10 medium strong pokemon',
		conditionFunction: (s) =>
			Object.keys(midBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 19,
	},
	'catch 50 medium strong pokemon': {
		kind: 'BULLETIN',
		rewardItems: { 'great-ball': 20 },
		researchPoints: 100,
		availableAfter: 'catch 20 medium strong pokemon',
		conditionFunction: (s) =>
			Object.keys(midBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 49,
	},
	'catch 100 medium strong pokemon': {
		kind: 'BULLETIN',
		rewardItems: { 'great-ball': 20 },
		researchPoints: 100,
		availableAfter: 'catch 50 medium strong pokemon',
		conditionFunction: (s) =>
			Object.keys(midBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 99,
	},
	'catch all medium strong pokemon': {
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
		kind: 'BULLETIN',
		rewardItems: { 'ultra-ball': 5, 'aguav-berry': 10 },
		researchPoints: 10,
		availableAfter: 'catch a medium strong pokemon',
		conditionFunction: (s) =>
			Object.keys(highBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 0,
	},
	'catch 10 strong pokemon': {
		kind: 'BULLETIN',
		rewardItems: { 'ultra-ball': 10, 'aguav-berry': 20 },
		researchPoints: 30,
		availableAfter: 'catch a strong pokemon',
		conditionFunction: (s) =>
			Object.keys(highBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 9,
	},
	'catch 20 strong pokemon': {
		kind: 'BULLETIN',
		rewardItems: { 'ultra-ball': 20, 'aguav-berry': 20 },
		researchPoints: 60,
		availableAfter: 'catch 10 strong pokemon',
		conditionFunction: (s) =>
			Object.keys(highBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 19,
	},
	'catch 50 strong pokemon': {
		kind: 'BULLETIN',
		rewardItems: { 'ultra-ball': 20, 'aguav-berry': 20 },
		researchPoints: 100,
		availableAfter: 'catch 20 strong pokemon',
		conditionFunction: (s) =>
			Object.keys(highBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 49,
	},
	'catch 100 strong pokemon': {
		kind: 'BULLETIN',
		rewardItems: { 'ultra-ball': 20 },
		researchPoints: 100,
		availableAfter: 'catch 50 strong pokemon',
		conditionFunction: (s) =>
			Object.keys(highBstPokemon).filter(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			).length > 99,
	},
	'catch all strong pokemon': {
		kind: 'BULLETIN',
		rewardItems: { 'master-ball': 1 },
		researchPoints: 100,
		availableAfter: 'catch 100 strong pokemon',
		conditionFunction: (s) =>
			Object.keys(highBstPokemon).every(
				(pok) => s.pokedex[pok as PokemonName].caughtOnRoutes.length > 0
			),
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
