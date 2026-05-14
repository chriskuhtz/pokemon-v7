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

export const redId = "trainer red";
const redTeam = (s: SaveFile): OwnedPokemon[] => {
  const xp = getHighestXpOnTeam(s.pokemon);
  const xpWithVariance = () => (0.7 + Math.random() * 0.3) * xp;

  const charmander = makeChallengerPokemon({
    name: "charmander",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "blaze",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "charcoal",
    firstMove: { name: "flame-wheel", usedPP: 0 },
    secondMove: { name: "aerial-ace", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const bulbasaur = makeChallengerPokemon({
    name: "bulbasaur",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "overgrow",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "light-clay",
    firstMove: { name: "ingrain", usedPP: 0 },
    secondMove: { name: "light-screen", usedPP: 0 },
    thirdMove: { name: "sludge", usedPP: 0 },
    fourthMove: { name: "leaf-blade", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      "special-defense": getPercentageEVfromXp(xp),
    },
  });
  const squirtle = makeChallengerPokemon({
    name: "squirtle",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "rock-head",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "sitrus-berry",
    firstMove: { name: "double-edge", usedPP: 0 },
    secondMove: { name: "head-smash", usedPP: 0 },
    thirdMove: { name: "withdraw", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      attack: getPercentageEVfromXp(xp),
    },
  });
  const charmeleon = makeChallengerPokemon({
    name: "charmeleon",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "blaze",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "charcoal",
    firstMove: { name: "flame-wheel", usedPP: 0 },
    secondMove: { name: "aerial-ace", usedPP: 0 },
    thirdMove: { name: "dragon-dance", usedPP: 0 },
    fourthMove: { name: "slash", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const ivysaur = makeChallengerPokemon({
    name: "ivysaur",
    xp: xpWithVariance(),
    nature: "relaxed",
    ability: "overgrow",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "light-clay",
    firstMove: { name: "ingrain", usedPP: 0 },
    secondMove: { name: "light-screen", usedPP: 0 },
    thirdMove: { name: "sludge", usedPP: 0 },
    fourthMove: { name: "leaf-blade", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      "special-defense": getPercentageEVfromXp(xp),
    },
  });
  const wartortle = makeChallengerPokemon({
    name: "wartortle",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "rock-head",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "sitrus-berry",
    firstMove: { name: "double-edge", usedPP: 0 },
    secondMove: { name: "head-smash", usedPP: 0 },
    thirdMove: { name: "bulk-up", usedPP: 0 },
    fourthMove: { name: "waterfall", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      attack: getPercentageEVfromXp(xp),
    },
  });
  const charizard = makeChallengerPokemon({
    name: "charizard",
    xp: xpWithVariance(),
    nature: "modest",
    ability: "blaze",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "charcoal",
    firstMove: { name: "flamethrower", usedPP: 0 },
    secondMove: { name: "aeroblast", usedPP: 0 },
    thirdMove: { name: "tail-glow", usedPP: 0 },
    fourthMove: { name: "dragon-pulse", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const venusaur = makeChallengerPokemon({
    name: "venusaur",
    xp: xpWithVariance(),
    nature: "relaxed",
    ability: "overgrow",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "light-clay",
    firstMove: { name: "ingrain", usedPP: 0 },
    secondMove: { name: "light-screen", usedPP: 0 },
    thirdMove: { name: "sludge-bomb", usedPP: 0 },
    fourthMove: { name: "leaf-blade", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      "special-defense": getPercentageEVfromXp(xp),
    },
  });
  const blastoise = makeChallengerPokemon({
    name: "blastoise",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "rock-head",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "sitrus-berry",
    firstMove: { name: "double-edge", usedPP: 0 },
    secondMove: { name: "head-smash", usedPP: 0 },
    thirdMove: { name: "bulk-up", usedPP: 0 },
    fourthMove: { name: "waterfall", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      attack: getPercentageEVfromXp(xp),
    },
  });
  const tauros = makeChallengerPokemon({
    name: "tauros",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "moxie",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "choice-band",
    firstMove: { name: "headbutt", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      speed: getPercentageEVfromXp(xp),
      attack: getPercentageEVfromXp(xp),
    },
  });
  const dragonite = makeChallengerPokemon({
    name: "dragonite",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "hospitality",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "leftovers",
    firstMove: { name: "dragon-pulse", usedPP: 0 },
    secondMove: { name: "reflect", usedPP: 0 },
    thirdMove: { name: "calm-mind", usedPP: 0 },
    fourthMove: { name: "recover", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      speed: getPercentageEVfromXp(xp),
      "special-attack": getPercentageEVfromXp(xp),
    },
  });

  const machamp = makeChallengerPokemon({
    name: "machamp",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "iron-fist",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "black-belt",
    firstMove: { name: "bulk-up", usedPP: 0 },
    secondMove: { name: "thunder-punch", usedPP: 0 },
    thirdMove: { name: "drain-punch", usedPP: 0 },
    fourthMove: { name: "mach-punch", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      attack: getPercentageEVfromXp(xp),
    },
  });
  const alakazam = makeChallengerPokemon({
    name: "alakazam",
    xp: xpWithVariance(),
    nature: "modest",
    ability: "serene-grace",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "twisted-spoon",
    firstMove: { name: "extrasensory", usedPP: 0 },
    secondMove: { name: "calm-mind", usedPP: 0 },
    thirdMove: { name: "recover", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      speed: getPercentageEVfromXp(xp),
      "special-attack": getPercentageEVfromXp(xp),
    },
  });
  const scyther = makeChallengerPokemon({
    name: "scyther",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "technician",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "choice-band",
    firstMove: { name: "wing-attack", usedPP: 0 },
    secondMove: { name: "mach-punch", usedPP: 0 },
    thirdMove: { name: "bug-bite", usedPP: 0 },
    fourthMove: { name: "bullet-punch", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      speed: getPercentageEVfromXp(xp),
      attack: getPercentageEVfromXp(xp),
    },
  });
  const slowbro = makeChallengerPokemon({
    name: "slowbro",
    xp: xpWithVariance(),
    nature: "quiet",
    ability: "adaptability",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "leftovers",
    firstMove: { name: "bubble-beam", usedPP: 0 },
    secondMove: { name: "psychic", usedPP: 0 },
    thirdMove: { name: "recover", usedPP: 0 },
    fourthMove: { name: "cosmic-power", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      "special-defense": getPercentageEVfromXp(xp),
    },
  });
  const raichu = makeChallengerPokemon({
    name: "raichu",
    xp: xpWithVariance(),
    nature: "naive",
    ability: "lightning-rod",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "shuca-berry",
    firstMove: { name: "nasty-plot", usedPP: 0 },
    secondMove: { name: "nuzzle", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-attack": getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });

  if (xp < 8000) {
    return [charmander, bulbasaur, squirtle];
  }
  if (xp < 46656) {
    return [charmeleon, ivysaur, wartortle];
  }

  const possibilities = [
    charizard,
    venusaur,
    blastoise,
    tauros,
    dragonite,
    machamp,
    alakazam,
    scyther,
    slowbro,
    raichu,
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

export const red: OverworldTrainer = {
  type: "TRAINER",
  spriteGeneration: 1,
  x: 0,
  y: 0,
  id: redId,
  conditionFunction: (s) => !occupantHandled(s, redId),
  orientation: "DOWN",
  sprite: SpriteEnum.red1996,
  unhandledMessage: [
    "where am i",
    "this doesnt feel like 1996 anymore",
    "whats with these colors?",
  ],
  team: redTeam,
  battleTeamConfig: {
    assignGender: false,
    assignHeldItem: false,
    assignLearnsetMoves: false,
    assignNaturalAbility: false,
  },
};

export const redN1: Occupant = {
  ...red,
  x: 4,
  y: 28,
  conditionFunction: (s) => !occupantHandled(s, redId),
};
export const redN1E1: Occupant = {
  ...red,
  x: 3,
  y: 3,
  orientation: "RIGHT",
  conditionFunction: (s) => !occupantHandled(s, redId),
};
export const redE1: Occupant = {
  ...red,
  x: 25,
  y: 35,
  conditionFunction: (s) => !occupantHandled(s, redId),
};
export const redS1E1: Occupant = {
  ...red,
  x: 12,
  y: 15,
  orientation: "UP",
  conditionFunction: (s) => !occupantHandled(s, redId),
};
export const redS1: Occupant = {
  ...red,
  x: 3,
  y: 13,
  orientation: "DOWN",
  conditionFunction: (s) => !occupantHandled(s, redId),
};
export const redS1W1: Occupant = {
  ...red,
  x: 31,
  y: 1,
  conditionFunction: (s) => !occupantHandled(s, redId),
};
export const redW1: Occupant = {
  ...red,
  x: 12,
  y: 8,
  orientation: "DOWN",
  conditionFunction: (s) => !occupantHandled(s, redId),
};
