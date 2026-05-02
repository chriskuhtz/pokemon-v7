import { useCallback, useContext } from "react";
import { SpriteIcon } from "../components/SpriteIcon/SpriteIcon";
import { getCurrentBlocker, startBlocker } from "../functions/TimedEvent";
import { EmptyInventory, joinInventories } from "../interfaces/Inventory";
import { OverworldNpc } from "../interfaces/Occupant";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export const useInteractWithNPC = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { addMultipleMessages } = useContext(MessageQueueContext);

  return useCallback(
    (occ: OverworldNpc) => {
      if (!getCurrentBlocker(saveFile, occ.id)) {
        addMultipleMessages(
          [
            ...occ.unhandledMessage.map((d, i) => ({
              icon: <SpriteIcon sprite={occ.sprite} />,
              message: d,
              onRemoval:
                i === occ.unhandledMessage.length - 1
                  ? () => {
                      const updatedQuests = saveFile.quests;
                      if (occ.quest) {
                        const { quest } = occ;
                        if (updatedQuests[quest] === "INACTIVE") {
                          updatedQuests[quest] = "ACTIVE";
                        }
                      }
                      patchSaveFileReducer({
                        ...startBlocker(saveFile, occ.id, -1),
                        bag: joinInventories(
                          saveFile.bag,
                          occ.gifts ?? EmptyInventory,
                        ),
                        quests: updatedQuests,
                      });
                    }
                  : undefined,
            })),
            ...Object.entries(occ.gifts ?? {}).map(([item, amount]) => ({
              message: `received ${amount} ${item}`,
            })),
            occ.quest ? { message: `new quest: ${occ.quest}` } : undefined,
          ].filter((m) => m !== undefined),
        );
      } else {
        addMultipleMessages(
          (occ.handledMessage ?? occ.unhandledMessage).map((d) => {
            return {
              icon: <SpriteIcon sprite={occ.sprite} />,
              message: d,
            };
          }),
        );
      }
    },
    [addMultipleMessages, patchSaveFileReducer, saveFile],
  );
};
