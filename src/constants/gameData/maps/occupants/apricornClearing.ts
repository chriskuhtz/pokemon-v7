import { calculateLevelData } from "../../../../functions/calculateLevelData";
import { getHighestXpOnTeam } from "../../../../functions/getHighestXpOnTeam";
import { makeApricornTree } from "../../../../functions/makeApricornTree";
import { makeChallengerPokemon } from "../../../../functions/makeChallengerPokemon";
import { occupantHandled } from "../../../../functions/occupantHandled";
import { Occupant } from "../../../../interfaces/Occupant";
import { OverworldMap } from "../../../../interfaces/OverworldMap";
import { SpriteEnum } from "../../../../interfaces/SpriteEnum";

const explorerDan: Occupant = {
  type: "TRAINER",
  team: (s) => {
    const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);
    const { level } = calculateLevelData(highestXpOnTeam, "medium");

    const xpOfTeam = (level - 2) * (level - 2) * (level - 2);
    const xpOfAce = (level + 1) * (level + 1) * (level + 1);
    return [
      makeChallengerPokemon({ name: "sandslash", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "golurk", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "marowak", xp: xpOfAce }),
      makeChallengerPokemon({ name: "sneasel", xp: xpOfTeam }),
    ];
  },
  battleTeamConfig: {
    assignLearnsetMoves: true,
    assignNaturalAbility: true,
    assignGender: true,
    assignHeldItem: true,
  },
  orientation: "UP",
  x: 29,
  y: 45,
  unhandledMessage: ["The secret apricorn will be mine"],
  sprite: SpriteEnum["explorer"],
  id: "explorer dan",
  conditionFunction: (s) => !occupantHandled(s, "explorer dan"),
};
const psychoWillard: Occupant = {
  type: "TRAINER",
  team: (s) => {
    const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);
    const { level } = calculateLevelData(highestXpOnTeam, "medium");

    const xpOfAce = (level + 1) * (level + 1) * (level + 1);
    return [
      makeChallengerPokemon({ name: "alakazam", xp: xpOfAce }),
      makeChallengerPokemon({ name: "gothitelle", xp: xpOfAce }),
    ];
  },
  battleTeamConfig: {
    assignLearnsetMoves: true,
    assignNaturalAbility: true,
    assignGender: true,
    assignHeldItem: true,
  },
  orientation: "LEFT",
  x: 25,
  y: 25,
  unhandledMessage: ["I can sense the power of this place"],
  sprite: SpriteEnum["psychic"],
  id: "psychic willard",
  conditionFunction: (s) => !occupantHandled(s, "psychic willard"),
};
const pyroStanley: Occupant = {
  type: "TRAINER",
  team: (s) => {
    const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);
    const { level } = calculateLevelData(highestXpOnTeam, "medium");

    const xpOfTeam = (level - 4) * (level - 4) * (level - 4);
    const xpOfAce = (level + 1) * (level + 1) * (level + 1);
    return [
      makeChallengerPokemon({ name: "heatmor", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "magmar", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "camerupt", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "salazzle", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "typhlosion-hisui", xp: xpOfAce }),
    ];
  },
  battleTeamConfig: {
    assignLearnsetMoves: true,
    assignNaturalAbility: true,
    assignGender: true,
    assignHeldItem: true,
  },
  orientation: "LEFT",
  x: 38,
  y: 13,
  unhandledMessage: [
    "I will burn this entire place to the ground",
    "to find the secret apricorn",
  ],
  sprite: SpriteEnum["pyro"],
  id: "pyromaniac stanley",
  conditionFunction: (s) => !occupantHandled(s, "pyromaniac stanley"),
};
const clearingKurt: Occupant = {
  type: "TRAINER",
  team: (s) => {
    const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);
    const { level } = calculateLevelData(highestXpOnTeam, "medium");

    const xpOfTeam = level * level * level;
    return [
      makeChallengerPokemon({ name: "drampa", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "electrode", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "exeggutor", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "steelix", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "sirfetchd", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "slowbro", xp: xpOfTeam }),
    ];
  },
  battleTeamConfig: {
    assignLearnsetMoves: true,
    assignNaturalAbility: true,
    assignGender: true,
    assignHeldItem: true,
  },
  orientation: "DOWN",
  x: 12,
  y: 7,
  unhandledMessage: [
    "Ahh, you finally made it",
    "I had a feeling you were worthy",
    "of the secret apricorn",
    "Now prove it in a battle",
  ],
  sprite: SpriteEnum["kurt"],
  id: "smith kurt",
  conditionFunction: (s) => !occupantHandled(s, "smith kurt"),
};

export const apricornClearingOccupants: OverworldMap["occupants"] = [
  explorerDan,
  psychoWillard,
  pyroStanley,
  clearingKurt,
  {
    type: "ON_STEP_PORTAL",
    x: 25,
    y: 49,
    portal: {
      mapId: "routeN1E1",
      x: 29,
      y: 1,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "deep_forest_to_routeN1E1",
  },
  ...makeApricornTree({
    x: 7,
    y: 6,
    apricorn: "purple-apricorn",
    id: "deep-forest-purple-apricorn",
  }),
  ...makeApricornTree({
    x: 24,
    y: 10,
    apricorn: "yellow-apricorn",
    id: "deep-forest-yellow-apricorn",
  }),
  ...makeApricornTree({
    x: 15,
    y: 27,
    apricorn: "blue-apricorn",
    id: "deep-forest-blue-apricorn",
  }),
  ...makeApricornTree({
    x: 37,
    y: 31,
    apricorn: "green-apricorn",
    id: "deep-forest-green-apricorn",
  }),
  ...makeApricornTree({
    x: 32,
    y: 4,
    apricorn: "white-apricorn",
    id: "deep-forest-white-apricorn",
  }),
  ...makeApricornTree({
    x: 12,
    y: 40,
    apricorn: "pink-apricorn",
    id: "deep-forest-pink-apricorn",
  }),
  ...makeApricornTree({
    x: 5,
    y: 37,
    apricorn: "red-apricorn",
    id: "deep-forest-red-apricorn",
  }),
  ...makeApricornTree({
    x: 20,
    y: 10,
    apricorn: "black-apricorn",
    id: "deep-forest-black-apricorn",
  }),
  ...makeApricornTree({
    x: 26,
    y: 40,
    apricorn: "yellow-apricorn",
    id: "deep-forest-yellow-apricorn-2",
  }),
  ...makeApricornTree({
    x: 35,
    y: 23,
    apricorn: "blue-apricorn",
    id: "deep-forest-blue-apricorn-2",
  }),
  ...makeApricornTree({
    x: 13,
    y: 19,
    apricorn: "green-apricorn",
    id: "deep-forest-green-apricorn-2",
  }),
  ...makeApricornTree({
    x: 18,
    y: 46,
    apricorn: "white-apricorn",
    id: "deep-forest-white-apricorn-2",
  }),
  ...makeApricornTree({
    x: 38,
    y: 10,
    apricorn: "pink-apricorn",
    id: "deep-forest-pink-apricorn-2",
  }),
  ...makeApricornTree({
    x: 45,
    y: 13,
    apricorn: "red-apricorn",
    id: "deep-forest-red-apricorn-2",
  }),
  ...makeApricornTree({
    x: 30,
    y: 40,
    apricorn: "black-apricorn",
    id: "deep-forest-black-apricorn-2",
  }),
];
