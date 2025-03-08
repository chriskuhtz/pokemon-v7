import { flyHitMoves, ohkoMoves } from '../constants/ohkoMoves';
import { soundBasedMoves } from '../constants/soundBasedMoves';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { calculateLevelData } from './calculateLevelData';
import { calculateModifiedStat } from './calculateModifiedStat';
import { getCompoundEyesFactor } from './getCompoundEyesFactor';
import { isSelfTargeting } from './isSelfTargeting';

export type MissReason = 'SOUNDPROOF';
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
	targetIsFlying?: boolean,
	targetIsUnderground?: boolean
): { miss: boolean; reason?: MissReason } => {
	const selfTargeting = isSelfTargeting(attack.data);

	if (selfTargeting) {
		return { miss: false };
	}

	if (
		target.ability === 'soundproof' &&
		soundBasedMoves.includes(attack.name)
	) {
		return { miss: true, reason: 'SOUNDPROOF' };
	}
	if (targetIsFlying && !flyHitMoves.includes(attack.name)) {
		return { miss: true };
	}
	if (targetIsUnderground && attack.name !== 'earthquake') {
		return { miss: true };
	}
	if (attack.data.accuracy === null) {
		return { miss: false };
	}
	if (attack.name === 'thunder' && weather === 'rain') {
		return { miss: false };
	}

	const ratio =
		calculateModifiedStat(
			attacker.stats.accuracy,
			attacker.statBoosts.accuracy
		) / calculateModifiedStat(target.stats.evasion, target.statBoosts.evasion);

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

	return { miss: Math.random() * 100 > res };
};
