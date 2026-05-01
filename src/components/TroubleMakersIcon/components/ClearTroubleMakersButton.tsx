import { useContext } from "react";
import {
  TbCircleLetterAFilled,
  TbCircleLetterMFilled,
  TbCircleLetterPFilled,
  TbCircleLetterRFilled,
} from "react-icons/tb";
import { battleSpriteSize } from "../../../constants/baseConstants";
import { typeColors } from "../../../constants/typeColors";
import {
  getCurrentTroubleMakers,
  removeTroubleMakers,
} from "../../../functions/TimedEvent";
import { MessageQueueContext } from "../../../hooks/useMessageQueue";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { EvilTeam } from "../../../interfaces/TimedEvent";
import "../TroubleMakersIcon.css";

export const ClearTroubleMakersButton = ({
  affiliation,
}: {
  affiliation: EvilTeam;
}): JSX.Element => {
  const { addMessage } = useContext(MessageQueueContext);
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  const troubleMakers = getCurrentTroubleMakers(saveFile);

  const handleClear = () => {
    addMessage({
      message: `All ${
        troubleMakers?.affiliation ?? "rocket"
      } Members defeated, Rangerlevel increased`,
    });

    patchSaveFileReducer(removeTroubleMakers(saveFile, "DEFEATED"));
  };
  if (affiliation === "aqua") {
    return (
      <TbCircleLetterAFilled
        className={"rocketIcon"}
        size={battleSpriteSize}
        color={typeColors["grass"]}
        onClick={handleClear}
      />
    );
  }
  if (affiliation === "galactic") {
    return (
      <TbCircleLetterPFilled
        className={"rocketIcon"}
        size={battleSpriteSize}
        color={typeColors["grass"]}
        onClick={handleClear}
      />
    );
  }
  if (affiliation === "magma") {
    return (
      <TbCircleLetterMFilled
        className={"rocketIcon"}
        size={battleSpriteSize}
        color={typeColors["grass"]}
        onClick={handleClear}
      />
    );
  }
  return (
    <TbCircleLetterRFilled
      className={"rocketIcon"}
      size={battleSpriteSize}
      color={typeColors["grass"]}
      onClick={handleClear}
    />
  );
  return <></>;
};
