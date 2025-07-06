import { getHighestXpOnTeam } from "../../../functions/getHighestXpOnTeam";
import { makeChallengerPokemon } from "../../../functions/makeChallengerPokemon";
import { makeOverworldItem } from "../../../functions/makeOverworldItem";
import { occupantHandled } from "../../../functions/occupantHandled";
import { OverworldMap } from "../../../interfaces/OverworldMap";
import { SpriteEnum } from "../../../interfaces/SpriteEnum";

export const victoryRoadOccupants: OverworldMap["occupants"] = [
  //PORTALS
  {
    id: "victory_road_to_routeN1",
    type: "ON_STEP_PORTAL",
    x: 25,
    y: 49,
    portal: {
      mapId: "routeN1",
      x: 15,
      y: 2,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  {
    id: "victory_road_to_lower_level_1",
    type: "ON_STEP_PORTAL",
    x: 15,
    y: 16,
    portal: {
      mapId: "victoryRoadU1",
      x: 31,
      y: 32,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  {
    id: "victory_road_to_lower_level_2",
    type: "ON_STEP_PORTAL",
    x: 4,
    y: 22,
    portal: {
      mapId: "victoryRoadU1",
      x: 19,
      y: 37,
      orientation: "LEFT",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  {
    id: "victory_road_to_exit",
    type: "ON_STEP_PORTAL",
    x: 13,
    y: 2,
    portal: {
      mapId: "victoryRoadExit",
      x: 10,
      y: 27,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  //OBSTACLES
  {
    type: "CLIMBING_STEPS",
    x: 7,
    y: 10,
    conditionFunction: () => true,
    id: "climbing-steps-victoryRoad-2",
  },
  {
    type: "CLIMBING_STEPS",
    x: 7,
    y: 11,
    conditionFunction: () => true,
    id: "climbing-steps-victoryRoad-3",
  },
  {
    type: "LEDGE",
    x: 44,
    y: 14,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "ledge-victoryRoad-1"),
    id: "ledge-victoryRoad-1",
    sprite: "/ledges/ledgeDown.png",
    passableFrom: "UP",
  },
  {
    type: "LEDGE",
    x: 45,
    y: 14,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "ledge-victoryRoad-2"),
    id: "ledge-victoryRoad-2",
    sprite: "/ledges/ledgeDown.png",
    passableFrom: "UP",
  },
  {
    type: "LEDGE",
    x: 46,
    y: 14,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "ledge-victoryRoad-3"),
    id: "ledge-victoryRoad-3",
    sprite: "/ledges/ledgeDown.png",
    passableFrom: "UP",
  },
  {
    type: "ROCK",
    x: 20,
    y: 39,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_1"),
    id: "rock_victory_road_1",
  },
  {
    type: "ROCK",
    x: 32,
    y: 37,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_2"),
    id: "rock_victory_road_2",
  },
  {
    type: "ROCK",
    x: 23,
    y: 44,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_3"),
    id: "rock_victory_road_3",
  },
  {
    type: "ROCK",
    x: 21,
    y: 30,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_4"),
    id: "rock_victory_road_4",
  },
  {
    type: "ROCK",
    x: 23,
    y: 22,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_5"),
    id: "rock_victory_road_5",
  },
  {
    type: "ROCK",
    x: 41,
    y: 21,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_6"),
    id: "rock_victory_road_6",
  },
  {
    type: "ROCK",
    x: 11,
    y: 13,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_7"),
    id: "rock_victory_road_7",
  },
  {
    type: "ROCK",
    x: 16,
    y: 23,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_8"),
    id: "rock_victory_road_8",
  },
  {
    type: "ROCK",
    x: 9,
    y: 19,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_9"),
    id: "rock_victory_road_9",
  },
  {
    type: "ROCK",
    x: 40,
    y: 7,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_10"),
    id: "rock_victory_road_10",
  },
  {
    type: "ROCK",
    x: 29,
    y: 3,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_11"),
    id: "rock_victory_road_11",
  },
  {
    type: "ROCK",
    x: 14,
    y: 40,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_12"),
    id: "rock_victory_road_12",
  },
  //OVERWORLD_MONS
  {
    type: "POKEMON",
    x: 30,
    y: 33,
    orientation: "RIGHT",
    dexId: 248,
    encounter: {
      name: "tyranitar",
      maxXp: 343000,
      minXp: 343000,
      rarity: "common",
    },
    dialogue: ["Taaarr"],
    conditionFunction: (s) => !occupantHandled(s, "victory-road_ttar"),
    id: "victory-road_ttar",
  },
  {
    type: "POKEMON",
    x: 31,
    y: 33,
    orientation: "LEFT",
    dexId: 452,
    encounter: {
      name: "drapion",
      maxXp: 343000,
      minXp: 343000,
      rarity: "common",
    },
    dialogue: ["Drap Drap"],
    conditionFunction: (s) => !occupantHandled(s, "victory-road_drapion"),
    id: "victory-road_drapion",
  },
  {
    type: "POKEMON",
    x: 37,
    y: 11,
    orientation: "UP",
    dexId: 68,
    encounter: {
      name: "machamp",
      maxXp: 343000,
      minXp: 343000,
      rarity: "common",
    },
    dialogue: ["Ugh"],
    conditionFunction: (s) => !occupantHandled(s, "victory-road_machamp"),
    id: "victory-road_machamp",
  },
  {
    type: "POKEMON",
    x: 15,
    y: 13,
    orientation: "UP",
    dexId: 76,
    encounter: {
      name: "golem",
      maxXp: 343000,
      minXp: 343000,
      rarity: "common",
    },
    dialogue: ["lem", "...", "go"],
    conditionFunction: (s) => !occupantHandled(s, "victory-road_golem"),
    id: "victory-road_golem",
  },
  //TRAINERS
  {
    type: "TRAINER",
    id: "Ace Trainer Janine",
    x: 24,
    y: 26,
    orientation: "UP",
    team: (s) => {
      const xp = Math.max(216000, getHighestXpOnTeam(s.pokemon) * 0.9);
      return [
        makeChallengerPokemon({
          name: "sandslash",
          xp,
        }),
        makeChallengerPokemon({
          name: "toxicroak",
          xp,
        }),
        makeChallengerPokemon({
          name: "gogoat",
          xp,
        }),
      ];
    },
    sprite: SpriteEnum.ace2Female,
    unhandledMessage: ["I want to be the very best"],
    conditionFunction: (s) => !occupantHandled(s, "Ace Trainer Janine"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,

      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Ace Trainer Gregory",
    conditionFunction: (s) => !occupantHandled(s, "Ace Trainer Gregory"),
    x: 24,
    y: 32,
    orientation: "LEFT",
    team: (s) => {
      const xp = Math.max(216000, getHighestXpOnTeam(s.pokemon) * 0.9);
      return [
        makeChallengerPokemon({
          name: "turtonator",
          xp,
        }),
        makeChallengerPokemon({
          name: "donphan",
          xp,
        }),
        makeChallengerPokemon({
          name: "dewgong",
          xp,
        }),
      ];
    },
    sprite: SpriteEnum.ace2Male,
    unhandledMessage: ["No way you beat the league before me"],

    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,

      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Ace Trainer Ava",
    conditionFunction: (s) => !occupantHandled(s, "Ace Trainer Ava"),
    x: 45,
    y: 17,
    orientation: "UP",
    team: (s) => {
      const xp = Math.max(216000, getHighestXpOnTeam(s.pokemon) * 0.9);
      return [
        makeChallengerPokemon({
          name: "jynx",
          xp,
        }),
        makeChallengerPokemon({
          name: "kingdra",
          xp,
        }),
        makeChallengerPokemon({
          name: "zebstrika",
          xp,
        }),
      ];
    },
    sprite: SpriteEnum.aceFemale,
    unhandledMessage: ["Nu uhh, i wont let anyone overtake me"],

    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,

      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Ace Trainer Barb",
    conditionFunction: (s) => !occupantHandled(s, "Ace Trainer Barb"),
    x: 8,
    y: 26,
    orientation: "LEFT",
    team: (s) => {
      const xp = Math.max(216000, getHighestXpOnTeam(s.pokemon) * 0.9);
      return [
        makeChallengerPokemon({
          name: "serperior",
          xp,
        }),
        makeChallengerPokemon({
          name: "arbok",
          xp,
        }),
        makeChallengerPokemon({
          name: "rhydon",
          xp,
        }),
      ];
    },
    sprite: SpriteEnum.ace3Female,
    unhandledMessage: ["Dont get overconfident"],

    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,

      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Ace Trainer Matthew",
    conditionFunction: (s) => !occupantHandled(s, "Ace Trainer Matthew"),
    x: 7,
    y: 17,
    orientation: "DOWN",
    team: (s) => {
      const xp = Math.max(343000, getHighestXpOnTeam(s.pokemon));
      return [
        makeChallengerPokemon({
          name: "duraludon",
          xp,
        }),
        makeChallengerPokemon({
          name: "charizard",
          xp,
        }),
        makeChallengerPokemon({
          name: "claydol",
          xp,
        }),
        makeChallengerPokemon({
          name: "lilligant-hisui",
          xp,
        }),
      ];
    },
    sprite: SpriteEnum.ace2Male,
    unhandledMessage: ["Almost there"],

    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,

      assignHeldItem: true,
    },
  },
  //ITEMS
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "full-restore",
    x: 14,
    y: 31,
    amount: 2,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "revival-herb",
    x: 46,
    y: 3,
    amount: 3,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "ultra-ball",
    x: 26,
    y: 37,
    amount: 5,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "max-ether",
    x: 44,
    y: 23,
    amount: 1,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "loaded-dice",
    x: 18,
    y: 20,
    amount: 1,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "shell-bell",
    x: 19,
    y: 46,
    amount: 1,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "max-potion",
    x: 28,
    y: 1,
    amount: 3,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "choice-band",
    x: 19,
    y: 2,
    amount: 1,
  }),
  /*makeOverworldItem({
    mapId: "victoryRoad",
    item: "league-ticket",
    x: 7,
    y: 4,
    amount: 1,
  }),*/
];
