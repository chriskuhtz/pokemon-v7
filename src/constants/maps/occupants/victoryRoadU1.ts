import { getHighestXpOnTeam } from "../../../functions/getHighestXpOnTeam";
import { makeChallengerPokemon } from "../../../functions/makeChallengerPokemon";
import { makeOverworldItem } from "../../../functions/makeOverworldItem";
import { occupantHandled } from "../../../functions/occupantHandled";
import { OverworldMap } from "../../../interfaces/OverworldMap";
import { SpriteEnum } from "../../../interfaces/SpriteEnum";

export const victoryRoadOccupantsU1: OverworldMap["occupants"] = [
  //PORTALS
  {
    id: "victory_road_to_lower_level_1",
    type: "ON_STEP_PORTAL",
    x: 31,
    y: 31,
    portal: {
      mapId: "victoryRoad",
      x: 15,
      y: 15,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  {
    id: "victory_road_to_lower_level_2",
    type: "ON_STEP_PORTAL",
    x: 20,
    y: 37,
    portal: {
      mapId: "victoryRoad",
      x: 5,
      y: 22,
      orientation: "RIGHT",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  {
    id: "victory_road_lower_level_to_victory_road_extra_cave",
    type: "ON_STEP_PORTAL",
    x: 8,
    y: 3,
    portal: {
      mapId: "victoryRoadExtra",
      x: 20,
      y: 37,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  //OBSTACLES
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
    x: 28,
    y: 44,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_2"),
    id: "rock_victory_road_2",
  },
  {
    type: "ROCK",
    x: 13,
    y: 42,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_3"),
    id: "rock_victory_road_3",
  },
  {
    type: "ROCK",
    x: 21,
    y: 24,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_4"),
    id: "rock_victory_road_4",
  },
  {
    type: "ROCK",
    x: 35,
    y: 7,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_5"),
    id: "rock_victory_road_5",
  },
  {
    type: "ROCK",
    x: 7,
    y: 30,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_victory_road_6"),
    id: "rock_victory_road_6",
  },
  //OVERWORLD_MONS
  {
    type: "POKEMON",
    x: 36,
    y: 23,
    orientation: "DOWN",
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
    id: "Ace Trainer Johnson",
    conditionFunction: (s) => !occupantHandled(s, "Ace Trainer Johnson"),
    x: 24,
    y: 37,
    orientation: "LEFT",
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
    unhandledMessage: ["Am I lost?"],

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
    x: 33,
    y: 44,
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
    unhandledMessage: ["This path will surely be the right one!"],

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
    x: 27,
    y: 29,
    orientation: "UP",
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
    unhandledMessage: ["I feel like I'm going in circles."],

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
    item: "lum-berry",
    x: 19,
    y: 14,
    amount: 1,
  }),
  makeOverworldItem({
    mapId: "victoryRoad",
    item: "leftovers",
    x: 12,
    y: 29,
    amount: 1,
  }),
];
