import { AddToastFunction } from '../hooks/useToasts';
import { BattleAttack } from '../interfaces/BattleAttack';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { calculateLevelData } from './calculateLevelData';
import { determineStabFactor } from './determineStabFactor';
import { determineTypeFactor } from './determineTypeFactor';
import { determineWeatherFactor } from './determineWeatherFactor';

export const calculateDamage = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	attack: BattleAttack,
	weather: WeatherType | undefined,
	dispatchToast?: AddToastFunction
): number => {
	if (attack.data.damage_class.name !== 'physical') {
		console.error('what is this', attack);
		return 0;
	}

	const { level } = calculateLevelData(attacker.xp);

	const levelFactor = (2 * level) / 5 + 2;
	const power = attack.data.power ?? 0;
	const atk = attacker.stats.attack;
	const def = target.stats.defense;
	const statFactor = atk / def;

	const pureDamage = (levelFactor * power * statFactor) / 50 + 2;

	const targetsFactor = 1;
	const parentalBondFactor = 1;
	const weatherFactor = determineWeatherFactor(attack, weather);
	const glaiveRushFactor = 1;
	const critFactor = attack.crit ? 2 : 1;
	const randomFactor = 0.85 + Math.random() * 0.15;
	const stabFactor = determineStabFactor(attacker, attack);
	const typeFactor = determineTypeFactor(target, attack);
	const burnFactor = attacker.primaryAilment?.type === 'burn' ? 0.5 : 1;
	const otherFactor = 1;
	const zMoveFactor = 1;
	const teraShieldFactor = 1;

	if (typeFactor === 0) {
		return 0;
	}

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
		res > target.stats['hp']
	) {
		if (dispatchToast) {
			dispatchToast(`${target.data.name} hung on with sturdy`);
		}
		return target.stats['hp'] - 1;
	}

	return res;
};
