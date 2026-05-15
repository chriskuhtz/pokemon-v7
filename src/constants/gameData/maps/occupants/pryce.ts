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

const pryceBase: Omit<
  OverworldNpc,
  "unhandledMessage" | "conditionFunction" | "id"
> = {
  x: 13,
  y: 26,
  orientation: "DOWN",
  type: "NPC",
  sprite: SpriteEnum.pryce,
};

export const prycesMamoswine: OverworldPokemon = {
  type: "POKEMON",
  dialogue: ["grrruuum"],
  x: 12,
  y: 26,
  orientation: "DOWN",
  dexId: 473,
  id: "pryces-mamoswine",
  conditionFunction: (s) =>
    s.campUpgrades["invite ice pokemon expert pryce"] &&
    s.quests["maximize the effort values of an ice pokemon"] !== "COLLECTED",
};

export const pryceLine: Occupant[] = [
  {
    ...pryceBase,
    id: "pryce_1",

    unhandledMessage: [
      "In the freezing cold",
      "You and your Pokemon need to trust each other",
      "and work as a team",
    ],
    handledMessage: [
      "When you work together with your pokemon, you will both grow stronger",
    ],
    quest: "maximize the effort values of an ice pokemon",
    conditionFunction: (s) =>
      s.campUpgrades["invite ice pokemon expert pryce"] &&
      s.quests["maximize the effort values of an ice pokemon"] !== "COLLECTED",
  },
];

const pryceTeam = (s: SaveFile) => {
  const xp = getHighestXpOnTeam(s.pokemon);
  const xpWithVariance = () => (0.7 + Math.random() * 0.3) * xp;
  return [
    makeChallengerPokemon({
      name: "avalugg",
      xp: xpWithVariance(),
      heldItemName: "babiri-berry",
    }),
    makeChallengerPokemon({
      name: "weavile",
      xp: xpWithVariance(),
      heldItemName: "chople-berry",
    }),
    makeChallengerPokemon({
      name: "dewgong",
      xp: xpWithVariance(),
      heldItemName: "wacan-berry",
    }),
    makeChallengerPokemon({
      name: "delibird",
      xp: xpWithVariance(),
      heldItemName: "charti-berry",
    }),
    makeChallengerPokemon({
      name: "mamoswine",
      xp: xpWithVariance(),
      heldItemName: "charti-berry",
    }),
    makeChallengerPokemon({
      name: "glaceon",
      xp: xpWithVariance(),
      heldItemName: "never-melt-ice",
    }),
  ];
};
export const pryceId = "Gym Leader Pryce";
export const trainerPryce: OverworldTrainer = {
  x: 33,
  y: 35,
  orientation: "DOWN",
  unhandledMessage: ["We are never more comfortable", "than in the snow"],
  type: "TRAINER",
  id: pryceId,
  conditionFunction: (s) =>
    s.quests["defeat pryce"] === "ACTIVE" && !occupantHandled(s, pryceId),
  team: pryceTeam,
  sprite: SpriteEnum.pryce,
  profilePicture:
    "https://archives.bulbagarden.net/media/upload/4/4f/VSPryce.png",
  battleTeamConfig: {
    assignGender: true,
    assignHeldItem: false,
    assignLearnsetMoves: true,
    assignNaturalAbility: true,
  },
};
