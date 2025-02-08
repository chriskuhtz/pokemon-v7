import { useEffect, useState } from 'react';
import { getStats } from '../../../functions/getStats';
import { useGetMoveData } from '../../../hooks/useGetMoveData';
import { useGetPokemonData } from '../../../hooks/useGetPokemonData';
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

	const { res: firstMoveData } = useGetMoveData(pokemon.firstMove.name);
	const { res: secondMoveData } = useGetMoveData(pokemon.secondMove?.name);
	const { res: thirdMoveData } = useGetMoveData(pokemon.thirdMove?.name);
	const { res: fourthMoveData } = useGetMoveData(pokemon.fourthMove?.name);

	useEffect(() => {
		if (
			!current &&
			res &&
			firstMoveData &&
			((secondMoveData && pokemon.secondMove) || !pokemon.secondMove) &&
			((thirdMoveData && pokemon.thirdMove) || !pokemon.thirdMove) &&
			((fourthMoveData && pokemon.fourthMove) || !pokemon.fourthMove)
		) {
			setCurrent({
				...pokemon,
				firstMove: {
					...pokemon.firstMove,
					data: firstMoveData,
					type: 'BattleAttack',
				},
				secondMove:
					pokemon.secondMove && secondMoveData
						? {
								...pokemon.secondMove,
								data: secondMoveData,
								type: 'BattleAttack',
						  }
						: undefined,
				thirdMove:
					pokemon.thirdMove && thirdMoveData
						? {
								...pokemon.thirdMove,
								data: thirdMoveData,
								type: 'BattleAttack',
						  }
						: undefined,
				fourthMove:
					pokemon.fourthMove && fourthMoveData
						? {
								...pokemon.fourthMove,
								data: fourthMoveData,
								type: 'BattleAttack',
						  }
						: undefined,
				data: res,
				stats: getStats(res.stats, pokemon.xp, pokemon.nature),
				statBoosts: EmptyStatObject,
			});
		}
	}, [
		current,
		firstMoveData,
		fourthMoveData,
		pokemon,
		res,
		secondMoveData,
		thirdMoveData,
	]);

	return [current, setCurrent];
};
