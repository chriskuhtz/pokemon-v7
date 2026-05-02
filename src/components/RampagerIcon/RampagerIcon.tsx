import { useContext, useMemo } from "react";
import {
  cleanUpSpecificEvent,
  getCurrentBlocker,
  getCurrentRampager,
} from "../../functions/TimedEvent";
import { LocationContext } from "../../hooks/LocationProvider";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { PokemonSprite } from "../PokemonSprite/PokemonSprite";

export const RampagerIcon = () => {
  const { addMessage, addMultipleMessages } = useContext(MessageQueueContext);
  const { location } = useContext(LocationContext);
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const rampager = getCurrentRampager(saveFile);

  const defeated = useMemo(
    () => rampager?.id && getCurrentBlocker(saveFile, rampager.id),
    [rampager?.id, saveFile],
  );

  const handleClear = () => {
    if (!rampager) {
      return;
    }
    addMessage({
      message: `The rampaging pokemon has been handled`,
    });

    patchSaveFileReducer({
      ...cleanUpSpecificEvent(saveFile, rampager?.id),
      rangerLevel: (saveFile.rangerLevel ?? 0) + 1,
    });
  };

  if (!rampager) {
    return <></>;
  }

  if (defeated) {
    return (
      <div className="handledRampager" onClick={() => handleClear()}>
        <PokemonSprite name={rampager.name} />
      </div>
    );
  }
  if (location.mapId !== rampager.mapId) {
    return <></>;
  }

  return (
    <div
      className="rocketIcon"
      onClick={() =>
        addMultipleMessages([
          {
            message: `A strong ${rampager.name} is rampaging in the area`,
          },
          {
            message: `As Warden, it is your responsibility to handle it`,
          },
        ])
      }
    >
      <PokemonSprite name={rampager.name} />
    </div>
  );
};
