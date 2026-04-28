import { OwnedPokemon } from "../../interfaces/OwnedPokemon";
import { QuestStatus } from "../../interfaces/Quest";
import { Pokedex } from "../../interfaces/SaveFile";
import { EmptyStatObject } from "../../interfaces/StatObject";
import {
  KumaQuestName,
  KumaQuestsRecord,
} from "../../versions/kuma/questsRecord";
import { pokemonNames } from "../pokemonNames";
import { CampUpgrade, campUpgradeNames } from "./campUpgrades";

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

export const baseQuestState: Record<KumaQuestName, QuestStatus> =
  Object.fromEntries(
    Object.keys(KumaQuestsRecord).map((key) => [key, "INACTIVE"]),
  ) as Record<KumaQuestName, QuestStatus>;

export const baseCampUpgrades: Record<CampUpgrade, boolean> =
  Object.fromEntries(
    campUpgradeNames.map((key) => [key, false]),
    //campUpgradeNames.map((key) => [key, true])
  ) as Record<CampUpgrade, boolean>;

export const emptyPokedex: Pokedex = Object.fromEntries(
  pokemonNames.map((a) => [a, { seenOnRoutes: [], caughtOnRoutes: [] }]),
) as unknown as Pokedex;
