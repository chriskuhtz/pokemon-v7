import { baseInternalDex } from '../constants/baseInternalDex';
import { BattlePokemon, isBattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { PokemonType } from '../interfaces/PokemonType';
import { getTypeNames } from './getTypeNames';

export const hasType = (
	mon: BattlePokemon | OwnedPokemon,
	type: PokemonType
): boolean => {
	if (isBattlePokemon(mon)) {
		return getTypeNames(mon).includes(type);
	}

	return baseInternalDex[mon.name].types.includes(type);
};
