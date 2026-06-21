import { useContext, useEffect, useState } from "react";

import { handleEnterPress } from "../../functions/handleEnterPress";
import { LocationContext } from "../../hooks/LocationProvider";
import { BaseSizeContext } from "../../hooks/useBaseSize";
import { useDrawForeground } from "../../hooks/useDrawBackground";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import "./Overworld.css";
import { OverworldCanvasses } from "./components/OverworldCanvasses";
import { OverworldMenus } from "./components/OverworldMenus";
import { occupantsCanvasId } from "./constants/constants";
import { useDrawOccupants } from "./hooks/useDrawOccupants";
import { useInteractWith } from "./hooks/useInteractWith";
import { useKeyboardControl } from "./hooks/useKeyboardControl";
import { useMovement } from "./hooks/useMovement";
import { useOccupants } from "./hooks/useOccupants";

export const Overworld = ({ uncontrolled }: { uncontrolled?: boolean }) => {
  const { baseSize } = useContext(BaseSizeContext);
  const [stepsTaken, setStepsTaken] = useState<number>(0);

  const { latestMessage } = useContext(MessageQueueContext);
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { location, map } = useContext(LocationContext);
  const navigate = useNavigate();

  //stop flying if area is not open
  useEffect(() => {
    const devmode = !!window.localStorage.getItem("devmode");
    if (map.area !== "OPEN" && saveFile.flying && !devmode) {
      patchSaveFileReducer({ flying: false });
    }
  }, [location, map.area, patchSaveFileReducer, saveFile]);

  const { rotateOccupant, occupants } = useOccupants();

  //DRAWING
  useDrawOccupants(occupantsCanvasId, occupants, baseSize);
  //INTERACTION
  useDrawForeground("foreground", map.tileMap, map.tilesetUrl, baseSize);
  const interactWith = useInteractWith(stepsTaken, rotateOccupant);

  const setNextInput = useMovement(occupants, stepsTaken, setStepsTaken);

  useKeyboardControl(
    setNextInput,
    () => handleEnterPress(location, interactWith, occupants),
    () => navigate("OVERWORLD", "MAIN", stepsTaken),
    () => navigate("OVERWORLD", "QUESTS", stepsTaken),
    () => navigate("OVERWORLD", "TEAM", stepsTaken),
    () => navigate("OVERWORLD", "BAG", stepsTaken),
    !!(latestMessage || uncontrolled),
  );

  return (
    <div>
      {!uncontrolled && (
        <OverworldMenus
          stepsTaken={stepsTaken}
          setNextInput={setNextInput}
          handleEnterPress={() =>
            handleEnterPress(location, interactWith, occupants)
          }
        />
      )}
      <OverworldCanvasses
        setNextInput={setNextInput}
        interactWith={interactWith}
        occupants={occupants}
      />
    </div>
  );
};
