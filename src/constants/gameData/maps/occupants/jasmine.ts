import { getHighestXpOnTeam } from "../../../../functions/getHighestXpOnTeam";
import { makeChallengerPokemon } from "../../../../functions/makeChallengerPokemon";
import { occupantHandled } from "../../../../functions/occupantHandled";
import {
  Occupant,
  OverworldNpc,
  OverworldPokemon,
  OverworldTrainer,
} from "../../../../interfaces/Occupant";
import { SaveFile } from "../../../../interfaces/SaveFile";
import { SpriteEnum } from "../../../../interfaces/SpriteEnum";

const jasmineBase: Omit<
  OverworldNpc,
  "unhandledMessage" | "conditionFunction" | "id"
> = {
  x: 27,
  y: 6,
  orientation: "DOWN",
  type: "NPC",
  sprite: SpriteEnum.jasmine,
};

export const jasminesAron: OverworldPokemon = {
  type: "POKEMON",
  dialogue: ["a,", "a,", "ron"],
  x: 26,
  y: 6,
  orientation: "DOWN",
  dexId: 304,
  id: "jasmines-aron",
  conditionFunction: (s) =>
    s.campUpgrades["invite steel pokemon expert jasmine"] &&
    s.quests["catch an exceptional steel pokemon for jasmine"] !== "COLLECTED",
};

export const jasmineLine: Occupant[] = [
  {
    ...jasmineBase,
    id: "jasmine_1",

    unhandledMessage: [
      "Nice to meet you",
      "my name is jasmine",
      "the elegance of all steel pokemon fascinates me",
      "but some specimen are truly exceptional",
    ],
    handledMessage: [
      "Steel pokemon combine sharpness and toughness",
      "like a good blade",
    ],
    quest: "catch an exceptional steel pokemon for jasmine",
    conditionFunction: (s) =>
      s.campUpgrades["invite steel pokemon expert jasmine"] &&
      s.quests["catch an exceptional steel pokemon for jasmine"] !==
        "COLLECTED",
  },
];

const jasmineTeam = (s: SaveFile) => {
  const xp = getHighestXpOnTeam(s.pokemon);
  const xpWithVariance = () => (0.7 + Math.random() * 0.3) * xp;
  return [
    makeChallengerPokemon({
      name: "steelix",
      firstMove: { name: "earthquake", usedPP: 0 },
      xp: xpWithVariance(),
      heldItemName: "occa-berry",
    }),
    makeChallengerPokemon({
      name: "skarmory",
      xp: xpWithVariance(),
      heldItemName: "occa-berry",
    }),
    makeChallengerPokemon({
      name: "scizor",
      xp: xpWithVariance(),
      heldItemName: "metal-coat",
    }),
    makeChallengerPokemon({
      name: "magnezone",
      xp: xpWithVariance(),
      heldItemName: "magnet",
    }),
    makeChallengerPokemon({
      name: "bisharp",
      xp: xpWithVariance(),
      heldItemName: "black-glasses",
    }),
    makeChallengerPokemon({
      name: "aggron",
      xp: xpWithVariance(),
      heldItemName: "rock-gem",
    }),
  ];
};
export const jasmineId = "Gym Leader Jasmine";
export const trainerJasmine: OverworldTrainer = {
  x: 23,
  y: 49,
  orientation: "UP",
  unhandledMessage: ["This wilderness is really fascinating"],
  type: "TRAINER",
  id: jasmineId,
  conditionFunction: (s) =>
    s.quests["defeat jasmine"] === "ACTIVE" && !occupantHandled(s, jasmineId),
  team: jasmineTeam,
  sprite: SpriteEnum.jasmine,
  profilePicture:
    "https://archives.bulbagarden.net/media/upload/f/f2/VSJasmine.png",
  battleTeamConfig: {
    assignGender: true,
    assignHeldItem: false,
    assignLearnsetMoves: true,
    assignNaturalAbility: true,
  },
};
