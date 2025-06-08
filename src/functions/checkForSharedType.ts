import { BattlePokemon } from '../interfaces/BattlePokemon';
import { pokemonTypes } from '../interfaces/PokemonType';
import { hasType } from './hasType';

export const checkForSharedType = (
	a: BattlePokemon,
	b: BattlePokemon
): boolean => {
	return [...pokemonTypes].some((type) => hasType(a, type) && hasType(b, type));
};
