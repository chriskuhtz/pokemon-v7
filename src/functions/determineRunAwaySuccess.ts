import { BattlePokemon } from "../interfaces/BattlePokemon";
import { calculateLevelData } from "./calculateLevelData";

export const determineRunawaySuccess = (
  team: BattlePokemon[],
  opponents: BattlePokemon[],
  isRogue: boolean,
) => {
  const runAwayer = team.find((t) => t.ability === "run-away");

  const avgteamLevel =
    team.reduce(
      (sum, summand) =>
        sum + calculateLevelData(summand.xp, summand.growthRate).level,
      0,
    ) / team.length;

  const avgOpsLevel =
    opponents.reduce(
      (sum, summand) =>
        sum + calculateLevelData(summand.xp, summand.growthRate).level,
      0,
    ) / opponents.length;

  if (runAwayer) {
    return true;
  }

  //ten levels higher, guaranteed escape
  const advantage = (avgteamLevel - avgOpsLevel) / 20;

  //rogues have advantage
  const rogueBonus = isRogue ? 0.1 : 0;

  return Math.random() + advantage + rogueBonus > 0.5;
};
