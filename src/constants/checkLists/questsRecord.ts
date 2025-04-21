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
import { sledgeHammerPokemon } from '../../modules/Overworld/hooks/useSledgeHammer';
import { caveW1Encounters } from '../maps/encounters/caveW1';
import { onixCaveEncounters } from '../maps/encounters/onixCave';
import { routeE1 } from '../maps/routeE1';
import { routeN1 } from '../maps/routeN1';
import { routeN1E1 } from '../maps/routeN1E1';
import { routeN1W1 } from '../maps/routeN1W1';
import { routeS1 } from '../maps/routeS1';
import { routeS1E1 } from '../maps/routeS1E1';
import { routeS1W1 } from '../maps/routeS1W1';
import { routeW1 } from '../maps/routeW1';
import { PokemonName, pokemonNames } from '../pokemonNames';
import { CampUpgrade, campUpgradeNames } from './campUpgrades';

const rewardsMap: Partial<Record<QuestName, Partial<Inventory>>> = {
	//routeN1
	'catch a MORNING-time exclusive pokemon from routeN1': {
		'poke-ball': 5,
		'sitrus-berry': 2,
		'berry-juice': 1,
	},
	'catch a DAY-time exclusive pokemon from routeN1': {
		'poke-ball': 5,
		'cheri-berry': 2,
		'berry-juice': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeN1': {
		'poke-ball': 5,
		'chesto-berry': 2,
		'berry-juice': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeN1': {
		'poke-ball': 5,
		'pecha-berry': 2,
		'berry-juice': 1,
	},
	'catch all MORNING-time pokemon from routeN1': {
		'poke-ball': 5,
		'rawst-berry': 2,
		'berry-juice': 1,
	},
	'catch all DAY-time pokemon from routeN1': {
		'poke-ball': 5,
		'aspear-berry': 2,
		'berry-juice': 1,
	},
	'catch all EVENING-time pokemon from routeN1': {
		'poke-ball': 5,
		'leppa-berry': 2,
		'berry-juice': 1,
	},
	'catch all NIGHT-time pokemon from routeN1': {
		'poke-ball': 5,
		'oran-berry': 2,
		'berry-juice': 1,
	},
	//routeN1E1
	'catch a MORNING-time exclusive pokemon from routeN1E1': {
		'net-ball': 5,
		'persim-berry': 2,
		'berry-juice': 1,
	},
	'catch a DAY-time exclusive pokemon from routeN1E1': {
		'net-ball': 5,
		'lum-berry': 2,
		'berry-juice': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeN1E1': {
		'net-ball': 5,
		'figy-berry': 2,
		'berry-juice': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeN1E1': {
		'net-ball': 5,
		'mago-berry': 2,
		'berry-juice': 1,
	},
	'catch all MORNING-time pokemon from routeN1E1': {
		'net-ball': 5,
		'iapapa-berry': 2,
		'berry-juice': 1,
	},
	'catch all DAY-time pokemon from routeN1E1': {
		'net-ball': 5,
		'bluk-berry': 2,
		'berry-juice': 1,
	},
	'catch all EVENING-time pokemon from routeN1E1': {
		'net-ball': 5,
		'nanab-berry': 2,
		'berry-juice': 1,
	},
	'catch all NIGHT-time pokemon from routeN1E1': {
		'net-ball': 5,
		'pinap-berry': 2,
		'berry-juice': 1,
	},
	//routeE1
	'catch a MORNING-time exclusive pokemon from routeE1': {
		'quick-ball': 5,
		'aguav-berry': 2,
		'berry-juice': 1,
	},
	'catch a DAY-time exclusive pokemon from routeE1': {
		'quick-ball': 5,
		'wiki-berry': 2,
		'berry-juice': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeE1': {
		'quick-ball': 5,
		'razz-berry': 2,
		'berry-juice': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeE1': {
		'quick-ball': 5,
		'wepear-berry': 2,
		'berry-juice': 1,
	},
	'catch all MORNING-time pokemon from routeE1': {
		'quick-ball': 5,
		'pinap-berry': 2,
		'berry-juice': 1,
	},
	'catch all DAY-time pokemon from routeE1': {
		'quick-ball': 5,
		'pomeg-berry': 2,
		'berry-juice': 1,
	},
	'catch all EVENING-time pokemon from routeE1': {
		'quick-ball': 5,
		'kelpsy-berry': 2,
		'berry-juice': 1,
	},
	'catch all NIGHT-time pokemon from routeE1': {
		'quick-ball': 5,
		'qualot-berry': 1,
		'berry-juice': 1,
	},
	//routeS1E1
	'catch a MORNING-time exclusive pokemon from routeS1E1': {
		'great-ball': 5,
		'kee-berry': 2,
	},
	'catch a DAY-time exclusive pokemon from routeS1E1': {
		'great-ball': 5,
		'belue-berry': 2,
	},
	'catch a EVENING-time exclusive pokemon from routeS1E1': {
		'great-ball': 5,
		'rabuta-berry': 2,
	},
	'catch a NIGHT-time exclusive pokemon from routeS1E1': {
		'great-ball': 5,
		'pinap-berry': 2,
	},
	'catch all MORNING-time pokemon from routeS1E1': {
		'great-ball': 5,
		'qualot-berry': 2,
		'berry-juice': 1,
	},
	'catch all DAY-time pokemon from routeS1E1': {
		'great-ball': 5,
		'payapa-berry': 2,
		'berry-juice': 1,
	},
	'catch all EVENING-time pokemon from routeS1E1': {
		'great-ball': 5,
		'magost-berry': 2,
		'berry-juice': 1,
	},
	'catch all NIGHT-time pokemon from routeS1E1': {
		'great-ball': 5,
		'tamato-berry': 1,
		'berry-juice': 1,
	},
	//routeS1W1
	'catch a MORNING-time exclusive pokemon from routeS1W1': {
		'great-ball': 5,
		'rage-candy-bar': 1,
		'escape-rope': 1,
	},
	'catch a DAY-time exclusive pokemon from routeS1W1': {
		'great-ball': 5,
		'rage-candy-bar': 1,
		'escape-rope': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeS1W1': {
		'great-ball': 5,
		'rage-candy-bar': 1,
		'escape-rope': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeS1W1': {
		'great-ball': 5,
		'rage-candy-bar': 1,
		'escape-rope': 1,
	},
	'catch all MORNING-time pokemon from routeS1W1': {
		'great-ball': 5,
		'rare-candy': 1,
	},
	'catch all DAY-time pokemon from routeS1W1': {
		'great-ball': 5,
		'rare-candy': 1,
	},
	'catch all EVENING-time pokemon from routeS1W1': {
		'great-ball': 5,
		'rare-candy': 1,
	},
	'catch all NIGHT-time pokemon from routeS1W1': {
		'great-ball': 5,
		'rare-candy': 1,
	},
	//routeW1
	'catch a MORNING-time exclusive pokemon from routeW1': {
		'quick-ball': 5,
		'lumiose-galette': 1,
		'escape-rope': 1,
	},
	'catch a DAY-time exclusive pokemon from routeW1': {
		'quick-ball': 5,
		'lumiose-galette': 1,
		'escape-rope': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeW1': {
		'quick-ball': 5,
		'lumiose-galette': 1,
		'escape-rope': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeW1': {
		'quick-ball': 5,
		'lumiose-galette': 1,
		'escape-rope': 1,
	},
	'catch all MORNING-time pokemon from routeW1': {
		'quick-ball': 5,
		'rare-candy': 1,
	},
	'catch all DAY-time pokemon from routeW1': {
		'quick-ball': 5,
		'rare-candy': 1,
	},
	'catch all EVENING-time pokemon from routeW1': {
		'quick-ball': 5,
		'rare-candy': 1,
	},
	'catch all NIGHT-time pokemon from routeW1': {
		'quick-ball': 5,
		'rare-candy': 1,
	},
	//routeN1W1
	'catch a MORNING-time exclusive pokemon from routeN1W1': {
		'dusk-ball': 5,
		'pewter-crunchies': 1,
		'escape-rope': 1,
	},
	'catch a DAY-time exclusive pokemon from routeN1W1': {
		'dusk-ball': 5,
		'pewter-crunchies': 1,
		'escape-rope': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeN1W1': {
		'dusk-ball': 5,
		'pewter-crunchies': 1,
		'escape-rope': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeN1W1': {
		'dusk-ball': 5,
		'pewter-crunchies': 1,
		'escape-rope': 1,
	},
	'catch all MORNING-time pokemon from routeN1W1': {
		'dusk-ball': 5,
		'rare-candy': 1,
	},
	'catch all DAY-time pokemon from routeN1W1': {
		'dusk-ball': 5,
		'rare-candy': 1,
	},
	'catch all EVENING-time pokemon from routeN1W1': {
		'dusk-ball': 5,
		'rare-candy': 1,
	},
	'catch all NIGHT-time pokemon from routeN1W1': {
		'dusk-ball': 5,
		'rare-candy': 1,
	},
};

