import { useCallback, useContext } from "react";
import { battleSpriteSize, ONE_HOUR } from "../constants/baseConstants";
import { getBagLimit, getTotalInventoryAmount } from "../functions/getBagLimit";
import { getItemUrl } from "../functions/getItemUrl";
import { getMiddleOfThree } from "../functions/getMiddleOfThree";
import { startBlocker } from "../functions/TimedEvent";
import { joinInventories } from "../interfaces/Inventory";
import { ApricornTree } from "../interfaces/Occupant";
import { LocationContext } from "./LocationProvider";
import { GameDataContext } from "./useGameData";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export const useApricornTree = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { addMessage, addMultipleMessages } = useContext(MessageQueueContext);
  const gameData = useContext(GameDataContext);
  const { location } = useContext(LocationContext);

  return useCallback(
    (tree: ApricornTree) => {
      const isGardener = saveFile.trait === "gardener";
      let amount =
        getMiddleOfThree([1, Math.floor(Math.random() * 5), 5]) +
        (isGardener ? 1 : 0);

      if (tree.apricorn === "purple-apricorn") {
        amount = 1;
      }

      const addedTime = ONE_HOUR * (isGardener ? 1 : 2);

      const newInventory = joinInventories(saveFile.bag, {
        [tree.apricorn]: amount,
      });

      const wouldOverfillBag =
        getTotalInventoryAmount(newInventory) >
          getBagLimit(saveFile, gameData) && location.mapId !== "camp";

      if (wouldOverfillBag) {
        addMultipleMessages([
          {
            icon: (
              <img src={getItemUrl(tree.apricorn)} height={battleSpriteSize} />
            ),
            message: `There are ${amount} ${tree.apricorn} on the tree`,
          },
          {
            icon: (
              <img src={getItemUrl(tree.apricorn)} height={battleSpriteSize} />
            ),
            message: `But not enough space in your bag`,
          },
        ]);
        return;
      }

      addMessage({
        icon: <img src={getItemUrl(tree.apricorn)} height={battleSpriteSize} />,
        message: `Harvested ${amount} ${tree.apricorn}`,
      });
      patchSaveFileReducer({
        ...startBlocker(saveFile, tree.id, addedTime),
        bag: newInventory,
      });
    },
    [
      addMessage,
      addMultipleMessages,
      gameData,
      location.mapId,
      patchSaveFileReducer,
      saveFile,
    ],
  );
};
