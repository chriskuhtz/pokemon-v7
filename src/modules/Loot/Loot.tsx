import { useCallback, useContext } from "react";
import { FaAnglesDown } from "react-icons/fa6";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { ThrowAwayAction } from "../../components/ItemCard/components/ThrowAwayAction";
import { ItemSelectionOption } from "../../components/ItemSelectionOption/ItemSelectionOption";
import {
  getTotalInventoryAmount,
  isBagOverloaded,
  wouldThisBagBeOverloaded,
} from "../../functions/getBagLimit";
import { GameDataContext } from "../../hooks/useGameData";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { EmptyInventory, joinInventories } from "../../interfaces/Inventory";
import { isKeyItem, ItemType } from "../../interfaces/Item";
import { Stack } from "../../uiComponents/Stack/Stack";

export const Loot = () => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const gameData = useContext(GameDataContext);
  const overloaded = isBagOverloaded(saveFile, gameData);

  const canCollectAll = !wouldThisBagBeOverloaded(
    joinInventories(saveFile.bag, saveFile.meta.loot ?? EmptyInventory),
    saveFile,
    gameData,
  );

  const collectAllLoot = () => {
    if (!saveFile.meta.loot) {
      return;
    }
    patchSaveFileReducer({
      bag: joinInventories(saveFile.bag, saveFile.meta.loot),
      meta: {
        ...saveFile.meta,
        loot: undefined,
      },
    });
  };

  const collectLoot = useCallback(
    (item: ItemType, amount: number) => {
      if (!saveFile.meta.loot) {
        return;
      }
      patchSaveFileReducer({
        bag: joinInventories(saveFile.bag, { [item]: amount }),
        meta: {
          ...saveFile.meta,
          loot: joinInventories(saveFile.meta.loot, { [item]: amount }, true),
        },
      });
    },
    [patchSaveFileReducer, saveFile.bag, saveFile.meta],
  );

  return (
    <InGamePage headline="The Opponents left these behind:">
      <Stack mode="column">
        {canCollectAll &&
          saveFile.meta.loot &&
          getTotalInventoryAmount(saveFile.meta.loot) > 0 && (
            <button onClick={collectAllLoot}>Take Everything</button>
          )}
        {saveFile.meta.loot
          ? Object.entries(saveFile.meta.loot)
              .filter(([, amount]) => amount > 0)
              .map(([item, amount]) => (
                <ItemSelectionOption
                  key={item + "loot" + amount}
                  onClick={() => collectLoot(item as ItemType, 1)}
                  item={item as ItemType}
                  hint={amount.toString()}
                  isSelected={false}
                  additionalIcons={[
                    <FaAnglesDown
                      onClick={() => collectLoot(item as ItemType, amount)}
                    />,
                  ]}
                />
              ))
          : undefined}

        <h3>In your Bag:</h3>
        {Object.entries(saveFile.bag)
          .filter(([key, amount]) => amount > 0 && !isKeyItem(key))
          .map(([item, amount]) => (
            <ItemSelectionOption
              key={item + "bag" + amount}
              item={item as ItemType}
              hint={amount.toString()}
              isSelected={true}
              onClick={() => {}}
              additionalIcons={[
                <ThrowAwayAction
                  item={item as ItemType}
                  amount={amount}
                  discardItem={(x) =>
                    patchSaveFileReducer({
                      bag: joinInventories(saveFile.bag, { [item]: x }, true),
                    })
                  }
                />,
              ]}
            />
          ))}

        <button
          onClick={() =>
            patchSaveFileReducer({ meta: { activeTab: "OVERWORLD" } })
          }
          disabled={overloaded}
        >
          {overloaded ? "Your Bag is too full" : "Continue"}
        </button>
      </Stack>
    </InGamePage>
  );
};
