import { useCallback, useContext } from "react";
import { startBlocker } from "../functions/TimedEvent";
import { EmptyInventory, joinInventories } from "../interfaces/Inventory";
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
        ...startBlocker(saveFile, chest.id, -1),
        meta: { activeTab: "CHEST", currentChestId: chest.id },
      });

      return;
    },
    [patchSaveFileReducer, saveFile],
  );
};
