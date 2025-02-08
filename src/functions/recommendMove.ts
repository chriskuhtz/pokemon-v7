import { BattleAttack } from '../interfaces/BattleAttack';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { calculateDamage } from './calculateDamage';
import { WeatherType } from './determineWeatherFactor';

//TODO: Different Strategies

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

			//higher weight for higher crit chance, does not consider target ability
			const critWeighted =
				accuracyWeighted + accuracyWeighted * (a.data.meta.crit_rate / 2);

			return { move: a, weight: critWeighted };
		})
		.sort((a, b) => b.weight - a.weight);

	//console.log(weightedMoves);
	return weightedMoves[0].move;
};