const catchQuestsForRoute = (
	route: OverworldMap,
	includeWater: boolean,
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
								...(includeWater ? route.possibleEncounters.WATER : []),
								...route.possibleEncounters[time],
							].every((e) =>
								s.pokedex[e.name].caughtOnRoutes.includes(route.id)
							);
						},
						targetPokemon: [
							...new Set(
								[
									...route.possibleEncounters.BASE,
									...(includeWater ? route.possibleEncounters.WATER : []),
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
					...route.possibleEncounters.BASE,
					...route.possibleEncounters.WATER,
					...route.possibleEncounters.NIGHT,
					...route.possibleEncounters.MORNING,
					...route.possibleEncounters.DAY,
					...route.possibleEncounters.EVENING,
				].some(
					(e) =>
						e.rarity === 'ultra-rare' &&
						s.pokedex[e.name].caughtOnRoutes.includes(route.id)
				);
			},
			targetPokemon: [
				...new Set(
					[
						...route.possibleEncounters.BASE,
						...route.possibleEncounters.WATER,
						...route.possibleEncounters.NIGHT,
						...route.possibleEncounters.MORNING,
						...route.possibleEncounters.DAY,
						...route.possibleEncounters.EVENING,
					]
						.filter((p) => p.rarity === 'ultra-rare')
						.map((p) => p.name)
				),
			],
			targetRoute: route.id,
			kind: 'BULLETIN',
			requiredUpgrade: requiredUpgrade,
		},
	};
};

