import { useFetch } from '@potfisch-industries-npm/usefetch';
import { getStats } from '../functions/getStats';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { PokemonData } from '../interfaces/PokemonData';
import { PokemonSpeciesData } from '../interfaces/PokemonSpeciesData';
import { EmptyStatObject } from '../interfaces/StatObject';

export const useGetBattleTeam = (initTeam: OwnedPokemon[]) => {
	return useFetch(() =>
		Promise.all(
			initTeam.map(async (pokemon) => {
				const { dexId, firstMove, secondMove, thirdMove, fourthMove } = pokemon;
				const data: Promise<PokemonData> = (
					await fetch(`https://pokeapi.co/api/v2/pokemon/${dexId}`)
				).json();
				const speciesData: Promise<PokemonSpeciesData> = (
					await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dexId}`)
				).json();
				const firstMoveData: Promise<MoveDto> = (
					await fetch(`https://pokeapi.co/api/v2/move/${firstMove.name}`)
				).json();
				const secondMoveData: Promise<MoveDto> | undefined = secondMove
					? (
							await fetch(`https://pokeapi.co/api/v2/move/${secondMove.name}`)
					  ).json()
					: undefined;
				const thirdMoveData: Promise<MoveDto> | undefined = thirdMove
					? (
							await fetch(`https://pokeapi.co/api/v2/move/${thirdMove.name}`)
					  ).json()
					: undefined;
				const fourthMoveData: Promise<MoveDto> | undefined = fourthMove
					? (
							await fetch(`https://pokeapi.co/api/v2/move/${fourthMove.name}`)
					  ).json()
					: undefined;

				const d = await data;
				const spd = await speciesData;
				const s = await secondMoveData;
				const t = await thirdMoveData;
				const f = await fourthMoveData;
				const battleMon: BattlePokemon = {
					...pokemon,
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
					stats: getStats(d.stats, pokemon.xp, pokemon.nature),
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
