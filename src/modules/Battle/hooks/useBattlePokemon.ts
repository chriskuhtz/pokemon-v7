import { useEffect, useState } from 'react';
import { getStats } from '../../../functions/getStats';
import { useGetMoveData } from '../../../hooks/useGetMoveData';
import { useGetPokemonData } from '../../../hooks/useGetPokemonData';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';

export const useBattlePokemon = (
	pokemon: OwnedPokemon
): [
	pokemon: BattlePokemon | undefined,
	setPokemon: (x: BattlePokemon) => void
] => {
	const [current, setCurrent] = useState<BattlePokemon | undefined>();
	const { res } = useGetPokemonData(pokemon.dexId);

	const { res: firstMoveData } = useGetMoveData(pokemon.firstMove.name);

	useEffect(() => {
		if (!current && res && firstMoveData) {
			setCurrent({
				...pokemon,
				firstMove: {
					...pokemon.firstMove,
					data: firstMoveData,
					type: 'BattleAttack',
				},
				data: res,
				stats: getStats(res.stats, pokemon.level, pokemon.nature),
			});
		}
	}, [current, firstMoveData, pokemon, res]);

	return [current, setCurrent];
};
