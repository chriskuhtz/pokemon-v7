import { useContext } from "react";
import { battleSpriteSize } from "../../constants/baseConstants";
import { getItemUrl } from "../../functions/getItemUrl";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { SaveFileContext } from "../../hooks/useSaveFile";
export const LureIcon = () => {
  const { saveFile } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);

  if (!saveFile.currentLure) {
    return <></>;
  }

  return (
    <img
      onClick={() =>
        addMessage({
          message: `${saveFile.currentLure?.type} active until
            ${new Date(saveFile.currentLure?.activeUntil ?? 0).toLocaleTimeString()}`,
        })
      }
      height={battleSpriteSize / 1.3}
      src={getItemUrl(saveFile.currentLure.type)}
    />
  );
};
