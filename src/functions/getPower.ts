import { AbilityName } from '../constants/abilityCheckList';
import { HIDDEN_STATS } from '../constants/hiddenStats';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { ItemType } from '../interfaces/Item';
import { StatObject } from '../interfaces/StatObject';
import { WeatherType } from '../interfaces/Weather';
import { BattleTerrain } from '../modules/Battle/hooks/useBattleTerrain';
import { calculateModifiedStat } from './calculateModifiedStat';
import { checkForSharedType } from './checkForSharedType';
import { getHeldItem } from './getHeldItem';
import { getHpPercentage } from './getHpPercentage';
import { getMovesArray } from './getMovesArray';

const getActualWeight = (
	weight: number,
	ability: AbilityName,
	heldItem?: ItemType
) => {
	const floatStoneFactor = heldItem === 'float-stone' ? 0.5 : 1;
	const lightMetalFactor = ability === 'heavy-metal' ? 2 : 1;
	const heavyMetalFactor = ability === 'light-metal' ? 0.5 : 1;

	return weight * floatStoneFactor * lightMetalFactor * heavyMetalFactor;
};

const getLowKickPower = (weight: number): number => {
	if (weight > 200) return 120;
	if (weight > 100) return 100;
	if (weight > 50) return 80;
	if (weight > 25) return 60;
	if (weight > 10) return 40;
	return 20;
};

const getFlailPower = (hp: number, damage: number): number => {
	const remainingHp = hp - damage;
	const percentage = remainingHp / hp;

	if (percentage < 0.03) {
		return 200;
	}
	if (percentage < 0.1) {
		return 150;
	}
	if (percentage < 0.2) {
		return 100;
	}
	if (percentage < 0.33) {
		return 80;
	}
	if (percentage < 0.66) {
		return 40;
	}

	return 20;
};

const getMagnitudePower = () => {
	const random = Math.random();

	if (random > 0.95) {
		return 10;
	}
	if (random > 0.85) {
		return 30;
	}
	if (random > 0.65) {
		return 50;
	}
	if (random > 0.35) {
		return 70;
	}
	if (random > 0.15) {
		return 90;
	}
	if (random > 0.05) {
		return 110;
	}
	return 150;
};
const getHiddenPowerPower = (ivs: StatObject) => {
	const v = ivs['special-defense'] > 8 ? 1 : 0;
	const w = ivs['speed'] > 8 ? 1 : 0;
	const x = ivs['defense'] > 8 ? 1 : 0;
	const y = ivs['attack'] > 8 ? 1 : 0;
	const z = ivs['special-defense'] % 4;
	return 31 + (5 * (v + 2 * w + 4 * x + 8 * y) + z) / 2;
};

const getRolloutFactor = (turn: number, defenseCurled: boolean) => {
	return turn * (defenseCurled ? 2 : 1);
};
const getGyroBallPower = (targetSpeed: number, attackerSpeed: number) => {
	return 1 + 25 * (targetSpeed / attackerSpeed);
};
const getTrumpCardPower = (attacker: BattlePokemon): number => {
	const remainingPP =
		5 -
		(getMovesArray(attacker).find((m) => m.name === 'trump-card')?.usedPP ?? 0);

	if (remainingPP === 1) {
		return 200;
	}

	if (remainingPP === 2) {
		return 80;
	}
	if (remainingPP === 3) {
		return 60;
	}
	if (remainingPP === 4) {
		return 50;
	}

	return 40;
};

