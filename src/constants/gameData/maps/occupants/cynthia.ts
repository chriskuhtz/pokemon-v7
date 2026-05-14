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

export const cynthiaId = "champion cynthia";
const cynthiaTeam = (s: SaveFile): OwnedPokemon[] => {
  const xp = getHighestXpOnTeam(s.pokemon);
  const xpWithVariance = () => (0.7 + Math.random() * 0.3) * xp;

  const gible = makeChallengerPokemon({
    name: "gible",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "sand-stream",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "soft-sand",
    firstMove: { name: "dig", usedPP: 0 },
    secondMove: { name: "dragon-claw", usedPP: 0 },
    thirdMove: { name: "bite", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const gabite = makeChallengerPokemon({
    name: "gabite",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "sand-stream",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "soft-sand",
    firstMove: { name: "bone-rush", usedPP: 0 },
    secondMove: { name: "dragon-claw", usedPP: 0 },
    thirdMove: { name: "bite", usedPP: 0 },
    fourthMove: { name: "dragon-dance", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const garchomp = makeChallengerPokemon({
    name: "garchomp",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "sand-stream",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "soft-sand",
    firstMove: { name: "dig", usedPP: 0 },
    secondMove: { name: "dragon-claw", usedPP: 0 },
    thirdMove: { name: "bite", usedPP: 0 },
    fourthMove: { name: "dragon-dance", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const otherGarchomp = makeChallengerPokemon({
    name: "garchomp",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "sand-force",
    fixedAbility: true,
    shiny: true,
    happiness: 255,
    heldItemName: "soft-sand",
    firstMove: { name: "earthquake", usedPP: 0 },
    secondMove: { name: "dragon-claw", usedPP: 0 },
    thirdMove: { name: "dragon-dance", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      speed: getPercentageEVfromXp(xp),
    },
  });
  const riolu = makeChallengerPokemon({
    name: "riolu",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "iron-fist",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "black-belt",
    firstMove: { name: "mach-punch", usedPP: 0 },
    secondMove: { name: "bullet-punch", usedPP: 0 },
    thirdMove: { name: "work-up", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      defense: getPercentageEVfromXp(xp),
    },
  });
  const lucario = makeChallengerPokemon({
    name: "lucario",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "mega-launcher",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "black-belt",
    firstMove: { name: "dragon-pulse", usedPP: 0 },
    secondMove: { name: "dark-pulse", usedPP: 0 },
    thirdMove: { name: "calm-mind", usedPP: 0 },
    fourthMove: { name: "aura-sphere", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      attack: getPercentageEVfromXp(xp),
      defense: getPercentageEVfromXp(xp),
    },
  });
  const togepi = makeChallengerPokemon({
    name: "togepi",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "hospitality",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "leftovers",
    firstMove: { name: "charm", usedPP: 0 },
    secondMove: { name: "sweet-kiss", usedPP: 0 },
    thirdMove: { name: "fairy-wind", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-defense": getPercentageEVfromXp(xp),
      defense: getPercentageEVfromXp(xp),
    },
  });
  const togetic = makeChallengerPokemon({
    name: "togetic",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "hospitality",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "leftovers",
    firstMove: { name: "charm", usedPP: 0 },
    secondMove: { name: "cosmic-power", usedPP: 0 },
    thirdMove: { name: "fairy-wind", usedPP: 0 },
    fourthMove: { name: "aeroblast", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-defense": getPercentageEVfromXp(xp),
      defense: getPercentageEVfromXp(xp),
    },
  });
  const togekiss = makeChallengerPokemon({
    name: "togekiss",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "hospitality",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "leftovers",
    firstMove: { name: "charm", usedPP: 0 },
    secondMove: { name: "cosmic-power", usedPP: 0 },
    thirdMove: { name: "fairy-wind", usedPP: 0 },
    fourthMove: { name: "aeroblast", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-defense": getPercentageEVfromXp(xp),
      defense: getPercentageEVfromXp(xp),
    },
  });
  const spiritomb = makeChallengerPokemon({
    name: "spiritomb",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "unnerve",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "sitrus-berry",
    firstMove: { name: "shadow-sneak", usedPP: 0 },
    secondMove: { name: "calm-mind", usedPP: 0 },
    thirdMove: { name: "dark-pulse", usedPP: 0 },
    fourthMove: { name: "shadow-ball", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-defense": getPercentageEVfromXp(xp),
      defense: getPercentageEVfromXp(xp),
    },
  });
  const roserade = makeChallengerPokemon({
    name: "roserade",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "poison-point",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "black-sludge",
    firstMove: { name: "giga-drain", usedPP: 0 },
    secondMove: { name: "calm-mind", usedPP: 0 },
    thirdMove: { name: "sludge-bomb", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-defense": getPercentageEVfromXp(xp),
      "special-attack": getPercentageEVfromXp(xp),
    },
  });
  const gastrodon = makeChallengerPokemon({
    name: "gastrodon",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "water-absorb",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "leftovers",
    firstMove: { name: "earth-power", usedPP: 0 },
    secondMove: { name: "amnesia", usedPP: 0 },
    thirdMove: { name: "surf", usedPP: 0 },
    fourthMove: { name: "ice-beam", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-defense": getPercentageEVfromXp(xp),
      "special-attack": getPercentageEVfromXp(xp),
    },
  });
  const milotic = makeChallengerPokemon({
    name: "milotic",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "drizzle",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "mystic-water",
    firstMove: { name: "recover", usedPP: 0 },
    secondMove: { name: "calm-mind", usedPP: 0 },
    thirdMove: { name: "surf", usedPP: 0 },
    fourthMove: { name: "ice-beam", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-defense": getPercentageEVfromXp(xp),
      "special-attack": getPercentageEVfromXp(xp),
    },
  });
  const glaceon = makeChallengerPokemon({
    name: "glaceon",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "clear-body",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "leftovers",
    firstMove: { name: "recover", usedPP: 0 },
    secondMove: { name: "cosmic-power", usedPP: 0 },
    thirdMove: { name: "draining-kiss", usedPP: 0 },
    fourthMove: { name: "ice-beam", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      "special-defense": getPercentageEVfromXp(xp),
      "special-attack": getPercentageEVfromXp(xp),
    },
  });

  const pory = makeChallengerPokemon({
    name: "porygon-z",
    xp: xpWithVariance(),
    nature: "adamant",
    ability: "clear-body",
    fixedAbility: true,
    happiness: 255,
    heldItemName: "choice-band",
    firstMove: { name: "hyper-beam", usedPP: 0 },
    effortValues: {
      ...EmptyStatObject,
      speed: getPercentageEVfromXp(xp),
      "special-attack": getPercentageEVfromXp(xp),
    },
  });

  if (xp < 8000) {
    return [gible, riolu, togepi];
  }
  if (xp < 46656) {
    return [gabite, riolu, togetic, spiritomb];
  }

  const possibilities = [
    garchomp,
    lucario,
    togekiss,
    spiritomb,
    roserade,
    gastrodon,
    milotic,
    glaceon,
    otherGarchomp,
    pory,
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

export const cynthia: OverworldTrainer = {
  profilePicture:
    "https://archives.bulbagarden.net/media/upload/b/b1/VSCynthia.png",
  type: "TRAINER",
  x: 0,
  y: 0,
  id: cynthiaId,
  conditionFunction: (s) => !occupantHandled(s, cynthiaId),
  orientation: "DOWN",
  sprite: SpriteEnum.cynthia,
  unhandledMessage: [
    "Its always nice to meet aspiring trainers",
    "lets see how strong you have grown",
  ],
  team: cynthiaTeam,
  battleTeamConfig: {
    assignGender: false,
    assignHeldItem: false,
    assignLearnsetMoves: false,
    assignNaturalAbility: false,
  },
};

export const cynthiaN1: Occupant = {
  ...cynthia,
  x: 45,
  y: 3,
  conditionFunction: (s) => !occupantHandled(s, cynthiaId),
};
export const cynthiaN1E1: Occupant = {
  ...cynthia,
  x: 30,
  y: 46,
  orientation: "RIGHT",
  conditionFunction: (s) => !occupantHandled(s, cynthiaId),
};
export const cynthiaE1: Occupant = {
  ...cynthia,
  x: 25,
  y: 29,
  orientation: "RIGHT",
  conditionFunction: (s) => !occupantHandled(s, cynthiaId),
};
export const cynthiaS1E1: Occupant = {
  ...cynthia,
  x: 12,
  y: 42,
  conditionFunction: (s) => !occupantHandled(s, cynthiaId),
};
export const cynthiaS1: Occupant = {
  ...cynthia,
  x: 25,
  y: 20,
  conditionFunction: (s) => !occupantHandled(s, cynthiaId),
};
export const cynthiaS1W1: Occupant = {
  ...cynthia,
  x: 10,
  y: 45,
  conditionFunction: (s) => !occupantHandled(s, cynthiaId),
};
export const cynthiaW1: Occupant = {
  ...cynthia,
  x: 17,
  y: 38,
  orientation: "RIGHT",
  conditionFunction: (s) => !occupantHandled(s, cynthiaId),
};
