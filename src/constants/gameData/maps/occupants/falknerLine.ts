import { makeChallengerPokemon } from "../../../../functions/makeChallengerPokemon";
import {
  Occupant,
  OverworldNpc,
  OverworldPokemon,
  OverworldTrainer,
} from "../../../../interfaces/Occupant";
import { SpriteEnum } from "../../../../interfaces/SpriteEnum";

import { getHighestXpOnTeam } from "../../../../functions/getHighestXpOnTeam";
import { occupantHandled } from "../../../../functions/occupantHandled";
import { SaveFile } from "../../../../interfaces/SaveFile";

const falknerBase: Omit<
  OverworldNpc,
  "unhandledMessage" | "conditionFunction" | "id"
> = {
  x: 11,
  y: 23,
  orientation: "RIGHT",
  type: "NPC",
  sprite: SpriteEnum.falkner,
};

export const falknersHootHoot: OverworldPokemon = {
  type: "POKEMON",
  dialogue: ["shoohoo"],
  x: 10,
  y: 22,
  orientation: "RIGHT",
  dexId: 163,
  id: "falkners-noctowl",
  conditionFunction: (s) =>
    s.campUpgrades["invite flying pokemon expert falkner"] &&
    s.quests["catch the legendary bird of ice"] !== "COLLECTED",
};
export const falknerLine: Occupant[] = [
  {
    ...falknerBase,
    id: "falkner_1",

    unhandledMessage: [
      "My name is falkner, from violet city",
      "My favorite pokemon are flying types",
      "they soar through the air with complete freedom",
      "lets find out more about them",
    ],
    handledMessage: ["Weaker flying pokemon can be shy"],
    quest: "catch some local flying pokemon",
    conditionFunction: (s) =>
      s.campUpgrades["invite flying pokemon expert falkner"] &&
      s.quests["catch some local flying pokemon"] !== "COLLECTED",
  },
  {
    ...falknerBase,
    id: "falkner_2",

    unhandledMessage: [
      "Great work",
      "I think some of these pokemon can evolve",
    ],
    handledMessage: ["I wish i could fly"],
    quest: "evolve some local flying pokemon",
    conditionFunction: (s) =>
      s.quests["catch some local flying pokemon"] === "COLLECTED" &&
      s.quests["evolve some local flying pokemon"] !== "COLLECTED",
  },
  {
    ...falknerBase,
    id: "falkner_3",
    unhandledMessage: [
      "Pidgeotto and Staravia can both evolve one more time",
      "can you train one of them to their final form?",
    ],
    handledMessage: ["I wish i could fly"],
    quest: "evolve a flying pokemon to its final stage",
    conditionFunction: (s) =>
      s.quests["evolve some local flying pokemon"] === "COLLECTED" &&
      s.quests["evolve a flying pokemon to its final stage"] !== "COLLECTED",
  },
  {
    ...falknerBase,
    id: "falkner_4",
    unhandledMessage: [
      "Now I believe you are strong enough for a secret",
      "I came here to find a legendary flying pokemon",
      "The myths refer to it as the bird of ice",
      "More modern sources say,",
      "That it sometimes reveals itself to strong flying trainers",
    ],
    handledMessage: [
      "Now I believe you are strong enough for a secret",
      "I came here to find a legendary flying pokemon",
      "The myths refer to it as the bird of ice",
      "More modern sources say,",
      "That it sometimes reveals itself to strong flying trainers",
    ],
    quest: "catch the legendary bird of ice",
    conditionFunction: (s) =>
      s.quests["evolve some local flying pokemon"] === "COLLECTED" &&
      s.quests["evolve a flying pokemon to its final stage"] === "COLLECTED" &&
      s.quests["catch the legendary bird of ice"] !== "COLLECTED",
  },
];

const falknerTeam = (s: SaveFile) => {
  const xp = getHighestXpOnTeam(s.pokemon);
  const xpWithVariance = () => (0.7 + Math.random() * 0.3) * xp;
  return [
    makeChallengerPokemon({
      name: "noctowl",
      xp: xpWithVariance(),
      heldItemName: "sitrus-berry",
    }),
    makeChallengerPokemon({
      name: "pidgeot",
      xp: xpWithVariance(),
      heldItemName: "leftovers",
    }),
    makeChallengerPokemon({
      name: "braviary",
      xp: xpWithVariance(),
      heldItemName: "sharp-beak",
    }),
    makeChallengerPokemon({
      name: "skarmory",
      xp: xpWithVariance(),
      heldItemName: "metal-coat",
    }),
    makeChallengerPokemon({
      name: "gliscor",
      xp: xpWithVariance(),
      heldItemName: "razor-fang",
    }),
  ];
};
export const falknerId = "Gym Leader Falkner";
export const trainerFalkner: OverworldTrainer = {
  x: 38,
  y: 4,
  orientation: "DOWN",
  unhandledMessage: ["You cannot match the power of my flying pokemon"],
  type: "TRAINER",
  id: falknerId,
  conditionFunction: (s) =>
    s.quests["defeat falkner"] === "ACTIVE" && !occupantHandled(s, falknerId),
  team: falknerTeam,
  sprite: SpriteEnum.falkner,
  profilePicture:
    "https://archives.bulbagarden.net/media/upload/5/5a/VSFalkner.png",
  battleTeamConfig: {
    assignGender: true,
    assignHeldItem: false,
    assignLearnsetMoves: true,
    assignNaturalAbility: true,
  },
};
