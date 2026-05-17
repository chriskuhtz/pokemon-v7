import { Nature } from "../interfaces/Natures";
import { StatInfo } from "../interfaces/PokemonData";
import { GrowthRateName } from "../interfaces/PokemonSpeciesData";
import { PokemonType } from "../interfaces/PokemonType";
import { SettingsObject } from "../interfaces/SettingsObject";
import { StatObject } from "../interfaces/StatObject";
import { CharacterTrait, traitTypes } from "../interfaces/Trait";
import { calculateLevelData } from "./calculateLevelData";
import { calculateStat } from "./calculateStat";

export const getStats = (
  stats: StatInfo[],
  xp: number,
  growthRate: GrowthRateName,
  nature: Nature,
  evs: StatObject,
  settings: SettingsObject | undefined,
  ownerTrait: CharacterTrait | undefined,
  pokemonTypes: PokemonType[],
): StatObject => {
  const baseHp = stats.find((s) => s.stat.name === "hp")?.base_stat ?? 100;
  const baseAttack =
    stats.find((s) => s.stat.name === "attack")?.base_stat ?? 100;
  const baseSpatk =
    stats.find((s) => s.stat.name === "special-attack")?.base_stat ?? 100;
  const baseSpDef =
    stats.find((s) => s.stat.name === "special-defense")?.base_stat ?? 100;
  const baseDef =
    stats.find((s) => s.stat.name === "special-defense")?.base_stat ?? 100;
  const baseSpeed =
    stats.find((s) => s.stat.name === "speed")?.base_stat ?? 100;

  const { level } = calculateLevelData(xp, growthRate);

  const traitBonus =
    ownerTrait && pokemonTypes.includes(traitTypes[ownerTrait]) ? 1.1 : 1;

  return {
    hp: Math.floor(
      traitBonus *
        calculateStat(
          baseHp,
          0,
          evs?.hp ?? 0,
          nature,
          level,
          "hp",
          false,
          settings,
        ),
    ),
    attack: Math.floor(
      traitBonus *
        calculateStat(
          baseAttack,
          0,
          evs?.["attack"] ?? 0,
          nature,
          level,
          "attack",
          false,
          settings,
        ),
    ),
    "special-attack": Math.floor(
      traitBonus *
        calculateStat(
          baseSpatk,
          0,
          evs?.["special-attack"] ?? 0,
          nature,
          level,
          "special-attack",
          false,
          settings,
        ),
    ),
    "special-defense": Math.floor(
      traitBonus *
        calculateStat(
          baseSpDef,
          0,
          evs?.["special-defense"] ?? 0,
          nature,
          level,
          "special-defense",
          false,
          settings,
        ),
    ),
    speed: Math.floor(
      traitBonus *
        calculateStat(
          baseSpeed,
          0,
          evs?.["speed"] ?? 0,
          nature,
          level,
          "speed",
          false,
          settings,
        ),
    ),
    defense: Math.floor(
      traitBonus *
        calculateStat(
          baseDef,
          0,
          evs?.["defense"] ?? 0,
          nature,
          level,
          "defense",
          false,
          settings,
        ),
    ),
    evasion: 100,
    accuracy: 100,
  };
};
