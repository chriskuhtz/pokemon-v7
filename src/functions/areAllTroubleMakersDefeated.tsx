import { SaveFile } from "../interfaces/SaveFile";
import { getCurrentBlocker, getCurrentTroubleMakers } from "./TimedEvent";
export const troubleMakersRemaining = (saveFile: SaveFile): number => {
  const troubleMakers = getCurrentTroubleMakers(saveFile);
  if (!troubleMakers) {
    return 0;
  }
  return troubleMakers.trainers.filter(
    (t) => !getCurrentBlocker(saveFile, t.id),
  ).length;
};
export const areAllActiveTroubleMakersDefeated = (
  saveFile: SaveFile,
): boolean => {
  const troubleMakers = getCurrentTroubleMakers(saveFile);
  return !!(troubleMakers && troubleMakersRemaining(saveFile) === 0);
};
