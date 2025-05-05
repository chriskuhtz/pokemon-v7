import {
	highBstPokemon,
	lowBstPokemon,
	midBstPokemon,
} from '../constants/baseStatRecord';
import { PokemonName } from '../constants/pokemonNames';
import { getRandomNature } from '../interfaces/Natures';
import { OverworldMap } from '../interfaces/OverworldMap';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { PokemonSwarm, SaveFile } from '../interfaces/SaveFile';
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
	lure?: 'lure' | 'super-lure' | 'max-lure'
): OwnedPokemon[] => {
	if (lure === 'lure') {
		return [
			makeChallengerPokemon({
				nature: getRandomNature(),
				name: getRandomEntry(Object.entries(lowBstPokemon))[0] as PokemonName,
				xp: getMiddleOfThree([1000, 8000, Math.floor(8000 * Math.random())]),
			}),
		];
	}
	if (lure === 'super-lure') {
		return [
			makeChallengerPokemon({
				nature: getRandomNature(),
				name: getRandomEntry(Object.entries(midBstPokemon))[0] as PokemonName,
				xp: getMiddleOfThree([27000, 8000, Math.floor(27000 * Math.random())]),
			}),
		];
	}
	if (lure === 'max-lure') {
		return [
			makeChallengerPokemon({
				nature: getRandomNature(),
				name: getRandomEntry(Object.entries(highBstPokemon))[0] as PokemonName,
				xp: getMiddleOfThree([
					27000,
					125000,
					Math.floor(125000 * Math.random()),
				]),
			}),
		];
	}

	if (
		quests['catch the legendary bird of ice'] === 'ACTIVE' &&
		Math.random() < 0.01
	) {
		return [
			makeChallengerPokemon(
				{ name: 'articuno', xp: 125000 },
				{ increasedShinyFactor: 2 * shinyFactor }
			),
		];
	}
	if (
		quests['retrieve oaks parcel from raticate'] === 'ACTIVE' &&
		map.id === 'routeS1E1' &&
		Math.random() < 0.1
	) {
		return [
			makeChallengerPokemon(
				{ name: 'raticate', xp: 27000 },
				{ increasedShinyFactor: 16 * shinyFactor }
			),
		];
	}
	if (
		!waterEncounter &&
		swarm &&
		swarm.route === map.id &&
		Math.random() > 0.5
	) {
		return [
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
	}
	return team.filter((p) => p.damage < p.maxHp).length > 1
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
};
