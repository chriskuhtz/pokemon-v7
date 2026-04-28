import { useContext } from "react";
import { battleSpriteSize } from "../../constants/baseConstants";
import { getItemUrl } from "../../functions/getItemUrl";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { SaveFileContext } from "../../hooks/useSaveFile";
export const RepelIcon = () => {
  const { saveFile } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);

  if (!saveFile.currentRepel) {
    return <></>;
  }

  return (
    <img
      onClick={() =>
        addMessage({
          message: `${saveFile.currentRepel?.type} active until
              ${new Date(saveFile.currentRepel?.activeUntil ?? 0).toLocaleTimeString()}`,
        })
      }
      height={battleSpriteSize / 1.3}
      src={getItemUrl(saveFile.currentRepel.type)}
    />
  );
};
