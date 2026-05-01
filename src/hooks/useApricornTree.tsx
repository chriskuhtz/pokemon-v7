import { useCallback, useContext } from "react";
import { battleSpriteSize, ONE_HOUR } from "../constants/baseConstants";
import { getItemUrl } from "../functions/getItemUrl";
import { getMiddleOfThree } from "../functions/getMiddleOfThree";
import { joinInventories } from "../interfaces/Inventory";
import { ApricornTree } from "../interfaces/Occupant";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export const useApricornTree = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);

  return useCallback(
    (tree: ApricornTree) => {
      const isGardener = saveFile.trait === "gardener";
      let amount =
        getMiddleOfThree([1, Math.floor(Math.random() * 5), 5]) +
        (isGardener ? 1 : 0);

      if (tree.apricorn === "purple-apricorn") {
        amount = 1;
      }
      const now = new Date().getTime();
      const time = now + ONE_HOUR * (isGardener ? 1 : 2);
      addMessage({
        icon: <img src={getItemUrl(tree.apricorn)} height={battleSpriteSize} />,
        message: `Harvested ${amount} ${tree.apricorn}`,
      });
      patchSaveFileReducer({
        bag: joinInventories(saveFile.bag, { [tree.apricorn]: amount }),
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
