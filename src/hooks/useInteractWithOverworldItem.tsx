import { useContext, useCallback } from "react";
import { battleSpriteSize } from "../constants/gameData/gameData";
import { getTotalInventoryAmount, getBagLimit } from "../functions/getBagLimit";
import { getItemUrl } from "../functions/getItemUrl";
import { joinInventories } from "../interfaces/Inventory";
import { getRandomItem } from "../interfaces/Item";
import { OverworldItem, OverworldHiddenItem, OverworldInvisbleItem } from "../interfaces/Occupant";
import { GameDataContext } from "./useGameData";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export const useInteractWithOverworldItem = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);
  const gameData = useContext(GameDataContext);

  return useCallback(
    (data: OverworldItem | OverworldHiddenItem|OverworldInvisbleItem) => {
      const occ = saveFile.settings?.randomOverworldItems
        ? { ...data, item: getRandomItem() }
        : data;
      const { item, amount } = occ;
      let newInventory = { ...saveFile.bag };
      newInventory = joinInventories(newInventory, { [item]: amount });

      if (
        getTotalInventoryAmount(newInventory) > getBagLimit(saveFile, gameData)
      ) {
        addMessage({
          message: `Your Bag is full,  cant carry ${amount} more items`,
          needsNoConfirmation: true,
        });
        return;
      } else
        addMessage({
          icon: <img src={getItemUrl(item)} height={battleSpriteSize} />,
          message: `Found ${amount} ${item}`,
          needsNoConfirmation: true,
          onRemoval: () => {
            patchSaveFileReducer({
              ...saveFile,
              bag: newInventory,
              handledOccupants: [
                ...saveFile.handledOccupants,
                { id: occ.id, resetAt: -1 },
              ],
            });
          },
        });
    },
    [addMessage, gameData, patchSaveFileReducer, saveFile],
  );
};
