import {
	highBstPokemon,
	lowBstPokemon,
	midBstPokemon,
} from '../constants/baseStatRecord';
import { shinyChance } from '../constants/gameData/gameData';
import { internalDex } from '../constants/gameData/internalDexData';
import { MapId } from '../constants/gameData/maps/mapsRecord';
import { PokemonName } from '../constants/pokemonNames';
import { BattleTeamConfig } from '../hooks/useGetBattleTeam';
import { getRandomNature } from '../interfaces/Natures';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { CatchStreak, PokemonSwarm, SaveFile } from '../interfaces/SaveFile';
import { StatObject } from '../interfaces/StatObject';
import { getRandomEntry } from './filterTargets';
import { getMiddleOfThree } from './getMiddleOfThree';
import { getTimeOfDay } from './getTimeOfDay';
import { getRandomEncounter, isNotCatchable } from './internalDex';
import { makeChallengerPokemon } from './makeChallengerPokemon';

export const determineWildPokemon = (
	team: OwnedPokemon[],
	mapId: MapId,
	quests: SaveFile['quests'],
	waterEncounter: boolean,
	shinyFactor: number,
	lure?: 'lure' | 'super-lure' | 'max-lure',
	catchStreak?: CatchStreak,
	currentSwarm?: PokemonSwarm,
	currentStrongSwarm?: PokemonSwarm,
	currentDistortionSwarm?: PokemonSwarm
): { team: OwnedPokemon[]; battleTeamConfig: BattleTeamConfig } => {
	let battleTeamConfig: BattleTeamConfig = {
		assignGender: true,
		assignHeldItem: true,
		assignLearnsetMoves: true,
		assignNaturalAbility: true,
	};
	const timeOfDay = getTimeOfDay();
	const applyStreakBoosts = (input: OwnedPokemon): OwnedPokemon => {
		if (catchStreak?.pokemon === input.name) {
			let secondShinyRoll = Math.random() / catchStreak.streak < shinyChance;

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
				shiny: input.shiny || secondShinyRoll,
				intrinsicValues: increasedIvs,
			};
		}
		return input;
	};
	let encounter: OwnedPokemon[] = [];

	const checkSwarm = (): PokemonSwarm | undefined => {
		if (waterEncounter) {
			return;
		}

		if (currentSwarm?.route === mapId) {
			return currentSwarm;
		}
		if (currentStrongSwarm?.route === mapId) {
			return currentStrongSwarm;
		}
		if (currentDistortionSwarm?.route === mapId) {
			return currentDistortionSwarm;
		}
	};

	const swarm = checkSwarm();

	if (catchStreak && Math.random() < catchStreak.streak / 100) {
		encounter = [
			makeChallengerPokemon(
				{
					name: catchStreak.pokemon,
					nature: getRandomNature(),
					...getRandomEncounter(mapId, {
						area: waterEncounter ? 'WATER' : 'LAND',
						timeOfDay,
					}),
				},
				{ increasedShinyFactor: shinyFactor }
			),
		];
	} else if (lure === 'lure') {
		const name = getRandomEntry(
			Object.entries(lowBstPokemon).filter(([p]) =>
				isNotCatchable(internalDex[p as PokemonName])
			)
		)[0] as PokemonName;
		encounter = [
			makeChallengerPokemon({
				nature: getRandomNature(),
				name,
				xp: getMiddleOfThree([
					1000,
					8000,
					1000 + Math.floor(7000 * Math.random()),
				]),
			}),
		];
	} else if (lure === 'super-lure') {
		const name = getRandomEntry(
			Object.entries(midBstPokemon).filter(([p]) =>
				isNotCatchable(internalDex[p as PokemonName])
			)
		)[0] as PokemonName;
		encounter = [
			makeChallengerPokemon({
				nature: getRandomNature(),
				name,
				xp: getMiddleOfThree([
					27000,
					8000,
					8000 + Math.floor(19000 * Math.random()),
				]),
			}),
		];
	} else if (lure === 'max-lure') {
		const name = getRandomEntry(
			Object.entries(highBstPokemon).filter(([p]) =>
				isNotCatchable(internalDex[p as PokemonName])
			)
		)[0] as PokemonName;
		encounter = [
			makeChallengerPokemon({
				nature: getRandomNature(),
				name,
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
		mapId === 'routeS1E1' &&
		Math.random() < 0.1
	) {
		encounter = [
			makeChallengerPokemon(
				{ name: 'raticate', xp: 27000, heldItemName: 'oaks-parcel' },
				{ increasedShinyFactor: 16 * shinyFactor }
			),
		];
		battleTeamConfig = { assignHeldItem: false };
	} else if (swarm && Math.random() > 0.5) {
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
								...getRandomEncounter(mapId, {
									area: waterEncounter ? 'WATER' : 'LAND',
									timeOfDay,
								}),
							},
							{ increasedShinyFactor: shinyFactor }
						),
						makeChallengerPokemon(
							{
								nature: getRandomNature(),
								...getRandomEncounter(mapId, {
									area: waterEncounter ? 'WATER' : 'LAND',
									timeOfDay,
								}),
							},
							{ increasedShinyFactor: shinyFactor }
						),
				  ]
				: [
						makeChallengerPokemon(
							{
								nature: getRandomNature(),
								...getRandomEncounter(mapId, {
									area: waterEncounter ? 'WATER' : 'LAND',
									timeOfDay,
								}),
							},
							{ increasedShinyFactor: shinyFactor }
						),
				  ];
	}

	return { team: encounter.map(applyStreakBoosts), battleTeamConfig };
};
