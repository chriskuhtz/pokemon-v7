import { baseInternalDex } from "../constants/baseInternalDex";
import {
  highBstPokemon,
  lowBstPokemon,
  midBstPokemon,
  ultraHighBstPokemon,
} from "../constants/baseStatRecord";
import { PokemonName } from "../constants/pokemonNames";
import { OwnedPokemon } from "../interfaces/OwnedPokemon";
import { PokemonType } from "../interfaces/PokemonType";
import { Stat } from "../interfaces/StatObject";
import { ArrayHelpers } from "./ArrayHelpers";
import { getAllPokemonThatMaxThisEV } from "./internalDex";
import { makeChallengerPokemon } from "./makeChallengerPokemon";

export const makeRandomTeam = ({
  xp,
  type,
  adjustmentFactor,
}: {
  xp: number;
  type?: PokemonType;
  adjustmentFactor?: number;
}): OwnedPokemon[] => {
  const res: PokemonName[] = [];

  const getRandom = (record: Partial<Record<PokemonName, number>>) => {
    if (type && type !== "typeless") {
      return ArrayHelpers.getRandomEntry(
        Object.keys(record).filter((name) =>
          baseInternalDex[name as PokemonName].types.includes(type),
        ),
      ) as PokemonName;
    }
    return ArrayHelpers.getRandomEntry(Object.keys(record)) as PokemonName;
  };

  const ultra = [
    getRandom(ultraHighBstPokemon),
    getRandom(ultraHighBstPokemon),
    getRandom(ultraHighBstPokemon),
    getRandom(ultraHighBstPokemon),
    getRandom(ultraHighBstPokemon),
    getRandom(ultraHighBstPokemon),
  ];
  const high: PokemonName[] = [
    getRandom(highBstPokemon),
    getRandom(highBstPokemon),
    getRandom(highBstPokemon),
    getRandom(highBstPokemon),
    getRandom(highBstPokemon),
    getRandom(highBstPokemon),
  ];
  const mid = [
    getRandom(midBstPokemon),
    getRandom(midBstPokemon),
    getRandom(midBstPokemon),
    getRandom(midBstPokemon),
    getRandom(midBstPokemon),
    getRandom(midBstPokemon),
  ];
  const low = [
    getRandom(lowBstPokemon),
    getRandom(lowBstPokemon),
    getRandom(lowBstPokemon),
    getRandom(lowBstPokemon),
    getRandom(lowBstPokemon),
    getRandom(lowBstPokemon),
  ];

  const adjustedXP = xp * (adjustmentFactor ?? 1);

  if (adjustedXP >= 100 * 100 * 100) {
    res.push(...ultra);
  } else if (adjustedXP >= 90 * 90 * 90) {
    res.push(...high.slice(0, 2));
    res.push(...ultra.slice(0, 4));
  } else if (adjustedXP >= 80 * 80 * 80) {
    res.push(...high.slice(0, 3));
    res.push(...ultra.slice(0, 3));
  } else if (adjustedXP >= 70 * 70 * 70) {
    res.push(...high.slice(0, 4));
    res.push(...ultra.slice(0, 2));
  } else if (adjustedXP >= 60 * 60 * 60) {
    res.push(...high.slice(0, 5));
    res.push(...ultra.slice(0, 1));
  } else if (adjustedXP >= 50 * 50 * 50) {
    res.push(...mid.slice(0, 1));
    res.push(...high.slice(0, 5));
  } else if (adjustedXP >= 40 * 40 * 40) {
    res.push(...mid.slice(0, 3));
    res.push(...high.slice(0, 3));
  } else if (adjustedXP >= 30 * 30 * 30) {
    res.push(...mid.slice(0, 5));
    res.push(...high.slice(0, 1));
  } else if (adjustedXP >= 25 * 25 * 25) {
    res.push(...mid.slice(0, 5));
  } else if (adjustedXP >= 20 * 20 * 20) {
    res.push(...low.slice(0, 3));
    res.push(...mid.slice(0, 2));
  } else if (adjustedXP >= 15 * 15 * 15) {
    res.push(...low.slice(0, 3));
    res.push(...mid.slice(0, 1));
  } else if (adjustedXP >= 10 * 10 * 10) {
    res.push(...low.slice(0, 3));
  } else {
    res.push(...low.slice(0, 2));
  }

  return res.map((n) => makeChallengerPokemon({ name: n as PokemonName, xp }));
};

export const makeEVTeam = (stat: Stat): OwnedPokemon[] => {
  const options = getAllPokemonThatMaxThisEV(stat);
  const res: PokemonName[] = [
    ArrayHelpers.getRandomEntry(options.map((o) => o[0])),
    ArrayHelpers.getRandomEntry(options.map((o) => o[0])),
    ArrayHelpers.getRandomEntry(options.map((o) => o[0])),
    ArrayHelpers.getRandomEntry(options.map((o) => o[0])),
    ArrayHelpers.getRandomEntry(options.map((o) => o[0])),
    ArrayHelpers.getRandomEntry(options.map((o) => o[0])),
  ];
  return res.map((n) =>
    makeChallengerPokemon({ name: n as PokemonName, xp: 125 }),
  );
};
