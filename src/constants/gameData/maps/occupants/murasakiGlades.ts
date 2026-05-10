import { getHighestXpOnTeam } from "../../../../functions/getHighestXpOnTeam";
import { makeApricornTree } from "../../../../functions/makeApricornTree";
import { makeBerryTree } from "../../../../functions/makeBerryTree";
import { makeChallengerPokemon } from "../../../../functions/makeChallengerPokemon";
import { makeOverworldItem } from "../../../../functions/makeOverworldItem";
import { occupantHandled } from "../../../../functions/occupantHandled";
import { Occupant } from "../../../../interfaces/Occupant";
import { SaveFile } from "../../../../interfaces/SaveFile";
import { SpriteEnum } from "../../../../interfaces/SpriteEnum";
import { murasakiDragoniteTaxi } from "../../../../modules/DragoniteTaxi/DragoniteTaxi";

export const murasakiGladesCleared = (s: SaveFile): boolean => {
  return murasakiGladesOccupants
    .filter((r) => r.type === "TRAINER" || r.type === "POKEMON")
    .every((r) => occupantHandled(s, r.id));
};

export const murasakiGladesOccupants: Occupant[] = [
  ...murasakiDragoniteTaxi,
  ...makeApricornTree({
    x: 35,
    y: 3,
    apricorn: "pink-apricorn",
    id: "murasaki-pink-apricorn-1",
  }),
  ...makeApricornTree({
    x: 35,
    y: 1,
    apricorn: "pink-apricorn",
    id: "murasaki-pink-apricorn-2",
  }),
  ...makeApricornTree({
    x: 37,
    y: 2,
    apricorn: "pink-apricorn",
    id: "murasaki-pink-apricorn-3",
  }),
  ...makeApricornTree({
    x: 5,
    y: 37,
    apricorn: "black-apricorn",
    id: "murasaki-black-apricorn-1",
  }),
  ...makeApricornTree({
    x: 4,
    y: 36,
    apricorn: "black-apricorn",
    id: "murasaki-black-apricorn-2",
  }),
  ...makeApricornTree({
    x: 7,
    y: 37,
    apricorn: "black-apricorn",
    id: "murasaki-black-apricorn-3",
  }),
  ...makeBerryTree({
    x: 24,
    y: 52,
    berry: "kasib-berry",
    id: "murasaki-kasib-berry-1",
  }),
  ...makeBerryTree({
    x: 25,
    y: 51,
    berry: "kasib-berry",
    id: "murasaki-kasib-berry-2",
  }),
  ...makeBerryTree({
    x: 26,
    y: 52,
    berry: "kasib-berry",
    id: "murasaki-kasib-berry-3",
  }),
  ...makeBerryTree({
    x: 46,
    y: 60,
    berry: "payapa-berry",
    id: "murasaki-payapa-berry-1",
  }),
  ...makeBerryTree({
    x: 45,
    y: 62,
    berry: "payapa-berry",
    id: "murasaki-payapa-berry-2",
  }),
  ...makeBerryTree({
    x: 47,
    y: 62,
    berry: "payapa-berry",
    id: "murasaki-payapa-berry-3",
  }),
  {
    type: "POKEMON",
    dialogue: [
      "hoopa snickers with mischief",
      "is it aware of what it is doing",
      "to these people?",
      "Or is this just its nature",
    ],
    dexId: 720,
    orientation: "DOWN",
    x: 2,
    y: 2,
    id: "murasaki-hoopa",
    conditionFunction: (s) =>
      !occupantHandled(s, "murasaki-hoopa") &&
      !s.pokedex["hoopa"].caughtOnRoutes.includes("murasaki-glades"),
    encounter: {
      rarity: "common",
      name: "hoopa",
      maxXp: 70 * 70 * 70,
      minXp: 70 * 70 * 70,
    },
  },
  {
    type: "TRAINER",
    id: "Monk Marty",
    x: 4,
    y: 4,
    orientation: "RIGHT",
    team: (s) => [
      makeChallengerPokemon({
        name: "dusknoir",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
    ],
    sprite: SpriteEnum.monk,
    unhandledMessage: ["We are ..."],
    conditionFunction: (s) => !occupantHandled(s, "Monk Marty"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Nun Mary",
    x: 4,
    y: 5,
    orientation: "RIGHT",
    team: (s) => [
      makeChallengerPokemon({
        name: "hypno",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
    ],
    sprite: SpriteEnum.possessed,
    unhandledMessage: ["... the last defense"],
    conditionFunction: (s) => !occupantHandled(s, "Nun Mary"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Nun Malva",
    x: 25,
    y: 35,
    orientation: "DOWN",
    team: (s) => [
      makeChallengerPokemon({
        name: "hypno",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
      makeChallengerPokemon({
        name: "gengar",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
    ],
    sprite: SpriteEnum.possessed2,
    unhandledMessage: ["They run from us"],
    conditionFunction: (s) => !occupantHandled(s, "Nun Malva"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Nun Marla",
    x: 5,
    y: 55,
    orientation: "DOWN",
    team: (s) => [
      makeChallengerPokemon({
        name: "sableye",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
      makeChallengerPokemon({
        name: "sableye",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
    ],
    sprite: SpriteEnum.possessed2,
    unhandledMessage: ["We want to play"],
    conditionFunction: (s) => !occupantHandled(s, "Nun Marla"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Nun Mavis",
    x: 42,
    y: 25,
    orientation: "UP",
    team: (s) => [
      makeChallengerPokemon({
        name: "aegislash-blade",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
      makeChallengerPokemon({
        name: "haunter",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
      makeChallengerPokemon({
        name: "drowzee",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
    ],
    sprite: SpriteEnum.possessed2,
    unhandledMessage: ["Why are people scared"],
    conditionFunction: (s) => !occupantHandled(s, "Nun Mavis"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Nun Magda",
    x: 20,
    y: 7,
    orientation: "DOWN",
    team: (s) => [
      makeChallengerPokemon({
        name: "gardevoir",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
      makeChallengerPokemon({
        name: "hypno",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
    ],
    sprite: SpriteEnum.possessed,
    unhandledMessage: ["we can make them have fun"],
    conditionFunction: (s) => !occupantHandled(s, "Nun Magda"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Monk Mort",
    x: 35,
    y: 33,
    orientation: "DOWN",
    team: (s) => [
      makeChallengerPokemon({
        name: "annihilape",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
    ],
    sprite: SpriteEnum.monk,
    unhandledMessage: ["They dont seem telepathic"],
    conditionFunction: (s) => !occupantHandled(s, "Monk Mort"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Monk Mark",
    x: 19,
    y: 19,
    orientation: "DOWN",
    team: (s) => [
      makeChallengerPokemon({
        name: "alakazam",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
      makeChallengerPokemon({
        name: "absol",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
    ],
    sprite: SpriteEnum.monk,
    unhandledMessage: ["Their Minds are boring"],
    conditionFunction: (s) => !occupantHandled(s, "Monk Mark"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Monk Melvin",
    x: 15,
    y: 4,
    orientation: "DOWN",
    team: (s) => [
      makeChallengerPokemon({
        name: "gothitelle",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
      makeChallengerPokemon({
        name: "delphox",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
    ],
    sprite: SpriteEnum.monk,
    unhandledMessage: ["Now they all obey"],
    conditionFunction: (s) => !occupantHandled(s, "Monk Melvin"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Monk Marlin",
    x: 30,
    y: 55,
    orientation: "DOWN",
    team: (s) => [
      makeChallengerPokemon({
        name: "typhlosion-hisui",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
    ],
    sprite: SpriteEnum.monk,
    unhandledMessage: ["Not a lot going on in here"],
    conditionFunction: (s) => !occupantHandled(s, "Monk Marlin"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },

  makeOverworldItem({
    x: 21,
    y: 17,
    item: "black-glasses",
    amount: 1,
    mapId: "murasaki-glades",
  }),
  makeOverworldItem({
    x: 30,
    y: 35,
    item: "twisted-spoon",
    amount: 1,
    mapId: "murasaki-glades",
  }),
  makeOverworldItem({
    x: 16,
    y: 51,
    item: "spell-tag",
    amount: 1,
    mapId: "murasaki-glades",
  }),
  makeOverworldItem({
    x: 44,
    y: 3,
    item: "revival-herb",
    amount: 3,
    mapId: "murasaki-glades",
  }),
];
