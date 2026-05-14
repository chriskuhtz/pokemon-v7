import { ArrayHelpers } from "../../../../functions/ArrayHelpers";
import { getHighestXpOnTeam } from "../../../../functions/getHighestXpOnTeam";
import { getPercentageEVfromXp } from "../../../../functions/getPercentageEVfromXp";
import { makeChallengerPokemon } from "../../../../functions/makeChallengerPokemon";
import { occupantHandled } from "../../../../functions/occupantHandled";
import { Occupant, OverworldTrainer } from "../../../../interfaces/Occupant";

import { OwnedPokemon } from "../../../../interfaces/OwnedPokemon";
import { SaveFile } from "../../../../interfaces/SaveFile";
import { SpriteEnum } from "../../../../interfaces/SpriteEnum";
import { EmptyStatObject } from "../../../../interfaces/StatObject";
import { trickXP } from "../../../baseConstants";

export const barryId = "trainer barry";
const barryTeam = (s: SaveFile): OwnedPokemon[] => {
  const xp = getHighestXpOnTeam(s.pokemon);
  const xpWithVariance = () => (0.7 + Math.random() * 0.3) * xp;

  const chimchar = makeChallengerPokemon({
    name: "chimchar",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "iron-fist",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "passho-berry",
    firstMove: { name: "bulk-up", usedPP: 0 },
    secondMove: { name: "mach-punch", usedPP: 0 },
    thirdMove: { name: "fire-punch", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const monferno = makeChallengerPokemon({
    name: "monferno",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "moxie",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "passho-berry",
    firstMove: { name: "bulk-up", usedPP: 0 },
    secondMove: { name: "mach-punch", usedPP: 0 },
    thirdMove: { name: "fire-punch", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const infernape = makeChallengerPokemon({
    name: "infernape",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "iron-fist",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "leftovers",
    firstMove: { name: "bulk-up", usedPP: 0 },
    secondMove: { name: "drain-punch", usedPP: 0 },
    thirdMove: { name: "fire-punch", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const starly = makeChallengerPokemon({
    name: "starly",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "big-pecks",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "sharp-beak",
    firstMove: { name: "aerial-ace", usedPP: 0 },
    secondMove: { name: "quick-attack", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const staravia = makeChallengerPokemon({
    name: "staravia",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "intimidate",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "sharp-beak",
    firstMove: { name: "aerial-ace", usedPP: 0 },
    secondMove: { name: "quick-attack", usedPP: 0 },
    thirdMove: { name: "brave-bird", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const staraptor = makeChallengerPokemon({
    name: "staraptor",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "reckless",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "sharp-beak",
    firstMove: { name: "double-edge", usedPP: 0 },
    secondMove: { name: "quick-attack", usedPP: 0 },
    thirdMove: { name: "brave-bird", usedPP: 0 },
    fourthMove: { name: "flare-blitz", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const stunky = makeChallengerPokemon({
    name: "stunky",
    xp: xpWithVariance(),
    nature: "bold",
    ability: "own-tempo",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "black-sludge",
    firstMove: { name: "toxic", usedPP: 0 },
    secondMove: { name: "acid-armor", usedPP: 0 },
    thirdMove: { name: "sludge", usedPP: 0 },
    fourthMove: { name: "feint-attack", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      "special-defense": getPercentageEVfromXp(xp),
    },
  });
  const skuntank = makeChallengerPokemon({
    name: "skuntank",
    xp: xpWithVariance(),
    nature: "bold",
    ability: "own-tempo",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "black-sludge",
    firstMove: { name: "toxic", usedPP: 0 },
    secondMove: { name: "acid-armor", usedPP: 0 },
    thirdMove: { name: "sludge-bomb", usedPP: 0 },
    fourthMove: { name: "night-slash", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      "special-defense": getPercentageEVfromXp(xp),
    },
  });
  const luxio = makeChallengerPokemon({
    name: "luxio",
    xp: xpWithVariance(),
    nature: "lonely",
    ability: "strong-jaw",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "magnet",
    firstMove: { name: "bite", usedPP: 0 },
    secondMove: { name: "thunder-fang", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const luxray = makeChallengerPokemon({
    name: "luxray",
    xp: xpWithVariance(),
    nature: "lonely",
    ability: "strong-jaw",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "magnet",
    firstMove: { name: "crunch", usedPP: 0 },
    secondMove: { name: "thunder-fang", usedPP: 0 },
    thirdMove: { name: "ice-fang", usedPP: 0 },
    fourthMove: { name: "poison-fang", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const snover = makeChallengerPokemon({
    name: "snover",
    xp: xpWithVariance(),
    nature: "sassy",
    ability: "soundproof",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "big-root",
    firstMove: { name: "ingrain", usedPP: 0 },
    secondMove: { name: "mega-drain", usedPP: 0 },
    thirdMove: { name: "icy-wind", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-defense": getPercentageEVfromXp(xp),
      defense: getPercentageEVfromXp(xp),
    },
  });
  const abomasnow = makeChallengerPokemon({
    name: "abomasnow",
    xp: xpWithVariance(),
    nature: "sassy",
    ability: "soundproof",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "big-root",
    firstMove: { name: "ingrain", usedPP: 0 },
    secondMove: { name: "giga-drain", usedPP: 0 },
    thirdMove: { name: "blizzard", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-defense": getPercentageEVfromXp(xp),
      defense: getPercentageEVfromXp(xp),
    },
  });
  const yanmega = makeChallengerPokemon({
    name: "yanmega",
    xp: xpWithVariance(),
    nature: "sassy",
    ability: "tinted-lens",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "expert-belt",
    firstMove: { name: "tail-glow", usedPP: 0 },
    secondMove: { name: "aeroblast", usedPP: 0 },
    thirdMove: { name: "signal-beam", usedPP: 0 },
    fourthMove: { name: "ancient-power", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-attack": getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const rampardos = makeChallengerPokemon({
    name: "rampardos",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "rock-head",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "expert-belt",
    firstMove: { name: "head-smash", usedPP: 0 },
    secondMove: { name: "double-edge", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const mismagius = makeChallengerPokemon({
    name: "mismagius",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "moody",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "expert-belt",
    firstMove: { name: "magical-leaf", usedPP: 0 },
    secondMove: { name: "psychic", usedPP: 0 },
    thirdMove: { name: "shadow-ball", usedPP: 0 },
    fourthMove: { name: "power-gem", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-attack": getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const torterra = makeChallengerPokemon({
    name: "torterra",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "steadfast",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "big-root",
    firstMove: { name: "earthquake", usedPP: 0 },
    secondMove: { name: "power-whip", usedPP: 0 },
    thirdMove: { name: "ingrain", usedPP: 0 },
    fourthMove: { name: "bulk-up", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-defense": getPercentageEVfromXp(xp),
      defense: getPercentageEVfromXp(xp),
    },
  });
  const empoleon = makeChallengerPokemon({
    name: "empoleon",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "steadfast",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "metal-coat",
    firstMove: { name: "steel-wing", usedPP: 0 },
    secondMove: { name: "swords-dance", usedPP: 0 },
    thirdMove: { name: "drill-peck", usedPP: 0 },
    fourthMove: { name: "waterfall", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });

  if (xp < 8000) {
    return [chimchar, starly, snover];
  }
  if (xp < 46656) {
    return [monferno, staravia, stunky, luxio, snover];
  }

  const possibilities = [
    infernape,
    staraptor,
    skuntank,
    luxray,
    abomasnow,
    yanmega,
    rampardos,
    mismagius,
    torterra,
    empoleon,
  ];
  if (xp === trickXP) {
    return possibilities;
  }
  const team: OwnedPokemon[] = [];

  const numberOfMembers = () => {
    if (xp < 50 * 50 * 50) {
      return 3;
    }
    if (xp < 60 * 60 * 60) {
      return 4;
    }
    if (xp < 70 * 70 * 70) {
      return 5;
    }

    return 6;
  };
  for (let i = 0; i < numberOfMembers(); i++) {
    team.push(
      ArrayHelpers.getRandomEntry(
        possibilities.filter((p) => team.every((t) => t.name !== p.name)),
      ),
    );
  }

  return team;
};

export const barry: OverworldTrainer = {
  type: "TRAINER",
  x: 0,
  y: 0,
  id: barryId,
  conditionFunction: (s) => !occupantHandled(s, barryId),
  orientation: "DOWN",
  sprite: SpriteEnum.barry,
  unhandledMessage: [
    "Yo, good to meet you",
    "My Name is Barry, i am a fellow research assistant",
    "So i am travelling to a different route every day",
    "Lets battle every time we meet each other in the wild",
    "That way, we will grow stronger together",
  ],
  team: barryTeam,
  battleTeamConfig: {
    assignGender: false,
    assignHeldItem: false,
    assignLearnsetMoves: false,
    assignNaturalAbility: false,
  },
};

export const barryN1: Occupant = {
  ...barry,
  x: 12,
  y: 40,
  conditionFunction: (s) => !occupantHandled(s, barryId),
};
export const barryN1E1: Occupant = {
  ...barry,
  x: 14,
  y: 22,
  conditionFunction: (s) => !occupantHandled(s, barryId),
};
export const barryE1: Occupant = {
  ...barry,
  x: 10,
  y: 29,
  conditionFunction: (s) => !occupantHandled(s, barryId),
};
export const barryS1E1: Occupant = {
  ...barry,
  x: 25,
  y: 25,
  conditionFunction: (s) => !occupantHandled(s, barryId),
};
export const barryS1: Occupant = {
  ...barry,
  x: 4,
  y: 29,
  orientation: "RIGHT",
  conditionFunction: (s) => !occupantHandled(s, barryId),
};
export const barryS1W1: Occupant = {
  ...barry,
  x: 29,
  y: 6,
  conditionFunction: (s) => !occupantHandled(s, barryId),
};
export const barryW1: Occupant = {
  ...barry,
  x: 15,
  y: 46,
  conditionFunction: (s) => !occupantHandled(s, barryId),
};
