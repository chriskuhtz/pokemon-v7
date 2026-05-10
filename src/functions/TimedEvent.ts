import { ONE_DAY, ONE_HOUR } from "../constants/baseConstants";
import { baseInternalDex } from "../constants/baseInternalDex";
import { mapsRecord } from "../constants/gameData/maps/mapsRecord";
import { PokemonName, pokemonNames } from "../constants/pokemonNames";
import { GameData, InternalDex } from "../interfaces/GameData";
import { joinInventories } from "../interfaces/Inventory";
import {
  fossils,
  ItemType,
  itemTypes,
  keyItems,
  LureType,
  RepelType,
} from "../interfaces/Item";
import { MapId } from "../interfaces/mapIds";
import { OverworldPokemon, OverworldTrainer } from "../interfaces/Occupant";
import { SwarmType } from "../interfaces/Pokedex";
import { PokemonType } from "../interfaces/PokemonType";
import { SaveFile } from "../interfaces/SaveFile";
import { SpriteEnum } from "../interfaces/SpriteEnum";
import {
  BlockerEvent,
  evilTeams,
  LostItemEvent,
  LureEvent,
  RepelEvent,
  StaticEncounterEvent,
  StaticTrainerEvent,
  SwarmEvent,
  TimedEvent,
  TroubleMakersEvent,
} from "../interfaces/TimedEvent";
import { ArrayHelpers } from "./ArrayHelpers";
import { getHighestXpOnTeam } from "./getHighestXpOnTeam";
import { getRandomOrientation } from "./getNextClockwiseDirection";
import { getRandomAvailableRoute } from "./getRandomAvailableRoute";
import { getRandomPokemonType } from "./getRandomPokemonId";
import { getRandomPosition } from "./getRandomPosition";
import {
  getAllEncountersFor,
  getRampagers,
  getRandomSwarmMon,
  getStaticEncountersForRoute,
} from "./internalDex";
import { makeRandomTeam } from "./makeRandomTeam";
import { occupantHandled } from "./occupantHandled";
import {
  getTroubleMakerAdminTeam,
  getTroubleMakerTeam,
  makeTroubleMakers,
} from "./troubleMakers/troubleMakers";
//EVENT HANDLING:
export const isExpired = (event: TimedEvent): boolean => {
  if (event.removeAt === -1) {
    return false;
  }
  const now = Date.now();
  //a bug introduced some blockers that only expire far into the future
  if (event.removeAt > now + ONE_DAY * 30) {
    return true;
  }
  return event.removeAt < now;
};
export const cleanUpTimedEvents = (saveFile: SaveFile): SaveFile => {
  const update = { ...saveFile, timedEvents: saveFile.timedEvents ?? [] };

  update.timedEvents = update.timedEvents?.filter((event) => !isExpired(event));
  console.log("cleaned up timed Events, result:", update.timedEvents);
  return update;
};
export const cleanUpSpecificEvent = (
  saveFile: SaveFile,
  id: string,
): SaveFile => {
  const update = { ...saveFile, timedEvents: saveFile.timedEvents ?? [] };

  return {
    ...update,
    timedEvents: update.timedEvents.filter((event) => event.id !== id),
  };
};
export const refillRandomTimedEvents = (
  saveFile: SaveFile,
  gameData: GameData,
): SaveFile => {
  const update = { ...saveFile, timedEvents: saveFile.timedEvents ?? [] };

  if (
    gameData.features.lostItems &&
    update.timedEvents.filter((t) => t.type === "LOST_ITEM").length < 2
  ) {
    update.timedEvents = [...update.timedEvents, makeLostItemEvent(update)];
  }
  if (
    gameData.features.staticEncounters &&
    saveFile.pokemon.length > 0 &&
    update.timedEvents.filter((t) => t.type === "STATIC_ENCOUNTER").length < 2
  ) {
    update.timedEvents = [
      ...update.timedEvents,
      makeStaticEncounterEvent(update, gameData.internalDex),
    ];
  }
  if (
    gameData.features.staticTrainers &&
    saveFile.pokemon.length > 0 &&
    update.timedEvents.filter((t) => t.type === "STATIC_TRAINER").length < 2
  ) {
    update.timedEvents = [
      ...update.timedEvents,
      makeStaticTrainerEvent(
        update,
        update.timedEvents
          .filter((ev) => ev.type === "STATIC_TRAINER")
          .map((ev) => ev.pokemonType),
      ),
    ];
  }

  console.log("refilled timed Events, result:", update.timedEvents);

  return update;
};
//STATIC ENCOUNTER:
export const makeStaticEncounterEvent = (
  s: SaveFile,
  internalDex: InternalDex,
  rampager?: boolean,
): StaticEncounterEvent => {
  const route = getRandomAvailableRoute(s, []);

  if (!route) {
    console.error("could not find available route to place static encounter");
    throw new Error();
  }

  const options: PokemonName[] = rampager
    ? getRampagers(internalDex)
    : [
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
      ].filter((p) => baseInternalDex[p].dexId <= 807);
  const pokemon = ArrayHelpers.getRandomEntry(options);
  const { x, y } = getRandomPosition(mapsRecord[route]);
  const now = new Date().getTime();
  const staticEncounter: StaticEncounterEvent = {
    type: "STATIC_ENCOUNTER",
    id: `STATIC_ENCOUNTER_${route}+${pokemon}`,
    mapId: route,
    name: pokemon,
    isRampager: rampager,
    dexId: internalDex[pokemon].dexId,
    x,
    y,
    removeAt: now + ONE_HOUR,
    xp: Math.floor(getHighestXpOnTeam(s.pokemon) * 0.9),
  };

  return staticEncounter;
};
export const makeOverworldPokemonFromStaticEncounterEvent = (
  staticEncounter: StaticEncounterEvent,
): OverworldPokemon => {
  return {
    ...staticEncounter,
    orientation: getRandomOrientation(),
    dialogue: [`Its a wild ${staticEncounter.name}`],
    type: "POKEMON",
    conditionFunction: (s) => !occupantHandled(s, staticEncounter.id),
    encounter: {
      name: staticEncounter.name,
      maxXp: staticEncounter.xp,
      minXp: staticEncounter.xp,
      rarity: "common",
    },
  };
};
export const getCurrentRampager = (
  s: SaveFile,
): StaticEncounterEvent | undefined => {
  return s.timedEvents
    ?.filter((t) => t.type === "STATIC_ENCOUNTER")
    .find((t) => t.isRampager);
};
export const addStaticEncounterToSaveFile = (
  s: SaveFile,
  internalDex: InternalDex,
  rampager?: boolean,
): SaveFile => {
  const newEncounter = makeStaticEncounterEvent(s, internalDex, rampager);
  return {
    ...s,

    timedEvents: (s.timedEvents ?? []).concat(newEncounter),
  };
};
//LOST ITEM:
const impossibleItems: ItemType[] = [
  ...keyItems,
  ...fossils,
  "odd-keystone",
  "max-lure",
  "master-ball",
  "enigma-berry",
  "purple-apricorn",
];
const lostItems: ItemType[] = [
  ...itemTypes.filter((item) => !impossibleItems.includes(item)),
];
export const makeLostItemEvent = (s: SaveFile): LostItemEvent => {
  const route = getRandomAvailableRoute(s, []);

  if (!route) {
    console.error("could not find available route to place item");
    throw new Error();
  }
  const item = ArrayHelpers.getRandomEntry(lostItems);
  const amount = 1;
  const { x, y } = getRandomPosition(mapsRecord[route]);
  const now = new Date().getTime();
  const lostItem: LostItemEvent = {
    type: "LOST_ITEM",
    id: `LOST_ITEM_${route}${item}${amount}`,
    mapId: route,
    item,
    amount,
    x,
    y,
    removeAt: now + ONE_HOUR,
  };

  return lostItem;
};
//STATIC TRAINER:
export const trainerPresets: Record<
  PokemonType,
  { unhandledMessage: string[]; sprite: string; name: string }
