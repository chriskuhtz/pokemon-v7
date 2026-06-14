import { useCallback, useContext } from "react";
import { ONE_HOUR } from "../../../constants/baseConstants";
import { ArrayHelpers } from "../../../functions/ArrayHelpers";
import { getCurrentBlocker, startBlocker } from "../../../functions/TimedEvent";
import { Message, MessageQueueContext } from "../../../hooks/useMessageQueue";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { joinInventories } from "../../../interfaces/Inventory";
import { undergroundTable } from "../../../interfaces/Item";
import { Ledge } from "../../../interfaces/Occupant";

export const useShovel = () => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { addMultipleMessages } = useContext(MessageQueueContext);

  return useCallback(
    (ledge: Ledge) => {
      if (getCurrentBlocker(saveFile, ledge.id)) {
        return;
      }
      if (saveFile.campUpgrades["shovel certification"]) {
        const chance = saveFile.trait === "archaeologist" ? 0.75 : 0.9;
        const amount =
          saveFile.trait === "archaeologist" && Math.random() > 0.9 ? 2 : 1;
        const foundItem =
          Math.random() > chance
            ? ArrayHelpers.getRandomEntry(undergroundTable)
            : undefined;

        const updatedInventory = foundItem
          ? joinInventories(saveFile.bag, {
              [foundItem]: amount,
            })
          : saveFile.bag;

        const messages: Message[] = [
          {
            message: "You use your certified shovel skills",
          },
          foundItem
            ? { message: `found ${amount} ${foundItem} while digging` }
            : undefined,
        ].filter((m) => m !== undefined);

        addMultipleMessages(
          messages.map((m, i) => {
            if (i === messages.length - 1) {
              return {
                ...m,
                onRemoval: () =>
                  patchSaveFileReducer({
                    ...startBlocker(
                      saveFile,
                      ledge.id,
                      ONE_HOUR * Math.random(),
                    ),
                    bag: updatedInventory,
                  }),
              };
            }
            return m;
          }),
        );
      } else
        addMultipleMessages([
          {
            message: "You need a sledge hammer certification to demolish rocks",
          },
          { message: "bureaucracy ..." },
        ]);
      return;
    },
    [saveFile, addMultipleMessages, patchSaveFileReducer],
  );
};
