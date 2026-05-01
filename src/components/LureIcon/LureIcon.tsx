import { useContext } from "react";
import { battleSpriteSize } from "../../constants/baseConstants";
import { getItemUrl } from "../../functions/getItemUrl";
import { getCurrentLure } from "../../functions/TimedEvent";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { SaveFileContext } from "../../hooks/useSaveFile";
export const LureIcon = () => {
  const { saveFile } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);

  const currentLure = getCurrentLure(saveFile);

  if (!currentLure) {
    return <></>;
  }

  return (
    <img
      onClick={() =>
        addMessage({
          message: `${currentLure?.lureType} active until
            ${new Date(currentLure?.removeAt ?? 0).toLocaleTimeString()}`,
        })
      }
      height={battleSpriteSize / 1.3}
      src={getItemUrl(currentLure.lureType)}
    />
  );
};
