import { BattleAttack } from '../interfaces/BattleAttack';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { calculateDamage, WeatherType } from './calculateDamage';

//TODO: Different Strategies
//factor in crit rate

export const recommendMove = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	weather: WeatherType | undefined
): BattleAttack => {
	const weightedMoves: { move: BattleAttack; weight: number }[] = [
		attacker.firstMove,
		attacker.secondMove,
		attacker.thirdMove,
		attacker.fourthMove,
	]
		.filter((a) => a !== undefined)
		.map((a) => {
			const averageHits = Math.max(
				(a.data.meta.max_hits ?? 0) - (a.data.meta.min_hits ?? 0),
				1
			);

			const baseDamage =
				calculateDamage(attacker, target, a, weather) * averageHits;

			const accuracyWeighted = baseDamage * (a.data.accuracy / 100);

			return { move: a, weight: accuracyWeighted };
		})
		.sort((a, b) => b.weight - a.weight);

	return weightedMoves[0].move;
};
