import { calculateLevelData } from "./calculateLevelData";

export const getPercentageEVfromXp = (xp: number): number => {
  const { level } = calculateLevelData(xp, "medium");
  return (252 / 100) * level;
};
