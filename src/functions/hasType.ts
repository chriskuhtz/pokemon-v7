import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokemonType } from '../interfaces/PokemonType';
import { getTypeNames } from './getTypeNames';

export const hasType = (mon: BattlePokemon, type: PokemonType): boolean => {
	return getTypeNames(mon).includes(type);
};
