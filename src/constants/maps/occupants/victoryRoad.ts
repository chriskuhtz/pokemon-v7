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
    id: "victory_road_to_pokemonLeague",
    type: "ON_STEP_PORTAL",
    x: 4,
    y: 4,
    portal: {
      mapId: "pokemonLeague",
      x: 5,
      y: 55,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  //OBSTACLES
  {
    type: "CLIMBING_STEPS",
    x: 7,
    y: 9,
    conditionFunction: () => true,
    id: "climbing-steps-victoryRoad-1",
  },
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
    x: 1,
    y: 29,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "ledge-victoryRoad-1"),
    id: "ledge-victoryRoad-1",
    sprite: "/ledges/ledgeDown.png",
    passableFrom: "UP",
  },
  {
    type: "LEDGE",
    x: 2,
    y: 29,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "ledge-victoryRoad-2"),
    id: "ledge-victoryRoad-2",
    sprite: "/ledges/ledgeDown.png",
    passableFrom: "UP",
  },
  {
    type: "LEDGE",
    x: 3,
    y: 29,
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
  //OVERWORLD_MONS
  {
    type: "POKEMON",
    x: 4,
    y: 49,
    orientation: "UP",
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
    x: 4,
    y: 48,
    orientation: "DOWN",
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
    x: 4,
    y: 48,
    orientation: "DOWN",
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
    x: 21,
    y: 16,
    orientation: "LEFT",
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
    x: 47,
    y: 22,
    orientation: "DOWN",
    dexId: 76,
    encounter: {
      name: "machamp",
      maxXp: 343000,
      minXp: 343000,
      rarity: "common",
    },
    dialogue: ["lem", "...", "go"],
    conditionFunction: (s) => !occupantHandled(s, "victory-road_golem"),
    id: "victory-road_golem",
  },
  {
    type: "POKEMON",
    x: 33,
    y: 6,
    orientation: "LEFT",
    dexId: 324,
    encounter: {
      name: "torkoal",
      maxXp: 343000,
      minXp: 343000,
      rarity: "common",
    },
    dialogue: ["torko", "..torko", ".torko"],
    conditionFunction: (s) => !occupantHandled(s, "victory-road_torkoal"),
    id: "victory-road_torkoal",
  },
  //TRAINERS
  {
    type: "TRAINER",
    id: "Ace Trainer Janine",
    x: 12,
    y: 32,
    orientation: "LEFT",
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
    y: 36,
    orientation: "UP",
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
    y: 49,
    orientation: "RIGHT",
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
    id: "Ace Trainer Johnson",
    conditionFunction: (s) => !occupantHandled(s, "Ace Trainer Johnson"),
    x: 32,
    y: 8,
    orientation: "RIGHT",
    team: (s) => {
      const xp = Math.max(216000, getHighestXpOnTeam(s.pokemon) * 0.9);
      return [
        makeChallengerPokemon({
          name: "mudsdale",
          xp,
        }),
        makeChallengerPokemon({
          name: "throh",
          xp,
        }),
        makeChallengerPokemon({
          name: "unfezant",
          xp,
        }),
      ];
    },
    sprite: SpriteEnum.aceMale,
    unhandledMessage: ["I will wipe the floor with you, kid"],

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
    x: 44,
    y: 8,
    orientation: "RIGHT",
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
    id: "Ace Trainer Jacob",
    conditionFunction: (s) => !occupantHandled(s, "Ace Trainer Jacob"),
    x: 21,
    y: 12,
    orientation: "LEFT",
    team: (s) => {
      const xp = Math.max(343000, getHighestXpOnTeam(s.pokemon) * 1.1);
      return [
        makeChallengerPokemon({
          name: "absol",
          xp,
        }),
        makeChallengerPokemon({
          name: "talonflame",
          xp,
        }),
      ];
    },
    sprite: SpriteEnum.ace3Male,
    unhandledMessage: ["Nothing´s gonna stop me"],

    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,

      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Ace Trainer Melissa",
    conditionFunction: (s) => !occupantHandled(s, "Ace Trainer Melissa"),
    x: 38,
    y: 3,
    orientation: "LEFT",
    team: (s) => {
      const xp = Math.max(343000, getHighestXpOnTeam(s.pokemon) * 0.8);
      return [
        makeChallengerPokemon({
          name: "pangoro",
          xp,
        }),
        makeChallengerPokemon({
          name: "venusaur",
          xp,
        }),
        makeChallengerPokemon({
          name: "frosmoth",
          xp,
        }),
        makeChallengerPokemon({
          name: "kangaskhan",
          xp,
        }),
        makeChallengerPokemon({
          name: "ampharos",
          xp,
        }),
        makeChallengerPokemon({
          name: "dubwool",
          xp,
        }),
      ];
    },
    sprite: SpriteEnum.aceFemale,
    unhandledMessage: ["I will become the champ"],

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
    x: 3,
    y: 14,
    orientation: "UP",
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
    x: 20,
    y: 28,
    amount: 2,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "revival-herb",
    x: 42,
    y: 12,
    amount: 3,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "ultra-ball",
    x: 10,
    y: 41,
    amount: 5,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "max-ether",
    x: 43,
    y: 35,
    amount: 1,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "lum-berry",
    x: 25,
    y: 25,
    amount: 1,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "loaded-dice",
    x: 45,
    y: 9,
    amount: 1,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "shell-bell",
    x: 45,
    y: 8,
    amount: 1,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "max-potion",
    x: 17,
    y: 19,
    amount: 3,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "leftovers",
    x: 20,
    y: 13,
    amount: 1,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "choice-band",
    x: 11,
    y: 5,
    amount: 1,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "league-ticket",
    x: 7,
    y: 4,
    amount: 1,
  }),
];
