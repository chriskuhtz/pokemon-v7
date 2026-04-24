import { SaveFile } from "../interfaces/SaveFile";

export const canAccessApricornClearing = (s: SaveFile): boolean =>
  !!(s.rangerLevel && s.rangerLevel > 5);
