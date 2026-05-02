import { useCallback, useContext } from "react";
import { ONE_HOUR } from "../constants/baseConstants";
import { ArrayHelpers } from "../functions/ArrayHelpers";
import { getCurrentBlocker, startBlocker } from "../functions/TimedEvent";
import { joinInventories } from "../interfaces/Inventory";
import { pickupTable } from "../interfaces/Item";
import { Occupant } from "../interfaces/Occupant";
import { SpriteEnum } from "../interfaces/SpriteEnum";
import { MessageQueueContext } from "./useMessageQueue";
import { SaveFileContext } from "./useSaveFile";

export const useZigzagoonForagers = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { addMultipleMessages, addMessage } = useContext(MessageQueueContext);

  const trade = useCallback(() => {
    const zigzagoonBlocker = getCurrentBlocker(saveFile, "ZIGZAGOON");
    if (zigzagoonBlocker) {
      addMessage({ message: "Zigzagoon seems to need a little break" });
      return;
    }
    if (saveFile.bag["moomoo-milk"] <= 0) {
      addMultipleMessages([
        { message: "Zigzagoon looks ready to forage" },
        { message: "But You dont have any moomoo milk" },
      ]);
      return;
    }

    const foragedItem = ArrayHelpers.getRandomEntry(pickupTable);
    const amount = 1;
    addMultipleMessages([
      { message: "Zig Zig" },
      { message: `You give Zigzagoon some moomoo-milk` },
      { message: "Zigzagoon runs off sniffing" },
      { message: `And returns with ${amount} ${foragedItem}` },
    ]);

    const blockerChecked =
      Math.random() > 0.75
        ? startBlocker(saveFile, "ZIGZAGOON", ONE_HOUR / 4)
        : saveFile;
    patchSaveFileReducer({
      ...blockerChecked,
      bag: joinInventories(saveFile.bag, {
        [foragedItem]: amount,
        "moomoo-milk": -1,
      }),
    });
  }, [addMessage, addMultipleMessages, patchSaveFileReducer, saveFile]);

  return trade;
};

export const zigzagoonForagers: Occupant[] = [
  {
    type: "NPC",
    unhandledMessage: [
      "My zigzagoon loves moomoo milk",
      "if you give him some",
      "He will zoom off",
      "and come back with an item",
      "I dont ask where he finds them",
    ],
    gifts: { "moomoo-milk": 3 },
    x: 34,
    y: 35,
    orientation: "UP",
    sprite: SpriteEnum.bugCatcher,
    id: "zigzagoon trainer",
    conditionFunction: (s) => s.campUpgrades["invite zigzagoon foragers"],
  },
  {
    type: "ZIGZAGOON_FORAGER",
    dexId: 263,
    x: 33,
    y: 35,
    orientation: "UP",
    id: "ziggie",
    conditionFunction: (s) => s.campUpgrades["invite zigzagoon foragers"],
  },
];
