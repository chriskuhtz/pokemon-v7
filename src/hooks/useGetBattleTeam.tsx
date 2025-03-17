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
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { PokemonData } from '../interfaces/PokemonData';
import { PokemonSpeciesData } from '../interfaces/PokemonSpeciesData';
import { EmptyStatObject } from '../interfaces/StatObject';
export const useGetBattleTeam = (
	initTeam: (OwnedPokemon & { caughtBefore: boolean })[],
	assignLearnsetMoves?: boolean,
	assignNaturalAbility?: boolean
) => {
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
					'run-away', //run away as fallb
				] as AbilityName[];

				const ability: AbilityName = assignNaturalAbility
					? getRandomEntry(possibleAbilities)
					: pokemon.ability;

				const availableMoves = fetchedData.moves
					.filter((m) => moveIsAvailable(m, level))
					.reverse();

				const firstMove = assignLearnsetMoves
					? availableMoves[0].move.name
					: pokemon.firstMove.name;
				const secondMove =
					assignLearnsetMoves && availableMoves.length > 1
						? availableMoves[1].move.name
						: pokemon.secondMove?.name;
				const thirdMove =
					assignLearnsetMoves && availableMoves.length > 2
						? availableMoves[2].move.name
						: pokemon.thirdMove?.name;
				const fourthMove =
					assignLearnsetMoves && availableMoves.length > 3
						? availableMoves[3].move.name
						: pokemon.fourthMove?.name;

				const speciesData: Promise<PokemonSpeciesData> = (
					await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
				).json();
				const firstMoveData: Promise<MoveDto> = (
					await fetch(`https://pokeapi.co/api/v2/move/${firstMove}`)
				).json();
				const secondMoveData: Promise<MoveDto> | undefined = secondMove
					? (await fetch(`https://pokeapi.co/api/v2/move/${secondMove}`)).json()
					: undefined;
				const thirdMoveData: Promise<MoveDto> | undefined = thirdMove
					? (await fetch(`https://pokeapi.co/api/v2/move/${thirdMove}`)).json()
					: undefined;
				const fourthMoveData: Promise<MoveDto> | undefined = fourthMove
					? (await fetch(`https://pokeapi.co/api/v2/move/${fourthMove}`)).json()
					: undefined;

				const spd = await speciesData;
				const s = await secondMoveData;
				const t = await thirdMoveData;
				const f = await fourthMoveData;
				const battleMon: BattlePokemon = {
					...pokemon,
					ability: ability,
					initAbility: ability,
					heldItemName:
						pokemon.heldItemName ?? maybeGetHeldItemFromData(fetchedData),
					roundsInBattle: 0,
					secondaryAilments: [],
					moveQueue: [],
					firstMove: {
						...pokemon.firstMove,
						name: firstMove as MoveName,
						data: await firstMoveData,
					},
					secondMove:
						pokemon.secondMove && s
							? {
									...pokemon.secondMove,
									name: secondMove as MoveName,
									data: s,
							  }
							: undefined,
					thirdMove:
						pokemon.thirdMove && t
							? {
									...pokemon.thirdMove,
									name: thirdMove as MoveName,
									data: t,
							  }
							: undefined,
					fourthMove:
						pokemon.fourthMove && f
							? {
									...pokemon.fourthMove,
									name: fourthMove as MoveName,
									data: f,
							  }
							: undefined,
					data: fetchedData,
					stats: getStats(
						fetchedData.stats,
						pokemon.xp,
						pokemon.nature,
						pokemon.effortValues
					),
					statBoosts: EmptyStatObject,
					capture_rate: spd.capture_rate,
					happiness:
						pokemon.happiness < 0 ? spd.base_happiness : pokemon.happiness,
					status: 'BENCH',
				};

				return battleMon;
			})
		)
	);
};
