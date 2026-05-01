import { useContext } from "react";
import { battleSpriteSize } from "../../constants/baseConstants";
import { getItemUrl } from "../../functions/getItemUrl";
import { getCurrentRepel } from "../../functions/TimedEvent";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { SaveFileContext } from "../../hooks/useSaveFile";
export const RepelIcon = () => {
  const { saveFile } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);
  const currentRepel = getCurrentRepel(saveFile);

  if (!currentRepel) {
    return <></>;
  }

  return (
    <img
      onClick={() =>
        addMessage({
          message: `${currentRepel?.repelType} active until
              ${new Date(currentRepel?.removeAt ?? 0).toLocaleTimeString()}`,
        })
      }
      height={battleSpriteSize / 1.3}
      src={getItemUrl(currentRepel.repelType)}
    />
  );
};
