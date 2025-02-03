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
): BattlePokemon | undefined => {
	const { res } = useGetPokemonData(pokemon.dexId);

	const { res: firstMoveData } = useGetMoveData(pokemon.firstMove.name);

	if (!res || !firstMoveData) {
		return;
	}
	return {
		...pokemon,
		firstMove: { ...pokemon.firstMove, data: firstMoveData },
		data: res,
		stats: getStats(res.stats, 5, pokemon.nature),
	};
};
