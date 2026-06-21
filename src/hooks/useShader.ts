import { useContext, useMemo } from "react";
import {
  futureShader,
  getTimeOfDay,
  pastShader,
  spaceShader,
} from "../functions/getTimeOfDay";
import { getCurrentSwarm } from "../functions/TimedEvent";
import { LocationContext } from "./LocationProvider";
import { SaveFileContext } from "./useSaveFile";

export const useShader = () => {
  const { saveFile } = useContext(SaveFileContext);
  const { map } = useContext(LocationContext);

  const swarm = getCurrentSwarm(saveFile, undefined);

  return useMemo(() => {
    if (swarm?.swarmType === "FUTURE_DISTORTION" && map.id === swarm.mapId) {
      return futureShader;
    }
    if (swarm?.swarmType === "SPACE_DISTORTION" && map.id === swarm.mapId) {
      return spaceShader;
    }
    if (swarm?.swarmType === "PAST_DISTORTION" && map.id === swarm.mapId) {
      return pastShader;
    }

    return map.timeOfDayShadersMap[getTimeOfDay()];
  }, [map.id, map.timeOfDayShadersMap, swarm]);
};