export const getPower = (
	attacker: BattlePokemon,
	attack: BattleAttack,
	target: BattlePokemon,
	attackerLevel: number,
	weather: WeatherType | undefined,
	terrain: BattleTerrain | undefined
): number => {
	const power = attack.data.power ?? 0;
	if (attack.name === 'wring-out') {
		const perc = getHpPercentage(target);

		return Math.floor(1 + 120 * perc);
	}
	if (attack.name === 'triple-kick') {
		if (attack.multiHits == 1) {
			return 30;
		}
		if (attack.multiHits == 2) {
			return 20;
		}
		return 10;
	}
	if (attack.name === 'triple-axel') {
		if (attack.multiHits == 1) {
			return 60;
		}
		if (attack.multiHits == 2) {
			return 40;
		}
		return 20;
	}
	if (attack.name === 'acrobatics') {
		return attacker.heldItemName ? 2 * power : power;
	}
	if (attack.name === 'stored-power') {
		const boosts = Object.entries(attacker.statBoosts).reduce(
			(sum, [key, value]) => {
				if (HIDDEN_STATS.includes(key)) {
					return sum;
				}
				if (value <= 0) {
					return sum;
				}
				return sum + value;
			},
			1
		);

		return 20 * boosts;
	}
	if (attack.name === 'punishment') {
		const boosts = Object.entries(target.statBoosts).reduce(
			(sum, [key, value]) => {
				if (HIDDEN_STATS.includes(key)) {
					return sum;
				}
				if (value <= 0) {
					return sum;
				}
				return sum + value;
			},
			0
		);

		return 60 + boosts * 20;
	}
	if (attack.name === 'power-trip') {
		const boosts = Object.entries(attacker.statBoosts).reduce(
			(sum, [key, value]) => {
				if (HIDDEN_STATS.includes(key)) {
					return sum;
				}
				if (value <= 0) {
					return sum;
				}
				return sum + value;
			},
			0
		);

		return 20 + boosts * 20;
	}
	if (attack.name === 'electro-ball') {
		const factor =
			calculateModifiedStat('speed', attacker, false) /
			calculateModifiedStat('speed', target, false);

		if (factor >= 4) {
			return 150;
		}
		if (factor >= 3) {
			return 120;
		}
		if (factor >= 2) {
			return 80;
		}
		if (factor >= 1) {
			return 60;
		}

		return 40;
	}
	const shareType = checkForSharedType(attacker, target);
	if (attack.name === 'synchronoise') {
		if (shareType) {
			return attack.data.power ?? 0;
		} else return 0;
	}
	if (attack.name === 'heavy-slam' || attack.name === 'heat-crash') {
		const factor =
			getActualWeight(
				attacker.data.weight,
				attacker.ability,
				getHeldItem(attacker)
			) /
			getActualWeight(target.data.weight, target.ability, getHeldItem(target));

		if (factor >= 5) {
			return 120;
		}
		if (factor >= 4) {
			return 100;
		}
		if (factor >= 3) {
			return 80;
		}
		if (factor >= 2) {
			return 60;
		}

		return 40;
	}
	if (attack.name === 'venoshock' && attack.data.power) {
		return target.primaryAilment?.type === 'poison'
			? attack.data.power * 2
			: attack.data.power;
	}
	if (attack.name === 'crush-grip') {
		return 1 + 120 * ((target.stats.hp - target.damage) / target.stats.hp);
	}
	if (attack.name === 'gyro-ball') {
		return getGyroBallPower(
			calculateModifiedStat('speed', target, false),
			calculateModifiedStat('speed', attacker, false)
		);
	}
	if (attack.name === 'weather-ball' && attack.data.power) {
		if (
			weather === 'sun' ||
			weather === 'rain' ||
			weather === 'hail' ||
			weather === 'sandstorm'
		) {
			return attack.data.power * 2;
		}

		return attack.data.power;
	}
	if (attack.name === 'terrain-pulse' && attack.data.power) {
		if (terrain) {
			return attack.data.power * 2;
		}

		return attack.data.power;
	}
	if (
		attack.name === 'eruption' ||
		attack.name === 'water-spout' ||
		attack.name === 'dragon-energy'
	) {
		const remainingHp = attacker.stats.hp - attacker.damage;
		const percentage = remainingHp / attacker.stats.hp;

		return (attack.data.power ?? 0) * percentage;
	}
	if (attack.name === 'fury-cutter') {
		return (attack.data.power ?? 0) * (attacker.furyCutterStack ?? 1);
	}
	if (attack.name === 'low-kick' || attack.name === 'grass-knot') {
		const actualWeight = getActualWeight(
			target.data.weight,
			target.ability,
			getHeldItem(target)
		);

		return getLowKickPower(actualWeight);
	}
	if (attack.name === 'flail' || attack.name === 'reversal') {
		return getFlailPower(attacker.stats.hp, attacker.damage);
	}
	if (attack.name === 'magnitude') {
		return getMagnitudePower();
	}
	if (attack.name === 'psywave') {
		const factor = 0.5 + Math.random();
		return attackerLevel * factor;
	}
	if (attack.name == 'rollout') {
		return (
			(attack.data.power ?? 0) *
			getRolloutFactor(attack.multiTurn ?? 1, !!attacker.defenseCurled)
		);
	}
	if (attack.name == 'ice-ball') {
		return (
			attack.data.power ?? 0 * getRolloutFactor(attack.multiTurn ?? 1, false)
		);
	}
	if (attack.name === 'return') {
		return (attacker.happiness * 2) / 5;
	}
	if (attack.name === 'facade') {
		if (attacker.primaryAilment?.type === 'burn') {
			return 280;
		}
		if (attacker.primaryAilment) {
			return 140;
		}
		return attack.data.power ?? 0;
	}
	if (
		attack.name === 'smelling-salts' &&
		attack.data.power &&
		target.primaryAilment?.type === 'paralysis'
	) {
		return attack.data.power * 2;
	}
	if (attack.name === 'frustration') {
		return ((255 - attacker.happiness) * 2) / 5;
	}
	if (attack.name === 'present') {
		const random = Math.random();
		if (random < 0.1) {
			return 120;
		}
		if (random < 0.3) {
			return -1;
		}
		if (random < 0.6) {
			return 80;
		}
		return 40;
	}
	if (attack.name === 'hidden-power') {
		return getHiddenPowerPower(attacker.intrinsicValues);
	}
	if (attack.name === 'trump-card') {
		return getTrumpCardPower(attacker);
	}
	return attack.data.power ?? 0;
};
