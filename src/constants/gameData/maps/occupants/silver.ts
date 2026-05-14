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

export const silverId = "trainer silver";
const silverTeam = (s: SaveFile): OwnedPokemon[] => {
  const xp = getHighestXpOnTeam(s.pokemon);
  const xpWithVariance = () => (0.7 + Math.random() * 0.3) * xp;

  const totodile = makeChallengerPokemon({
    name: "totodile",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "strong-jaw",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "sitrus-berry",
    firstMove: { name: "bulk-up", usedPP: 0 },
    secondMove: { name: "bite", usedPP: 0 },
    thirdMove: { name: "water-gun", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const croconaw = makeChallengerPokemon({
    name: "croconaw",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "moxie",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "leftovers",
    firstMove: { name: "bulk-up", usedPP: 0 },
    secondMove: { name: "bite", usedPP: 0 },
    thirdMove: { name: "ice-fang", usedPP: 0 },
    fourthMove: { name: "waterfall", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const feraligatr = makeChallengerPokemon({
    name: "feraligatr",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "moxie",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "leftovers",
    firstMove: { name: "bulk-up", usedPP: 0 },
    secondMove: { name: "crunch", usedPP: 0 },
    thirdMove: { name: "ice-fang", usedPP: 0 },
    fourthMove: { name: "waterfall", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const hoothoot = makeChallengerPokemon({
    name: "hoothoot",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "big-pecks",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "sharp-beak",
    firstMove: { name: "peck", usedPP: 0 },
    secondMove: { name: "hypnosis", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const noctowl = makeChallengerPokemon({
    name: "noctowl",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "battle-armor",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "sharp-beak",
    firstMove: { name: "psychic", usedPP: 0 },
    secondMove: { name: "feint-attack", usedPP: 0 },
    thirdMove: { name: "aeroblast", usedPP: 0 },
    fourthMove: { name: "calm-mind", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-attack": getPercentageEVfromXp(xp),
      "special-defense": getPercentageEVfromXp(xp),
    },
  });
  const tyrogue = makeChallengerPokemon({
    name: "tyrogue",
    xp: xpWithVariance(),
    nature: "bold",
    ability: "iron-fist",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "black-belt",
    firstMove: { name: "mach-punch", usedPP: 0 },
    secondMove: { name: "bulk-up", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      attack: getPercentageEVfromXp(xp),
    },
  });
  const hitmontop = makeChallengerPokemon({
    name: "hitmontop",
    xp: xpWithVariance(),
    nature: "bold",
    ability: "iron-fist",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "black-belt",
    firstMove: { name: "mach-punch", usedPP: 0 },
    secondMove: { name: "bulk-up", usedPP: 0 },
    thirdMove: { name: "shadow-punch", usedPP: 0 },
    fourthMove: { name: "drain-punch", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      attack: getPercentageEVfromXp(xp),
    },
  });
  const flaaffy = makeChallengerPokemon({
    name: "flaaffy",
    xp: xpWithVariance(),
    nature: "lonely",
    ability: "cotton-down",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "magnet",
    firstMove: { name: "shock-wave", usedPP: 0 },
    secondMove: { name: "tail-glow", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-attack": getPercentageEVfromXp(xp),
      defense: getPercentageEVfromXp(xp),
    },
  });
  const ampharos = makeChallengerPokemon({
    name: "ampharos",
    xp: xpWithVariance(),
    nature: "lonely",
    ability: "cotton-down",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "magnet",
    firstMove: { name: "thunderbolt", usedPP: 0 },
    secondMove: { name: "tail-glow", usedPP: 0 },
    thirdMove: { name: "dragon-pulse", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-attack": getPercentageEVfromXp(xp),
      defense: getPercentageEVfromXp(xp),
    },
  });
  const houndoom = makeChallengerPokemon({
    name: "houndoom",
    xp: xpWithVariance(),
    nature: "lonely",
    ability: "dark-aura",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "black-glasses",
    firstMove: { name: "flamethrower", usedPP: 0 },
    secondMove: { name: "dark-pulse", usedPP: 0 },
    thirdMove: { name: "crunch", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-attack": getPercentageEVfromXp(xp),
      attack: getPercentageEVfromXp(xp),
    },
  });
  const tyranitar = makeChallengerPokemon({
    name: "tyranitar",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "intimidate",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "black-glasses",
    firstMove: { name: "rock-slide", usedPP: 0 },
    secondMove: { name: "bulk-up", usedPP: 0 },
    thirdMove: { name: "crunch", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-attack": getPercentageEVfromXp(xp),
      attack: getPercentageEVfromXp(xp),
    },
  });
  const espeon = makeChallengerPokemon({
    name: "espeon",
    xp: xpWithVariance(),
    nature: "mild",
    ability: "synchronize",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "twisted-spoon",
    firstMove: { name: "psychic", usedPP: 0 },
    secondMove: { name: "calm-mind", usedPP: 0 },
    thirdMove: { name: "recover", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-attack": getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const meganium = makeChallengerPokemon({
    name: "meganium",
    xp: xpWithVariance(),
    nature: "mild",
    ability: "overgrow",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "big-root",
    firstMove: { name: "magical-leaf", usedPP: 0 },
    secondMove: { name: "calm-mind", usedPP: 0 },
    thirdMove: { name: "recover", usedPP: 0 },
    fourthMove: { name: "ingrain", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-defense": getPercentageEVfromXp(xp),
      defense: getPercentageEVfromXp(xp),
    },
  });
  const typhlosion = makeChallengerPokemon({
    name: "typhlosion",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "flame-body",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "life-orb",
    firstMove: { name: "flare-blitz", usedPP: 0 },
    secondMove: { name: "body-slam", usedPP: 0 },
    thirdMove: { name: "volt-tackle", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      defense: getPercentageEVfromXp(xp),
    },
  });
  const skarmory = makeChallengerPokemon({
    name: "skarmory",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "hustle",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "leftovers",
    firstMove: { name: "aerial-ace", usedPP: 0 },
    secondMove: { name: "swift", usedPP: 0 },
    thirdMove: { name: "steel-wing", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });

  if (xp < 8000) {
    return [totodile, tyrogue, hoothoot];
  }
  if (xp < 46656) {
    return [croconaw, noctowl, flaaffy, tyrogue];
  }

  const possibilities = [
    ampharos,
    hitmontop,
    noctowl,
    feraligatr,
    houndoom,
    tyranitar,
    espeon,
    meganium,
    typhlosion,
    skarmory,
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

export const silver: OverworldTrainer = {
  profilePicture:
    "https://archives.bulbagarden.net/media/upload/b/b6/VSSilver.png",
  type: "TRAINER",
  x: 0,
  y: 0,
  id: silverId,
  conditionFunction: () => true,
  orientation: "DOWN",
  sprite: SpriteEnum.silver,
  unhandledMessage: ["hmppf", "do you even have strong pokemon?"],
  team: silverTeam,
  battleTeamConfig: {
    assignGender: false,
    assignHeldItem: false,
    assignLearnsetMoves: false,
    assignNaturalAbility: false,
  },
};

export const silverN1: Occupant = {
  ...silver,
  x: 39,
  y: 40,
  conditionFunction: (s) => !occupantHandled(s, silverId),
};
export const silverN1E1: Occupant = {
  ...silver,
  x: 47,
  y: 2,
  conditionFunction: (s) => !occupantHandled(s, silverId),
};
export const silverE1: Occupant = {
  ...silver,
  x: 32,
  y: 23,
  conditionFunction: (s) => !occupantHandled(s, silverId),
};
export const silverS1E1: Occupant = {
  ...silver,
  x: 17,
  y: 10,
  conditionFunction: (s) => !occupantHandled(s, silverId),
};
export const silverS1: Occupant = {
  ...silver,
  x: 10,
  y: 1,
  orientation: "RIGHT",
  conditionFunction: (s) => !occupantHandled(s, silverId),
};
export const silverS1W1: Occupant = {
  ...silver,
  x: 31,
  y: 40,
  orientation: "RIGHT",
  conditionFunction: (s) => !occupantHandled(s, silverId),
};
export const silverW1: Occupant = {
  ...silver,
  x: 45,
  y: 46,
  orientation: "DOWN",
  conditionFunction: (s) => !occupantHandled(s, silverId),
};
