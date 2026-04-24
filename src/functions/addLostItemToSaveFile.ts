import { ONE_HOUR } from "../constants/gameData/gameData";
import { mapsRecord } from "../constants/gameData/maps/mapsRecord";
import { ItemType, itemTypes, keyItems } from "../interfaces/Item";
import { LostItem, SaveFile } from "../interfaces/SaveFile";
import { ArrayHelpers } from "./ArrayHelpers";
import { getRandomAvailableRoute } from "./getRandomAvailableRoute";
import { getRandomPosition } from "./getRandomPosition";

const impossibleItems: ItemType[] = [
  ...keyItems,
  "master-ball",
  "enigma-berry",
  "purple-apricorn",
];
const lostItems: ItemType[] = [
  ...itemTypes.filter((item) => !impossibleItems.includes(item)),
];
export const addLostItemToSaveFile = (s: SaveFile): SaveFile => {
  const updated = { ...s };

  const route = getRandomAvailableRoute(s, []);

  if (!route) {
    console.error("could not find available route to place item");
    return updated;
  }
  const item = ArrayHelpers.getRandomEntry(lostItems);
  const amount = ArrayHelpers.getRandomEntry([1, 1, 1, 1, 2, 2, 2, 3, 3, 4]);
  const { x, y } = getRandomPosition(mapsRecord[route]);
  const now = new Date().getTime();
  const lostItem: LostItem = {
    mapId: route,
    item,
    amount,
    x,
    y,
    resetAt: now + ONE_HOUR * 4,
  };

  return { ...updated, lostItems: [...(updated.lostItems ?? []), lostItem] };
};
