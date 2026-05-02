import { SaveFile } from "../interfaces/SaveFile";
import { getCurrentBlocker } from "./TimedEvent";

export const occupantHandled = (s: SaveFile, id: string): boolean => {
  return !!getCurrentBlocker(s, id);
};
