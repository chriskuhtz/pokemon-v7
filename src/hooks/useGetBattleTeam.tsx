import { useFetch } from '@potfisch-industries-npm/usefetch';
import { AbilityName, abilityNames } from '../constants/abilityCheckList';
import { internalDex } from '../constants/gameData/internalDexData';
import { MoveName } from '../constants/movesCheckList';
import { calculateLevelData } from '../functions/calculateLevelData';
import { getRandomEntry } from '../functions/filterTargets';
import { getEvAwards } from '../functions/getEvAwards';
import { getHeldItem } from '../functions/getHeldItem';
import { getSettings } from '../functions/getPlayerId';
import { getStats } from '../functions/getStats';
import { deAlternate } from '../functions/handleAlternateForms';
import { maybeGetHeldItemFromData } from '../functions/maybeGetHeldItemFromData';
import { moveIsAvailable } from '../functions/moveIsAvailable';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { OwnedPokemon, PokemonGender } from '../interfaces/OwnedPokemon';
import { PokemonData } from '../interfaces/PokemonData';
import { PokemonSpeciesData } from '../interfaces/PokemonSpeciesData';
import { EmptyStatObject } from '../interfaces/StatObject';

export interface BattleTeamConfig {
	assignLearnsetMoves?: boolean;
	assignNaturalAbility?: boolean;
	assignGender?: boolean;
	assignHeldItem?: boolean;
}

export const useGetBattleTeam = (
	initTeam: OwnedPokemon[],
	config: BattleTeamConfig
) => {
	const { assignGender, assignLearnsetMoves, assignHeldItem } = config;
	return useFetch<BattlePokemon[]>(() =>
		Promise.all(
			initTeam.map(async (pokemon) => {
				const { randomAbilities } = getSettings() ?? {};
				const { name, xp } = pokemon;
				const data: Promise<PokemonData> = (
					await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
				).json();

				const fetchedData = await data;

				const speciesData: Promise<PokemonSpeciesData> = await fetch(
					`https://pokeapi.co/api/v2/pokemon-species/${deAlternate(name)}`
				)
					.then((res) => {
						return res.json();
					})
					.catch(() => {
						return {
							capture_rate: 100,
							base_happiness: 70,
							growth_rate: { name: 'medium' },
						};
					});

				const spd = await speciesData;

				const { level } = calculateLevelData(xp, spd.growth_rate.name);

				const possibleAbilities = [
					...fetchedData.abilities
						.map((a) => a.ability.name)
						.filter((name) => abilityNames.includes(name as AbilityName)),
				] as AbilityName[];

				const chooseAbility = (): AbilityName => {
					if (pokemon.fixedAbility) {
						return pokemon.ability;
					}
					if (possibleAbilities.includes(pokemon.ability)) {
						return pokemon.ability;
					}
					if (possibleAbilities.length > 0) {
						const res = getRandomEntry(possibleAbilities);
						if (randomAbilities) {
							const index = abilityNames.findIndex((a) => a === res);
							const dexId = internalDex[pokemon.name].dexId;
							return [
								...abilityNames,
								...abilityNames,
								...abilityNames,
								...abilityNames,
								...abilityNames,
								...abilityNames,
								...abilityNames,
							][dexId + index];
						}
						return res;
					}

					return pokemon.ability;
				};

				const ability = chooseAbility();

				const availableMoves = fetchedData.moves
					.filter((m) => moveIsAvailable(m, level))
					.reverse();

				const firstMoveName =
					assignLearnsetMoves && availableMoves.length > 0
						? availableMoves[0].move.name
						: pokemon.firstMove.name;
				const secondMoveName =
					assignLearnsetMoves && availableMoves.length > 1
						? availableMoves[1].move.name
						: pokemon.secondMove?.name;
				const thirdMoveName =
					assignLearnsetMoves && availableMoves.length > 2
						? availableMoves[2].move.name
						: pokemon.thirdMove?.name;
				const fourthMoveName =
					assignLearnsetMoves && availableMoves.length > 3
						? availableMoves[3].move.name
						: pokemon.fourthMove?.name;

				const firstMoveData: Promise<MoveDto> = (
					await fetch(`https://pokeapi.co/api/v2/move/${firstMoveName}`)
				).json();
				const secondMoveData: Promise<MoveDto> | undefined = secondMoveName
					? (
							await fetch(`https://pokeapi.co/api/v2/move/${secondMoveName}`)
					  ).json()
					: undefined;
				const thirdMoveData: Promise<MoveDto> | undefined = thirdMoveName
					? (
							await fetch(`https://pokeapi.co/api/v2/move/${thirdMoveName}`)
					  ).json()
					: undefined;
				const fourthMoveData: Promise<MoveDto> | undefined = fourthMoveName
					? (
							await fetch(`https://pokeapi.co/api/v2/move/${fourthMoveName}`)
					  ).json()
					: undefined;

				const { capture_rate, base_happiness } = spd;

				const first = await firstMoveData;
				const s = await secondMoveData;
				const t = await thirdMoveData;
				const f = await fourthMoveData;

				const firstMove = {
					...pokemon.firstMove,
					name: firstMoveName as MoveName,
					data: first,
				};
				const secondMove =
					secondMoveName && s
						? {
								...pokemon.secondMove,
								name: secondMoveName as MoveName,
								data: s,
								usedPP: pokemon.secondMove?.usedPP ?? 0,
						  }
						: undefined;
				const thirdMove =
					thirdMoveName && t
						? {
								...pokemon.thirdMove,
								name: thirdMoveName as MoveName,
								data: t,
								usedPP: pokemon.thirdMove?.usedPP ?? 0,
						  }
						: undefined;
				const fourthMove =
					fourthMoveName && f
						? {
								...pokemon.fourthMove,
								name: fourthMoveName as MoveName,
								data: f,
								usedPP: pokemon.fourthMove?.usedPP ?? 0,
						  }
						: undefined;

				const gender = assignGender
					? determineGender(spd.gender_rate)
					: pokemon.gender;

				const heldItemName = assignHeldItem
					? maybeGetHeldItemFromData(fetchedData)
					: getHeldItem(pokemon);
				const battleMon: BattlePokemon = {
					...pokemon,
					fixedAbility: pokemon.fixedAbility || randomAbilities,
					growthRate: spd.growth_rate.name,
					gender,
					ability: ability,
					initAbility: ability,
					heldItemName,
					roundsInBattle: 0,
					secondaryAilments: [],
					moveQueue: [],
					firstMove,
					secondMove,
					thirdMove,
					fourthMove,
					data: fetchedData,
					stats: getStats(
						fetchedData.stats,
						pokemon.xp,
						pokemon.growthRate,
						pokemon.nature,
						pokemon.effortValues
					),
					statBoosts: EmptyStatObject,
					capture_rate: capture_rate,
					happiness: pokemon.happiness < 0 ? base_happiness : pokemon.happiness,
					status: 'BENCH',

					effortValues: pokemon.effortValues,
					evAwards: getEvAwards(fetchedData.stats),
					participatedInBattle: false,
					protected: false,
					spikyShielded: false,
					banefulBunkered: false,
					obstructed: false,
					endured: false,
					charged: false,
					helpingHanded: false,
				};

				return battleMon;
			})
		)
	);
};

const determineGender = (gender_rate: number): PokemonGender => {
	if (gender_rate === -1) {
		return 'GENDERLESS';
	}
	if (Math.random() < gender_rate / 8) {
		return 'FEMALE';
	}

	return 'MALE';
};
