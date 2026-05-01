import { useContext, useMemo } from "react";
import { mapsRecord } from "../constants/gameData/maps/mapsRecord";
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
  const { location } = useContext(LocationContext);

  const swarm = getCurrentSwarm(saveFile, undefined);

  return useMemo(() => {
    const map = mapsRecord[location.mapId];
    if (
      swarm?.swarmType === "FUTURE_DISTORTION" &&
      location.mapId === swarm.mapId
    ) {
      return futureShader;
    }
    if (
      swarm?.swarmType === "SPACE_DISTORTION" &&
      location.mapId === swarm.mapId
    ) {
      return spaceShader;
    }
    if (
      swarm?.swarmType === "PAST_DISTORTION" &&
      location.mapId === swarm.mapId
    ) {
      return pastShader;
    }

    return map.timeOfDayShadersMap[getTimeOfDay()];
  }, [location.mapId, swarm]);
};
