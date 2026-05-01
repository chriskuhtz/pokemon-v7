import { useContext, useMemo } from "react";
import {
  TbCircleLetterAFilled,
  TbCircleLetterGFilled,
  TbCircleLetterMFilled,
  TbCircleLetterRFilled,
} from "react-icons/tb";
import { battleSpriteSize } from "../../constants/baseConstants";
import { typeColors } from "../../constants/typeColors";
import { getCurrentTroubleMakers } from "../../functions/TimedEvent";
import {
  areAllActiveTroubleMakersDefeated,
  troubleMakersRemaining,
} from "../../functions/areAllTroubleMakersDefeated";
import { LocationContext } from "../../hooks/LocationProvider";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { SaveFileContext } from "../../hooks/useSaveFile";
import "./TroubleMakersIcon.css";
import { ClearTroubleMakersButton } from "./components/ClearTroubleMakersButton";
export const TroubleMakersIcon = () => {
  const { addMessage } = useContext(MessageQueueContext);
  const { location } = useContext(LocationContext);
  const { saveFile } = useContext(SaveFileContext);
  const troubleMakers = getCurrentTroubleMakers(saveFile);
  const remaining = useMemo(() => troubleMakersRemaining(saveFile), [saveFile]);

  if (!troubleMakers) {
    return <></>;
  }

  const { affiliation } = troubleMakers;
  if (areAllActiveTroubleMakersDefeated(saveFile)) {
    return <ClearTroubleMakersButton affiliation={affiliation} />;
  }
  if (location.mapId !== troubleMakers.mapId) {
    return <></>;
  }

  if (affiliation === "aqua") {
    return (
      <TbCircleLetterAFilled
        size={battleSpriteSize}
        color={typeColors["fighting"]}
        onClick={() =>
          addMessage({ message: `${remaining} Aqua Members remaining` })
        }
      />
    );
  }
  if (affiliation === "magma") {
    return (
      <TbCircleLetterMFilled
        size={battleSpriteSize}
        color={typeColors["fighting"]}
        onClick={() =>
          addMessage({
            message: `${remaining} Magma Members remaining`,
          })
        }
      />
    );
  }
  if (affiliation === "galactic") {
    return (
      <TbCircleLetterGFilled
        size={battleSpriteSize}
        color={typeColors["fighting"]}
        onClick={() =>
          addMessage({ message: `${remaining} galactic Members remaining` })
        }
      />
    );
  }

  return (
    <TbCircleLetterRFilled
      size={battleSpriteSize}
      color={typeColors["fighting"]}
      onClick={() =>
        addMessage({ message: `${remaining} Rocket Trainers remaining` })
      }
    />
  );
};
