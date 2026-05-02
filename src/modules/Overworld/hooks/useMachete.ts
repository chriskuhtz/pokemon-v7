import { useCallback, useContext } from "react";
import { ONE_DAY } from "../../../constants/baseConstants";
import { getCurrentBlocker, startBlocker } from "../../../functions/TimedEvent";
import { GameDataContext } from "../../../hooks/useGameData";
import { MessageQueueContext } from "../../../hooks/useMessageQueue";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { OverworldBush } from "../../../interfaces/Occupant";

export const useMachete = () => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { addMultipleMessages } = useContext(MessageQueueContext);
  const { overworldActions } = useContext(GameDataContext);

  return useCallback(
    (bush: OverworldBush) => {
      if (getCurrentBlocker(saveFile, bush.id)) {
        return;
      }
      if (overworldActions.bushCutting.possible(saveFile)) {
        addMultipleMessages(
          overworldActions.bushCutting.successDialogue.map((d, i) => ({
            message: d,
            onRemoval:
              i === overworldActions.bushCutting.successDialogue.length - 1
                ? () =>
                    patchSaveFileReducer({
                      ...startBlocker(saveFile, bush.id, ONE_DAY),
                    })
                : undefined,
          })),
        );
      } else
        addMultipleMessages(
          overworldActions.bushCutting.failDialogue.map((d) => ({
            message: d,
          })),
        );
    },
    [
      addMultipleMessages,
      overworldActions.bushCutting,
      patchSaveFileReducer,
      saveFile,
    ],
  );
};
