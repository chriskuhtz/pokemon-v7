import { useCallback, useContext } from "react";
import { battleSpriteSize, ONE_HOUR } from "../constants/baseConstants";
import { getBagLimit, getTotalInventoryAmount } from "../functions/getBagLimit";
import { getItemUrl } from "../functions/getItemUrl";
import { getMiddleOfThree } from "../functions/getMiddleOfThree";
import { startBlocker } from "../functions/TimedEvent";
import { joinInventories } from "../interfaces/Inventory";
import { BerryTree } from "../interfaces/Occupant";
import { LocationContext } from "./LocationProvider";
import { GameDataContext } from "./useGameData";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export const useBerryTree = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { addMessage, addMultipleMessages } = useContext(MessageQueueContext);
  const gameData = useContext(GameDataContext);
  const { location } = useContext(LocationContext);

  return useCallback(
    (tree: BerryTree) => {
      const isGardener = saveFile.trait === "gardener";
      const amount =
        getMiddleOfThree([1, Math.floor(Math.random() * 5), 5]) +
        (isGardener ? 1 : 0);

      const time = ONE_HOUR * (isGardener ? 1 : 2);

      const newInventory = joinInventories(saveFile.bag, {
        [tree.berry]: amount,
      });

      const wouldOverfillBag =
        getTotalInventoryAmount(newInventory) >
          getBagLimit(saveFile, gameData) && location.mapId !== "camp";

      if (wouldOverfillBag) {
        addMultipleMessages([
          {
            icon: (
              <img src={getItemUrl(tree.berry)} height={battleSpriteSize} />
            ),
            message: `There are ${amount} ${tree.berry} on the tree`,
          },
          {
            icon: (
              <img src={getItemUrl(tree.berry)} height={battleSpriteSize} />
            ),
            message: `But not enough space in your bag`,
          },
        ]);
        return;
      }

      addMessage({
        icon: <img src={getItemUrl(tree.berry)} height={battleSpriteSize} />,
        message: `Harvested ${amount} ${tree.berry}`,
      });
      patchSaveFileReducer({
        ...startBlocker(saveFile, tree.id, time),
        bag: joinInventories(saveFile.bag, { [tree.berry]: amount }),
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
