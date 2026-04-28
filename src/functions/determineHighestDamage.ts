import { firstTurnMoves } from "../constants/groupedMoves";
import { BattleMove, BattlePokemon } from "../interfaces/BattlePokemon";
import { WeatherType } from "../interfaces/Weather";
import { ActionType, BattleFieldEffect } from "../modules/Battle/BattleField";
import { BattleTerrain } from "../modules/Battle/hooks/useBattleTerrain";
import { ArrayHelpers } from "./ArrayHelpers";
import { calculateDamage } from "./calculateDamage/calculateDamage";
import { calculateLevelData } from "./calculateLevelData";
import { determineMultiHits } from "./determineMultiHits";
import { getHeldItem } from "./getHeldItem";

export const determineHighestDamage = (
  attacker: BattlePokemon,
  moves: BattleMove[],
  targets: BattlePokemon[],
  weather: WeatherType | undefined,
  terrain: BattleTerrain | undefined,
  effects: BattleFieldEffect[],
): { actionName: ActionType; targetId: string; willBeDefeated: boolean } => {
  if (targets.length === 0) {
    return {
      actionName: "LOAFING",
      targetId: attacker.id,
      willBeDefeated: false,
    };
  }
  const mapped: {
    actionName: ActionType;
    targetId: string;
    damage: number;
    willBeDefeated: boolean;
    level: number;
  }[] = moves.flatMap((move) => {
    if (firstTurnMoves.includes(move.name) && attacker.roundsInBattle !== 1) {
      return [
        {
          actionName: move.name,
          targetId: targets.at(0)?.id ?? "",
          damage: 0,
          willBeDefeated: false,
          level: calculateLevelData(targets.at(0)?.xp ?? 0, "medium").level,
        },
      ];
    }
    return targets.map((target) => {
      const damage = calculateDamage(
        attacker,
        target,
        {
          name: move.name,
          type: "BattleAttack",
          round: 0,
          data: move.data,
          targetId: target.id,
          multiHits: determineMultiHits(
            move.data,
            attacker.ability,
            getHeldItem(attacker),
          ),
          isAMultiHit: false,
        },
        weather,
        effects,
        terrain,
        false,
        false,
        false,
        false,
        1,
        () => {},
      ).damage;
      return {
        actionName: move.name,
        targetId: target.id,
        damage,
        willBeDefeated: target.damage + damage >= target.stats.hp,
        level: calculateLevelData(target.xp, "medium").level,
      };
    });
  });

  const possibleKills = mapped.filter((m) => m.willBeDefeated);
  if (possibleKills.length > 0) {
    return ArrayHelpers.getRandomEntry(possibleKills);
  }
  const highestLevelTarget = mapped.sort((a, b) => b.level - a.level).at(0);

  const bait = mapped
    .filter((m) => m.level < (highestLevelTarget?.level ?? 0) - 5)
    .sort((a, b) => b.damage - a.damage);
  const notBait = mapped
    .filter((m) => m.level >= (highestLevelTarget?.level ?? 0) - 5)
    .sort((a, b) => b.damage - a.damage);

  return notBait.at(0) ?? bait.at(0) ?? mapped[0];
};
