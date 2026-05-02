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
        const foundItem =
          Math.random() > 0.9
            ? ArrayHelpers.getRandomEntry(undergroundTable)
            : undefined;

        const updatedInventory = foundItem
          ? joinInventories(saveFile.bag, {
              [foundItem]: 1,
            })
          : saveFile.bag;

        const messages: Message[] = [
          {
            message: "You use your certified shovel skills",
          },
          foundItem
            ? { message: `found 1 ${foundItem} while digging` }
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
