import { useEffect, useState } from 'react';
import { getStats } from '../../../functions/getStats';
import { useGetMoveData } from '../../../hooks/useGetMoveData';
import { useGetPokemonData } from '../../../hooks/useGetPokemonData';
import { useGetPokemonSpeciesData } from '../../../hooks/useGetPokemonSpeciesData';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { EmptyStatObject } from '../../../interfaces/StatObject';

export const useBattlePokemon = (
	pokemon: OwnedPokemon
): [
	pokemon: BattlePokemon | undefined,
	setPokemon: (x: BattlePokemon) => void
] => {
	const [current, setCurrent] = useState<BattlePokemon | undefined>();
	const { res } = useGetPokemonData(pokemon.dexId);
	const { res: speciesdata } = useGetPokemonSpeciesData(pokemon.dexId);

	const { res: firstMoveData } = useGetMoveData(pokemon.firstMove.name);
	const { res: secondMoveData } = useGetMoveData(pokemon.secondMove?.name);
	const { res: thirdMoveData } = useGetMoveData(pokemon.thirdMove?.name);
	const { res: fourthMoveData } = useGetMoveData(pokemon.fourthMove?.name);

	useEffect(() => {
		if (
			!current &&
			res &&
			speciesdata &&
			firstMoveData &&
			((secondMoveData && pokemon.secondMove) || !pokemon.secondMove) &&
			((thirdMoveData && pokemon.thirdMove) || !pokemon.thirdMove) &&
			((fourthMoveData && pokemon.fourthMove) || !pokemon.fourthMove)
		) {
			setCurrent({
				...pokemon,
				onField: false,
				secondaryAilments: [],
				moveQueue: [],
				firstMove: {
					...pokemon.firstMove,
					data: firstMoveData,
					type: 'BattleAttack',
					round: 0,
				},
				secondMove:
					pokemon.secondMove && secondMoveData
						? {
								...pokemon.secondMove,
								data: secondMoveData,
								type: 'BattleAttack',
								round: 0,
						  }
						: undefined,
				thirdMove:
					pokemon.thirdMove && thirdMoveData
						? {
								...pokemon.thirdMove,
								data: thirdMoveData,
								type: 'BattleAttack',
								round: 0,
						  }
						: undefined,
				fourthMove:
					pokemon.fourthMove && fourthMoveData
						? {
								...pokemon.fourthMove,
								data: fourthMoveData,
								type: 'BattleAttack',
								round: 0,
						  }
						: undefined,
				data: res,
				stats: getStats(res.stats, pokemon.xp, pokemon.nature),
				statBoosts: EmptyStatObject,
				capture_rate: speciesdata.capture_rate,
				happiness:
					pokemon.happiness < 0
						? speciesdata.base_happiness
						: pokemon.happiness,
			});
		}
	}, [
		current,
		firstMoveData,
		fourthMoveData,
		pokemon,
		res,
		secondMoveData,
		speciesdata,
		thirdMoveData,
	]);

	return [current, setCurrent];
};
