import { flyHitMoves, ohkoMoves } from '../constants/ohkoMoves';
import { passThroughProtectMoves } from '../constants/passThroughProtectMoves';
import { soundBasedMoves } from '../constants/soundBasedMoves';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { calculateLevelData } from './calculateLevelData';
import { calculateModifiedStat } from './calculateModifiedStat';
import {
	getCompoundEyesFactor,
	getHustleFactor,
} from './getCompoundEyesFactor';
import { getHeldItem } from './getHeldItem';
import { isSelfTargeting } from './isSelfTargeting';

export type MissReason =
	| 'SOUNDPROOF'
	| 'ATTACKER_NOT_ASLEEP'
	| 'TARGET_NOT_ASLEEP'
	| 'PROTECTED';

export const getWeatherAccuracyFactor = (
	target: BattlePokemon,
	weather?: WeatherType
) => {
	if (weather === 'sandstorm' && target.ability === 'sand-veil') {
		return 0.8;
	}
	if (weather === 'hail' && target.ability === 'snow-cloak') {
		return 0.8;
	}

	return 1;
};
/**
 *
 * @param attack
 * @returns true if it misses
 */
export const determineMiss = (
	attack: BattleAttack,
	attacker: BattlePokemon,
	target: BattlePokemon,
	battleFieldEffects: BattleFieldEffect[],
	weather?: WeatherType,
	targetIsFlying?: boolean,
	targetIsUnderground?: boolean
): { miss: boolean; reason?: MissReason } => {
	const selfTargeting = isSelfTargeting(attack.data);
	if (target.protected && !passThroughProtectMoves.includes(attack.name)) {
		return { miss: true, reason: 'PROTECTED' };
	}
	if (attacker.ability === 'no-guard' || target.ability === 'no-guard') {
		return { miss: false };
	}
	if (attack.isAMultiHit) {
		return { miss: false };
	}
	if (selfTargeting) {
		return { miss: false };
	}
	if (
		target.ability === 'soundproof' &&
		soundBasedMoves.includes(attack.name)
	) {
		return { miss: true, reason: 'SOUNDPROOF' };
	}
	if (
		(attack.name === 'nightmare' || attack.name === 'dream-eater') &&
		target.primaryAilment?.type !== 'sleep'
	) {
		return { miss: true, reason: 'TARGET_NOT_ASLEEP' };
	}
	if (attack.name === 'snore' && attacker.primaryAilment?.type !== 'sleep') {
		return { miss: true, reason: 'ATTACKER_NOT_ASLEEP' };
	}
	if (
		target.secondaryAilments.some(
			(ail) => ail.type === 'mind-read' && ail.by === attacker.id
		) &&
		!ohkoMoves.includes(attack.name) &&
		!targetIsFlying &&
		!targetIsUnderground &&
		!target.protected
	) {
		return { miss: false };
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

	//EVASION
	const laxIncenseFactor = getHeldItem(target) === 'lax-incense' ? 1.05 : 1;
	const tangledFeetFactor =
		target.ability === 'tangled-feet' &&
		target.secondaryAilments.some((a) => a.type === 'confusion')
			? 2
			: 1;
	const wonderSkinFactor =
		target.ability === 'wonder-skin' &&
		attack.data.damage_class.name === 'status'
			? 0.5
			: 1;

	const targetEvasion =
		calculateModifiedStat(
			target.stats.evasion,
			target.statBoosts.evasion,
			'evasion',
			target,
			false
		) *
		tangledFeetFactor *
		laxIncenseFactor *
		wonderSkinFactor;

	//ACCURACY
	const victoryStarFactor = battleFieldEffects.some(
		(b) => b.type === 'victory-star' && b.ownerId === attacker.ownerId
	)
		? 1.1
		: 1;
	const compoundEyesFactor = getCompoundEyesFactor(attacker, attack);
	const hustleFactor = getHustleFactor(attacker, attack);
	const brightPowderFactor = getHeldItem(target) === 'bright-powder' ? 0.9 : 1;
	const wideLensFactor = getHeldItem(attacker) === 'wide-lens' ? 1.1 : 1;

	const thunderWeatherFactor =
		attack.name === 'thunder' && weather === 'sun' ? 0.5 : 1;

	const attackerAccuracy =
		calculateModifiedStat(
			attacker.stats.accuracy,
			attacker.statBoosts.accuracy,
			'accuracy',
			attacker,
			false
		) *
		compoundEyesFactor *
		hustleFactor *
		brightPowderFactor *
		thunderWeatherFactor *
		wideLensFactor *
		victoryStarFactor;

	//RESULT
	const ratio = attackerAccuracy / targetEvasion;

	const weatherFactor = getWeatherAccuracyFactor(target, weather);

	const attackerlevel = calculateLevelData(attacker.xp).level;
	const targetlevel = calculateLevelData(target.xp).level;
	//+ 1% per level for ohko moves, negative if target level is higher => always miss against higher level opponent
	const levelDifferenceSummand =
		ohkoMoves.includes(attack.name) && attackerlevel - targetlevel >= 0
			? attackerlevel - targetlevel
			: 0;

	const res =
		(attack.data.accuracy * ratio + levelDifferenceSummand) * weatherFactor;

	return { miss: Math.random() * 100 > res };
};
