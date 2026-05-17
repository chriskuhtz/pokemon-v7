import { useContext, useMemo } from "react";
import { BsBackpack4 } from "react-icons/bs";
import { battleSpriteSize } from "../../constants/baseConstants";
import { percentageBasedColor } from "../../constants/typeColors";
import {
  getBagLimit,
  getTotalInventoryAmount,
} from "../../functions/getBagLimit";
import { GameDataContext } from "../../hooks/useGameData";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";

export const HudBagLimitIcon = () => {
  const gameData = useContext(GameDataContext);
  const { saveFile } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);
  const totalAmount = useMemo(
    () => getTotalInventoryAmount(saveFile.bag),
    [saveFile],
  );

  const navigate = useNavigate();
  const limit = getBagLimit(saveFile, gameData);

  let rate = totalAmount / limit;

  if (totalAmount >= limit) {
    rate = 1;
  }
  return (
    <div style={{ position: "relative" }}>
      <BagLimitIcon
        rate={rate}
        onClick={() =>
          addMessage({
            message: `${Math.max(limit - totalAmount, 0)} of ${limit} Slots empty`,
            onRemoval: () => navigate("OVERWORLD", "BAG"),
            needsNoConfirmation: true,
          })
        }
      />
    </div>
  );
};

export const BagLimitIcon = ({
  rate,
  onClick,
}: {
  rate: number;
  onClick?: () => void;
}) => {
  return (
    <>
      <BsBackpack4
        onClick={onClick}
        style={{ zIndex: 0, position: "absolute" }}
        size={battleSpriteSize}
        color={percentageBasedColor(1 - rate).color}
      />
      <div
        onClick={onClick}
        style={{
          zIndex: 0,
          position: "absolute",
          maxHeight: (1 - rate) * battleSpriteSize,
          overflow: "hidden",
        }}
      >
        <BsBackpack4 size={battleSpriteSize} color="black" />
      </div>
    </>
  );
};
