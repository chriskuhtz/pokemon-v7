import { useCallback, useContext } from "react";
import { ONE_HOUR } from "../../../constants/baseConstants";
import { ArrayHelpers } from "../../../functions/ArrayHelpers";
import { getUnderRockEncounters } from "../../../functions/internalDex";
import {
  makeChallengerPokemon,
  OPPO_ID,
} from "../../../functions/makeChallengerPokemon";
import { getCurrentBlocker, startBlocker } from "../../../functions/TimedEvent";
import { GameDataContext } from "../../../hooks/useGameData";
import { Message, MessageQueueContext } from "../../../hooks/useMessageQueue";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { InternalDex } from "../../../interfaces/GameData";
import { EmptyInventory, joinInventories } from "../../../interfaces/Inventory";
import { undergroundTable } from "../../../interfaces/Item";
import { getRandomNature } from "../../../interfaces/Natures";
import { OverworldRock } from "../../../interfaces/Occupant";
import { OwnedPokemon } from "../../../interfaces/OwnedPokemon";
import { SaveFile } from "../../../interfaces/SaveFile";

const SLEDGEHAMMER_ENCOUNTER_OPTIONS = (
  internalDex: InternalDex,
): OwnedPokemon[] =>
  getUnderRockEncounters(internalDex).map((h) =>
    makeChallengerPokemon({
      nature: getRandomNature(),
      name: h,
      xp: 3375,
      caughtOnMap: "routeN1",
    }),
  );
export const useSledgeHammer = () => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { addMultipleMessages } = useContext(MessageQueueContext);
  const { internalDex } = useContext(GameDataContext);
  return useCallback(
    (rock: OverworldRock) => {
      if (getCurrentBlocker(saveFile, rock.id)) {
        return;
      }
      if (saveFile.campUpgrades["sledge hammer certification"]) {
        const itemChance = saveFile.trait === "archaeologist" ? 0.75 : 0.9;
        const amount =
          saveFile.trait === "archaeologist" && Math.random() > 0.9 ? 2 : 1;
        const encounterChance = saveFile.trait === "archaeologist" ? 0.75 : 0.9;
        const foundItem =
          Math.random() > itemChance
            ? ArrayHelpers.getRandomEntry(undergroundTable)
            : undefined;
        const encounter =
          Math.random() > encounterChance
            ? ArrayHelpers.getRandomEntry(
                SLEDGEHAMMER_ENCOUNTER_OPTIONS(internalDex),
              )
            : undefined;

        const updatedInventory = foundItem
          ? joinInventories(saveFile.bag, {
              [foundItem]: amount,
            })
          : saveFile.bag;
        const meta: SaveFile["meta"] = encounter
          ? {
              activeTab: "BATTLE",
              currentChallenger: {
                team: [encounter],
                type: "WILD",
                inventory: EmptyInventory,
                id: OPPO_ID,
              },
            }
          : saveFile.meta;

        const messages: Message[] = [
          {
            message: "You use your certified sledge hammer skills",
          },
          foundItem
            ? { message: `found ${amount} ${foundItem} in the rubble` }
            : undefined,
          encounter
            ? { message: "You startled a pokemon under the rock" }
            : undefined,
        ].filter((m) => m !== undefined);

        addMultipleMessages(
          messages.map((m, i) => {
            if (i === messages.length - 1) {
              return {
                ...m,
                onRemoval: () =>
                  patchSaveFileReducer({
                    ...startBlocker(
                      saveFile,
                      rock.id,
                      ONE_HOUR * Math.random(),
                    ),
                    bag: updatedInventory,
                    meta,
                    mileStones: {
                      ...saveFile.mileStones,
                      hasfoundAPokemonBySmashingRocks: encounter
                        ? true
                        : saveFile.mileStones.hasfoundAPokemonBySmashingRocks,
                    },
                  }),
              };
            }
            return m;
          }),
        );
      } else
        addMultipleMessages([
          {
            message: "You need a sledge hammer certification to demolish rocks",
          },
          { message: "bureaucracy ..." },
        ]);
      return;
    },
    [addMultipleMessages, internalDex, patchSaveFileReducer, saveFile],
  );
};