> = {
  water: {
    sprite: SpriteEnum.sailor,
    unhandledMessage: ["My team and I are making a splash!"],
    name: "Sailor Thornton",
  },
  fire: {
    sprite: SpriteEnum.funky,
    unhandledMessage: [
      "Feel the burning passion!",
      "My flames are unstoppable!",
    ],
    name: "Blaze Breaker",
  },
  grass: {
    sprite: SpriteEnum.lass,
    unhandledMessage: [
      "My pokemon are one with nature!",
      "Let's grow together!",
    ],
    name: "Nature Girl Mia",
  },
  electric: {
    sprite: SpriteEnum.mechanic,
    unhandledMessage: ["Ready to shock you!", "Feel the electric power!"],
    name: "georg ohm",
  },
  ghost: {
    sprite: SpriteEnum.possessed,
    unhandledMessage: ["Have you seen a ghost?", "The shadows whisper..."],
    name: "Possessed Grandma",
  },
  dark: {
    sprite: SpriteEnum.gangster,
    unhandledMessage: ["In darkness we trust!", "Embrace the shadows!"],
    name: "Shifty Stan",
  },
  psychic: {
    sprite: SpriteEnum.psychic,
    unhandledMessage: ["I sense your thoughts...", "The future is clear to me"],
    name: "Seer Sylvia",
  },
  rock: {
    sprite: SpriteEnum.hiker,
    unhandledMessage: ["Solid as a rock!", "My pokemon are tough as stone!"],
    name: "Hiker Rodrigo",
  },
  ground: {
    sprite: SpriteEnum.explorer,
    unhandledMessage: ["Stay grounded!", "Earth beats fire every time!"],
    name: "Explorer Mitch",
  },
  steel: {
    sprite: SpriteEnum.builder,
    unhandledMessage: ["Built to last!", "My pokemon are ironclad!"],
    name: "Steely Dan",
  },
  ice: {
    sprite: SpriteEnum.earmuffs,
    unhandledMessage: ["We´re the coldest crew around"],
    name: "Frosty Fran",
  },
  dragon: {
    sprite: SpriteEnum.dame,
    unhandledMessage: [
      "Dragons never surrender!",
      "Ancient power flows through me!",
    ],
    name: "Ms. Drake",
  },
  fighting: {
    sprite: SpriteEnum.karateMale,
    unhandledMessage: ["Strike First", "Strike Hard", "No Mercy"],
    name: "Johnny Lawrence",
  },
  flying: {
    sprite: SpriteEnum.aceMale,
    unhandledMessage: ["Soar through the skies!", "The wind guides us!"],
    name: "The Hawk",
  },
  poison: {
    sprite: SpriteEnum.baldy,
    unhandledMessage: ["Deadly to the core!", "One drop is all it takes..."],
    name: "Filthy Frank",
  },
  bug: {
    sprite: SpriteEnum.bugCatcher,
    unhandledMessage: ["Bugging out!", "My pokemon are endless in number!"],
    name: "Bug Catcher Peter",
  },
  fairy: {
    sprite: SpriteEnum.beauty1,
    unhandledMessage: ["Magical and cute!", "Sparkle and shine!"],
    name: "Fairy Faye",
  },
  normal: {
    sprite: SpriteEnum.trackSuit,
    unhandledMessage: [
      "Just a normal battle!",
      "Nothing special, just pokemon!",
    ],
    name: "Normal Nate",
  },
  typeless: {
    sprite: SpriteEnum.gentleman,
    unhandledMessage: ["very good...", "we shell battle, indeed"],
    name: "Alfred",
  },
};
export const makeStaticTrainerEvent = (
  s: SaveFile,
  typesToOmit: PokemonType[],
): StaticTrainerEvent => {
  const route = getRandomAvailableRoute(s, []);

  if (!route) {
    console.error("could not find available route to place static encounter");
    throw new Error();
  }

  const pokemonType = getRandomPokemonType(typesToOmit);
  const { x, y } = getRandomPosition(mapsRecord[route]);
  const now = new Date().getTime();
  const staticTrainer: StaticTrainerEvent = {
    type: "STATIC_TRAINER",
    id: trainerPresets[pokemonType].name,
    pokemonType,
    mapId: route,
    x,
    y,
    removeAt: now + ONE_HOUR * 1,
    xp: Math.floor(getHighestXpOnTeam(s.pokemon) * 0.9),
  };

  return staticTrainer;
};
export const makeOverworldTrainerfromStaticTrainerEvent = (
  staticTrainer: StaticTrainerEvent,
): OverworldTrainer => {
  return {
    ...staticTrainer,
    ...trainerPresets[staticTrainer.pokemonType],
    conditionFunction: (s) => !occupantHandled(s, staticTrainer.id),
    team: () =>
      makeRandomTeam({
        xp: staticTrainer.xp,
        type: staticTrainer.pokemonType,
      }),
    orientation: getRandomOrientation(),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
    type: "TRAINER",
  };
};
//LURE
const lureTimes: Record<LureType, number> = {
  lure: ONE_HOUR / 6,
  "super-lure": ONE_HOUR / 6,
  "max-lure": ONE_HOUR / 2,
};
export const getCurrentLure = (s: SaveFile): LureEvent | undefined => {
  return s.timedEvents?.find((t) => t.type === "LURE");
};
export const stopLure = (s: SaveFile): SaveFile => {
  return {
    ...s,
    timedEvents: (s.timedEvents ?? []).filter((ev) => ev.type !== "LURE"),
  };
};
export const startLure = (s: SaveFile, lureType: LureType): SaveFile => {
  return {
    ...s,
    bag: joinInventories(s.bag, { [lureType]: 1 }, true),
    timedEvents: (s.timedEvents ?? []).concat([
      {
        id: `LURE_EVENT${lureType}`,
        type: "LURE",
        lureType,
        removeAt: Date.now() + lureTimes[lureType],
      },
    ]),
  };
};
//REPEL
export const getCurrentRepel = (s: SaveFile): RepelEvent | undefined => {
  return s.timedEvents?.find((t) => t.type === "REPEL");
};
export const stopRepel = (s: SaveFile): SaveFile => {
  return {
    ...s,
    timedEvents: (s.timedEvents ?? []).filter((ev) => ev.type !== "REPEL"),
  };
};
export const startRepel = (s: SaveFile, repelType: RepelType): SaveFile => {
  return {
    ...s,
    bag: joinInventories(s.bag, { [repelType]: 1 }, true),
    timedEvents: (s.timedEvents ?? []).concat([
      {
        id: `REPEL_EVENT${repelType}`,
        type: "REPEL",
        repelType,
        removeAt: Date.now() + ONE_HOUR,
      },
    ]),
  };
};
//TROUBLEMAKERS
export const getCurrentTroubleMakers = (
  s: SaveFile,
): TroubleMakersEvent | undefined => {
  return s.timedEvents?.find((t) => t.type === "TROUBLEMAKERS");
};
export const removeTroubleMakers = (
  s: SaveFile,
  ending: "DEFEATED" | "ESCAPED",
): SaveFile => {
  const troubleMakers = getCurrentTroubleMakers(s);

  if (!troubleMakers) {
    return s;
  }
  return {
    ...s,
    timedEvents: (s.timedEvents ?? []).filter(
      (ev) =>
        ev.id !== troubleMakers.id &&
        !troubleMakers.trainers.some((trainer) => trainer.id === ev.id),
    ),

    rangerLevel: (s.rangerLevel ?? 0) + (ending === "DEFEATED" ? 1 : 0),
  };
};
export const createTroubleMakers = (s: SaveFile): SaveFile => {
  const route = getRandomAvailableRoute(s, []);

  if (!route) {
    throw new Error();
  }

  const randomAffiliation = ArrayHelpers.getRandomEntry([...evilTeams]);
  const op = makeTroubleMakers(
    route,
    s.campUpgrades["warden certification"],
    randomAffiliation,
  );

  const troubleMakers: TroubleMakersEvent = {
    type: "TROUBLEMAKERS",
    id: `TROUBLE_MAKERS_EVENT${randomAffiliation}`,
    mapId: route,
    trainers: op,
    affiliation: randomAffiliation,
    removeAt: Date.now() + ONE_HOUR * 3,
  };
  return {
    ...s,
    timedEvents: (s.timedEvents ?? []).concat([troubleMakers]),
  };
};
export const makeOverworldTroubleMakers = (
  saveFile: SaveFile,
): OverworldTrainer[] => {
  const troubleMakers = getCurrentTroubleMakers(saveFile);

  if (!troubleMakers) {
    return [];
  }
  return [
    ...troubleMakers.trainers.map((t) => {
      if (
        [
          "Rocket Admin Chad",
          "Rocket Admin Hillary",
          "Aqua Boss Archie",
          "Magma Boss Maxie",
          "Galactic Admin Mars",
          "Galactic Admin Saturn",
          "Galactic Admin Jupiter",
        ].includes(t.id)
      ) {
        return {
          ...t,
          team: () => getTroubleMakerAdminTeam(saveFile, t.id),
          conditionFunction: () => !occupantHandled(saveFile, t.id),
        };
      }

      return {
        ...t,
        team: () => getTroubleMakerTeam(saveFile),
        conditionFunction: () => !occupantHandled(saveFile, t.id),
      };
    }),
  ];
};
//BLOCKER
export const getCurrentBlocker = (
  s: SaveFile,
  id: string,
): BlockerEvent | undefined => {
  return s.timedEvents
    ?.filter((t) => t.type === "BLOCKER")
    .find((t) => t.id === id);
};
export const stopBlocker = (s: SaveFile, id: string): SaveFile => {
  return {
    ...s,
    timedEvents: (s.timedEvents ?? []).filter(
      (ev) => !(ev.type === "BLOCKER" && ev.id === id),
    ),
  };
};
export const startBlocker = (s: SaveFile, id: string, ms: number): SaveFile => {
  return {
    ...s,
    timedEvents: (s.timedEvents ?? []).concat([
      {
        id: id,
        type: "BLOCKER",
        removeAt: ms === -1 ? ms : Date.now() + ms,
      },
    ]),
  };
};
export const resetBlockersWithPartialId = (
  saveFile: SaveFile,
  partialId: string,
): SaveFile => {
  return {
    ...saveFile,
    timedEvents: saveFile.timedEvents?.filter((event) => {
      return event.id
        .toLocaleLowerCase()
        .includes(partialId.toLocaleLowerCase());
    }),
  };
};
//SWARM
export const getCurrentSwarm = (
  s: SaveFile,
  swarmType: SwarmType | undefined,
): SwarmEvent | undefined => {
  if (!swarmType) {
    return s.timedEvents?.find((t) => t.type === "SWARM");
  }
  return s.timedEvents
    ?.filter((t) => t.type === "SWARM")
    .find((t) => t.swarmType === swarmType);
};
export const stopSwarm = (s: SaveFile, swarmType: SwarmType): SaveFile => {
  return {
    ...s,
    timedEvents: (s.timedEvents ?? []).filter(
      (ev) => !(ev.type === "SWARM" && ev.swarmType === swarmType),
    ),
  };
};
export const startSwarm = (
  s: SaveFile,
  swarmType: SwarmType,
  mapId: MapId,
  internalDex: InternalDex,
): SaveFile => {
  const pokemon = () => {
    if (s.settings?.randomSwarms) {
      return ArrayHelpers.getRandomEntry([...pokemonNames]);
    }
    return getRandomSwarmMon(swarmType, internalDex);
  };
  const xpMax = () => {
    if (swarmType === "STRONG") {
      return 40 * 40 * 40;
    }
    if (swarmType === "WEAK") {
      return 10 * 10 * 10;
    }

    return 60 * 60 * +60;
  };
  const xpMin = () => {
    if (swarmType === "STRONG") {
      return 20 * 20 * 20;
    }
    if (swarmType === "WEAK") {
      return 5 * 5 * 5;
    }

    return 40 * 40 * +40;
  };

  return {
    ...s,
    timedEvents: (s.timedEvents ?? []).concat([
      {
        id: `SWARM_EVENT_${swarmType}`,
        type: "SWARM",
        swarmType,
        mapId,
        pokemon: pokemon(),
        removeAt: Date.now() + ONE_HOUR,
        xpMax: xpMax(),
        xpMin: xpMin(),
      },
    ]),
  };
};
