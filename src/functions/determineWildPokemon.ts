import {
	highBstPokemon,
	lowBstPokemon,
	midBstPokemon,
} from '../constants/baseStatRecord';
import { PokemonName } from '../constants/pokemonNames';
import { getRandomNature } from '../interfaces/Natures';
import { OverworldMap } from '../interfaces/OverworldMap';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { CatchStreak, PokemonSwarm, SaveFile } from '../interfaces/SaveFile';
import { StatObject } from '../interfaces/StatObject';
import { getRandomEntry } from './filterTargets';
import { getMiddleOfThree } from './getMiddleOfThree';
import { getRandomEncounter } from './getRandomEncounter';
import { makeChallengerPokemon } from './makeChallengerPokemon';

export const determineWildPokemon = (
	team: OwnedPokemon[],
	map: OverworldMap,
	quests: SaveFile['quests'],
	waterEncounter: boolean,
	shinyFactor: number,
	swarm?: PokemonSwarm,
	lure?: 'lure' | 'super-lure' | 'max-lure',
	catchStreak?: CatchStreak
): OwnedPokemon[] => {
	const applyStreakBoosts = (input: OwnedPokemon): OwnedPokemon => {
		if (catchStreak?.pokemon === input.name) {
			let secondShinyRoll = Math.random() / catchStreak.streak < shinyFactor;

			if (catchStreak.streak === 31) {
				secondShinyRoll = true;
			}
			const increasedIvs: StatObject = Object.fromEntries(
				Object.entries(input.intrinsicValues).map(([stat, value]) => [
					stat,
					Math.min(31, value + catchStreak.streak),
				])
			) as StatObject;

			return {
				...input,
				shiny: input.shiny ?? secondShinyRoll,
				intrinsicValues: increasedIvs,
			};
		}
		return input;
	};
	let encounter: OwnedPokemon[] = [];

	if (catchStreak && Math.random() < catchStreak.streak / 100) {
		encounter = [
			makeChallengerPokemon(
				{
					name: catchStreak.pokemon,
					nature: getRandomNature(),
					...getRandomEncounter(map, waterEncounter),
				},
				{ increasedShinyFactor: shinyFactor }
			),
		];
	} else if (lure === 'lure') {
		encounter = [
			makeChallengerPokemon({
				nature: getRandomNature(),
				name: getRandomEntry(Object.entries(lowBstPokemon))[0] as PokemonName,
				xp: getMiddleOfThree([
					1000,
					8000,
					1000 + Math.floor(7000 * Math.random()),
				]),
			}),
		];
	} else if (lure === 'super-lure') {
		encounter = [
			makeChallengerPokemon({
				nature: getRandomNature(),
				name: getRandomEntry(Object.entries(midBstPokemon))[0] as PokemonName,
				xp: getMiddleOfThree([
					27000,
					8000,
					8000 + Math.floor(19000 * Math.random()),
				]),
			}),
		];
	} else if (lure === 'max-lure') {
		encounter = [
			makeChallengerPokemon({
				nature: getRandomNature(),
				name: getRandomEntry(Object.entries(highBstPokemon))[0] as PokemonName,
				xp: getMiddleOfThree([
					27000,
					125000,
					27000 + Math.floor(98000 * Math.random()),
				]),
			}),
		];
	} else if (
		quests['catch the legendary bird of ice'] === 'ACTIVE' &&
		Math.random() < 0.01
	) {
		encounter = [
			makeChallengerPokemon(
				{ name: 'articuno', xp: 125000 },
				{ increasedShinyFactor: 2 * shinyFactor }
			),
		];
	} else if (
		quests['retrieve oaks parcel from raticate'] === 'ACTIVE' &&
		map.id === 'routeS1E1' &&
		Math.random() < 0.1
	) {
		encounter = [
			makeChallengerPokemon(
				{ name: 'raticate', xp: 27000 },
				{ increasedShinyFactor: 16 * shinyFactor }
			),
		];
	} else if (
		!waterEncounter &&
		swarm &&
		swarm.route === map.id &&
		Math.random() > 0.5
	) {
		encounter = [
			makeChallengerPokemon(
				{
					nature: getRandomNature(),
					name: swarm.pokemon,
					xp: getMiddleOfThree([
						swarm.xpMin,
						swarm.xpMax,
						Math.floor(swarm.xpMax * Math.random()),
					]),
				},
				{ increasedShinyFactor: 8 * shinyFactor }
			),
		];
	} else {
		encounter =
			team.filter((p) => p.damage < p.maxHp).length > 1
				? [
						makeChallengerPokemon(
							{
								nature: getRandomNature(),
								...getRandomEncounter(map, waterEncounter),
							},
							{ increasedShinyFactor: shinyFactor }
						),
						makeChallengerPokemon(
							{
								nature: getRandomNature(),
								...getRandomEncounter(map, waterEncounter),
							},
							{ increasedShinyFactor: shinyFactor }
						),
				  ]
				: [
						makeChallengerPokemon(
							{
								nature: getRandomNature(),
								...getRandomEncounter(map, waterEncounter),
							},
							{ increasedShinyFactor: shinyFactor }
						),
				  ];
	}

	return encounter.map(applyStreakBoosts);
};
