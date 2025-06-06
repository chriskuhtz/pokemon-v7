import { EmptyInventory, generateInventory } from "../interfaces/Inventory";
import { OwnedPokemon } from "../interfaces/OwnedPokemon";
import { QuestStatus } from "../interfaces/Quest";
import {
  CharacterLocationData,
  Pokedex,
  SaveFile,
} from "../interfaces/SaveFile";
import { EmptyStatObject } from "../interfaces/StatObject";
import { CampUpgrade, campUpgradeNames } from "./campUpgrades";
import { pokemonNames } from "./pokemonNames";
import { QuestName, QuestsRecord } from "./questsRecord";

export const frames = 16;
export const fps = 1000 / frames;
export const battleSpriteSize = 32;
export const animationTimer = 16000 / frames;
export const ONE_HOUR = 3600000;
export const ONE_DAY = ONE_HOUR * 24;
export const shinyChance = 1 / 4096;

export const challengeFieldId = "challengeField";
export const randomFieldId = "randomField";

export const testPokemon: OwnedPokemon = {
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

export const startingLocation: CharacterLocationData = {
  mapId: "camp",
  orientation: "DOWN",
  forwardFoot: "CENTER1",
  x: 20,
  y: 18,
};

const baseQuestState: Record<QuestName, QuestStatus> = Object.fromEntries(
  Object.keys(QuestsRecord).map((key) => [key, "INACTIVE"])
) as Record<QuestName, QuestStatus>;

const baseCampUpgrades: Record<CampUpgrade, boolean> = Object.fromEntries(
  campUpgradeNames.map((key) => [key, false])
  //campUpgradeNames.map((key) => [key, true])
) as Record<CampUpgrade, boolean>;

export const emptyPokedex: Pokedex = Object.fromEntries(
  pokemonNames.map((a) => [a, { seenOnRoutes: [], caughtOnRoutes: [] }])
) as unknown as Pokedex;

export const testState: SaveFile = {
  sprite: "",
  badges: [],
  researchPoints: 0,
  quests: baseQuestState,

  bag: EmptyInventory,
  storage: generateInventory({
    "berry-juice": 5,
    "poke-ball": 20,
  }),

  seedVault: [],
  playerId: "",
  money: 5000,
  pokemon: [],
  meta: {
    activeTab: "MAIN",
  },
  handledOccupants: [],
  lastEdited: new Date().getTime(),
  lastNurse: "nurse_Pokecenter_Camp",
  mileStones: {
    hasEvolvedAPokemonThroughLevelUp: false,
    hasEvolvedAPokemonWithAHeldItem: false,
    hasEvolvedAPokemonWithAStone: false,
    hasCaughtAPokemonWithHoney: false,
    hasEvolvedAPokemonThroughFriendship: false,
    hasEvolvedAPokemonThatNeedsDaytime: false,
    hasEvolvedAPokemonThatNeedsNighttime: false,
    hasCraftedApricorn: false,
    hasGrownABerry: false,
    hasGrownAnApricorn: false,
    caughtFromSwarms: [],
    luredWithBerries: [],
    damageRecord: 0,
  },
  farm: { plants: [] },
  campUpgrades: baseCampUpgrades,
  pokedex: emptyPokedex,
};

export const localStorageSaveFileId = "pokemonv7SaveFile";
export const localStorageLocationId = "pokemonv7Location";
