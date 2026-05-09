import { getHighestXpOnTeam } from "../../../../functions/getHighestXpOnTeam";
import { makeApricornTree } from "../../../../functions/makeApricornTree";
import { makeBerryTree } from "../../../../functions/makeBerryTree";
import { makeChallengerPokemon } from "../../../../functions/makeChallengerPokemon";
import { occupantHandled } from "../../../../functions/occupantHandled";
import { Occupant } from "../../../../interfaces/Occupant";
import { SaveFile } from "../../../../interfaces/SaveFile";
import { SpriteEnum } from "../../../../interfaces/SpriteEnum";
import { ilexDragoniteTaxi } from "../../../../modules/DragoniteTaxi/DragoniteTaxi";

export const allIlexGalacticsDefeated = (s: SaveFile): boolean => {
  return ilexForestOccupants
    .filter(
      (r) =>
        r.type === "TRAINER" && r.id.toLocaleLowerCase().includes("galactic"),
    )
    .every((r) => occupantHandled(s, r.id));
};

export const ilexForestOccupants: Occupant[] = [
  ...makeApricornTree({
    x: 38,
    y: 44,
    apricorn: "green-apricorn",
    id: "ilex-forest-green-apricorn-1",
  }),
  ...makeApricornTree({
    x: 35,
    y: 44,
    apricorn: "yellow-apricorn",
    id: "ilex-forest-yellow-apricorn-1",
  }),
  ...makeApricornTree({
    x: 37,
    y: 47,
    apricorn: "orange-apricorn",
    id: "ilex-forest-orange-apricorn-1",
  }),
  ...makeApricornTree({
    x: 25,
    y: 20,
    apricorn: "green-apricorn",
    id: "ilex-forest-green-apricorn-2",
  }),
  ...makeApricornTree({
    x: 23,
    y: 19,
    apricorn: "yellow-apricorn",
    id: "ilex-forest-yellow-apricorn-2",
  }),
  ...makeApricornTree({
    x: 26,
    y: 19,
    apricorn: "orange-apricorn",
    id: "ilex-forest-orange-apricorn-2",
  }),
  ...makeBerryTree({
    x: 2,
    y: 33,
    berry: "sitrus-berry",
    id: "ilex-forest-sitrus-berry-1",
  }),
  ...makeBerryTree({
    x: 2,
    y: 31,
    berry: "sitrus-berry",
    id: "ilex-forest-ysitrus-berry-2",
  }),
  ...makeBerryTree({
    x: 3,
    y: 29,
    berry: "sitrus-berry",
    id: "ilex-forest-ositrus-berry-3",
  }),
  ...makeBerryTree({
    x: 40,
    y: 4,
    berry: "lum-berry",
    id: "ilex-forest-ylum-berry-2",
  }),
  ...makeBerryTree({
    x: 42,
    y: 6,
    berry: "lum-berry",
    id: "ilex-forest-olum-berry-3",
  }),
  ...makeBerryTree({
    x: 41,
    y: 33,
    berry: "hondew-berry",
    id: "ilex-forest-hondew-berry-1",
  }),
  ...makeBerryTree({
    x: 39,
    y: 34,
    berry: "hondew-berry",
    id: "ilex-forest-yhondew-berry-2",
  }),
  ...makeBerryTree({
    x: 37,
    y: 34,
    berry: "hondew-berry",
    id: "ilex-forest-ohondew-berry-3",
  }),
  {
    type: "POKEMON",
    dexId: 251,
    x: 5,
    y: 4,
    orientation: "RIGHT",
    conditionFunction: (s) => !occupantHandled(s, "ilex-celebi"),
    id: "ilex-celebi",
    dialogue: [
      "Celebi looks grateful",
      "You get the feeling this is not your last meeting",
    ],
  },
  ...ilexDragoniteTaxi,
  {
    type: "TRAINER",
    id: "Galactic Grunt Karen",
    x: 9,
    y: 41,
    orientation: "DOWN",
    team: (s) => [
      makeChallengerPokemon({
        name: "stunky",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
      makeChallengerPokemon({
        name: "staravia",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
      makeChallengerPokemon({
        name: "gothorita",
        xp: getHighestXpOnTeam(s.pokemon) * 0.9,
      }),
    ],
    sprite: SpriteEnum.galacticFemale,
    unhandledMessage: ["Our Boss is looking for something deep in the forest"],
    conditionFunction: (s) => !occupantHandled(s, "Galactic Grunt Karen"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Galactic Grunt Padma",
    x: 23,
    y: 39,
    orientation: "LEFT",
    team: (s) => [
      makeChallengerPokemon({
        name: "kadabra",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
      makeChallengerPokemon({
        name: "skuntank",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
    ],
    sprite: SpriteEnum.galacticFemale,
    unhandledMessage: ["I think this is about a legendary pokemon"],
    conditionFunction: (s) => !occupantHandled(s, "Galactic Grunt Padma"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Galactic Grunt Charles",
    x: 30,
    y: 34,
    orientation: "RIGHT",
    team: (s) => [
      makeChallengerPokemon({
        name: "bibarel",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
      makeChallengerPokemon({
        name: "chatot",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
      makeChallengerPokemon({
        name: "bronzor",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
      makeChallengerPokemon({
        name: "tangrowth",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
    ],
    sprite: SpriteEnum.galacticMale,
    unhandledMessage: ["I hate the forest"],
    conditionFunction: (s) => !occupantHandled(s, "Galactic Grunt Charles"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Galactic Grunt Pam",
    x: 7,
    y: 27,
    orientation: "DOWN",
    team: (s) => [
      makeChallengerPokemon({
        name: "staraptor",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
    ],
    sprite: SpriteEnum.galacticFemale,
    unhandledMessage: ["This is not worth it", "for 10 bucks per hour"],
    conditionFunction: (s) => !occupantHandled(s, "Galactic Grunt Pam"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "CHEST",
    id: "galactic-chest",
    conditionFunction: () => true,
    x: 8,
    y: 27,
    contents: {
      "hyper-potion": 5,
      "full-heal": 5,
      elixir: 5,
      "super-repel": 1,
      "ultra-ball": 10,
    },
  },
  {
    type: "TRAINER",
    id: "Galactic Grunt Jonas",
    x: 45,
    y: 24,
    orientation: "DOWN",
    team: (s) => [
      makeChallengerPokemon({
        name: "yanma",
        xp: getHighestXpOnTeam(s.pokemon) * 0.85,
      }),
      makeChallengerPokemon({
        name: "froslass",
        xp: getHighestXpOnTeam(s.pokemon) * 0.85,
      }),
      makeChallengerPokemon({
        name: "bronzor",
        xp: getHighestXpOnTeam(s.pokemon) * 0.85,
      }),
    ],
    sprite: SpriteEnum.galacticMale,
    unhandledMessage: ["I wish we were allowed different hairstyles"],
    conditionFunction: (s) => !occupantHandled(s, "Galactic Grunt Jonas"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Galactic Grunt Jason",
    x: 39,
    y: 12,
    orientation: "LEFT",
    team: (s) => [
      makeChallengerPokemon({
        name: "purugly",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
    ],
    sprite: SpriteEnum.galacticMale,
    unhandledMessage: ["I stepped into something sticky"],
    conditionFunction: (s) => !occupantHandled(s, "Galactic Grunt Jason"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Galactic Grunt Gertrud",
    x: 21,
    y: 13,
    orientation: "DOWN",
    team: (s) => [
      makeChallengerPokemon({
        name: "stunky",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
    ],
    sprite: SpriteEnum.galacticFemale,
    unhandledMessage: ["I better get a promotion for this"],
    conditionFunction: (s) => !occupantHandled(s, "Galactic Grunt Gertrud"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Galactic Grunt Fred",
    x: 12,
    y: 4,
    orientation: "LEFT",
    team: (s) => [
      makeChallengerPokemon({
        name: "yanmega",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
    ],
    sprite: SpriteEnum.galacticMale,
    unhandledMessage: ["I can almost see the pokemon"],
    conditionFunction: (s) => !occupantHandled(s, "Galactic Grunt Fred"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Galactic Grunt Frieda",
    x: 13,
    y: 4,
    orientation: "LEFT",
    team: (s) => [
      makeChallengerPokemon({
        name: "tauros",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
      makeChallengerPokemon({
        name: "delcatty",
        xp: getHighestXpOnTeam(s.pokemon) * 0.8,
      }),
    ],
    sprite: SpriteEnum.galacticFemale,
    unhandledMessage: ["Fred, duck down", "I wanna see"],
    conditionFunction: (s) => !occupantHandled(s, "Galactic Grunt Frieda"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Galactic Grunt Garth",
    x: 12,
    y: 5,
    orientation: "UP",
    team: (s) => [
      makeChallengerPokemon({
        name: "magmortar",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
    ],
    sprite: SpriteEnum.galacticMale,
    unhandledMessage: ["I cant wait to burn this stupid forest down"],
    conditionFunction: (s) => !occupantHandled(s, "Galactic Grunt Garth"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
  {
    type: "TRAINER",
    id: "Galactic Admin Mars",
    x: 11,
    y: 4,
    orientation: "LEFT",
    team: (s) => [
      makeChallengerPokemon({
        name: "magmortar",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
      makeChallengerPokemon({
        name: "froslass",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
      makeChallengerPokemon({
        name: "electivire",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
      makeChallengerPokemon({
        name: "yanmega",
        xp: getHighestXpOnTeam(s.pokemon),
      }),
    ],
    sprite: SpriteEnum.mars,
    unhandledMessage: [
      "I must make the master proud",
      "lets get that rare pokemon",
    ],
    conditionFunction: (s) => !occupantHandled(s, "Galactic Admin Mars"),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
  },
];
