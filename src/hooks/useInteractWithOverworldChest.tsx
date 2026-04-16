import { useCallback, useContext } from "react";
import { joinInventories, EmptyInventory } from "../interfaces/Inventory";
import { OverworldChest } from "../interfaces/Occupant";
import { SaveFileContext } from "./useSaveFile";

export const useInteractWithOverworldChest = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);

  return useCallback(
    (chest: OverworldChest) => {
      const chestData = window.localStorage.getItem(chest.id ?? "");
      if (!chestData) {
        window.localStorage.setItem(
          chest.id,
          JSON.stringify(joinInventories(EmptyInventory, chest.contents)),
        );
      }
      patchSaveFileReducer({
        ...saveFile,
        meta: { activeTab: "CHEST", currentChestId: chest.id },
        handledOccupants: [
          ...saveFile.handledOccupants.filter((h) => h.id !== chest.id),
          { id: chest.id, resetAt: -1 },
        ],
      });

      return;
    },
    [patchSaveFileReducer, saveFile],
  );
};
