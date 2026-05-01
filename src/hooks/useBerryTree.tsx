import { useCallback, useContext } from "react";
import { battleSpriteSize, ONE_HOUR } from "../constants/baseConstants";
import { getItemUrl } from "../functions/getItemUrl";
import { getMiddleOfThree } from "../functions/getMiddleOfThree";
import { joinInventories } from "../interfaces/Inventory";
import { BerryTree } from "../interfaces/Occupant";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export const useBerryTree = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);

  return useCallback(
    (tree: BerryTree) => {
      const amount = getMiddleOfThree([1, Math.floor(Math.random() * 5), 5]);
      const now = new Date().getTime();
      addMessage({
        icon: <img src={getItemUrl(tree.berry)} height={battleSpriteSize} />,
        message: `Harvested ${amount} ${tree.berry}`,
      });
      patchSaveFileReducer({
        bag: joinInventories(saveFile.bag, { [tree.berry]: amount }),
        handledOccupants: [
          ...saveFile.handledOccupants,
          { id: tree.id, resetAt: now + ONE_HOUR * 2 },
        ],
      });
    },
    [addMessage, patchSaveFileReducer, saveFile.bag, saveFile.handledOccupants],
  );
};
