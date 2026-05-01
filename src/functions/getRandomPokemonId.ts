import { PokemonName, pokemonNames } from "../constants/pokemonNames";
import { PokemonType, pokemonTypes } from "../interfaces/PokemonType";
import { ArrayHelpers } from "./ArrayHelpers";

export const getRandomPokemonName = (): PokemonName => {
  return pokemonNames[ArrayHelpers.getRandomIndex(pokemonNames.length)];
};

export const getRandomPokemonType = (
  typesToOmit?: PokemonType[],
): PokemonType => {
  const filtered = typesToOmit
    ? pokemonTypes.filter((t) => !typesToOmit.includes(t))
    : pokemonTypes;
  return filtered[ArrayHelpers.getRandomIndex(filtered.length)];
};
