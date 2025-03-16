import { AbilityName } from '../constants/checkLists/abilityCheckList';
import {
	fixedDamageMoves,
	levelDamageMoves,
} from '../constants/fixedDamageMoves';
import { flyDoubleDamageMoves, ohkoMoves } from '../constants/ohkoMoves';
import { Message } from '../hooks/useMessageQueue';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokemonType } from '../interfaces/PokemonType';
import { WeatherType } from '../interfaces/Weather';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { calculateLevelData } from './calculateLevelData';
import { calculateModifiedStat } from './calculateModifiedStat';
import { determineCrit } from './determineCrit';
import { determineStabFactor } from './determineStabFactor';
import { determineTypeFactor } from './determineTypeFactor';
import { determineWeatherFactor } from './determineWeatherFactor';
import { getHeldItemFactor } from './getHeldItemFactor';
import { getMiddleOfThree } from './getMiddleOfThree';

export const getLowKickDamage = (weight: number): number => {
	if (weight > 200) return 120;
	if (weight > 100) return 100;
	if (weight > 50) return 80;
	if (weight > 25) return 60;
	if (weight > 10) return 40;
	return 20;
};

export const DamageAbsorbAbilityMap: Partial<Record<AbilityName, PokemonType>> =
	{
		'volt-absorb': 'electric',
		'water-absorb': 'water',
	};

export const calculateDamage = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	attack: BattleAttack,
	weather: WeatherType | undefined,
	battleFieldEffects: BattleFieldEffect[],
	calculateCrits: boolean,
	targetIsFlying: boolean,
	targetIsUnderground: boolean,
	addMessage?: (x: Message) => void
): number => {
	const damageClass = attack.data.damage_class.name;
	if (damageClass === 'status') {
		return 0;
	}
	const typeFactor = determineTypeFactor(target, attack, addMessage);
	if (typeFactor === 0) {
		return 0;
	}

	if (attack.name === 'counter') {
		if (
			attacker.lastReceivedDamage?.damageClass === 'physical' &&
			attacker.lastReceivedDamage.applicatorId === target.id
		) {
			return attacker.lastReceivedDamage.damage * 2;
		} else {
			if (addMessage) {
				addMessage({ message: 'Counter failed' });
			}
			return 0;
		}
	}
	if (ohkoMoves.includes(attack.name)) {
		if (target.ability === 'sturdy') {
			if (addMessage) {
				addMessage({ message: 'sturdy prevents One Hit K.O moves' });
			}
			return 0;
		}
		return target.stats.hp;
	}
	if (fixedDamageMoves[attack.name]) {
		return fixedDamageMoves[attack.name];
	}
	if (levelDamageMoves.includes(attack.name)) {
		return calculateLevelData(attacker.xp).level;
	}

	if (target.ability === 'flash-fire' && attack.data.type.name === 'fire') {
		return 0;
	}

	const absorbAbility = DamageAbsorbAbilityMap[target.ability];
	if (absorbAbility === attack.data.type.name) {
		const res = Math.max(-Math.floor(target.stats.hp / 4), -target.damage);
		if (addMessage && res < 0) {
			addMessage({
				message: `${target.data.name} was healed by ${target.ability}`,
			});
		}
		return res;
	}

	const { level } = calculateLevelData(attacker.xp);

	const levelFactor = (2 * level) / 5 + 2;
	const power =
		attack.name === 'low-kick'
			? getLowKickDamage(target.data.weight)
			: attack.data.power ?? 0;

	const critRate =
		attack.data.meta.crit_rate +
		(attacker.secondaryAilments.some((a) => a.type === 'dire-hit') ? 1 : 0);
	const critFactor =
		calculateCrits && determineCrit(attack.name, critRate, target.ability)
			? 2
			: 1;
	if (critFactor === 2 && addMessage) {
		addMessage({ message: 'critical hit!' });
	}

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
	const undergroundFactor =
		targetIsUnderground && attack.name === 'earthquake' ? 2 : 1;
	const flashFireFactor =
		attacker.secondaryAilments.some((a) => a.type === 'flash-fire') &&
		attack.data.type.name === 'fire'
			? 1.5
			: 1;
	const hugePowerFactor =
		attacker.ability === 'huge-power' || attacker.ability === 'pure-power'
			? 2
			: 1;
	const thickFatFactor =
		target.ability === 'thick-fat' && ['fire', 'ice'].includes(attack.type)
			? 0.5
			: 1;
	const heldItemFactor = getHeldItemFactor(
		attacker.name,
		attack.data.type.name,
		attacker.heldItemName
	);
	const lightScreenFactor =
		damageClass === 'special' &&
		battleFieldEffects.some(
			(b) => b.type == 'light-screen' && b.ownerId !== attacker.ownerId
		)
			? 0.66
			: 1;
	const reflectFactor =
		damageClass === 'physical' &&
		battleFieldEffects.some(
			(b) => b.type == 'reflect' && b.ownerId !== attacker.ownerId
		)
			? 0.66
			: 1;
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
				flashFireFactor *
				hugePowerFactor *
				undergroundFactor *
				thickFatFactor *
				heldItemFactor *
				lightScreenFactor *
				reflectFactor
		),
		1
	);

	//hanging on
	if (
		target.ability === 'sturdy' &&
		target.damage === 0 &&
		res > target.stats.hp
	) {
		if (addMessage) {
			addMessage({ message: `${target.data.name} hung on with sturdy` });
		}
		return target.stats.hp - 1;
	}

	return res;
};
