import { firstTurnMoves } from '../constants/groupedMoves';
import { BattlePokemon, BattleMove } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { BattleFieldEffect, ActionType } from '../modules/Battle/BattleField';
import { BattleTerrain } from '../modules/Battle/hooks/useBattleTerrain';
import { calculateDamage } from './calculateDamage';
import { determineMultiHits } from './determineMultiHits';
import { getHeldItem } from './getHeldItem';

export const determineHighestDamage = (
	attacker: BattlePokemon,
	moves: BattleMove[],
	targets: BattlePokemon[],
	weather: WeatherType | undefined,
	terrain: BattleTerrain | undefined,
	effects: BattleFieldEffect[]
): { actionName: ActionType; targetId: string } => {
	if (targets.length === 0) {
		return { actionName: 'LOAFING', targetId: attacker.id };
	}
	const mapped: { actionName: ActionType; targetId: string; damage: number }[] =
		moves.flatMap((move) => {
			if (firstTurnMoves.includes(move.name) && attacker.roundsInBattle !== 1) {
				return [
					{
						actionName: move.name,
						targetId: targets.at(0)?.id ?? '',
						damage: 0,
					},
				];
			}
			return targets.map((target) => ({
				actionName: move.name,
				targetId: target.id,
				damage: calculateDamage(
					attacker,
					target,
					{
						name: move.name,
						type: 'BattleAttack',
						round: 0,
						data: move.data,
						targetId: target.id,
						multiHits: determineMultiHits(
							move.data,
							attacker.ability,
							getHeldItem(attacker)
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
					() => {}
				).damage,
			}));
		});

	const sorted = mapped.sort((a, b) => b.damage - a.damage);

	return sorted[0];
};
