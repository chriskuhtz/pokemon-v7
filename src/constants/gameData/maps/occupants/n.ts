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

export const nId = "trainer n";
const nTeam = (s: SaveFile): OwnedPokemon[] => {
  const xp = getHighestXpOnTeam(s.pokemon);

  const xpWithVariance = () => (0.7 + Math.random() * 0.3) * xp;

  const zorua = makeChallengerPokemon({
    name: "zorua",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "cute-charm",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "oran-berry",
    firstMove: { name: "bite", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const zoroark = makeChallengerPokemon({
    name: "zoroark",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "dark-aura",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "black-glasses",
    firstMove: { name: "night-slash", usedPP: 0 },
    secondMove: { name: "swords-dance", usedPP: 0 },
    thirdMove: { name: "slash", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const sandile = makeChallengerPokemon({
    name: "sandile",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "strong-jaw",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "berry-juice",
    firstMove: { name: "bite", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const krokorok = makeChallengerPokemon({
    name: "krokorok",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "strong-jaw",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "sitrus-berry",
    firstMove: { name: "crunch", usedPP: 0 },
    secondMove: { name: "dig", usedPP: 0 },
    thirdMove: { name: "ice-fang", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const krookodile = makeChallengerPokemon({
    name: "krookodile",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "strong-jaw",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "leftovers",
    firstMove: { name: "crunch", usedPP: 0 },
    secondMove: { name: "dig", usedPP: 0 },
    thirdMove: { name: "ice-fang", usedPP: 0 },
    fourthMove: { name: "thunder-fang", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const darumaka = makeChallengerPokemon({
    name: "darumaka",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "drought",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "choice-band",
    firstMove: { name: "ember", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const darmanitan = makeChallengerPokemon({
    name: "darmanitan-standard",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "drought",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "choice-band",
    firstMove: { name: "double-edge", usedPP: 0 },
    secondMove: { name: "flare-blitz", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const scrafty = makeChallengerPokemon({
    name: "darmanitan-standard",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "inner-focus",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "sitrus-berry",
    firstMove: { name: "low-kick", usedPP: 0 },
    secondMove: { name: "dizzy-punch", usedPP: 0 },
    thirdMove: { name: "bullet-punch", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const sigilyph = makeChallengerPokemon({
    name: "sigilyph",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "tinted-lens",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "leftovers",
    firstMove: { name: "cosmic-power", usedPP: 0 },
    secondMove: { name: "aeroblast", usedPP: 0 },
    thirdMove: { name: "psychic", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      "special-defense": getPercentageEVfromXp(xp),
    },
  });
  const ferrothorn = makeChallengerPokemon({
    name: "ferrothorn",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "technician",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "leftovers",
    firstMove: { name: "cosmic-power", usedPP: 0 },
    secondMove: { name: "bullet-punch", usedPP: 0 },
    thirdMove: { name: "razor-leaf", usedPP: 0 },
    fourthMove: { name: "ingrain", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      "special-defense": getPercentageEVfromXp(xp),
    },
  });
  const hydreigon = makeChallengerPokemon({
    name: "hydreigon",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "strong-jaw",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "black-glasses",
    firstMove: { name: "crunch", usedPP: 0 },
    secondMove: { name: "dragon-claw", usedPP: 0 },
    thirdMove: { name: "poison-fang", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      attack: getPercentageEVfromXp(xp),
    },
  });
  const volcarona = makeChallengerPokemon({
    name: "volcarona",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "flame-body",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "charti-berry",
    firstMove: { name: "flamethrower", usedPP: 0 },
    secondMove: { name: "quiver-dance", usedPP: 0 },
    thirdMove: { name: "signal-beam", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      defense: getPercentageEVfromXp(xp),
      attack: getPercentageEVfromXp(xp),
    },
  });
  const bouffalant = makeChallengerPokemon({
    name: "bouffalant",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "rock-head",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "chople-berry",
    firstMove: { name: "double-edge", usedPP: 0 },
    secondMove: { name: "reversal", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      speed: getPercentageEVfromXp(xp),
      attack: getPercentageEVfromXp(xp),
    },
  });

  if (xp < 8000) {
    return [zorua, sandile, darumaka];
  }
  if (xp < 46656) {
    return [zoroark, krokorok, darumaka];
  }

  const possibilities = [
    zoroark,
    krookodile,
    darmanitan,
    scrafty,
    sigilyph,
    ferrothorn,
    hydreigon,
    volcarona,
    bouffalant,
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

export const n: OverworldTrainer = {
  type: "TRAINER",
  x: 0,
  y: 0,
  id: nId,
  conditionFunction: (s) => !occupantHandled(s, nId),
  orientation: "DOWN",
  sprite: SpriteEnum.n,
  unhandledMessage: ["Do you treat your pokemon well?"],
  team: nTeam,
  battleTeamConfig: {
    assignGender: false,
    assignHeldItem: false,
    assignLearnsetMoves: false,
    assignNaturalAbility: false,
  },
};

export const nN1: Occupant = {
  ...n,
  x: 18,
  y: 25,
  orientation: "LEFT",
  conditionFunction: (s) => !occupantHandled(s, nId),
};
export const nN1E1: Occupant = {
  ...n,
  x: 20,
  y: 28,
  orientation: "LEFT",
  conditionFunction: (s) => !occupantHandled(s, nId),
};
export const nE1: Occupant = {
  ...n,
  x: 35,
  y: 3,
  orientation: "LEFT",
  conditionFunction: (s) => !occupantHandled(s, nId),
};
export const nS1E1: Occupant = {
  ...n,
  x: 47,
  orientation: "LEFT",
  y: 40,
  conditionFunction: (s) => !occupantHandled(s, nId),
};
export const nS1: Occupant = {
  ...n,
  x: 38,
  y: 22,
  conditionFunction: (s) => !occupantHandled(s, nId),
};
export const nS1W1: Occupant = {
  ...n,
  x: 39,
  y: 28,
  conditionFunction: (s) => !occupantHandled(s, nId),
};
export const nW1: Occupant = {
  ...n,
  x: 38,
  y: 25,
  conditionFunction: (s) => !occupantHandled(s, nId),
};