const catchQuests = {
	...catchQuestsForRoute(routeN1, false),
	...catchQuestsForRoute(routeN1E1, false, 'machete certification'),
	...catchQuestsForRoute(routeE1, false, 'sledge hammer certification'),
	...catchQuestsForRoute(routeS1E1, true, 'swimming certification'),
	...catchQuestsForRoute(routeS1W1, true, 'swimming certification'),
	...catchQuestsForRoute(routeW1, true, 'swimming certification'),
	...catchQuestsForRoute(routeN1W1, true, 'buy skiing equipment'),
};

export const questNames = [
	...Object.keys(catchQuests),
	'catch a pikachu',
	'find a lightball',
	'catch all mouselike electric pokemon',
	'catch all costumed pikachus',
	'catch a feebas',
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
	'defeat five training field trainers',
	'defeat ten training field trainers',
	'defeat twenty training field trainers',
	'defeat thirty training field trainers',
	'defeat forty training field trainers',
	'defeat fifty training field trainers',
	'defeat sixty training field trainers',
	'defeat seventy training field trainers',
	'defeat eighty training field trainers',
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
	'catch 100 different species',
	'catch 150 different species',
	'catch 250 different species',
	'catch 350 different species',
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
	'reach challenge field rank 1',
	'reach challenge field rank 18',
	'reach challenge field rank 40',
	'reach challenge field rank 62',
	'reach challenge field rank 85',
] as const;

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
			return s.bag['oaks-parcel'] > 0;
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
	'catch all costumed pikachus': {
		rewardItems: {},
		rewardPokemon: {
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
			'pikachu-original-cap',
			'pikachu-hoenn-cap',
			'pikachu-sinnoh-cap',
			'pikachu-unova-cap',
			'pikachu-kalos-cap',
			'pikachu-alola-cap',
			'pikachu-partner-cap',
			'pikachu-world-cap',
		],
		researchPoints: 200,
		conditionFunction: (s) => {
			const pikas: PokemonName[] = [
				'pikachu-rock-star',
				'pikachu-belle',
				'pikachu-pop-star',
				'pikachu-phd',
				'pikachu-libre',
				'pikachu-cosplay',
				'pikachu-original-cap',
				'pikachu-hoenn-cap',
				'pikachu-sinnoh-cap',
				'pikachu-unova-cap',
				'pikachu-kalos-cap',
				'pikachu-alola-cap',
				'pikachu-partner-cap',
				'pikachu-world-cap',
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
		rewardItems: { 'black-augurite': 1, 'peat-block': 1, 'lumiose-galette': 5 },
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
			'water-stone': 1,
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
	'defeat five training field trainers': {
		rewardItems: {
			casteliacone: 2,
		},
		researchPoints: 10,
		conditionFunction: (s) => {
			const defeatedTrainers = [
				...new Set(
					s.handledOccupants
						.filter((h) => trainers.some((t) => t.id === h.id))
						.map((d) => d.id)
				),
			].length;
			return defeatedTrainers > 4;
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'defeat a training field trainer',
	},
	'defeat ten training field trainers': {
		rewardItems: {
			'pewter-crunchies': 3,
		},
		researchPoints: 10,
		conditionFunction: (s) => {
			const defeatedTrainers = [
				...new Set(
					s.handledOccupants
						.filter((h) => trainers.some((t) => t.id === h.id))
						.map((d) => d.id)
				),
			].length;
			return defeatedTrainers > 9;
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'defeat five training field trainers',
	},
	'defeat twenty training field trainers': {
		rewardItems: {
			'rage-candy-bar': 4,
		},
		researchPoints: 20,
		conditionFunction: (s) => {
			const defeatedTrainers = [
				...new Set(
					s.handledOccupants
						.filter((h) => trainers.some((t) => t.id === h.id))
						.map((d) => d.id)
				),
			].length;
			return defeatedTrainers > 19;
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 2',
		availableAfter: 'defeat ten training field trainers',
	},
	'defeat thirty training field trainers': {
		rewardItems: {
			'lumiose-galette': 5,
		},
		researchPoints: 30,
		conditionFunction: (s) => {
			const defeatedTrainers = [
				...new Set(
					s.handledOccupants
						.filter((h) => trainers.some((t) => t.id === h.id))
						.map((d) => d.id)
				),
			].length;
			return defeatedTrainers > 29;
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 2',
		availableAfter: 'defeat twenty training field trainers',
	},
	'defeat forty training field trainers': {
		rewardItems: {
			'old-gateau': 6,
		},
		researchPoints: 40,
		conditionFunction: (s) => {
			const defeatedTrainers = [
				...new Set(
					s.handledOccupants
						.filter((h) => trainers.some((t) => t.id === h.id))
						.map((d) => d.id)
				),
			].length;
			return defeatedTrainers > 39;
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 2',
		availableAfter: 'defeat thirty training field trainers',
	},
	'defeat fifty training field trainers': {
		rewardItems: {
			'lava-cookie': 7,
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			const defeatedTrainers = [
				...new Set(
					s.handledOccupants
						.filter((h) => trainers.some((t) => t.id === h.id))
						.map((d) => d.id)
				),
			].length;
			return defeatedTrainers > 49;
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 3',
		availableAfter: 'defeat forty training field trainers',
	},
	'defeat sixty training field trainers': {
		rewardItems: {
			'big-malasada': 8,
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			const defeatedTrainers = [
				...new Set(
					s.handledOccupants
						.filter((h) => trainers.some((t) => t.id === h.id))
						.map((d) => d.id)
				),
			].length;
			return defeatedTrainers > 59;
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 3',
		availableAfter: 'defeat fifty training field trainers',
	},
	'defeat seventy training field trainers': {
		rewardItems: {
			casteliacone: 9,
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			const defeatedTrainers = [
				...new Set(
					s.handledOccupants
						.filter((h) => trainers.some((t) => t.id === h.id))
						.map((d) => d.id)
				),
			].length;
			return defeatedTrainers > 69;
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 4',
		availableAfter: 'defeat sixty training field trainers',
	},
	'defeat eighty training field trainers': {
		rewardItems: {
			'moomoo-cheese': 10,
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			const defeatedTrainers = [
				...new Set(
					s.handledOccupants
						.filter((h) => trainers.some((t) => t.id === h.id))
						.map((d) => d.id)
				),
			].length;
			return defeatedTrainers > 79;
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 4',
		availableAfter: 'defeat seventy training field trainers',
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
		},
		rewardPokemon: {
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
	'defeat chuck': {
		rewardItems: {
			'full-restore': 5,
			'black-belt': 1,
		},
		rewardPokemon: {
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
	'defeat falkner': {
		rewardItems: {
			'ultra-ball': 10,
			'full-restore': 5,
			'sharp-beak': 1,
		},
		rewardPokemon: {
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
		targetPokemon: [],
		kind: 'QUEST_LINE',
	},
	'catch the legendary bird of fire': {
		rewardItems: { 'rare-candy': 10 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokedex['moltres'].caughtOnRoutes.length > 0;
		},
		targetPokemon: [],
		requiredUpgrade: 'invite historian',
		kind: 'QUEST_LINE',
	},
	'catch the legendary bird of thunder': {
		rewardItems: { 'rare-candy': 10 },
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.pokedex['zapdos'].caughtOnRoutes.length > 0;
		},
		targetPokemon: [],
		requiredUpgrade: 'invite historian',
		kind: 'QUEST_LINE',
	},
	'defeat rowan': {
		rewardItems: {
			'ultra-ball': 10,
			'full-restore': 5,
		},
		rewardPokemon: {
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
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Professor Elm');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'catch all evolutions of eevee',
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
	'catch a pokemon from onix cave': {
		kind: 'BULLETIN',
		requiredUpgrade: 'shovel certification',
		researchPoints: 10,
		rewardItems: { 'babiri-berry': 2, 'kee-berry': 2 },
		conditionFunction: (s) =>
			onixCaveEncounters.BASE.some((o) =>
				s.pokedex[o.name].caughtOnRoutes.includes('onixCave')
			),
	},
	'catch all pokemon from onix cave': {
		kind: 'BULLETIN',
		requiredUpgrade: 'shovel certification',
		availableAfter: 'catch a pokemon from onix cave',
		researchPoints: 25,
		rewardItems: {
			'yellow-apricorn': 10,
			'black-apricorn': 10,
			'moon-stone': 2,
		},
		conditionFunction: (s) =>
			onixCaveEncounters.BASE.every((o) =>
				s.pokedex[o.name].caughtOnRoutes.includes('onixCave')
			),
	},
	'catch all pokemon from caveW1': {
		kind: 'BULLETIN',
		requiredUpgrade: 'swimming certification',
		researchPoints: 50,
		rewardItems: {
			'power-herb': 2,
			'white-herb': 2,
			'mental-herb': 2,
			'big-malasada': 2,
		},
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
		conditionFunction: (s) => s.mileStones.caughtFromSwarms.length > 0,
	},
	'catch 10 different pokemon from swarms': {
		kind: 'BULLETIN',
		requiredUpgrade: 'pokemon swarm radar',
		availableAfter: 'catch 3 different pokemon from swarms',
		researchPoints: 100,
		rewardItems: {
			'quick-ball': 20,
		},
		conditionFunction: (s) => s.mileStones.caughtFromSwarms.length > 0,
	},
	'catch 20 different pokemon from swarms': {
		kind: 'BULLETIN',
		requiredUpgrade: 'pokemon swarm radar',
		availableAfter: 'catch 10 different pokemon from swarms',
		researchPoints: 200,
		rewardItems: {
			'ultra-ball': 20,
		},
		conditionFunction: (s) => s.mileStones.caughtFromSwarms.length > 0,
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
	'defeat erika': {
		kind: 'BULLETIN',
		researchPoints: 25,
		rewardItems: { 'rindo-berry': 5, 'miracle-seed': 1, 'big-root': 1 },
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'trainer_erika');
		},
	},
	'defeat janine': {
		kind: 'BULLETIN',
		researchPoints: 25,
		rewardItems: { 'kebia-berry': 5, 'black-sludge': 1 },
		requiredUpgrade: 'machete certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'trainer_janine');
		},
	},
	'defeat blaine': {
		kind: 'BULLETIN',
		researchPoints: 25,
		rewardItems: { 'occa-berry': 5, charcoal: 1 },
		requiredUpgrade: 'sledge hammer certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'trainer_blaine');
		},
	},
	'defeat surge': {
		kind: 'BULLETIN',
		researchPoints: 50,
		rewardItems: { 'wacan-berry': 5, magnet: 1 },
		requiredUpgrade: 'shovel certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'trainer_surge');
		},
	},
	'defeat misty': {
		kind: 'BULLETIN',
		researchPoints: 50,
		rewardItems: { 'passho-berry': 5, 'mystic-water': 1 },
		requiredUpgrade: 'swimming certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'trainer_misty');
		},
	},
	'defeat sabrina': {
		kind: 'BULLETIN',
		researchPoints: 50,
		rewardItems: { 'payapa-berry': 5, 'twisted-spoon': 1 },
		requiredUpgrade: 'swimming certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'trainer_sabrina');
		},
	},
	'defeat brock': {
		kind: 'BULLETIN',
		researchPoints: 50,
		rewardItems: { 'charti-berry': 5, 'hard-stone': 1 },
		requiredUpgrade: 'swimming certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'trainer_brock');
		},
	},
	'defeat gary': {
		kind: 'BULLETIN',
		researchPoints: 100,
		rewardItems: { electirizer: 1, magmarizer: 1, protector: 1 },
		requiredUpgrade: 'swimming certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'trainer_gary');
		},
	},
	'reach challenge field rank 1': {
		kind: 'BULLETIN',
		researchPoints: 10,
		rewardItems: {},
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
		rewardItems: {},
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
		rewardItems: {},
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
		rewardItems: {},
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
		rewardItems: {},
		requiredUpgrade: 'training field 4',
		availableAfter: 'reach challenge field rank 62',
		conditionFunction: (s) => {
			return !!(
				s.mileStones.challengeFieldRecord &&
				s.mileStones.challengeFieldRecord >= 85
			);
		},
	},
};

console.log('number of quests', questNames.length);

console.log(
	'total research points',
	Object.values(QuestsRecord).reduce(
		(sum, summand) => sum + summand.researchPoints,
		0
	),
	'total costs',
	5 +
		campUpgradeNames
			.map((_, i) => 5 * i)
			.reduce((sum, summand) => sum + summand, 0),
	'quests w/o questName',
	Object.keys(QuestsRecord).filter((key) => !questNames.includes(key)),
	'questNames w/o quest',
	questNames.filter((name) => !Object.keys(QuestsRecord).includes(name))
);
