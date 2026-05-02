import { useCallback, useContext, useMemo } from "react";
import { ONE_HOUR } from "../constants/baseConstants";
import { getCurrentBlocker, startBlocker } from "../functions/TimedEvent";
import { joinInventories } from "../interfaces/Inventory";
import { BerryType, isBerry } from "../interfaces/Item";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export const useMiltankFarm = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);

  const ready = useMemo(() => {
    return !getCurrentBlocker(saveFile, "MILTANK");
  }, [saveFile]);

  const trade = useCallback(
    (berry: BerryType) => {
      addMessage({
        message: `Traded 1 ${berry} for 1 moomoo-milk`,
        needsNoConfirmation: true,
      });

      const blockerChecked =
        Math.random() > 0.85
          ? startBlocker(saveFile, "MILTANK", ONE_HOUR)
          : saveFile;
      patchSaveFileReducer({
        ...blockerChecked,
        bag: joinInventories(saveFile.bag, {
          [berry]: -1,
          "moomoo-milk": 1,
        }),
      });
    },
    [addMessage, patchSaveFileReducer, saveFile],
  );

  const tradeOptions: [BerryType, number][] = useMemo(
    () =>
      Object.entries(saveFile.bag).filter(
        ([item, amount]) => amount > 0 && isBerry(item),
      ) as [BerryType, number][],

    [saveFile.bag],
  );
  return {
    trade,
    tradeOptions,
    ready,
  };
};
