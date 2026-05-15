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

const whitneyBase: Omit<
  OverworldNpc,
  "unhandledMessage" | "conditionFunction" | "id"
> = {
  x: 29,
  y: 5,
  orientation: "DOWN",
  type: "NPC",
  sprite: SpriteEnum.whitney,
};

export const whitneysClefairy: OverworldPokemon = {
  type: "POKEMON",
  dialogue: ["clef clef clef"],
  x: 28,
  y: 5,
  orientation: "DOWN",
  dexId: 35,
  id: "whitneys-clefairy",
  conditionFunction: (s) =>
    s.campUpgrades["invite normal pokemon expert whitney"] &&
    s.quests["catch whitney's favorite cute pokemon"] !== "COLLECTED",
};

export const whitneyLine: Occupant[] = [
  {
    ...whitneyBase,
    id: "whitney_1",
    unhandledMessage: [
      "Hiyaaa, i'm Whitney",
      "...",
      "Like, Pokemon are just the cutest",
      "Dont you think?",
    ],
    handledMessage: [
      "Clefairy is the cutest...",
      "...Or Jigglypuff",
      "...or maybe a pikachu in a pretty dress?",
      "...cant forget about vulpix",
    ],
    quest: "catch whitney's favorite cute pokemon",
    conditionFunction: (s) =>
      s.campUpgrades["invite normal pokemon expert whitney"] &&
      s.quests["catch whitney's favorite cute pokemon"] !== "COLLECTED",
  },
];

const whitneyTeam = (s: SaveFile) => {
  const xp = getHighestXpOnTeam(s.pokemon);
  const xpWithVariance = () => (0.7 + Math.random() * 0.3) * xp;
  return [
    makeChallengerPokemon({
      name: "miltank",
      xp: xpWithVariance(),
      heldItemName: "sitrus-berry",
    }),
    makeChallengerPokemon({
      name: "wigglytuff",
      xp: xpWithVariance(),
      heldItemName: "sitrus-berry",
    }),
    makeChallengerPokemon({
      name: "clefable",
      xp: xpWithVariance(),
      heldItemName: "silk-scarf",
    }),
    makeChallengerPokemon({
      name: "raichu-alola",
      xp: xpWithVariance(),
      heldItemName: "twisted-spoon",
    }),
    makeChallengerPokemon({
      name: "ninetales-alola",
      xp: xpWithVariance(),
      heldItemName: "never-melt-ice",
    }),
  ];
};
export const whitneyId = "Gym Leader Whitney";
export const trainerWhitney: OverworldTrainer = {
  x: 13,
  y: 29,
  orientation: "DOWN",
  unhandledMessage: ["Everything is pink", "I love it"],
  type: "TRAINER",
  id: whitneyId,
  conditionFunction: (s) =>
    s.quests["defeat whitney"] === "ACTIVE" &&
    s.quests["investigate murasaki glades"] === "COLLECTED" &&
    !occupantHandled(s, whitneyId),
  team: whitneyTeam,
  sprite: SpriteEnum.whitney,
  profilePicture:
    "https://archives.bulbagarden.net/media/upload/2/27/VSWhitney.png",
  battleTeamConfig: {
    assignGender: true,
    assignHeldItem: false,
    assignLearnsetMoves: true,
    assignNaturalAbility: true,
  },
};
