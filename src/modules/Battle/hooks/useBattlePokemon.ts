import { useEffect, useState } from 'react';
import { getStats } from '../../../functions/getStats';
import { useGetMoveData } from '../../../hooks/useGetMoveData';
import { useGetPokemonData } from '../../../hooks/useGetPokemonData';
import { MoveDto } from '../../../interfaces/Move';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData } from '../../../interfaces/PokemonData';
import { StatObject } from '../../../interfaces/StatObject';

export interface BattlePokemon extends OwnedPokemon {
	stats: StatObject;
	firstMove: OwnedPokemon['firstMove'] & { data: MoveDto };
	data: PokemonData;
}

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
				firstMove: { ...pokemon.firstMove, data: firstMoveData },
				data: res,
				stats: getStats(res.stats, 5, pokemon.nature),
			});
		}
	}, [current, firstMoveData, pokemon, res]);

	return [current, setCurrent];
};
