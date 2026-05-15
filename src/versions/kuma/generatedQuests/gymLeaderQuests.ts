/* eslint-disable max-lines */
import { v4 } from "uuid";
import { blaineId } from "../../../constants/gameData/maps/occupants/blaine";
import { brockId } from "../../../constants/gameData/maps/occupants/brock";
import { bugsyId } from "../../../constants/gameData/maps/occupants/bugsy";
import { chuckId } from "../../../constants/gameData/maps/occupants/chuckLine";
import { erikaId } from "../../../constants/gameData/maps/occupants/erika";
import { falknerId } from "../../../constants/gameData/maps/occupants/falknerLine";
import { garyId } from "../../../constants/gameData/maps/occupants/gary";
import { janineId } from "../../../constants/gameData/maps/occupants/janine";
import { jasmineId } from "../../../constants/gameData/maps/occupants/jasmine";
import { mistyId } from "../../../constants/gameData/maps/occupants/misty";
import { mortyId } from "../../../constants/gameData/maps/occupants/mortyLine";
import { sabrinaId } from "../../../constants/gameData/maps/occupants/sabrina";
import { surgeId } from "../../../constants/gameData/maps/occupants/surge";
import { whitneyId } from "../../../constants/gameData/maps/occupants/whitney";
import { occupantHandled } from "../../../functions/occupantHandled";
import {
  expCandyPackage,
  smallExpCandyPackage,
} from "../../../interfaces/Item";
import { OwnedPokemon } from "../../../interfaces/OwnedPokemon";
import { Quest } from "../../../interfaces/Quest";
import { SaveFile } from "../../../interfaces/SaveFile";
import {
  EmptyStatObject,
  generateRandomStatObject,
} from "../../../interfaces/StatObject";
import { KumaQuestName } from "../questsRecord";

