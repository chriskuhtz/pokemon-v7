import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { mapsRecord } from "../constants/gameData/maps/mapsRecord";
import {
  cleanUpListOfSpecificEvents,
  getCurrentTroubleMakers,
  removeTroubleMakers,
} from "../functions/TimedEvent";
import { EmptyInventory } from "../interfaces/Inventory";
import { OverworldMap } from "../interfaces/OverworldMap";
import { CharacterLocationData } from "../interfaces/SaveFile";
import { GameDataContext } from "./useGameData";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export interface LocationContextType {
  location: CharacterLocationData;
  setLocation: (x: CharacterLocationData & { map?: OverworldMap }) => void;
  resetLocation: () => void;
  map: OverworldMap;
}

export const LocationContext = React.createContext({} as LocationContextType);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const { locationId, startingLocation, features } =
    useContext(GameDataContext);
  const { addMessage } = useContext(MessageQueueContext);
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const initValue: CharacterLocationData = useMemo(() => {
    const local = window.localStorage.getItem(locationId);
    return local
      ? (JSON.parse(local) as CharacterLocationData)
      : startingLocation;
  }, [locationId, startingLocation]);
  const [map, setMap] = useState<OverworldMap>(
    mapsRecord[initValue.mapId ?? startingLocation.mapId],
  );
  const [location, s] = useState<CharacterLocationData>(initValue);

  const handleMapChange = useCallback(
    (newLocation: CharacterLocationData) => {
      //evil teams escape if you leave
      if (newLocation.mapId === location.mapId) {
        return;
      }
      const troubleMakers = getCurrentTroubleMakers(saveFile);
      let updatedSave = { ...saveFile };
      let changed = false;
      const map = mapsRecord[location.mapId];
      if (
        location.mapId === troubleMakers?.mapId &&
        newLocation.mapId !== troubleMakers.mapId
      ) {
        addMessage({
          message: `The Team ${troubleMakers.affiliation} members got away`,
        });
        updatedSave = removeTroubleMakers(saveFile, "ESCAPED");
        changed = true;
      }

      if (map?.resetInventoryOnLeave && map.resetInventoryOnLeave(saveFile)) {
        updatedSave.bag = EmptyInventory;
        changed = true;
      }
      if (map?.resetOccupantsOnLeave && map.resetOccupantsOnLeave(saveFile)) {
        updatedSave = cleanUpListOfSpecificEvents(
          updatedSave,
          map.occupants.map((occ) => occ.id),
        );
        changed = true;
      }
      if (changed) {
        patchSaveFileReducer(updatedSave);
      }
    },
    [addMessage, location.mapId, patchSaveFileReducer, saveFile],
  );

  const setLocation = useCallback(
    (newLocation: CharacterLocationData & { map?: OverworldMap }) => {
      handleMapChange(newLocation);
      s(newLocation);
      if (newLocation.map) {
        setMap(newLocation.map);
      } else if (newLocation.mapId !== map.id) {
        setMap(mapsRecord[newLocation.mapId]);
      }
    },
    [handleMapChange, map.id],
  );

  const resetLocation = useCallback(() => {
    setLocation(startingLocation);
  }, [setLocation, startingLocation]);

  //SYNC WITH LOCAL STORAGE
  useEffect(() => {
    window.localStorage.setItem(locationId, JSON.stringify(location));
  }, [location, locationId]);

  //reset catch streak on location change
  useEffect(() => {
    if (!saveFile.catchStreak) {
      return;
    }
    if (location.mapId !== saveFile.catchStreak.mapId) {
      patchSaveFileReducer({ catchStreak: undefined });
    }
  }, [location, patchSaveFileReducer, saveFile]);

  const value = useMemo(
    () => ({
      location,
      setLocation,
      resetLocation,
      map: {
        ...map,
        questMenuAvailable: map.questMenuAvailable && features.quests,
      },
    }),
    [features.quests, location, map, resetLocation, setLocation],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
