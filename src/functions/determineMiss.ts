import { flyHitMoves, ohkoMoves } from '../constants/ohkoMoves';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { calculateLevelData } from './calculateLevelData';
import { calculateModifiedStat } from './calculateModifiedStat';
import { getCompoundEyesFactor } from './getCompoundEyesFactor';

/**
 *
 * @param attack
 * @returns true if it misses
 */
export const determineMiss = (
	attack: BattleAttack,
	attacker: BattlePokemon,
	target: BattlePokemon,
	weather?: WeatherType,
	targetIsFlying?: boolean
): boolean => {
	const ratio =
		calculateModifiedStat(
			attacker.stats.accuracy,
			attacker.statBoosts.accuracy
		) / calculateModifiedStat(target.stats.evasion, target.statBoosts.evasion);

	if (targetIsFlying && !flyHitMoves.includes(attack.name)) {
		return true;
	}
	if (attack.data.accuracy === null) {
		return false;
	}
	const weatherFactor =
		weather === 'sandstorm' && target.ability === 'sand-veil' ? 0.8 : 1;

	const attackerlevel = calculateLevelData(attacker.xp).level;
	const targetlevel = calculateLevelData(target.xp).level;
	//+ 1% per level for ohko moves, negative if target level is higher => always miss against higher level opponent
	const levelDifferenceSummand =
		ohkoMoves.includes(attack.name) && attackerlevel - targetlevel >= 0
			? attackerlevel - targetlevel
			: 0;

	const compoundEyesFactor = getCompoundEyesFactor(attacker, attack);

	const res =
		(attack.data.accuracy * compoundEyesFactor * ratio +
			levelDifferenceSummand) *
		weatherFactor;

	return Math.random() * 100 > res;
};
