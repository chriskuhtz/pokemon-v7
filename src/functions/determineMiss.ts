import { ohkoMoves } from '../constants/ohkoMoves';
import { BattleAttack } from '../interfaces/BattleAttack';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { calculateLevelData } from './calculateLevelData';

/**
 *
 * @param attack
 * @returns true if it misses
 */
export const determineMiss = (
	attack: BattleAttack,
	attacker: BattlePokemon,
	target: BattlePokemon,
	weather?: WeatherType
): boolean => {
	const weatherFactor =
		weather === 'sandstorm' && target.ability === 'sand-veil' ? 0.8 : 1;

	const attackerlevel = calculateLevelData(attacker.xp).level;
	const targetlevel = calculateLevelData(target.xp).level;
	//+ 1% per level for ohko moves, negative if target level is higher => always miss against higher level opponent
	const levelDifferenceSummand =
		ohkoMoves.includes(attack.name) && attackerlevel - targetlevel >= 0
			? attackerlevel - targetlevel
			: 0;

	const res = (attack.data.accuracy + levelDifferenceSummand) * weatherFactor;

	return Math.random() * 100 > res;
};
