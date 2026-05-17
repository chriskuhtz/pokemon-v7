import { useCallback, useContext } from "react";
import { SpriteIcon } from "../components/SpriteIcon/SpriteIcon";
import { replaceRouteName } from "../functions/replaceRouteName";
import {
  createTroubleMakers,
  getCurrentTroubleMakers,
} from "../functions/TimedEvent";
import { SpriteEnum } from "../interfaces/SpriteEnum";
import { EvilTeam } from "../interfaces/TimedEvent";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export const useRangerRadio = () => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);

  return useCallback(() => {
    const sprite = (affiliation: EvilTeam) => {
      if (affiliation === "magma") {
        return SpriteEnum.maxie;
      }
      if (affiliation === "aqua") {
        return SpriteEnum.archie;
      }
      if (affiliation === "galactic") {
        return SpriteEnum.galacticMale;
      }

      return SpriteEnum.rocketMale;
    };

    const troubleMakers = getCurrentTroubleMakers(saveFile);

    if (troubleMakers) {
      addMessage({
        icon: <SpriteIcon sprite={sprite(troubleMakers.affiliation)} />,
        message: `There are reports of team ${
          troubleMakers.affiliation
        } activity at ${replaceRouteName(troubleMakers.mapId)}`,
        needsNoConfirmation: true,
      });
    } else {
      const withTroubleMakers = createTroubleMakers(saveFile);
      patchSaveFileReducer(withTroubleMakers);

      const newTroubleMakers = getCurrentTroubleMakers(withTroubleMakers);

      if (!newTroubleMakers) {
        return;
      }

      addMessage({
        icon: <SpriteIcon sprite={sprite(newTroubleMakers.affiliation)} />,
        message: `There are reports of team ${newTroubleMakers.affiliation} activity at ${replaceRouteName(newTroubleMakers.mapId)}`,
        needsNoConfirmation: true,
      });
    }
  }, [addMessage, patchSaveFileReducer, saveFile]);
};
