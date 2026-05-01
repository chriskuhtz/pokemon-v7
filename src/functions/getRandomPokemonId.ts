import { PokemonName, pokemonNames } from "../constants/pokemonNames";
import { PokemonType, pokemonTypes } from "../interfaces/PokemonType";
import { ArrayHelpers } from "./ArrayHelpers";

export const getRandomPokemonName = (): PokemonName => {
  return pokemonNames[ArrayHelpers.getRandomIndex(pokemonNames.length)];
};

export const getRandomPokemonType = (): PokemonType => {
  return pokemonTypes[ArrayHelpers.getRandomIndex(pokemonTypes.length)];
};
