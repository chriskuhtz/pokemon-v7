import { useCallback, useContext } from "react";
import { ArrayHelpers } from "../functions/ArrayHelpers";
import { getCurrentBlocker, startBlocker } from "../functions/TimedEvent";
import { joinInventories } from "../interfaces/Inventory";
import { undergroundTable } from "../interfaces/Item";
import { Occupant } from "../interfaces/Occupant";
import { SpriteEnum } from "../interfaces/SpriteEnum";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export const useDugtrioExplorers = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { addMultipleMessages, addMessage } = useContext(MessageQueueContext);

  const trade = useCallback(() => {
    if (saveFile.bag["honey"] < 3) {
      addMultipleMessages([
        { message: "Dugtrio looks ready to dig around" },
        { message: "But You dont have enough honey for all three heads" },
      ]);
      return;
    }
    const dugtrioBlocker = getCurrentBlocker(saveFile, "DUGTRIO");

    if (!dugtrioBlocker) {
      const foragedItem = ArrayHelpers.getRandomEntry(undergroundTable);
      const amount = 1;
      addMultipleMessages([
        { message: "Trio Trio Trio" },
        { message: `You give Dugtrio some honey` },
        { message: "Dugtrio vanishes underground" },
        { message: `And returns with ${amount} ${foragedItem}` },
      ]);
      const blockerChecked =
        Math.random() > 0.8 ? startBlocker(saveFile, "DUGTRIO") : saveFile;
      patchSaveFileReducer({
        ...blockerChecked,
        bag: joinInventories(saveFile.bag, {
          [foragedItem]: amount,
          honey: -3,
        }),
      });
    } else {
      addMessage({ message: "Dugtrio seems to need a little break" });
    }
  }, [saveFile, addMultipleMessages, patchSaveFileReducer, addMessage]);

  return trade;
};

export const dugtrioExplorers: Occupant[] = [
  {
    type: "NPC",
    unhandledMessage: [
      "Dugtrio is lightning fast underground",
      "and finds really rare items",
      "just feed each head some honey",
      "and watch them dig",
    ],
    gifts: { honey: 3 },
    x: 8,
    y: 6,
    orientation: "DOWN",
    sprite: SpriteEnum.explorer,
    id: "dugtrio trainer",
    conditionFunction: (s) => s.campUpgrades["invite dugtrio explorers"],
  },
  {
    type: "DUGTRIO_EXPLORER",
    dexId: 51,
    x: 9,
    y: 6,
    orientation: "DOWN",
    id: "triotrio",
    conditionFunction: (s) => s.campUpgrades["invite dugtrio explorers"],
  },
];
