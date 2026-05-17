import { OwnedPokemon } from "../interfaces/OwnedPokemon";
import { PokemonData } from "../interfaces/PokemonData";
import { PokemonType } from "../interfaces/PokemonType";
import { SettingsObject } from "../interfaces/SettingsObject";
import { Stat } from "../interfaces/StatObject";
import { CharacterTrait } from "../interfaces/Trait";
import { getStats } from "./getStats";

export const HIDDEN_STATS_FOR_TOTAL = ["accuracy", "evasion", "hp"];

export const getHighestStat = ({
  ownedPokemon,
  data,
  settings,
  ownerTrait,
  pokemonTypes,
}: {
  ownedPokemon: OwnedPokemon;
  data: PokemonData;
  settings: SettingsObject | undefined;
  ownerTrait: CharacterTrait | undefined;
  pokemonTypes: PokemonType[];
}): [Stat, number] => {
  return Object.entries(
    getStats(
      data.stats,
      ownedPokemon.xp,
      ownedPokemon.growthRate,
      ownedPokemon.nature,
      ownedPokemon.effortValues,
      settings,
      ownerTrait,
      pokemonTypes,
    ),
  )
    .filter(([stat]) => !HIDDEN_STATS_FOR_TOTAL.includes(stat))
    .sort((a, b) => b[1] - a[1])[0] as [Stat, number];
};
