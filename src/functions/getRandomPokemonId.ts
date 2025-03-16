import { PokemonName, pokemonNames } from '../constants/pokemonNames';
import { getRandomIndex } from './filterTargets';

export const getRandomPokemonName = (): PokemonName => {
	return pokemonNames[getRandomIndex(pokemonNames.length)];
};
