import { AbilityName } from '../constants/checkLists/abilityCheckList';
import { flyDoubleDamageMoves, ohkoMoves } from '../constants/ohkoMoves';
import { AddToastFunction } from '../hooks/useToasts';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokemonType } from '../interfaces/PokemonType';
import { WeatherType } from '../interfaces/Weather';
import { calculateLevelData } from './calculateLevelData';
import { calculateModifiedStat } from './calculateModifiedStat';
import { determineCrit } from './determineCrit';
import { determineStabFactor } from './determineStabFactor';
import { determineTypeFactor } from './determineTypeFactor';
import { determineWeatherFactor } from './determineWeatherFactor';
import { getMiddleOfThree } from './getMiddleOfThree';

export const DamageAbsorb: Partial<Record<AbilityName, PokemonType>> = {
	'volt-absorb': 'electric',
	'water-absorb': 'water',
};

export const calculateDamage = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	attack: BattleAttack,
	weather: WeatherType | undefined,
	calculateCrit: boolean,
	dispatchToast?: AddToastFunction,
	targetIsFlying?: boolean
): number => {
	const damageClass = attack.data.damage_class.name;
	if (damageClass === 'status') {
		return 0;
	}
	const typeFactor = determineTypeFactor(target, attack);
	if (typeFactor === 0) {
		return 0;
	}
	if (ohkoMoves.includes(attack.name)) {
		if (target.ability === 'sturdy') {
			if (dispatchToast) {
				dispatchToast('sturdy prevents One Hit K.O moves');
			}
			return 0;
		}
		return target.stats.hp;
	}

	const absorbAbility = DamageAbsorb[target.ability];

	if (target.ability === 'flash-fire' && attack.data.type.name === 'fire') {
		return 0;
	}

	if (absorbAbility === attack.data.type.name) {
		const res = Math.max(-Math.floor(target.stats.hp / 4), -target.damage);
		if (dispatchToast && res < 0) {
			dispatchToast(`${target.data.name} was healed by ${target.ability}`);
		}
		return res;
	}

	const { level } = calculateLevelData(attacker.xp);

	const levelFactor = (2 * level) / 5 + 2;
	const power = attack.data.power ?? 0;

	const critFactor =
		calculateCrit &&
		determineCrit(attack.name, attack.data.meta.crit_rate, target.ability)
			? 2
			: 1;

	const atk =
		damageClass === 'physical'
			? calculateModifiedStat(attacker.stats.attack, attacker.statBoosts.attack)
			: calculateModifiedStat(attacker.stats.spatk, attacker.statBoosts.spatk);

	//Crits ignore boosted defense
	const defBoost =
		critFactor === 2
			? getMiddleOfThree([0, 0, target.statBoosts.defense])
			: target.statBoosts.defense;
	const spdefBoost =
		critFactor === 2
			? getMiddleOfThree([0, 0, target.statBoosts.spdef])
			: target.statBoosts.spdef;
	const def =
		damageClass === 'physical'
			? calculateModifiedStat(target.stats.defense, defBoost)
			: calculateModifiedStat(target.stats.spdef, spdefBoost);
	const statFactor = atk / def;

	const pureDamage = (levelFactor * power * statFactor) / 50 + 2;

	const targetsFactor = 1;
	const parentalBondFactor = 1;
	const weatherFactor = determineWeatherFactor(
		attack,
		weather,
		attacker.ability,
		target.ability
	);
	const glaiveRushFactor = 1;

	const randomFactor = 0.85 + Math.random() * 0.15;
	const stabFactor = determineStabFactor(attacker, attack);
	const burnFactor = attacker.primaryAilment?.type === 'burn' ? 0.5 : 1;
	const otherFactor = 1;
	const zMoveFactor = 1;
	const teraShieldFactor = 1;
	const flyingFactor =
		targetIsFlying && flyDoubleDamageMoves.includes(attack.name) ? 2 : 1;
	const flashFireFactor =
		attacker.flashFired && attack.data.type.name === 'fire' ? 1.5 : 1;
	const res = Math.max(
		Math.floor(
			pureDamage *
				targetsFactor *
				parentalBondFactor *
				weatherFactor *
				glaiveRushFactor *
				critFactor *
				randomFactor *
				stabFactor *
				typeFactor *
				burnFactor *
				otherFactor *
				zMoveFactor *
				teraShieldFactor *
				flyingFactor *
				flashFireFactor
		),
		1
	);

	//hanging on
	if (
		target.ability === 'sturdy' &&
		target.damage === 0 &&
		res > target.stats.hp
	) {
		if (dispatchToast) {
			dispatchToast(`${target.data.name} hung on with sturdy`);
		}
		return target.stats.hp - 1;
	}

	return res;
};
