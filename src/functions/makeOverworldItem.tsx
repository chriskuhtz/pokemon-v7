import {
  EmptyInventory,
  Inventory,
  joinInventories,
} from "../interfaces/Inventory";
import { ItemType } from "../interfaces/Item";
import { MapId } from "../interfaces/mapIds";
import { OverworldChest, OverworldItem } from "../interfaces/Occupant";
import { ArrayHelpers } from "./ArrayHelpers";

export const makeOverworldItem = ({
  x,
  y,
  item,
  amount,
  mapId,
  fixedId,
}: {
  x: number;
  y: number;
  item: ItemType;
  amount: number;
  mapId: MapId;
  fixedId?: string;
}): OverworldItem => {
  const id = fixedId ?? item + x + amount + y + mapId;
  return {
    id: id,
    type: "ITEM",
    x,
    y,
    conditionType: "NOT_HANDLED",
    conditionFunction: undefined,
    item,
    amount,
  };
};

export const makeOverworldChest = ({
  x,
  y,
  contents,
  mapId,
}: {
  x: number;
  y: number;
  contents: ItemType[];
  mapId: MapId;
}): OverworldChest => {
  const id = y + "chest_" + x + mapId;

  let newInventory = EmptyInventory;
  const totalItemAmount = 6;

  const contentsWithAmounts = [];
  let remainingAmount = totalItemAmount;
  let index = 0;

  while (remainingAmount > 0 && index < contents.length) {
    const randomAmount = ArrayHelpers.getRandomEntry([0, 1, 2, 3]);

    const actualAmount = Math.min(randomAmount, remainingAmount);
    contentsWithAmounts.push([contents[index], actualAmount]);
    index++;
    remainingAmount -= actualAmount;
  }

  const withAmounts: Partial<Inventory> =
    Object.fromEntries(contentsWithAmounts);
  newInventory = joinInventories(newInventory, withAmounts);

  return {
    id: id,
    type: "CHEST",
    x,
    y,
    conditionFunction: () => true,
    contents: newInventory,
  };
};
