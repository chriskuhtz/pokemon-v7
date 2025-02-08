import { BattleAttack } from '../interfaces/BattleAttack';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { calculateDamage, WeatherType } from './calculateDamage';

//TODO: factor in accuracy
export const recommendMove = (
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
		.sort((a, b) => {
			const averageHitsA = Math.max(
				(a.data.meta.max_hits ?? 0) - (a.data.meta.min_hits ?? 0),
				1
			);
			const averageHitsB = Math.max(
				(b.data.meta.max_hits ?? 0) - (b.data.meta.min_hits ?? 0),
				1
			);
			const baseDamageA =
				calculateDamage(attacker, target, b, weather) * averageHitsA;

			const baseDamageB =
				calculateDamage(attacker, target, a, weather) * averageHitsB;

			return baseDamageB - baseDamageA;
		});
	return weightedMoves[0];
};
