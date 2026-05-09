import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getCurrentTroubleMakers,
  removeTroubleMakers,
  resetBlockersWithPartialId,
} from "../functions/TimedEvent";
import { EmptyInventory } from "../interfaces/Inventory";
import { CharacterLocationData } from "../interfaces/SaveFile";
import { GameDataContext } from "./useGameData";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export interface LocationContextType {
  location: CharacterLocationData;
  setLocation: (x: CharacterLocationData) => void;
  resetLocation: () => void;
}

export const LocationContext = React.createContext({} as LocationContextType);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const { locationId, startingLocation } = useContext(GameDataContext);
  const { addMessage } = useContext(MessageQueueContext);
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const initValue: CharacterLocationData = useMemo(() => {
    const local = window.localStorage.getItem(locationId);
    return local
      ? (JSON.parse(local) as CharacterLocationData)
      : startingLocation;
  }, [locationId, startingLocation]);
  const [location, s] = useState<CharacterLocationData>(initValue);

  const setLocation = useCallback(
    (newLocation: CharacterLocationData) => {
      //evil teams escape if you leave
      const troubleMakers = getCurrentTroubleMakers(saveFile);
      if (
        location.mapId === troubleMakers?.mapId &&
        newLocation.mapId !== troubleMakers.mapId
      ) {
        addMessage({
          message: `The Team ${troubleMakers.affiliation} members got away`,
        });
        patchSaveFileReducer(removeTroubleMakers(saveFile, "ESCAPED"));
      }

      //reset inventory and challengeFielders when leaving challenge field
      if (
        newLocation.mapId !== "randomField" &&
        location.mapId === "randomField"
      ) {
        patchSaveFileReducer({
          ...resetBlockersWithPartialId(saveFile, "randomField"),
          bag: EmptyInventory,
        });
      } else if (
        newLocation.mapId !== "challengeField" &&
        location.mapId === "challengeField"
      ) {
        patchSaveFileReducer({
          ...resetBlockersWithPartialId(saveFile, "challengeField"),
          bag: EmptyInventory,
        });
      }
      //reset e4 before entering
      else if (
        newLocation.mapId == "pokemonLeague" &&
        location.mapId !== "pokemonLeague"
      ) {
        patchSaveFileReducer({
          ...resetBlockersWithPartialId(saveFile, "elite4"),
        });
      }
      //reset rocket hideout before entering
      else if (
        newLocation.mapId == "rocketCamp" &&
        location.mapId !== "rocketCamp"
      ) {
        patchSaveFileReducer({
          ...resetBlockersWithPartialId(saveFile, "Rocket"),
        });
      } else if (
        newLocation.mapId == "ilex-forest" &&
        location.mapId !== "ilex-forest" &&
        saveFile.quests["defeat team galactic in ilex forest"] === "ACTIVE"
      ) {
        patchSaveFileReducer({
          ...resetBlockersWithPartialId(saveFile, "galactic"),
        });
      }
      s(newLocation);
    },
    [addMessage, location.mapId, patchSaveFileReducer, saveFile],
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
    () => ({ location, setLocation, resetLocation }),
    [location, resetLocation, setLocation],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
