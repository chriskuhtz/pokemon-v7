import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  resetChallengeFielders,
  resetEliteFour,
} from "../functions/resetChallengeFielders";
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
      if (
        location.mapId === saveFile.troubleMakers?.route &&
        newLocation.mapId !== saveFile.troubleMakers.route
      ) {
        addMessage({
          message: `The Team ${saveFile.troubleMakers.affiliation} members got away`,
        });
        patchSaveFileReducer({
          troubleMakers: undefined,
        });
      }
      //reset challengeFielders before entering
      if (
        newLocation.mapId == "randomField" &&
        location.mapId !== "randomField"
      ) {
        patchSaveFileReducer({
          handledOccupants: resetChallengeFielders(saveFile.handledOccupants),
        });
      }
      if (
        newLocation.mapId == "challengeField" &&
        location.mapId !== "challengeField"
      ) {
        patchSaveFileReducer({
          handledOccupants: resetChallengeFielders(saveFile.handledOccupants),
        });
      }
      //reset e4 before entering
      if (
        newLocation.mapId == "pokemonLeague" &&
        location.mapId !== "pokemonLeague"
      ) {
        patchSaveFileReducer({
          handledOccupants: resetEliteFour(saveFile.handledOccupants),
        });
      }
      //reset rocket hideout before entering
      if (
        newLocation.mapId == "rocketCamp" &&
        location.mapId !== "rocketCamp"
      ) {
        patchSaveFileReducer({
          handledOccupants: resetEliteFour(saveFile.handledOccupants),
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

  // //RESCUE FROM SOFT LOCK
  // useEffect(() => {
  // 	if (saveFile.playerId.includes('simon')) {
  // 		setLocation(startingLocation);
  // 	}
  // }, [location, saveFile.playerId, setLocation]);

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
