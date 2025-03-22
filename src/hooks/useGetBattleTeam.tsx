import { useFetch } from '@potfisch-industries-npm/usefetch';
import {
	AbilityName,
	abilityNames,
} from '../constants/checkLists/abilityCheckList';
import { MoveName } from '../constants/checkLists/movesCheckList';
import { calculateLevelData } from '../functions/calculateLevelData';
import { getRandomEntry } from '../functions/filterTargets';
import { getStats } from '../functions/getStats';
import { maybeGetHeldItemFromData } from '../functions/maybeGetHeldItemFromData';
import { moveIsAvailable } from '../functions/moveIsAvailable';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { OwnedPokemon, PokemonGender } from '../interfaces/OwnedPokemon';
import { PokemonData } from '../interfaces/PokemonData';
import { PokemonSpeciesData } from '../interfaces/PokemonSpeciesData';
import {
	EmptyStatObject,
	generateRandomStatObject,
} from '../interfaces/StatObject';

export const deAlternate = (name: string) => {
	return name
		.replace('-alola', '')
		.replace('-hisui', '')
		.replace('-paldea', '')
		.replace('-galar', '');
};

export const useGetBattleTeam = (
	initTeam: (OwnedPokemon & { caughtBefore: boolean })[],
	config: {
		assignLearnsetMoves?: boolean;
		assignNaturalAbility?: boolean;
		assignGender?: boolean;
		generateIvs?: boolean;
		generateEvs?: boolean;
	}
) => {
	const {
		assignGender,
		assignLearnsetMoves,
		assignNaturalAbility,
		generateIvs,
		generateEvs,
	} = config;
	return useFetch<BattlePokemon[]>(() =>
		Promise.all(
			initTeam.map(async (pokemon) => {
				const { name, xp } = pokemon;
				const data: Promise<PokemonData> = (
					await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
				).json();

				const fetchedData = await data;

				const { level } = calculateLevelData(xp);

				const possibleAbilities = [
					...fetchedData.abilities
						.map((a) => a.ability.name)
						.filter((name) => abilityNames.includes(name as AbilityName)),
				] as AbilityName[];

				const ability: AbilityName =
					assignNaturalAbility && possibleAbilities.length > 0
						? getRandomEntry(possibleAbilities)
						: pokemon.ability;

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
						};
					});
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

				const spd = await speciesData;

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
				const battleMon: BattlePokemon = {
					...pokemon,
					gender,
					ability: ability,
					initAbility: ability,
					heldItemName:
						pokemon.heldItemName ?? maybeGetHeldItemFromData(fetchedData),
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
						pokemon.nature,
						pokemon.effortValues
					),
					statBoosts: EmptyStatObject,
					capture_rate: capture_rate,
					happiness: pokemon.happiness < 0 ? base_happiness : pokemon.happiness,
					status: 'BENCH',
					intrinsicValues: generateIvs
						? generateRandomStatObject(31)
						: pokemon.intrinsicValues,
					effortValues: generateEvs
						? generateRandomStatObject(255)
						: pokemon.effortValues,
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
