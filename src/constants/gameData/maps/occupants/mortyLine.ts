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

const mortyBase: Omit<
  OverworldNpc,
  "unhandledMessage" | "conditionFunction" | "id"
> = {
  x: 36,
  y: 11,
  orientation: "LEFT",
  type: "NPC",
  sprite: SpriteEnum.morty,
};

export const mortysGengar: OverworldPokemon = {
  type: "POKEMON",
  dialogue: ["buuu"],
  x: 36,
  y: 12,
  orientation: "LEFT",
  dexId: 94,
  id: "mortys-gengar",
  conditionFunction: (s) =>
    s.campUpgrades["invite ghost expert morty"] &&
    s.quests["catch Haunter and Mightyena"] !== "COLLECTED",
};

export const mortyLine: Occupant[] = [
  {
    ...mortyBase,
    id: "morty_1",

    unhandledMessage: [
      "I am Morty, a Gym Leader from Johto",
      "I came here to investigate the paranormal",
      "can you help me",
    ],
    handledMessage: ["Ghosts are spooky, but also cool"],
    quest: "catch local dark and ghost pokemon",
    conditionFunction: (s) =>
      s.campUpgrades["invite ghost expert morty"] &&
      s.quests["catch local dark and ghost pokemon"] !== "COLLECTED",
  },
  {
    ...mortyBase,
    id: "morty_2",

    unhandledMessage: [
      "I have heard rumours",
      "about a very rare ghost pokemon,",
      "that is trapped in a ruin south of here",
      "Its a very odd tale",
      "A stone might be the key",
    ],
    handledMessage: ["Did you find the rare ghost pokemon?"],
    quest: "catch a spiritomb",
    conditionFunction: (s) =>
      s.campUpgrades["invite ghost expert morty"] &&
      s.quests["catch local dark and ghost pokemon"] === "COLLECTED" &&
      s.quests["catch a spiritomb"] !== "COLLECTED",
  },
  {
    ...mortyBase,
    id: "morty_3",

    unhandledMessage: [
      "Great work with spiritomb",
      "Can i ask you to find out more",
      "about the stronger ghost and dark pokemon of this region",
    ],
    handledMessage: [
      "If you complete this quest",
      "I might stop by the training field",
      "and we can see who´s the better trainer",
      "Keep in mind, i am a gym leader back home",
      "So dont feel too bad if you loose",
    ],
    quest: "catch Haunter and Mightyena",
    conditionFunction: (s) =>
      s.campUpgrades["invite ghost expert morty"] &&
      s.quests["catch a spiritomb"] === "COLLECTED" &&
      s.quests["catch Haunter and Mightyena"] !== "COLLECTED",
  },
];

const mortyTeam = (s: SaveFile) => {
  const xp = getHighestXpOnTeam(s.pokemon);
  const xpWithVariance = () => (0.7 + Math.random() * 0.3) * xp;
  return [
    makeChallengerPokemon({
      name: "trevenant",
      xp: xpWithVariance(),
      heldItemName: "sitrus-berry",
    }),
    makeChallengerPokemon({ name: "shedinja", xp: 125000 }),
    makeChallengerPokemon({
      name: "gengar",
      xp: xpWithVariance(),
      heldItemName: "black-sludge",
    }),
    makeChallengerPokemon({
      name: "mismagius",
      xp: xpWithVariance(),
      heldItemName: "twisted-spoon",
    }),
    makeChallengerPokemon({
      name: "aegislash-blade",
      xp: xpWithVariance(),
      heldItemName: "sitrus-berry",
    }),
    makeChallengerPokemon({
      name: "golurk",
      xp: xpWithVariance(),
      heldItemName: "sitrus-berry",
    }),
  ];
};
export const mortyId = "Gym Leader Morty";
export const trainerMorty: OverworldTrainer = {
  x: 29,
  y: 13,
  orientation: "RIGHT",
  unhandledMessage: ["...hmm", "There is creepy energy around here"],
  type: "TRAINER",
  id: mortyId,
  conditionFunction: (s) =>
    s.quests["defeat morty"] === "ACTIVE" && !occupantHandled(s, mortyId),
  team: mortyTeam,
  sprite: SpriteEnum.morty,
  profilePicture:
    "https://archives.bulbagarden.net/media/upload/0/04/VSMorty.png",
  battleTeamConfig: {
    assignGender: true,
    assignHeldItem: false,
    assignLearnsetMoves: true,
    assignNaturalAbility: true,
  },
};
