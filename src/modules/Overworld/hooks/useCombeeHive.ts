import { useCallback, useContext } from "react";
import { ONE_HOUR } from "../../../constants/baseConstants";
import { getMiddleOfThree } from "../../../functions/getMiddleOfThree";
import { getCurrentBlocker, startBlocker } from "../../../functions/TimedEvent";
import { MessageQueueContext } from "../../../hooks/useMessageQueue";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { joinInventories } from "../../../interfaces/Inventory";

export const useCombeeHive = () => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);

  return useCallback(() => {
    const honeyBlocker = getCurrentBlocker(saveFile, "COMBEE");
    if (!honeyBlocker) {
      const honeyAmounts = getMiddleOfThree([
        2,
        10,
        Math.floor(Math.random() * 11),
      ]);
      addMessage({
        message: `Gathered ${honeyAmounts} Portions of honey from the hive  `,
      });

      const withHoneyBlocker = startBlocker(saveFile, "COMBEE", ONE_HOUR);

      patchSaveFileReducer({
        ...withHoneyBlocker,
        bag: joinInventories(saveFile.bag, { honey: honeyAmounts }),
      });
    } else {
      addMessage({
        message: "The Combee are busy producing new honey",
        needsNoConfirmation: true,
      });
    }
  }, [saveFile, addMessage, patchSaveFileReducer]);
};
