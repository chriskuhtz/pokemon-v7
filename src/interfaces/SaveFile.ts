import { CampUpgrade } from "../constants/gameData/campUpgrades";
import { PokemonName } from "../constants/pokemonNames";
import { KumaQuestName } from "../versions/kuma/questsRecord";
import { BadgeName } from "./Badge";
import { Challenger } from "./Challenger";
import { Inventory } from "./Inventory";
import {
  ApricornType,
  BerryType,
  HerbType,
  ItemType,
  LureType,
  MulchType,
  RepelType,
} from "./Item";
import { MapId } from "./mapIds";
import { OverworldTrainer } from "./Occupant";
import { OwnedPokemon } from "./OwnedPokemon";
import { SwarmType } from "./Pokedex";
import { PokemonType } from "./PokemonType";
import { QuestStatus } from "./Quest";
import { RoutesType } from "./Routing";
import { SettingsObject } from "./SettingsObject";

export type CharacterOrientation = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type ForwardFoot = "CENTER1" | "RIGHT" | "CENTER2" | "LEFT";

export const OrientationKeyMap: Record<string, CharacterOrientation> = {
  ArrowUp: "UP",
  ArrowLeft: "LEFT",
  ArrowDown: "DOWN",
  ArrowRight: "RIGHT",
  w: "UP",
  a: "LEFT",
  s: "DOWN",
  d: "RIGHT",
};
export interface CharacterLocationData {
  mapId: MapId;
  orientation: CharacterOrientation;
  forwardFoot: ForwardFoot;
  x: number;
  y: number;
}

export type BerryBushStatus =
  | "WITHERED"
  | "READY"
  | "SAPLING"
  | "FLOWERING"
  | "SPROUT"
  | "SEED";
export interface BerryBush {
  readyAt: number;
  successful: boolean;
  yield: number;
  type: BerryType | ApricornType | HerbType;
  mulch?: MulchType;
  id: string;
}

export interface PokemonSwarm {
  pokemon: PokemonName;
  leavesAt: number;
  route: MapId;
  xpMin: number;
  xpMax: number;
  type: SwarmType;
}

export type Pokedex = Record<
  PokemonName,
  { seenOnRoutes: MapId[]; caughtOnRoutes: MapId[] }
>;

export type CatchBoosts = Record<PokemonType, number>;

export type CatchStreak = {
  pokemon: PokemonName;
  streak: number;
  mapId: MapId;
};
export const evilTeams = ["rocket", "aqua", "magma", "galactic"] as const;
export type EvilTeam = (typeof evilTeams)[number];

export type OverworldTrainerStump = Omit<
  OverworldTrainer,
  "team" | "conditionFunction"
>;

export type MileStonesObject = {
  damageRecord: number;
  challengeFieldRecord?: number;
  randomFieldRecord?: number;
  hasEvolvedAPokemonThroughLevelUp?: boolean;
  hasEvolvedAPokemonWithAStone?: boolean;
  hasEvolvedAPokemonWithAHeldItem?: boolean;
  hasEvolvedAPokemonThroughFriendship?: boolean;
  hasEvolvedAPokemonThatNeedsDaytime?: boolean;
  hasEvolvedAPokemonThatNeedsNighttime?: boolean;
  hasCaughtAPokemonWithHoney?: boolean;
  hasfoundAPokemonBySmashingRocks?: boolean;
  hasCraftedApricorn?: boolean;
  hasGrownABerry?: boolean;
  hasGrownAHerb?: boolean;
  hasGrownAnApricorn?: boolean;
  cookedEasyRecipe?: boolean;
  cookedMediumRecipe?: boolean;
  cookedTrickyRecipe?: boolean;
  hasWokenASnorlax?: boolean;
  caughtFromSwarms: PokemonName[];
  luredWithBerries: PokemonName[];
  hasEvolvedStarter?: boolean;
  hasReportedBug?: boolean;
  barryDefeatedAt?: number;
  silverDefeatedAt?: number;
  cynthiaDefeatedAt?: number;
  nDefeatedAt?: number;
  redDefeatedAt?: number;
  hughDefeatedAt?: number;
  lanceDefeatedAt?: number;
  importedChallengerDefeatedAt?: number;
};

