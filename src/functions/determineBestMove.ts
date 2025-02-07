import { BattleAttack } from '../interfaces/BattleAttack';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { calculateDamage } from './calculateDamage';

export const determineBestMove = (
	attacker: BattlePokemon,
	target: BattlePokemon
): BattleAttack => {
	const weightedMoves = [
		attacker.firstMove,
		attacker.secondMove,
		attacker.thirdMove,
		attacker.fourthMove,
	]
		.filter((a) => a !== undefined)
		.sort(
			(a, b) =>
				calculateDamage(attacker, target, b) -
				calculateDamage(attacker, target, a)
		);
	return weightedMoves[0];
};
