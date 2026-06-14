import { ItemType } from "../interfaces/Item";
import { SaveFile } from "../interfaces/SaveFile";

export const ownsItem = (s: SaveFile, item: ItemType): boolean => {
  return s.bag[item] > 1 || s.storage[item] > 1;
};
