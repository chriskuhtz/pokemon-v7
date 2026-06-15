import { useContext, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { battleSpriteSize } from "../../constants/baseConstants";
import {
  getBagLimit,
  getTotalInventoryAmount,
} from "../../functions/getBagLimit";
import { threeDigitString } from "../../functions/threeDigitString";
import { GameDataContext } from "../../hooks/useGameData";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { Inventory } from "../../interfaces/Inventory";
import { ItemType } from "../../interfaces/Item";
import { ItemsFilterType } from "../../interfaces/ItemsFilterType";
import { Stack } from "../../uiComponents/Stack/Stack";
import { BagLimitIcon } from "../BagLimitIcon/BagLimitIcon";
import { InGamePage } from "../InGamePage/InGamePage";
import { ItemSelectionOption } from "../ItemSelectionOption/ItemSelectionOption";
import { useFilteredInventory } from "../ItemsFilter/ItemsFilter";
import { ItemSprite } from "../ItemSprite/ItemSprite";
export const ChestManager = ({
  chest,
  takeEverythingFromCategory,
  storeEverything,
  putItemInBag,
  putItemInStorage,
  takeEverything,
  canLeaveOverloaded,
}: {
  chest: Inventory;
  takeEverythingFromCategory: (category: ItemsFilterType) => void;
  storeEverything: () => void;
  takeEverything: () => void;
  putItemInBag: (item: ItemType, all?: boolean) => void;
  putItemInStorage: (item: ItemType, all?: boolean) => void;
  canLeaveOverloaded: boolean;
}) => {
  const { addMessage } = useContext(MessageQueueContext);
  const [search, setSearch] = useState<string>("");
  const { setActiveTabReducer, saveFile } = useContext(SaveFileContext);
  const gameData = useContext(GameDataContext);

  const {
    filteredInventory: filteredStorage,
    buttons: buttonsForStorage,
    currentFilter,
  } = useFilteredInventory(chest, true);

  const totalAmount = useMemo(
    () => getTotalInventoryAmount(saveFile.bag),
    [saveFile],
  );
  const totalChestAmount = useMemo(
    () => getTotalInventoryAmount(saveFile.storage),
    [saveFile],
  );

  const limit = getBagLimit(saveFile, gameData);
  let rate = totalAmount / limit;

  if (totalAmount >= limit) {
    rate = 1;
  }

  const isOverloaded = limit - totalAmount < 0;

  return (
    <InGamePage
      goBack={
        isOverloaded && !canLeaveOverloaded
          ? undefined
          : () => {
              setActiveTabReducer("OVERWORLD");
            }
      }
      headline="Storage Chest:"
    >
      <Stack mode="column" alignItems="center" justifyContent="center">
        <FaSearch size={battleSpriteSize} />{" "}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        {!search && buttonsForStorage}
        {isOverloaded && !canLeaveOverloaded && (
          <h3>You cant carry all of this, leave some items in the chest</h3>
        )}
        <Stack mode="row" justifyContent="space-evenly">
          {totalAmount > 0 && (
            <button onClick={storeEverything}>Store All</button>
          )}
          {totalChestAmount > 0 && (
            <button
              onClick={() => {
                if (currentFilter) {
                  takeEverythingFromCategory(currentFilter);
                } else takeEverything();
              }}
            >
              {currentFilter ? `Take all ${currentFilter}` : "Take Everything"}
            </button>
          )}
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: ".5rem",
          }}
        >
          <Stack mode="column">
            {totalAmount > 0 && (
              <div
                style={{
                  left: 32,
                  position: "relative",
                  top: 16,
                  marginBottom: 64,
                }}
              >
                <BagLimitIcon
                  onClick={() =>
                    addMessage({
                      message: `${Math.max(limit - totalAmount, 0)} of ${limit} Slots empty`,
                      needsNoConfirmation: true,
                    })
                  }
                  rate={rate}
                />
              </div>
            )}
            {Object.entries(saveFile.bag)
              .filter(([key, amount]) => amount > 0 && key.includes(search))
              .map(([item, amount]) => (
                <div
                  style={{
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  key={"bag" + item + amount}
                >
                  <ItemSprite
                    onClick={() => putItemInStorage(item as ItemType)}
                    item={item as ItemType}
                  />
                  <div onClick={() => putItemInStorage(item as ItemType)}>
                    ({threeDigitString(amount)})
                  </div>
                  <FaAnglesRight
                    onClick={() => putItemInStorage(item as ItemType, true)}
                  />
                </div>
              ))}
          </Stack>
          <Stack mode="column">
            <h3 style={{ textAlign: "center" }}>Chest:</h3>
            {Object.entries(filteredStorage)
              .filter(([key, amount]) => amount > 0 && key.includes(search))
              .map(([item, amount]) => (
                <ItemSelectionOption
                  hint={threeDigitString(amount)}
                  isSelected={false}
                  key={"storage" + item + amount}
                  item={item as ItemType}
                  additionalIcons={[
                    <FaAnglesLeft
                      onClick={() => putItemInBag(item as ItemType, true)}
                    />,
                  ]}
                  onClick={() => putItemInBag(item as ItemType)}
                />
              ))}
          </Stack>
        </div>
      </Stack>
    </InGamePage>
  );
};
