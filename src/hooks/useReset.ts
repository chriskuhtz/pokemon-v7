import { useCallback, useContext } from "react";

import { LocationContext } from "./LocationProvider";
import { GameDataContext } from "./useGameData";
import { SaveFileContext } from "./useSaveFile";

export const useReset = () => {
  const { saveFileId, locationId } = useContext(GameDataContext);
  const { resetSaveFile, saveFile } = useContext(SaveFileContext);
  const { resetLocation } = useContext(LocationContext);

  return useCallback(() => {
    saveFile.timedEvents?.forEach((h) => {
      window.localStorage.removeItem(h.id);
    });
    window.localStorage.removeItem(saveFileId);
    window.localStorage.removeItem(locationId);
    resetSaveFile();
    resetLocation();
  }, [
    locationId,
    resetLocation,
    resetSaveFile,
    saveFile.timedEvents,
    saveFileId,
  ]);
};
