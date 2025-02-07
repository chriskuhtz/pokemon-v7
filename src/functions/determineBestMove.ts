import { BattleAttack } from '../interfaces/BattleAttack';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { calculateDamage, WeatherType } from './calculateDamage';

export const determineBestMove = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	weather: WeatherType | undefined
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
				calculateDamage(attacker, target, b, weather) -
				calculateDamage(attacker, target, a, weather)
		);
	return weightedMoves[0];
};
