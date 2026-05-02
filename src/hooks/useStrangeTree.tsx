import { useCallback, useContext } from "react";
import { ONE_DAY } from "../constants/baseConstants";
import {
  OPPO_ID,
  makeChallengerPokemon,
} from "../functions/makeChallengerPokemon";
import { startBlocker } from "../functions/TimedEvent";
import { Challenger } from "../interfaces/Challenger";
import { EmptyInventory } from "../interfaces/Inventory";
import { OverworldStrangeTree } from "../interfaces/Occupant";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export const useStrangeTree = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { addMultipleMessages } = useContext(MessageQueueContext);

  const interact = useCallback(
    (occ: OverworldStrangeTree) => {
      if (saveFile.bag["sprayduck"] <= 0) {
        addMultipleMessages([
          { message: "This is a strange tree", needsNoConfirmation: true },
          { message: "Could it be a pokemon?", needsNoConfirmation: true },
        ]);
        return;
      } else {
        const challenger: Challenger = {
          type: "WILD",
          id: OPPO_ID,
          inventory: EmptyInventory,
          team: [
            makeChallengerPokemon({
              name: "sudowoodo",
              xp: 64000,
            }),
          ],
        };

        addMultipleMessages([
          { message: "You water the tree with the sprayduck" },
          {
            message: "The Tree attacks",
            onRemoval: () => {
              patchSaveFileReducer({
                ...startBlocker(saveFile, occ.id, ONE_DAY),
                meta: { currentChallenger: challenger, activeTab: "BATTLE" },
              });
            },
          },
        ]);
      }
    },
    [addMultipleMessages, patchSaveFileReducer, saveFile],
  );

  return interact;
};
