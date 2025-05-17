import { BattlePokemon } from '../interfaces/BattlePokemon';
import { pokemonTypes } from '../interfaces/PokemonType';
import { getTypeNames } from './getTypeNames';

export const checkForSharedType = (
	a: BattlePokemon,
	b: BattlePokemon
): boolean => {
	return [...pokemonTypes].some(
		(type) => getTypeNames(a).includes(type) && getTypeNames(b).includes(type)
	);
};
