import { SaveFile } from "../interfaces/SaveFile";
import { getCurrentTroubleMakers } from "./TimedEvent";
export const troubleMakersRemaining = (saveFile: SaveFile): number => {
  const troubleMakers = getCurrentTroubleMakers(saveFile);
  if (!troubleMakers) {
    return 0;
  }
  return troubleMakers.trainers.filter(
    (t) => !saveFile.handledOccupants.some((h) => h.id == t.id),
  ).length;
};
export const areAllActiveTroubleMakersDefeated = (
  saveFile: SaveFile,
): boolean => {
  const troubleMakers = getCurrentTroubleMakers(saveFile);
  return !!(troubleMakers && troubleMakersRemaining(saveFile) === 0);
};
