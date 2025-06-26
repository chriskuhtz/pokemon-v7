import { OverworldMap } from "../../../interfaces/OverworldMap";

export const victoryRoadOccupantsU1: OverworldMap["occupants"] = [
  //PORTALS
  {
    id: "victory_road_to_lower_level_1",
    type: "ON_STEP_PORTAL",
    x: 31,
    y: 41,
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
    y: 47,
    portal: {
      mapId: "victoryRoad",
      x: 5,
      y: 22,
      orientation: "RIGHT",
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
  //OVERWORLD_MONS
  /*{
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
  },*/
  //TRAINERS
  /*{
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
  },*/
  /*{
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
  },*/
  /*{
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
  },*/
  //ITEMS
  /*makeOverworldItem({
    mapId: "victoryRoad",
    item: "lum-berry",
    x: 25,
    y: 25,
    amount: 1,
  }),*/
  /*makeOverworldItem({
    mapId: "victoryRoad",
    item: "leftovers",
    x: 20,
    y: 13,
    amount: 1,
  }),*/
  /*makeOverworldItem({
    mapId: "victoryRoad",
    item: "league-ticket",
    x: 7,
    y: 4,
    amount: 1,
  }),*/
];
