import { useFetch } from '@potfisch-industries-npm/usefetch';
import { getRandomIndex } from '../functions/filterTargets';
import { getSettings } from '../functions/getPlayerId';
import { getStats } from '../functions/getStats';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { ItemType, itemTypes } from '../interfaces/Item';
import { MoveDto } from '../interfaces/Move';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { PokemonData } from '../interfaces/PokemonData';
import { PokemonSpeciesData } from '../interfaces/PokemonSpeciesData';
import { EmptyStatObject } from '../interfaces/StatObject';

export const maybeGetHeldItemFromData = (
	data: PokemonData
): ItemType | undefined => {
	const { randomHeldItems } = getSettings() ?? {};
	const { held_items } = data;

	if (randomHeldItems) {
		return itemTypes[getRandomIndex(itemTypes.length)];
	}
	if (held_items.length === 0) {
		return undefined;
	}
	return held_items[getRandomIndex(held_items.length)].item.name as ItemType;
};

export const useGetBattleTeam = (
	initTeam: (OwnedPokemon & { caughtBefore: boolean })[],
	assignLearnsetMoves?: boolean
) => {
	return useFetch<BattlePokemon[]>(() =>
		Promise.all(
			initTeam.map(async (pokemon) => {
				const { dexId } = pokemon;
				const data: Promise<PokemonData> = (
					await fetch(`https://pokeapi.co/api/v2/pokemon/${dexId}`)
				).json();

				const d = await data;

				const firstMove = assignLearnsetMoves
					? d.moves[0].move.name
					: pokemon.firstMove.name;
				const secondMove = assignLearnsetMoves
					? d.moves[1].move.name
					: pokemon.secondMove?.name;
				const thirdMove = assignLearnsetMoves
					? d.moves[2].move.name
					: pokemon.thirdMove?.name;
				const fourthMove = assignLearnsetMoves
					? d.moves[3].move.name
					: pokemon.fourthMove?.name;

				const speciesData: Promise<PokemonSpeciesData> = (
					await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dexId}`)
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
					heldItemName: pokemon.heldItemName ?? maybeGetHeldItemFromData(d),
					roundsInBattle: 0,
					secondaryAilments: [],
					moveQueue: [],
					firstMove: {
						...pokemon.firstMove,
						data: await firstMoveData,
					},
					secondMove:
						pokemon.secondMove && s
							? {
									...pokemon.secondMove,
									data: s,
							  }
							: undefined,
					thirdMove:
						pokemon.thirdMove && t
							? {
									...pokemon.thirdMove,
									data: t,
							  }
							: undefined,
					fourthMove:
						pokemon.fourthMove && f
							? {
									...pokemon.fourthMove,
									data: f,
							  }
							: undefined,
					data: d,
					stats: getStats(
						d.stats,
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
