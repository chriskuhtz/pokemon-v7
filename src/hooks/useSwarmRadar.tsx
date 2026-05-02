import { useCallback, useContext, useMemo } from "react";
import { mapDisplayNames } from "../constants/gameData/maps/mapsRecord";
import { ArrayHelpers } from "../functions/ArrayHelpers";
import { getRandomAvailableRoute } from "../functions/getRandomAvailableRoute";
import {
  addStaticEncounterToSaveFile,
  getCurrentSwarm,
  startSwarm,
} from "../functions/TimedEvent";
import { SwarmType } from "../interfaces/Pokedex";
import { SwarmEvent } from "../interfaces/TimedEvent";
import { GameDataContext } from "./useGameData";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export type ScanMode = "WEAK" | "STRONG" | "DISTORTION" | "RAMPAGE";
export const useSwarmRadar = (): {
  activeSwarms: SwarmEvent[];
  scan: (mode: ScanMode) => void;
} => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);
  const { internalDex } = useContext(GameDataContext);

  const addSwarmMessage = useCallback(
    (s: SwarmEvent) => {
      if (s.swarmType === "SPACE_DISTORTION") {
        addMessage({
          message: `The radar detects a space distortion at ${
            mapDisplayNames[s.mapId]
          }`,
          needsNoConfirmation: true,
        });
      } else if (
        s.swarmType === "FUTURE_DISTORTION" ||
        s.swarmType === "PAST_DISTORTION"
      ) {
        addMessage({
          message: `The radar detects a time distortion at ${
            mapDisplayNames[s.mapId]
          }`,
          needsNoConfirmation: true,
        });
      } else
        addMessage({
          message: `The radar detects swarms of ${s.pokemon} at ${
            mapDisplayNames[s.mapId]
          }`,
          needsNoConfirmation: true,
        });
    },
    [addMessage],
  );

  const activeSwarms: SwarmEvent[] = useMemo(
    () =>
      [
        getCurrentSwarm(saveFile, "WEAK"),
        getCurrentSwarm(saveFile, "STRONG"),
        getCurrentSwarm(saveFile, "PAST_DISTORTION"),
        getCurrentSwarm(saveFile, "FUTURE_DISTORTION"),
        getCurrentSwarm(saveFile, "SPACE_DISTORTION"),
      ].filter((s) => s !== undefined),
    [saveFile],
  );

  const handleRampage = useCallback(() => {
    patchSaveFileReducer(
      addStaticEncounterToSaveFile(saveFile, internalDex, true),
    );
  }, [internalDex, patchSaveFileReducer, saveFile]);

  const scan = useCallback(
    (mode: ScanMode) => {
      const route = getRandomAvailableRoute(
        saveFile,
        activeSwarms.map((a) => a.mapId),
      );

      if (!route) {
        addMessage({ message: `The radar did not detect anything` });
        return;
      }

      if (mode === "RAMPAGE") {
        handleRampage();
        return;
      }

      const swarmType = (): SwarmType => {
        if (mode === "STRONG") {
          return "STRONG";
        }
        if (mode === "DISTORTION") {
          const options: SwarmType[] = ["FUTURE_DISTORTION", "PAST_DISTORTION"];

          if (saveFile.campUpgrades["space distortion radar"]) {
            options.push("SPACE_DISTORTION");
          }
          return ArrayHelpers.getRandomEntry(options);
        }

        return "WEAK";
      };

      const withSwarm = startSwarm(saveFile, swarmType(), route, internalDex);
      const newSwarm = getCurrentSwarm(withSwarm, swarmType());
      if (!newSwarm) {
        return;
      }
      addSwarmMessage(newSwarm);

      patchSaveFileReducer(withSwarm);
    },
    [
      activeSwarms,
      addMessage,
      addSwarmMessage,
      handleRampage,
      internalDex,
      patchSaveFileReducer,
      saveFile,
    ],
  );

  return { activeSwarms, scan };
};
