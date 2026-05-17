import { OwnedPokemon } from "../interfaces/OwnedPokemon";
import { QuestStatus } from "../interfaces/Quest";
import { SaveFile } from "../interfaces/SaveFile";
import {
  KumaQuestName,
  kumaQuestNames,
  KumaQuestsRecord,
} from "../versions/kuma/questsRecord";
import { startingSaveFileKuma } from "../versions/kuma/saveFile";

export const migrateSavefile = (input: SaveFile) => {
  const updatedInput = { ...input };

  //return xp to integer
  updatedInput.pokemon = updatedInput.pokemon.map((p) => ({
    ...p,
    xp: Math.floor(p.xp),
  }));
  //remove possible duplicates
  const dedupedMons: OwnedPokemon[] = [];

  updatedInput.pokemon.forEach((p) => {
    if (!dedupedMons.some((d) => d.id === p.id)) {
      dedupedMons.push(p);
    }
  });
  updatedInput.pokemon = dedupedMons;
  //migrate new quests
  updatedInput.quests = Object.fromEntries(
    kumaQuestNames.map((q) => [q, updatedInput.quests[q] ?? "INACTIVE"]),
  ) as Record<KumaQuestName, QuestStatus>;
  //migrate in unlocks
  Object.entries(KumaQuestsRecord).forEach(([key, value]) => {
    if (!value.campUpgrade) {
      return;
    }
    if (updatedInput.quests[key as KumaQuestName] === "COLLECTED") {
      updatedInput.campUpgrades[value.campUpgrade] = true;
    }
  });
  //migrate in badges
  Object.entries(KumaQuestsRecord).forEach(([key, value]) => {
    if (!value.badge) {
      return;
    }
    if (updatedInput.quests[key as KumaQuestName] === "COLLECTED") {
      updatedInput.badges = [...new Set([...updatedInput.badges, value.badge])];
    }
  });
  //migrate in trees
  if (!updatedInput.farm.trees || updatedInput.farm.trees.length < 6) {
    updatedInput.farm.trees = startingSaveFileKuma.farm.trees;
  }

  //migrate in tickets
  if (
    updatedInput.quests["catch a ultra-rare pokemon from routeN1E1"] ===
      "COLLECTED" &&
    updatedInput.bag["forest-ticket"] === 0 &&
    updatedInput.storage["forest-ticket"] === 0
  ) {
    updatedInput.storage["forest-ticket"] = 1;
  }
  if (
    updatedInput.quests["catch a ultra-rare pokemon from routeS1E1"] ===
      "COLLECTED" &&
    updatedInput.bag["plains-ticket"] === 0 &&
    updatedInput.storage["plains-ticket"] === 0
  ) {
    updatedInput.storage["plains-ticket"] = 1;
  }
  if (
    updatedInput.quests["catch a ultra-rare pokemon from routeS1W1"] ===
      "COLLECTED" &&
    updatedInput.bag["hills-ticket"] === 0 &&
    updatedInput.storage["hills-ticket"] === 0
  ) {
    updatedInput.storage["hills-ticket"] = 1;
  }
  if (
    updatedInput.quests["catch a ultra-rare pokemon from routeN1W1"] ===
      "COLLECTED" &&
    updatedInput.bag["peak-ticket"] === 0 &&
    updatedInput.storage["peak-ticket"] === 0
  ) {
    updatedInput.storage["peak-ticket"] = 1;
  }

  return updatedInput;
};
