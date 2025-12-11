import { PokemonName, pokemonNames } from '../constants/pokemonNames';
import { ArrayHelpers } from './ArrayHelpers';

export const getRandomPokemonName = (): PokemonName => {
	return pokemonNames[ArrayHelpers.getRandomIndex(pokemonNames.length)];
};
