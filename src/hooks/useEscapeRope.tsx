import { useCallback, useContext, useMemo } from "react";
import { joinInventories } from "../interfaces/Inventory";
import { LocationContext } from "./LocationProvider";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export const useEscapeRope = (): {
  applyEscapeRope: () => void;
  disabled: boolean;
} => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { resetLocation, map } = useContext(LocationContext);
  const { addMessage } = useContext(MessageQueueContext);
  const disabled = useMemo(() => {
    if (saveFile.bag["escape-rope"] <= 0) {
      return true;
    }

    return false;
  }, [saveFile]);
  const applyEscapeRope = useCallback(() => {
    if (disabled) {
      return;
    }
    if (map.area !== "CAVE") {
      addMessage({ message: `Escape Rope only works in caves` });
      return;
    }
    resetLocation();
    patchSaveFileReducer({
      ...saveFile,
      bag: joinInventories(saveFile.bag, { "escape-rope": 1 }, true),
      meta: { ...saveFile, activeTab: "OVERWORLD" },
    });
  }, [
    disabled,
    map.area,
    resetLocation,
    patchSaveFileReducer,
    saveFile,
    addMessage,
  ]);

  return { applyEscapeRope, disabled };
};