const testPokemon: OwnedPokemon = {
  name: "teddiursa",
  gender: "MALE",
  ownerId: "test",
  id: "bingo",
  ball: "poke-ball",
  onTeam: true,
  firstMove: { name: "tackle", usedPP: 0 },
  damage: 0,
  nature: "adamant",
  xp: 125,
  ability: "shadow-tag",
  happiness: 70,
  stepsWalked: 0,
  heldItemName: "berry-juice",
  maxHp: 20,
  effortValues: EmptyStatObject,
  intrinsicValues: EmptyStatObject,
  ppBoostedMoves: [],
  caughtOnMap: "camp",
  weightModifier: Math.random(),
  unlockedMoves: [],
  growthRate: "medium",
  caughtAtDate: new Date().getTime(),
};
export const gymLeaderQuests: Partial<Record<KumaQuestName, Quest>> = {
  "defeat erika": {
    category: "GYM LEADER",
    kind: "BULLETIN",
    badge: "Rainbow_Badge",
    researchPoints: 25,
    rewardItems: {
      "rindo-berry": 5,
      "miracle-seed": 1,
      "big-root": 1,
      ...smallExpCandyPackage,
    },
    conditionFunction: (s) => {
      return occupantHandled(s, erikaId);
    },
  },
  "defeat janine": {
    category: "GYM LEADER",
    kind: "BULLETIN",
    researchPoints: 25,
    badge: "Marsh_Badge",
    rewardItems: {
      "kebia-berry": 5,
      "black-sludge": 1,
      ...smallExpCandyPackage,
    },
    requiredUpgrade: "machete certification",
    conditionFunction: (s) => {
      return occupantHandled(s, janineId);
    },
  },
  "defeat blaine": {
    category: "GYM LEADER",
    kind: "BULLETIN",
    badge: "Volcano_Badge",
    researchPoints: 25,
    rewardItems: {
      "occa-berry": 5,
      charcoal: 1,
      ...expCandyPackage,
      sprayduck: 1,
    },
    requiredUpgrade: "sledge hammer certification",
    conditionFunction: (s) => {
      return occupantHandled(s, blaineId);
    },
  },
  "defeat surge": {
    category: "GYM LEADER",
    kind: "BULLETIN",
    badge: "Thunder_Badge",
    researchPoints: 50,
    rewardItems: { "wacan-berry": 5, magnet: 1, ...expCandyPackage },
    requiredUpgrade: "swimming certification",
    conditionFunction: (s) => {
      return occupantHandled(s, surgeId);
    },
  },
  "defeat misty": {
    category: "GYM LEADER",
    kind: "BULLETIN",
    badge: "Cascade_Badge",
    researchPoints: 50,
    rewardItems: {
      "passho-berry": 5,
      "mystic-water": 1,
      ...expCandyPackage,
    },
    campUpgrade: "swimming certification",
    conditionFunction: (s) => {
      return occupantHandled(s, mistyId);
    },
  },
  "defeat sabrina": {
    category: "GYM LEADER",
    kind: "BULLETIN",
    badge: "Soul_Badge",
    researchPoints: 50,
    rewardItems: { "payapa-berry": 5, "twisted-spoon": 1, ...expCandyPackage },
    requiredUpgrade: "swimming certification",
    conditionFunction: (s) => {
      return occupantHandled(s, sabrinaId);
    },
  },
  "defeat brock": {
    category: "GYM LEADER",
    kind: "BULLETIN",
    researchPoints: 50,
    badge: "Boulder_Badge",
    rewardItems: { "charti-berry": 5, "hard-stone": 1, ...expCandyPackage },
    requiredUpgrade: "shovel certification",
    conditionFunction: (s) => {
      return occupantHandled(s, brockId);
    },
  },
  "defeat gary": {
    category: "GYM LEADER",
    kind: "BULLETIN",
    researchPoints: 100,
    badge: "Earth_Badge",
    rewardItems: {
      electirizer: 1,
      magmarizer: 1,
      protector: 1,
      ...expCandyPackage,
    },
    requiredUpgrade: "swimming certification",
    conditionFunction: (s) => {
      return occupantHandled(s, garyId);
    },
  },
  "defeat falkner": {
    category: "GYM LEADER",
    rewardItems: {
      "ultra-ball": 5,
      "full-restore": 5,
      "sharp-beak": 1,
      ...expCandyPackage,
    },
    badge: "Zephyr_Badge",
    rewardPokemon: {
      ...testPokemon,
      id: v4(),
      name: "rufflet",
      shiny: true,
      caughtAtDate: new Date().getTime(),
      xp: 125,
      intrinsicValues: generateRandomStatObject(31, 25),
      caughtOnMap: "camp",
    },
    researchPoints: 50,
    conditionFunction: (s) => {
      return occupantHandled(s, falknerId);
    },
    kind: "BULLETIN",
    availableAfter: "catch the legendary bird of ice",
  },
  "defeat bugsy": {
    category: "GYM LEADER",
    badge: "Hive_Badge",
    rewardItems: {
      "ultra-ball": 5,
      "full-restore": 5,
      "silver-powder": 1,
      ...expCandyPackage,
    },
    rewardPokemon: {
      ...testPokemon,
      id: v4(),
      name: "larvesta",
      shiny: true,
      caughtAtDate: new Date().getTime(),
      xp: 125,
      intrinsicValues: generateRandomStatObject(31, 25),
      caughtOnMap: "camp",
    },
    researchPoints: 50,
    requiredUpgrade: "machete certification",
    conditionFunction: (s) => {
      return occupantHandled(s, bugsyId);
    },
    kind: "BULLETIN",
    availableAfter: "report a bug",
  },
  "defeat whitney": {
    category: "GYM LEADER",
    rewardItems: {
      "ultra-ball": 5,
      "full-restore": 5,
      "silk-scarf": 1,
      ...expCandyPackage,
    },
    badge: "Plain_Badge",
    rewardPokemon: {
      ...testPokemon,
      id: v4(),
      name: "buneary",
      shiny: true,
      caughtAtDate: new Date().getTime(),
      xp: 125,
      intrinsicValues: generateRandomStatObject(31, 25),
      caughtOnMap: "camp",
    },
    researchPoints: 50,
    conditionFunction: (s: SaveFile) => {
      return occupantHandled(s, whitneyId);
    },
    kind: "BULLETIN",
    requiredUpgrade: "dragonite taxi",
    availableAfter: "catch whitney's favorite cute pokemon",
  },
  "defeat morty": {
    category: "GYM LEADER",
    rewardItems: {
      "ultra-ball": 5,
      "full-restore": 5,
      "spell-tag": 1,
      ...expCandyPackage,
    },
    rewardPokemon: {
      ...testPokemon,
      id: v4(),
      name: "dreepy",
      shiny: true,
      caughtAtDate: new Date().getTime(),
      xp: 125,
      intrinsicValues: generateRandomStatObject(31, 25),
      caughtOnMap: "camp",
    },
    badge: "Fog_Badge",
    requiredUpgrade: "swimming certification",
    researchPoints: 50,
    conditionFunction: (s) => {
      return occupantHandled(s, mortyId);
    },
    kind: "BULLETIN",
    availableAfter: "catch Haunter and Mightyena",
  },
  "defeat chuck": {
    category: "GYM LEADER",
    rewardItems: {
      "full-restore": 5,
      "black-belt": 1,
      ...expCandyPackage,
    },
    badge: "Storm_Badge",
    rewardPokemon: {
      ...testPokemon,
      id: v4(),
      name: "hawlucha",
      shiny: true,
      caughtAtDate: new Date().getTime(),
      xp: 125,
      intrinsicValues: generateRandomStatObject(31, 25),
      caughtOnMap: "camp",
    },
    researchPoints: 50,
    conditionFunction: (s) => {
      return occupantHandled(s, chuckId);
    },
    kind: "BULLETIN",
    requiredUpgrade: "shovel certification",
    availableAfter: "deal 10000 damage with one attack",
  },
  "defeat jasmine": {
    category: "GYM LEADER",
    rewardItems: {
      "ultra-ball": 5,
      "full-restore": 5,
      "metal-coat": 1,
      ...expCandyPackage,
    },
    badge: "Mineral_Badge",
    rewardPokemon: {
      ...testPokemon,
      id: v4(),
      name: "scyther",
      shiny: true,
      caughtAtDate: new Date().getTime(),
      xp: 125,
      intrinsicValues: generateRandomStatObject(31, 25),
      caughtOnMap: "camp",
    },
    researchPoints: 50,
    conditionFunction: (s: SaveFile) => {
      return occupantHandled(s, jasmineId);
    },
    kind: "BULLETIN",
    requiredUpgrade: "swimming certification",
    availableAfter: "catch an exceptional steel pokemon for jasmine",
  },
  "defeat pryce": {
    category: "GYM LEADER",
    rewardItems: {
      "ultra-ball": 5,
      "full-restore": 5,
      "never-melt-ice": 1,
      ...expCandyPackage,
    },
    badge: "Glacier_Badge",
    rewardPokemon: {
      ...testPokemon,
      id: v4(),
      name: "swinub",
      shiny: true,
      caughtAtDate: new Date().getTime(),
      xp: 125,
      intrinsicValues: generateRandomStatObject(31, 25),
      caughtOnMap: "camp",
    },
    researchPoints: 50,
    conditionFunction: (s: SaveFile) => {
      return occupantHandled(s, "Gym Leader Pryce");
    },
    kind: "BULLETIN",
    requiredUpgrade: "training field 1",
    availableAfter: "maximize the effort values of an ice pokemon",
  },
  "defeat clair": {
    category: "GYM LEADER",
    rewardItems: {
      "ultra-ball": 5,
      "full-restore": 5,
      "dragon-scale": 1,
      ...expCandyPackage,
    },
    badge: "Rising_Badge",
    rewardPokemon: {
      ...testPokemon,
      id: v4(),
      name: "horsea",
      shiny: true,
      caughtAtDate: new Date().getTime(),
      xp: 125,
      intrinsicValues: generateRandomStatObject(31, 25),
      caughtOnMap: "camp",
    },
    researchPoints: 50,
    conditionFunction: (s: SaveFile) => {
      return occupantHandled(s, "Gym Leader Clair");
    },
    kind: "BULLETIN",
    requiredUpgrade: "training field 1",
    availableAfter: "reach max. friendship with a dragon pokemon",
  },
};
