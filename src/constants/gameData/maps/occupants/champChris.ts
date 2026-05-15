import { getHighestXpOnTeam } from "../../../../functions/getHighestXpOnTeam";
import { getPercentageEVfromXp } from "../../../../functions/getPercentageEVfromXp";
import { makeChallengerPokemon } from "../../../../functions/makeChallengerPokemon";
import { occupantHandled } from "../../../../functions/occupantHandled";
import {
  Occupant,
  OverworldNpc,
  OverworldTrainer,
} from "../../../../interfaces/Occupant";

import { SaveFile } from "../../../../interfaces/SaveFile";
import { SpriteEnum } from "../../../../interfaces/SpriteEnum";
import { EmptyStatObject } from "../../../../interfaces/StatObject";

const chrisTeam = (s: SaveFile) => {
  const xp = Math.max(...[70 * 70 * 70, getHighestXpOnTeam(s.pokemon)]);
  return [
    makeChallengerPokemon({
      name: "ursaring",
      xp,
      nature: "adamant",
      ability: "huge-power",
      fixedAbility: true,
      happiness: 255,
      heldItemName: "chople-berry",
      firstMove: { name: "earthquake", usedPP: 0 },
      secondMove: { name: "bulk-up", usedPP: 0 },
      thirdMove: { name: "return", usedPP: 0 },
      fourthMove: { name: "low-kick", usedPP: 0 },
      effortValues: {
        ...EmptyStatObject,
        attack: getPercentageEVfromXp(xp),
        speed: getPercentageEVfromXp(xp),
      },
    }),
    makeChallengerPokemon({
      name: "dragonite",
      xp,
      nature: "adamant",
      ability: "multiscale",
      fixedAbility: true,
      heldItemName: "leftovers",
      firstMove: { name: "dragon-dance", usedPP: 0 },
      secondMove: { name: "extreme-speed", usedPP: 0 },
      thirdMove: { name: "dragon-claw", usedPP: 0 },
      fourthMove: { name: "ice-punch", usedPP: 0 },
      effortValues: {
        ...EmptyStatObject,
        attack: getPercentageEVfromXp(xp),
        speed: getPercentageEVfromXp(xp),
      },
    }),
    makeChallengerPokemon({
      name: "milotic",
      ability: "drizzle",
      fixedAbility: true,
      nature: "modest",
      firstMove: { name: "hydro-pump", usedPP: 0 },
      secondMove: { name: "tail-glow", usedPP: 0 },
      heldItemName: "mystic-water",
      xp,
      effortValues: {
        ...EmptyStatObject,
        "special-attack": getPercentageEVfromXp(xp),
        speed: getPercentageEVfromXp(xp),
      },
    }),
    makeChallengerPokemon({
      name: "scizor",
      ability: "technician",
      fixedAbility: true,
      nature: "adamant",
      heldItemName: "choice-band",
      firstMove: { name: "bullet-punch", usedPP: 0 },
      secondMove: { name: "x-scissor", usedPP: 0 },
      xp,
      effortValues: {
        ...EmptyStatObject,
        attack: getPercentageEVfromXp(xp),
        speed: getPercentageEVfromXp(xp),
      },
    }),
    makeChallengerPokemon({
      name: "arcanine-hisui",
      heldItemName: "heat-rock",
      ability: "drought",
      fixedAbility: true,
      nature: "adamant",
      xp,
      firstMove: { name: "dragon-dance", usedPP: 0 },
      secondMove: { name: "thunder-fang", usedPP: 0 },
      thirdMove: { name: "rock-slide", usedPP: 0 },
      fourthMove: { name: "fire-fang", usedPP: 0 },
      effortValues: {
        ...EmptyStatObject,
        attack: getPercentageEVfromXp(xp),
        speed: getPercentageEVfromXp(xp),
      },
    }),
    makeChallengerPokemon({
      name: "meganium",
      xp,
      heldItemName: "leftovers",
      ability: "solar-power",
      fixedAbility: true,
      nature: "calm",
      firstMove: { name: "solar-beam", usedPP: 0 },
      secondMove: { name: "synthesis", usedPP: 0 },
      thirdMove: { name: "ingrain", usedPP: 0 },
      fourthMove: { name: "cosmic-power", usedPP: 0 },
      effortValues: {
        ...EmptyStatObject,
        "special-defense": getPercentageEVfromXp(xp),
        "special-attack": getPercentageEVfromXp(xp),
      },
    }),
  ];
};

const chrisCondition = (s: SaveFile) => {
  return s.quests["defeat the pokemon league"] === "COLLECTED";
};

export const champChris: OverworldTrainer = {
  type: "TRAINER",
  x: 25,
  y: 18,
  orientation: "DOWN",
  sprite: SpriteEnum.red,
  id: "champ-chris",
  unhandledMessage: [".", "..", "..."],
  team: chrisTeam,
  battleTeamConfig: {
    assignGender: false,
    assignHeldItem: false,
    assignLearnsetMoves: false,
    assignNaturalAbility: false,
  },
  conditionFunction: (s) =>
    chrisCondition(s) && !occupantHandled(s, "champ-chris"),
};
const npcChris: OverworldNpc = {
  type: "NPC",
  x: 25,
  y: 18,
  orientation: "DOWN",
  sprite: SpriteEnum.red,
  id: "champ-chris",
  conditionFunction: (s) => !chrisCondition(s),
  unhandledMessage: [
    ".",
    "..",
    "...",
    "come back as a league champion",
    "and we'll have an even match",
  ],
};

export const rewardChris: OverworldNpc = {
  type: "NPC",
  x: 31,
  y: 14,
  orientation: "DOWN",
  sprite: SpriteEnum.red,
  id: "reward-chris",
  unhandledMessage: [
    "Thank you so much for playing my game",
    "if you know me, give me a call",
    "and we will put you into the game",
    "as a trainer with your victory team",
  ],
  conditionFunction: (s) => occupantHandled(s, "champ-chris"),
};
export const chris: Occupant[] = [champChris, npcChris];
