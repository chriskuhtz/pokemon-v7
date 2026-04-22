import { useContext, useMemo } from "react";
import { BsBackpack4 } from "react-icons/bs";
import { battleSpriteSize } from "../../constants/gameData/gameData";
import { percentageBasedColor } from "../../constants/typeColors";
import {
  getBagLimit,
  getTotalInventoryAmount,
} from "../../functions/getBagLimit";
import { getMiddleOfThree } from "../../functions/getMiddleOfThree";
import { GameDataContext } from "../../hooks/useGameData";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { SaveFileContext } from "../../hooks/useSaveFile";

export const BagLimitIcon = () => {
  const gameData = useContext(GameDataContext);
  const { saveFile } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);
  const totalAmount = useMemo(
    () => getTotalInventoryAmount(saveFile.bag),
    [saveFile],
  );

  const limit = getBagLimit(saveFile, gameData);

  const actualpercentage = (totalAmount / limit) * 100;

  const percentage = getMiddleOfThree([0, actualpercentage, 100]).toFixed(0);

  let rate = totalAmount / limit;

  if (totalAmount >= limit) {
    rate = 1;
  }
  return (
    <div
      onClick={() =>
        addMessage({
          message: `${100 - Number(percentage)}% Bag Capacity available`,
        })
      }
      style={{ position: "relative" }}
    >
      <BsBackpack4
        style={{ zIndex: 0, position: "absolute" }}
        size={battleSpriteSize}
        color={percentageBasedColor(1 - rate).color}
      />
      <div
        style={{
          zIndex: 0,
          position: "absolute",
          maxHeight: (1 - rate) * battleSpriteSize,
          overflow: "hidden",
        }}
      >
        <BsBackpack4 size={battleSpriteSize} color="black" />
      </div>
    </div>
  );
};
