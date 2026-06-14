import { calculateLevelData } from "../../../../functions/calculateLevelData";
import { getHighestXpOnTeam } from "../../../../functions/getHighestXpOnTeam";
import { makeChallengerPokemon } from "../../../../functions/makeChallengerPokemon";
import { occupantHandled } from "../../../../functions/occupantHandled";
import { Occupant } from "../../../../interfaces/Occupant";
import { OverworldMap } from "../../../../interfaces/OverworldMap";
import { SaveFile } from "../../../../interfaces/SaveFile";
import { SpriteEnum } from "../../../../interfaces/SpriteEnum";
import { rakudairoRuinsDragoniteTaxi } from "../../../../modules/DragoniteTaxi/DragoniteTaxi";

const treasureHunterCarolus: Occupant[] = [
  {
    type: "TRAINER",
    team: (s) => {
      const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);
      const { level } = calculateLevelData(highestXpOnTeam, "medium");

      const xpOfAce = (level + 1) * (level + 1) * (level + 1);
      return [
        makeChallengerPokemon({ name: "sandslash", xp: xpOfAce }),
        makeChallengerPokemon({ name: "sandslash", xp: xpOfAce }),
      ];
    },
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
    orientation: "DOWN",
    x: 1,
    y: 39,
    unhandledMessage: ["I can smell the profit from here"],
    sprite: SpriteEnum["explorer"],
    id: "treasure hunter carolus",
    conditionFunction: (s) => !occupantHandled(s, "treasure hunter carolus"),
  },
  {
    type: "POKEMON",
    x: 2,
    y: 39,
    orientation: "DOWN",
    dexId: 28,
    dialogue: ["slash slash"],
    conditionFunction: (s) => !occupantHandled(s, "treasure hunter carolus"),
    id: "carolus_sandslash",
  },
];
const treasureHuntermitchell: Occupant[] = [
  {
    type: "TRAINER",
    team: (s) => {
      const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);
      const { level } = calculateLevelData(highestXpOnTeam, "medium");

      const xpOfTeam = (level - 1) * (level - 1) * (level - 1);
      const xpOfAce = (level + 1) * (level + 1) * (level + 1);
      return [
        makeChallengerPokemon({ name: "yamask", xp: xpOfTeam }),
        makeChallengerPokemon({ name: "steelix", xp: xpOfAce }),
      ];
    },
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
    orientation: "UP",
    x: 5,
    y: 35,
    unhandledMessage: ["We will all be rich"],
    sprite: SpriteEnum["explorer"],
    id: "treasure hunter mitchell",
    conditionFunction: (s) => !occupantHandled(s, "treasure hunter mitchell"),
  },
  {
    type: "POKEMON",
    x: 6,
    y: 35,
    orientation: "UP",
    dexId: 208,
    dialogue: ["grrrhh"],
    conditionFunction: (s) => !occupantHandled(s, "treasure hunter mitchell"),
    id: "mitchell_steelix",
  },
];
const treasureHunterphilipp: Occupant[] = [
  {
    type: "TRAINER",
    team: (s) => {
      const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);
      const { level } = calculateLevelData(highestXpOnTeam, "medium");

      const xpOfAce = (level + 1) * (level + 1) * (level + 1);
      return [
        makeChallengerPokemon({ name: "dugtrio", xp: xpOfAce }),
        makeChallengerPokemon({ name: "wugtrio", xp: xpOfAce }),
        makeChallengerPokemon({ name: "dugtrio-alola", xp: xpOfAce }),
      ];
    },
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
    orientation: "RIGHT",
    x: 41,
    y: 3,
    unhandledMessage: ["I wonder how long ago these ruins were built"],
    sprite: SpriteEnum["explorer"],
    id: "treasure hunter philipp",
    conditionFunction: (s) => !occupantHandled(s, "treasure hunter philipp"),
  },
  {
    type: "POKEMON",
    x: 41,
    y: 4,
    orientation: "RIGHT",
    dexId: 51,
    dialogue: ["Dug Dug"],
    conditionFunction: (s) => !occupantHandled(s, "treasure hunter philipp"),
    id: "philipp_dugtrio",
  },
];
const treasureHunterTerrence: Occupant[] = [
  {
    type: "TRAINER",
    team: (s) => {
      const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);
      const { level } = calculateLevelData(highestXpOnTeam, "medium");

      const xpOfTeam = (level - 1) * (level - 1) * (level - 1);
      const xpOfAce = (level + 1) * (level + 1) * (level + 1);
      return [
        makeChallengerPokemon({ name: "yamask", xp: xpOfTeam }),
        makeChallengerPokemon({ name: "aron", xp: xpOfTeam }),
        makeChallengerPokemon({ name: "onix", xp: xpOfTeam }),
        makeChallengerPokemon({ name: "gligar", xp: xpOfTeam }),
        makeChallengerPokemon({ name: "cradily", xp: xpOfAce }),
      ];
    },
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
    orientation: "UP",
    x: 19,
    y: 5,
    unhandledMessage: ["How far can these sands drag on"],
    sprite: SpriteEnum["explorer"],
    id: "treasure hunter terrence",
    conditionFunction: (s) => !occupantHandled(s, "treasure hunter terrence"),
  },
];
const treasureHunterkyle: Occupant[] = [
  {
    type: "TRAINER",
    team: (s) => {
      const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);
      const { level } = calculateLevelData(highestXpOnTeam, "medium");

      const xpOfAce = (level + 1) * (level + 1) * (level + 1);
      return [
        makeChallengerPokemon({ name: "runerigus", xp: xpOfAce }),
        makeChallengerPokemon({ name: "nidorino", xp: xpOfAce }),
      ];
    },
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
    orientation: "UP",
    x: 20,
    y: 27,
    unhandledMessage: [
      "We are sponsored by team rocket",
      "but dont tell anyone",
    ],
    sprite: SpriteEnum["explorer"],
    id: "treasure hunter kyle",
    conditionFunction: (s) => !occupantHandled(s, "treasure hunter kyle"),
  },
];
const treasureHunterEric: Occupant[] = [
  {
    type: "TRAINER",
    team: (s) => {
      const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);
      const { level } = calculateLevelData(highestXpOnTeam, "medium");

      const xpOfAce = (level + 1) * (level + 1) * (level + 1);
      return [
        makeChallengerPokemon({ name: "nidoking", xp: xpOfAce }),
        makeChallengerPokemon({ name: "donphan", xp: xpOfAce }),
      ];
    },
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
    orientation: "UP",
    x: 2,
    y: 12,
    unhandledMessage: ["you will respect my authority"],
    sprite: SpriteEnum["explorer"],
    id: "treasure hunter eric",
    conditionFunction: (s) => !occupantHandled(s, "treasure hunter eric"),
  },
];
const treasureHunterstanley: Occupant[] = [
  {
    type: "TRAINER",
    team: (s) => {
      const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);
      const { level } = calculateLevelData(highestXpOnTeam, "medium");

      const xpOfTeam = (level - 1) * (level - 1) * (level - 1);
      const xpOfAce = (level + 1) * (level + 1) * (level + 1);
      return [
        makeChallengerPokemon({ name: "swinub", xp: xpOfTeam }),
        makeChallengerPokemon({ name: "onix", xp: xpOfTeam }),
        makeChallengerPokemon({ name: "piloswine", xp: xpOfTeam }),
        makeChallengerPokemon({ name: "piloswine", xp: xpOfTeam }),
        makeChallengerPokemon({ name: "steelix", xp: xpOfAce }),
        makeChallengerPokemon({ name: "mamoswine", xp: xpOfAce }),
      ];
    },
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
    orientation: "RIGHT",
    x: 3,
    y: 18,
    unhandledMessage: [
      "we havent found much treasure",
      "but these rare pokemon",
      "should be worth something",
    ],
    sprite: SpriteEnum["explorer"],
    id: "treasure hunter stanley",
    conditionFunction: (s) => !occupantHandled(s, "treasure hunter stanley"),
  },
  {
    type: "POKEMON",
    x: 3,
    y: 19,
    orientation: "RIGHT",
    dexId: 208,
    dialogue: ["Grreeehh"],
    conditionFunction: (s) => !occupantHandled(s, "treasure hunter stanley"),
    id: "stanley_steelix",
  },
];
export const rakudairoRuinsOccupants: OverworldMap["occupants"] = [
  ...rakudairoRuinsDragoniteTaxi,
  {
    type: "ON_STEP_PORTAL",
    x: 0,
    y: 25,
    portal: {
      mapId: "routeE1",
      x: 49,
      y: 43,
      orientation: "LEFT",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "rakudairo_to_routeE1",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 47,
    y: 3,
    portal: {
      mapId: "rakudairo-ruins",
      x: 47,
      y: 46,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "rakudairo_tunnel_1",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 47,
    y: 45,
    portal: {
      mapId: "rakudairo-ruins",
      x: 47,
      y: 4,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "rakudairo_tunnel_2",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 25,
    y: 25,
    portal: {
      mapId: "rakudairo-ruins",
      x: 1,
      y: 19,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "rakudairo_tunnel_3",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 1,
    y: 18,
    portal: {
      mapId: "rakudairo-ruins",
      x: 25,
      y: 24,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "rakudairo_tunnel_4",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 40,
    y: 49,
    portal: {
      mapId: "rakudairo-ruins",
      x: 11,
      y: 2,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "rakudairo_tunnel_5",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 11,
    y: 1,
    portal: {
      mapId: "rakudairo-ruins",
      x: 40,
      y: 48,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "rakudairo_tunnel_5",
  },
  {
    type: "POKEMON",
    x: 25,
    y: 22,
    orientation: "DOWN",
    dexId: 377,
    encounter: {
      name: "regirock",
      maxXp: 125000,
      minXp: 125000,
      rarity: "common",
    },
    dialogue: ["DUNKDUNKDUNK"],
    conditionFunction: (s) => s.pokedex.regirock.caughtOnRoutes.length === 0,
    id: "routeE1_regirock",
  },
  {
    type: "POKEMON",
    x: 44,
    y: 43,
    orientation: "DOWN",
    dexId: 445,
    encounter: {
      name: "garchomp",
      maxXp: 125000,
      minXp: 125000,
      rarity: "common",
    },
    dialogue: ["klaaaang"],
    conditionFunction: (s) => s.pokedex["garchomp"].caughtOnRoutes.length === 0,
    id: "routeE1_garchomp",
  },
  ...treasureHunterCarolus,
  ...treasureHuntermitchell,
  ...treasureHunterTerrence,
  ...treasureHunterphilipp,
  ...treasureHunterkyle,
  ...treasureHunterEric,
  ...treasureHunterstanley,
  {
    type: "ITEM",
    item: "root-fossil",
    amount: 1,
    x: 14,
    y: 3,
    id: "rakudairo_root-fossil",
    conditionFunction: (s) => !occupantHandled(s, "rakudairo_root-fossil"),
  },
  {
    type: "ITEM",
    item: "heat-rock",
    amount: 1,
    x: 43,
    y: 37,
    id: "rakudairo_heat-rock",
    conditionFunction: (s) => !occupantHandled(s, "rakudairo_heat-rock"),
  },
  {
    type: "ITEM",
    item: "soft-sand",
    amount: 1,
    x: 48,
    y: 41,
    id: "rakudairo_soft-sand",
    conditionFunction: (s) => !occupantHandled(s, "rakudairo_soft-sand"),
  },
  {
    type: "ITEM",
    item: "hyper-potion",
    amount: 2,
    x: 29,
    y: 27,
    id: "rakudairo_hyper-potion",
    conditionFunction: (s) => !occupantHandled(s, "rakudairo_hyper-potion"),
  },
  {
    type: "ITEM",
    item: "full-heal",
    amount: 3,
    x: 23,
    y: 39,
    id: "rakudairo_full-heal",
    conditionFunction: (s) => !occupantHandled(s, "rakudairo_full-heal"),
  },
];

export const rakudairoRuinsCleared = (s: SaveFile): boolean => {
  return rakudairoRuinsOccupants
    .filter((r) => r.type === "TRAINER")
    .every((r) => occupantHandled(s, r.id));
};
