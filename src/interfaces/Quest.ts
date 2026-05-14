import { CampUpgrade } from "../constants/gameData/campUpgrades";
import { PokemonName } from "../constants/pokemonNames";
import { TimeOfDay } from "../functions/getTimeOfDay";
import { KumaQuestName } from "../versions/kuma/questsRecord";
import { BadgeName } from "./Badge";
import { Inventory } from "./Inventory";
import { MapId } from "./mapIds";
import { OwnedPokemon } from "./OwnedPokemon";
import { CatchBoosts, CharacterTrait, SaveFile } from "./SaveFile";

export type QuestStatus = "INACTIVE" | "ACTIVE" | "COLLECTED" | "FULFILLED";

export type QuestKind = "BULLETIN" | "QUEST_LINE";

export const questCategories = [
  "EXPLORATION",
  "RESEARCH",
  "BATTLE",
  "TRAINING",
  "POKEDEX",
  "GYM LEADER",
  "TRAVELLING TRAINER",
] as const;
export type QuestCategory = (typeof questCategories)[number];

export const researchBoni: Record<CharacterTrait, QuestCategory[]> = {
  chef: ["RESEARCH"],
  gardener: ["RESEARCH"],
  competitor: ["TRAVELLING TRAINER", "BATTLE"],
  collector: ["POKEDEX"],
  explorer: ["EXPLORATION"],
};

export interface Quest {
  //meta
  kind: QuestKind;
  category: QuestCategory;
  availableAfter?: KumaQuestName;
  requiredUpgrade?: CampUpgrade;
  progress?: (s: SaveFile) => { current: number; goal: number };
  //rewards
  rewardItems: Partial<Inventory>;
  rewardPokemon?: OwnedPokemon;
  researchPoints: number;
  rangerLevels?: number;
  catchBoosts?: Partial<CatchBoosts>;
  campUpgrade?: CampUpgrade;
  badge?: BadgeName;
  //conditions
  conditionFunction: (saveFile: SaveFile) => boolean;
  targetPokemon?: PokemonName[];
  targetRoute?: MapId;
  timeOfDay?: TimeOfDay;
}
