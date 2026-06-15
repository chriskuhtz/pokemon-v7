import { shinyChance } from "../constants/baseConstants";
import {
  highBstPokemon,
  lowBstPokemon,
  midBstPokemon,
} from "../constants/baseStatRecord";
import { PokemonName } from "../constants/pokemonNames";
import { BattleTeamConfig } from "../hooks/useGetBattleTeam";
import { InternalDex } from "../interfaces/GameData";
import { MapId } from "../interfaces/mapIds";
import { getRandomNature } from "../interfaces/Natures";
import { OwnedPokemon } from "../interfaces/OwnedPokemon";
import { SaveFile } from "../interfaces/SaveFile";
import { StatObject } from "../interfaces/StatObject";
import { SwarmEvent } from "../interfaces/TimedEvent";
import { ArrayHelpers } from "./ArrayHelpers";
import { getMiddleOfThree } from "./getMiddleOfThree";
import { getTimeOfDay } from "./getTimeOfDay";
import { getRandomEncounter, isNotCatchable } from "./internalDex";
import { makeChallengerPokemon } from "./makeChallengerPokemon";
import { getCurrentLure, getCurrentSwarm } from "./TimedEvent";

export const determineWildPokemon = ({
  mapId,
  waterEncounter,
  shinyFactor,
  internalDex,
  maxBattleSize,
  saveFile,
}: {
  mapId: MapId;
  waterEncounter: boolean;
  shinyFactor: number;
  internalDex: InternalDex;
  maxBattleSize: number;
  saveFile: SaveFile;
}): { team: OwnedPokemon[]; battleTeamConfig: BattleTeamConfig } => {
  const quests = saveFile.quests;
  const lure = getCurrentLure(saveFile)?.lureType;
  const catchStreak = saveFile.catchStreak;
  const currentSwarm = getCurrentSwarm(saveFile, "WEAK");
  const currentStrongSwarm = getCurrentSwarm(saveFile, "STRONG");
  const currentDistortionSwarm =
    getCurrentSwarm(saveFile, "PAST_DISTORTION") ??
    getCurrentSwarm(saveFile, "FUTURE_DISTORTION") ??
    getCurrentSwarm(saveFile, "SPACE_DISTORTION");
  let battleTeamConfig: BattleTeamConfig = {
    assignGender: true,
    assignHeldItem: true,
    assignLearnsetMoves: true,
    assignNaturalAbility: true,
  };
  const timeOfDay = getTimeOfDay();
  const applyBoosts = (input: OwnedPokemon): OwnedPokemon => {
    const catchStreakBonus: number =
      input.name === catchStreak?.pokemon ? (catchStreak?.streak ?? 0) : 0;
    const ivBonus: number =
      saveFile.trait === "entomologist"
        ? saveFile.pokemon.filter((p) => p.name === input.name).length
        : 0;

    let secondShinyRoll =
      Math.random() / (catchStreak?.streak ?? 1) < shinyChance;

    if (catchStreak?.streak === 31 && input.name === catchStreak.pokemon) {
      secondShinyRoll = true;
    }
    const increasedIvs: StatObject = Object.fromEntries(
      Object.entries(input.intrinsicValues).map(([stat, value]) => [
        stat,
        Math.min(31, value + catchStreakBonus + ivBonus),
      ]),
    ) as StatObject;

    return {
      ...input,
      shiny: input.shiny || secondShinyRoll,
      intrinsicValues: increasedIvs,
    };
  };
  let encounter: OwnedPokemon[] = [];

  const checkSwarm = (): SwarmEvent | undefined => {
    if (waterEncounter) {
      return;
    }

    if (currentSwarm?.mapId === mapId) {
      return currentSwarm;
    }
    if (currentStrongSwarm?.mapId === mapId) {
      return currentStrongSwarm;
    }
    if (currentDistortionSwarm?.mapId === mapId) {
      return currentDistortionSwarm;
    }
  };

  const swarm = checkSwarm();

  if (catchStreak && Math.random() < catchStreak.streak / 100) {
    encounter = [
      makeChallengerPokemon(
        {
          name: catchStreak.pokemon,
          nature: getRandomNature(),
          ...getRandomEncounter(
            mapId,
            {
              area: waterEncounter ? "WATER" : "LAND",
              timeOfDay,
            },
            internalDex,
          ),
        },
        { increasedShinyFactor: shinyFactor },
      ),
    ];
  } else if (lure === "lure") {
    const name = ArrayHelpers.getRandomEntry(
      Object.entries(lowBstPokemon).filter(([p]) =>
        isNotCatchable(internalDex[p as PokemonName]),
      ),
    )[0] as PokemonName;
    encounter = [
      makeChallengerPokemon({
        nature: getRandomNature(),
        name,
        xp: getMiddleOfThree([
          1000,
          8000,
          1000 + Math.floor(7000 * Math.random()),
        ]),
      }),
    ];
  } else if (lure === "super-lure") {
    const name = ArrayHelpers.getRandomEntry(
      Object.entries(midBstPokemon).filter(([p]) =>
        isNotCatchable(internalDex[p as PokemonName]),
      ),
    )[0] as PokemonName;
    encounter = [
      makeChallengerPokemon({
        nature: getRandomNature(),
        name,
        xp: getMiddleOfThree([
          27000,
          8000,
          8000 + Math.floor(19000 * Math.random()),
        ]),
      }),
    ];
  } else if (lure === "max-lure") {
    const name = ArrayHelpers.getRandomEntry(
      Object.entries(highBstPokemon).filter(([p]) =>
        isNotCatchable(internalDex[p as PokemonName]),
      ),
    )[0] as PokemonName;
    encounter = [
      makeChallengerPokemon({
        nature: getRandomNature(),
        name,
        xp: getMiddleOfThree([
          27000,
          125000,
          27000 + Math.floor(98000 * Math.random()),
        ]),
      }),
    ];
  } else if (
    quests["catch the legendary bird of ice"] === "ACTIVE" &&
    Math.random() < 0.01
  ) {
    encounter = [
      makeChallengerPokemon(
        { name: "articuno", xp: 125000 },
        { increasedShinyFactor: 2 * shinyFactor },
      ),
    ];
  } else if (
    quests["defeat team galactic in ilex forest"] === "FULFILLED" &&
    Math.random() < 0.01
  ) {
    encounter = [
      makeChallengerPokemon(
        { name: "celebi", xp: 125000 },
        { increasedShinyFactor: 2 * shinyFactor },
      ),
    ];
  } else if (
    quests["retrieve oaks parcel from raticate"] === "ACTIVE" &&
    mapId === "routeS1E1" &&
    Math.random() < 0.1
  ) {
    encounter = [
      makeChallengerPokemon(
        { name: "raticate", xp: 27000, heldItemName: "oaks-parcel" },
        { increasedShinyFactor: 16 * shinyFactor },
      ),
    ];
    battleTeamConfig = { assignHeldItem: false };
  } else if (swarm && Math.random() > 0.5) {
    encounter = [
      makeChallengerPokemon(
        {
          nature: getRandomNature(),
          name: swarm.pokemon,
          xp: getMiddleOfThree([
            swarm.xpMin,
            swarm.xpMax,
            Math.floor(swarm.xpMax * Math.random()),
          ]),
        },
        { increasedShinyFactor: 8 * shinyFactor },
      ),
    ];
  } else {
    const options = Array.from({ length: Math.max(maxBattleSize) })
      .map((_, index) => index + 1)
      .filter((op) => op < 6 && op !== 0);
    const numberOfOpponents = ArrayHelpers.getRandomEntry<number>(options);

    encounter = Array.from({ length: numberOfOpponents }).map(() =>
      makeChallengerPokemon(
        {
          nature: getRandomNature(),
          ...getRandomEncounter(
            mapId,
            {
              area: waterEncounter ? "WATER" : "LAND",
              timeOfDay,
            },
            internalDex,
          ),
        },
        { increasedShinyFactor: shinyFactor },
      ),
    );
  }

  return { team: encounter.map(applyBoosts), battleTeamConfig };
};
