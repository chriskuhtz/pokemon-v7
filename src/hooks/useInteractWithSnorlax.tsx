import { useCallback, useContext } from "react";
import { ONE_DAY } from "../constants/baseConstants";
import {
  OPPO_ID,
  makeChallengerPokemon,
} from "../functions/makeChallengerPokemon";
import { startBlocker } from "../functions/TimedEvent";
import { Challenger } from "../interfaces/Challenger";
import { EmptyInventory } from "../interfaces/Inventory";
import { OverworldSnorlax } from "../interfaces/Occupant";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export const useInteractWithSnorlax = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { addMultipleMessages } = useContext(MessageQueueContext);

  const interact = useCallback(
    (occ: OverworldSnorlax) => {
      if (saveFile.bag["poke-flute"] <= 0) {
        addMultipleMessages([
          { message: "Snorlax is sleeping deeply", needsNoConfirmation: true },
          { message: "Maybe a song could wake it", needsNoConfirmation: true },
        ]);
        return;
      } else {
        const challenger: Challenger = {
          type: "WILD",
          id: OPPO_ID,
          inventory: EmptyInventory,
          team: [
            makeChallengerPokemon({
              name: "snorlax",
              xp: 64000,
            }),
          ],
        };

        addMultipleMessages([
          { message: "You play the pokeflute" },
          { message: "Snorlax wakes up grumpily ..." },
          {
            message: "and attacks",
            onRemoval: () => {
              patchSaveFileReducer({
                ...startBlocker(saveFile, occ.id, ONE_DAY),
                mileStones: { ...saveFile.mileStones, hasWokenASnorlax: true },
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
