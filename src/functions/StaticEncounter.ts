import { ONE_HOUR } from "../constants/baseConstants";
import { mapsRecord } from "../constants/gameData/maps/mapsRecord";
import { InternalDex } from "../interfaces/GameData";
import { OverworldPokemon } from "../interfaces/Occupant";
import { SaveFile, StaticEncounter } from "../interfaces/SaveFile";
import { ArrayHelpers } from "./ArrayHelpers";
import { getHighestXpOnTeam } from "./getHighestXpOnTeam";
import { getRandomOrientation } from "./getNextClockwiseDirection";
import { getRandomAvailableRoute } from "./getRandomAvailableRoute";
import { getRandomPosition } from "./getRandomPosition";
import {
  getAllEncountersFor,
  getStaticEncountersForRoute,
} from "./internalDex";
import { occupantHandled } from "./occupantHandled";

export const makeOverworldPokemonFromStaticEncounter = (
  staticEncounter: StaticEncounter,
): OverworldPokemon => {
  const id = `staticEncounter${staticEncounter.mapId}${staticEncounter.x}${staticEncounter.name}${staticEncounter.xp}${staticEncounter.resetAt}`;
  return {
    id: id,
    dialogue: [`Its a wild ${staticEncounter.name}`],
    type: "POKEMON",
    conditionFunction: (s) => !occupantHandled(s, id),
    encounter: {
      name: staticEncounter.name,
      maxXp: staticEncounter.xp,
      minXp: staticEncounter.xp,
      rarity: "common",
    },
    ...staticEncounter,
  };
};

export const addStaticEncounterToSaveFile = (
  s: SaveFile,
  internalDex: InternalDex,
): SaveFile => {
  const updated = { ...s };

  const route = getRandomAvailableRoute(s, []);

  if (!route) {
    console.error("could not find available route to place static encounter");
    return updated;
  }

  const options = [
    ...getAllEncountersFor(
      route,
      { area: "LAND", rarity: "ultra-rare" },
      internalDex,
    ).map((p) => p.name),
    ...getAllEncountersFor(
      route,
      { area: "LAND", rarity: "rare" },
      internalDex,
    ).map((p) => p.name),
    ...getStaticEncountersForRoute(route, internalDex),
  ];
  const pokemon = ArrayHelpers.getRandomEntry(options);
  const { x, y } = getRandomPosition(mapsRecord[route]);
  const now = new Date().getTime();
  const staticEncounter: StaticEncounter = {
    mapId: route,
    name: pokemon,
    dexId: internalDex[pokemon].dexId,
    x,
    y,
    resetAt: now + ONE_HOUR * 1,
    xp: Math.floor(getHighestXpOnTeam(s.pokemon) * 0.9),
    orientation: getRandomOrientation(),
  };

  return {
    ...updated,
    staticEncounters: [...(updated.staticEncounters ?? []), staticEncounter],
  };
};
