import { secondTurnMoves } from '../constants/secondTurnMoves';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { calculateDamage } from './calculateDamage';

//TODO: Different Strategies
//TODO: setup moves?
//TODO: add some optional randomness to weighting
//TODO: decide if recommendation knows about ability

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
			//two turn moves get lower weight
			const twoTurnFactor = secondTurnMoves.includes(a.name) ? 0.5 : 1;

			const weighted = critWeighted * twoTurnFactor;

			return { move: a, weight: weighted };
		})
		.sort((a, b) => b.weight - a.weight);

	//console.log(weightedMoves);
	return weightedMoves[0].move;
};
