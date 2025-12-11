import { PokemonName, pokemonNames } from '../constants/pokemonNames';

export const getRandomPokemonName = (): PokemonName => {
	return pokemonNames[ArrayHelpers.getRandomIndex(pokemonNames.length)];
};