export type ImportedChallenger = Omit<
  OverworldTrainer,
  "team" | "conditionFunction"
> & {
  mapId: MapId;
  team: OwnedPokemon[];
};

export type RampagingPokemon = {
  route: MapId;
  name: PokemonName;
  id: string;
  x: number;
  y: number;
};

export type TroubleMakers = {
  route: MapId;
  trainers: OverworldTrainerStump[];
  affiliation: EvilTeam;
  leavesAt?: number;
};

export interface SavedNote {
  id: string;
  xpOverwrite?: number;
}

export interface LostItem {
  item: ItemType;
  amount: number;
  mapId: MapId;
  x: number;
  y: number;
  resetAt: number;
}
export interface StaticEncounter {
  name: PokemonName;
  dexId: number;
  xp: number;
  mapId: MapId;
  x: number;
  y: number;
  resetAt: number;
  orientation: CharacterOrientation;
}
export interface StaticTrainer {
  mapId: MapId;
  x: number;
  y: number;
  resetAt: number;
  orientation: CharacterOrientation;
  pokemonType: PokemonType;
  xp: number;
}

export const startingRegions = [
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "galar",
  "paldea",
] as const;
export type StartingRegion = (typeof startingRegions)[number];

export const traits = [
  "chef",
  "gardener",
  "competitor",
  "collector",
  "explorer",
] as const;
export type CharacterTrait = (typeof traits)[number];

export const traitBoni: Record<CharacterTrait, string> = {
  chef: "Chefs rarely fail at cooking and can sometimes stretch cooked snacks into multiple portions",

  gardener:
    "Gardeners can harvest more plants than others and they seem to grow back faster",

  competitor:
    "Competitors are expert trainers, making their pokemon grow faster",

  collector:
    "Collectors have better chances at catching pokemon and finding shiny pokemon ",

  explorer:
    "Explorers often find more items than others and lose fewer Items when they retreat",
};

export interface SaveFile {
  badges: BadgeName[];
  playerId: string;
  bag: Inventory;
  storage: Inventory;
  pokemon: OwnedPokemon[];
  money: number;
  researchPoints: number;
  meta: {
    activeTab: RoutesType;
    currentChallenger?: Challenger;
    currentChestId?: string;
  };
  handledOccupants: {
    id: string;
    //at this point in time (in ms), this occupant will be removed from the handled list
    resetAt: number;
  }[];
  lastEdited: number;
  lastNurse: string;
  settings?: SettingsObject;
  quests: Record<KumaQuestName, QuestStatus>;
  sprite: string;
  mileStones: MileStonesObject;
  farm: {
    plants: BerryBush[];
  };
  campUpgrades: Record<CampUpgrade, boolean>;
  honeyReadyAt?: number;
  dugtrioReadyAt?: number;
  zigzagoonReadyAt?: number;
  miltankReadyAt?: number;
  currentSwarm?: PokemonSwarm;
  currentStrongSwarm?: PokemonSwarm;
  currentDistortionSwarm?: PokemonSwarm;
  currentRampagingPokemon?: RampagingPokemon;
  rangerLevel?: number;
  troubleMakers?: TroubleMakers;
  seedVault: ItemType[];
  pokedex: Pokedex;
  cookingSkill?: number;
  currentRepel?: {
    type: RepelType;
    activeUntil: number;
  };
  currentLure?: {
    type: LureType;
    activeUntil: number;
  };
  catchBoosts?: CatchBoosts;
  catchStreak?: CatchStreak;
  longestStreak?: number;
  flying?: boolean;
  importedChallenger?: ImportedChallenger;
  trainerNotes?: SavedNote[];
  lostItems?: LostItem[];
  staticEncounters?: StaticEncounter[];
  randomTrainers?: StaticTrainer[];
  startingRegion?: StartingRegion;
  trait?: CharacterTrait;
}
