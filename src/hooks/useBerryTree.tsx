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
      const isGardener = saveFile.trait === "gardener";
      const amount =
        getMiddleOfThree([1, Math.floor(Math.random() * 5), 5]) +
        (isGardener ? 1 : 0);
      const now = new Date().getTime();
      const time = now + ONE_HOUR * (isGardener ? 1 : 2);
      addMessage({
        icon: <img src={getItemUrl(tree.berry)} height={battleSpriteSize} />,
        message: `Harvested ${amount} ${tree.berry}`,
      });
      patchSaveFileReducer({
        bag: joinInventories(saveFile.bag, { [tree.berry]: amount }),
        handledOccupants: [
          ...saveFile.handledOccupants,
          { id: tree.id, resetAt: time },
        ],
      });
    },
    [
      addMessage,
      patchSaveFileReducer,
      saveFile.bag,
      saveFile.handledOccupants,
      saveFile.trait,
    ],
  );
};
