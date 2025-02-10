import { AbilityName } from '../constants/checkLists/abilityCheckList';
import { ohkoMoves } from '../constants/ohkoMoves';
import { AddToastFunction } from '../hooks/useToasts';
import { BattleAttack } from '../interfaces/BattleAttack';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokemonType } from '../interfaces/PokemonType';
import { WeatherType } from '../interfaces/Weather';
import { calculateLevelData } from './calculateLevelData';
import { determineStabFactor } from './determineStabFactor';
import { determineTypeFactor } from './determineTypeFactor';
import { determineWeatherFactor } from './determineWeatherFactor';

export const DamageAbsorb: Partial<Record<AbilityName, PokemonType>> = {
	'volt-absorb': 'electric',
	'water-absorb': 'water',
};

export const calculateDamage = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	attack: BattleAttack,
	weather: WeatherType | undefined,
	dispatchToast?: AddToastFunction
): number => {
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

	const damageClass = attack.data.damage_class.name;
	if (damageClass == 'status') {
		console.error('what is this', attack);
		return 0;
	}

	const absorbAbility = DamageAbsorb[target.ability];

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
	const atk =
		damageClass === 'physical' ? attacker.stats.attack : attacker.stats.spatk;
	const def =
		damageClass === 'physical' ? target.stats.defense : target.stats.spdef;
	const statFactor = atk / def;

	const pureDamage = (levelFactor * power * statFactor) / 50 + 2;

	const targetsFactor = 1;
	const parentalBondFactor = 1;
	const weatherFactor = determineWeatherFactor(attack, weather);
	const glaiveRushFactor = 1;
	const critFactor = attack.crit ? 2 : 1;
	const randomFactor = 0.85 + Math.random() * 0.15;
	const stabFactor = determineStabFactor(attacker, attack);
	const burnFactor = attacker.primaryAilment?.type === 'burn' ? 0.5 : 1;
	const otherFactor = 1;
	const zMoveFactor = 1;
	const teraShieldFactor = 1;

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
				teraShieldFactor
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
