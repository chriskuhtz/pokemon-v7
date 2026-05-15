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

const clairBase: Omit<
  OverworldNpc,
  "unhandledMessage" | "conditionFunction" | "id"
> = {
  x: 15,
  y: 35,
  orientation: "DOWN",
  type: "NPC",
  sprite: SpriteEnum.clair,
};

export const clairsKingdra: OverworldPokemon = {
  type: "POKEMON",
  dialogue: ["drat drat"],
  x: 15,
  y: 36,
  orientation: "LEFT",
  dexId: 230,
  id: "clairs-kingdra",
  conditionFunction: (s) =>
    s.campUpgrades["invite dragon pokemon expert clair"] &&
    s.quests["reach max. friendship with a dragon pokemon"] !== "COLLECTED",
};

export const clairLine: Occupant[] = [
  {
    ...clairBase,
    id: "clair_1",

    unhandledMessage: [
      "I am Clair, Gym Leader of Blackthorn Town",
      "Just like my favorite dragon pokemon",
      "I dont just consider anyone my friend",
      "But if a dragon pokemon trusts you",
      "so will I",
    ],
    handledMessage: ["Dragon pokemon are fierce and majestic"],
    quest: "reach max. friendship with a dragon pokemon",
    conditionFunction: (s) =>
      s.campUpgrades["invite dragon pokemon expert clair"] &&
      s.quests["reach max. friendship with a dragon pokemon"] !== "COLLECTED",
  },
];

const clairTeam = (s: SaveFile) => {
  const xp = getHighestXpOnTeam(s.pokemon);
  const xpWithVariance = () => (0.7 + Math.random() * 0.3) * xp;
  return [
    makeChallengerPokemon({
      name: "druddigon",
      xp: xpWithVariance(),
      heldItemName: "haban-berry",
    }),
    makeChallengerPokemon({
      name: "dragonair",
      xp: xpWithVariance(),
      heldItemName: "roseli-berry",
    }),
    makeChallengerPokemon({
      name: "haxorus",
      xp: xpWithVariance(),
      heldItemName: "haban-berry",
    }),
    makeChallengerPokemon({
      name: "seadra",
      xp: xpWithVariance(),
      heldItemName: "wacan-berry",
    }),
    makeChallengerPokemon({
      name: "kingdra",
      xp: xpWithVariance(),
      heldItemName: "roseli-berry",
    }),
    makeChallengerPokemon({
      name: "salamence",
      xp: xpWithVariance(),
      heldItemName: "roseli-berry",
    }),
  ];
};
export const clairId = "Gym Leader Clair";
export const trainerClair: OverworldTrainer = {
  x: 27,
  y: 2,
  orientation: "DOWN",
  unhandledMessage: [],
  type: "TRAINER",
  id: clairId,
  conditionFunction: (s) =>
    s.quests["defeat clair"] === "ACTIVE" && !occupantHandled(s, clairId),
  team: clairTeam,
  sprite: SpriteEnum.clair,
  profilePicture:
    "https://archives.bulbagarden.net/media/upload/f/fc/VSClair.png",
  battleTeamConfig: {
    assignGender: true,
    assignHeldItem: false,
    assignLearnsetMoves: true,
    assignNaturalAbility: true,
  },
};
