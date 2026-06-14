import { useCallback, useContext, useMemo } from "react";
import { ArrayHelpers } from "../../../functions/ArrayHelpers";
import { MessageQueueContext } from "../../../hooks/useMessageQueue";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { joinInventories } from "../../../interfaces/Inventory";
import {
  berries,
  isFossil,
  isItem,
  isValuable,
  ItemType,
} from "../../../interfaces/Item";

export const useCurator = (): {
  trade: (tradeIn: ItemType) => void;
  possibleTradeIns: ItemType[];
} => {
  const { addMultipleMessages } = useContext(MessageQueueContext);
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  const possibleTradeIns = useMemo(() => {
    return Object.entries(saveFile.bag)
      .filter(([item, amount]) => {
        return amount > 0 && (isValuable(item) || isFossil(item));
      })
      .map(([item]) => item)
      .filter(isItem);
  }, [saveFile.bag]);

  const trade = useCallback(
    (tradeIn: ItemType) => {
      const points = saveFile.trait === "archaeologist" ? 3 : 1;
      const randomBerry = ArrayHelpers.getRandomEntry([...berries]);
      addMultipleMessages([
        {
          message: `Received ${points} Research Point${points > 1 ? "s" : ""} and a ${randomBerry} for donating a ${tradeIn}`,
        },
        { message: "Thanks for your contribution", needsNoConfirmation: true },
        {
          message: "I will put in a good word with the university director",
          needsNoConfirmation: true,
        },
      ]);
      patchSaveFileReducer({
        bag: joinInventories(saveFile.bag, {
          [tradeIn]: -1,
          [randomBerry]: 1,
        }),
        researchPoints: saveFile.researchPoints + points,
      });
    },
    [
      addMultipleMessages,
      patchSaveFileReducer,
      saveFile.bag,
      saveFile.researchPoints,
      saveFile.trait,
    ],
  );

  return { trade, possibleTradeIns };
};
