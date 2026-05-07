import { useContext, useEffect, useMemo, useState } from "react";

import { mapsRecord } from "../../constants/gameData/maps/mapsRecord";
import { handleEnterPress } from "../../functions/handleEnterPress";
import { LocationContext } from "../../hooks/LocationProvider";
import { BaseSizeContext } from "../../hooks/useBaseSize";
import { useDrawForeground } from "../../hooks/useDrawBackground";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { OverworldMap } from "../../interfaces/OverworldMap";
import "./Overworld.css";
import { OverworldCanvasses } from "./components/OverworldCanvasses";
import { OverworldMenus } from "./components/OverworldMenus";
import { occupantsCanvasId, playerCanvasId } from "./constants/constants";
import { useDrawCharacter } from "./hooks/useDrawCharacter";
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
  const { location } = useContext(LocationContext);
  const navigate = useNavigate();

  const map = useMemo(
    (): OverworldMap => mapsRecord[location.mapId],
    [location.mapId],
  );

  //stop flying if area is not open
  useEffect(() => {
    const devmode = !!window.localStorage.getItem("devmode");
    if (
      mapsRecord[location.mapId].area !== "OPEN" &&
      saveFile.flying &&
      !devmode
    ) {
      patchSaveFileReducer({ flying: false });
    }
  }, [location, patchSaveFileReducer, saveFile]);

  const { rotateOccupant, occupants } = useOccupants();

  const sprite = useMemo(() => {
    if (saveFile.flying) {
      return "pidgeot";
    }
    const onWater = map.tileMap.waterLayer[location.y][location.x];
    const onSnow = map.id === "routeN1W1";
    if (onWater && saveFile.swimmerSprite) {
      return saveFile.swimmerSprite;
    }
    if (onSnow && saveFile.skierSprite) {
      return saveFile.skierSprite;
    }

    return saveFile.sprite;
  }, [
    saveFile.flying,
    saveFile.swimmerSprite,
    saveFile.sprite,
    saveFile.skierSprite,
    map.tileMap.waterLayer,
    map.id,
    location.y,
    location.x,
  ]);

  //DRAWING
  useDrawCharacter(playerCanvasId, location, sprite);
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
