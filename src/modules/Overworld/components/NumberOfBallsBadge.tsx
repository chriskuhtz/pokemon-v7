import { useContext, useMemo } from "react";
import { MdCatchingPokemon } from "react-icons/md";
import { battleSpriteSize } from "../../../constants/gameData/gameData";
import { percentageBasedColor } from "../../../constants/typeColors";
import { getBagLimit } from "../../../functions/getBagLimit";
import { GameDataContext } from "../../../hooks/useGameData";
import { MessageQueueContext } from "../../../hooks/useMessageQueue";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { isPokeball } from "../../../interfaces/Item";

export const NumberOfBallsBadge = (): JSX.Element => {
  const { saveFile } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);
  const gameData = useContext(GameDataContext);
  const numberOfBalls = useMemo(() => {
    return Object.entries(saveFile.bag)
      .filter(([item]) => isPokeball(item))
      .reduce((sum, summand) => sum + summand[1], 0);
  }, [saveFile]);

  const limit = getBagLimit(saveFile, gameData);

  let rate = numberOfBalls / limit;

  if (numberOfBalls >= limit) {
    rate = 1;
  }
  return (
    <div
      onClick={() =>
        addMessage({ message: `${numberOfBalls} Pokeballs in Bag` })
      }
      style={{ position: "relative" }}
    >
      <MdCatchingPokemon
        style={{ zIndex: 0, position: "absolute" }}
        size={battleSpriteSize}
        color={percentageBasedColor(rate).color}
      />
      <div
        style={{
          zIndex: 0,
          position: "absolute",
          maxHeight: (1 - rate) * battleSpriteSize,
          overflow: "hidden",
        }}
      >
        <MdCatchingPokemon size={battleSpriteSize} color="black" />
      </div>
    </div>
  );
};
