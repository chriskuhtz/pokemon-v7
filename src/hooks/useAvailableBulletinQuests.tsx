import { useContext, useMemo } from "react";
import { Quest } from "../interfaces/Quest";
import { SaveFile } from "../interfaces/SaveFile";
import { KumaQuestName, KumaQuestsRecord } from "../versions/kuma/questsRecord";
import { SaveFileContext } from "./useSaveFile";

export const getAvailableBulletinQuests = (
  saveFile: SaveFile,
): {
  name: KumaQuestName;
  quest: Quest;
}[] =>
  Object.entries(KumaQuestsRecord)
    .map(([id, questData]) => {
      if (
        questData.availableAfter &&
        saveFile.quests[questData.availableAfter] !== "COLLECTED"
      ) {
        return;
      }
      if (
        questData.requiredUpgrade &&
        !saveFile.campUpgrades[questData.requiredUpgrade]
      ) {
        return;
      }
      if (
        questData.kind === "BULLETIN" &&
        saveFile.quests[id as KumaQuestName] === "INACTIVE"
      ) {
        return { name: id as KumaQuestName, quest: questData };
      }
    })
    .filter((q) => q !== undefined);

export const useAvailableBulletinQuests = (): {
  name: KumaQuestName;
  quest: Quest;
}[] => {
  const { saveFile } = useContext(SaveFileContext);

  return useMemo(() => getAvailableBulletinQuests(saveFile), [saveFile]);
};
