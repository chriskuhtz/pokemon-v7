import { DamageAbsorbAbilityMap } from '../../constants/abilityCheckList';
import {
	fixedDamageMoves,
	levelDamageMoves,
	ohkoMoves,
} from '../../constants/groupedMoves';

import { Message } from '../../hooks/useMessageQueue';
import { BattleAttack } from '../../interfaces/BattleActions';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { superEffectiveSaveTable } from '../../interfaces/Item';
import { WeatherType } from '../../interfaces/Weather';
import { BattleFieldEffect } from '../../modules/Battle/BattleField';
import { BattleTerrain } from '../../modules/Battle/hooks/useBattleTerrain';
import { calculateLevelData } from '../calculateLevelData';
import { determineCrit } from '../determineCrit';
import { determineStabFactor } from '../determineStabFactor';
import { determineTypeFactor } from '../determineTypeFactor';
import { getHeldItem } from '../getHeldItem';
import { getMiddleOfThree } from '../getMiddleOfThree';
import { getPower } from '../getPower';
import { hasAilment } from '../hasAilment';
import { getOtherFactors } from './getOtherFactors';
import { getStatFactor } from './getStatFactor';

export const calculateDamage = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	attack: BattleAttack,
	weather: WeatherType | undefined,
	battleFieldEffects: BattleFieldEffect[],
	terrain: BattleTerrain | undefined,
	calculateCrits: boolean,
	targetIsFlying: boolean,
	targetIsUnderground: boolean,
	targetIsDiving: boolean,
	targetsFactor: number,
	addMessage?: (x: Message) => void
): {
	damage: number;
	criticalHit?: boolean;
	consumedHeldItem?: boolean;
	wasSuperEffective?: boolean;
} => {
	if (attack.name === 'bide' && attacker.biding?.turn === 2) {
		return { damage: attacker.biding.damage * 2 };
	}
	const damageClass = attack.data.damage_class.name;
	let attackType = attack.data.type.name;

	if (attack.name === 'weather-ball') {
		if (weather === 'rain') {
			attackType = 'water';
		}
		if (weather === 'sun') {
			attackType = 'fire';
		}
		if (weather === 'hail') {
			attackType = 'ice';
		}
		if (weather === 'sandstorm') {
			attackType = 'rock';
		}
	}
	if (attack.name === 'terrain-pulse') {
		if (terrain === 'electric') {
			attackType = 'electric';
		}
		if (terrain === 'grassy') {
			attackType = 'grass';
		}
		if (terrain === 'misty') {
			attackType = 'fairy';
		}
		if (terrain === 'psychic') {
			attackType = 'psychic';
		}
	}

	if (damageClass === 'status') {
		return { damage: 0 };
	}
	const typeFactor = determineTypeFactor(
		target,
		attacker,
		attack,
		weather,
		terrain,
		addMessage
	);
	if (typeFactor === 0) {
		return { damage: 0 };
	}

	if (attack.name === 'endeavor') {
		const attackerRemainingHp = attacker.stats.hp - attacker.damage;
		const targetRemainingHp = target.stats.hp - target.damage;
		const inflicted = targetRemainingHp - attackerRemainingHp;
		return { damage: inflicted };
	}

	if (attack.name === 'counter') {
		if (
			attacker.lastReceivedDamage?.attack.data.damage_class.name ===
				'physical' &&
			attacker.lastReceivedDamage.applicatorId === target.id
		) {
			return { damage: attacker.lastReceivedDamage.damage * 2 };
		} else {
			if (addMessage) {
				addMessage({ message: 'Counter failed' });
			}
			return { damage: 0 };
		}
	}
	if (attack.name === 'metal-burst') {
		if (attacker.lastReceivedDamage?.applicatorId === target.id) {
			return { damage: attacker.lastReceivedDamage.damage * 1.5 };
		} else {
			if (addMessage) {
				addMessage({ message: 'Metal Burst failed' });
			}
			return { damage: 0 };
		}
	}
	if (attack.name === 'mirror-coat') {
		if (
			attacker.lastReceivedDamage?.attack.data.damage_class.name ===
				'special' &&
			attacker.lastReceivedDamage.applicatorId === target.id
		) {
			return { damage: attacker.lastReceivedDamage.damage * 2 };
		} else {
			if (addMessage) {
				addMessage({ message: 'Mirror Coat failed' });
			}
			return { damage: 0 };
		}
	}
	if (ohkoMoves.includes(attack.name)) {
		if (target.ability === 'sturdy') {
			if (addMessage) {
				addMessage({ message: 'sturdy prevents One Hit K.O moves' });
			}
			return { damage: 0 };
		}
		return { damage: target.stats.hp };
	}
	if (fixedDamageMoves[attack.name]) {
		return { damage: fixedDamageMoves[attack.name] };
	}
	if (levelDamageMoves.includes(attack.name)) {
		return {
			damage: calculateLevelData(attacker.xp, attacker.growthRate).level,
		};
	}
	if (attack.name === 'final-gambit') {
		return {
			damage: attacker.stats.hp - attacker.damage,
		};
	}
	if (attack.name === 'super-fang' || attack.name === 'natures-madness') {
		return {
			damage: Math.floor(
				getMiddleOfThree([
					1,
					(attacker.stats.hp - attacker.damage) / 2,
					attacker.stats.hp,
				])
			),
		};
	}
	if (attack.name === 'guardian-of-alola') {
		return {
			damage: Math.floor(
				getMiddleOfThree([
					1,
					(attacker.stats.hp - attacker.damage) * 0.75,
					attacker.stats.hp,
				])
			),
		};
	}

	if (target.ability === 'flash-fire' && attackType === 'fire') {
		return { damage: 0 };
	}
	if (target.ability === 'motor-drive' && attackType === 'electric') {
		return { damage: 0 };
	}

	const absorbAbility = DamageAbsorbAbilityMap[target.ability];
	if (absorbAbility === attackType) {
		return { damage: 0 };
	}

	const { level } = calculateLevelData(attacker.xp, attacker.growthRate);

	const levelFactor = (2 * level) / 5 + 2;

	const power = getPower(
		attacker,
		attack,
		target,
		calculateLevelData(attacker.xp, attacker.growthRate).level,
		weather,
		terrain
	);

	if (attack.name === 'present' && power < 0) {
		return {
			damage: -Math.floor(target.stats.hp / 4),
		};
	}
	const critRate =
		attack.data.meta.crit_rate + (hasAilment(attacker, 'dire-hit') ? 1 : 0);
	const critFactor =
		calculateCrits &&
		determineCrit(target, attacker, attack.name, critRate, battleFieldEffects)
			? attacker.ability === 'sniper'
				? 3
				: 2
			: 1;
	if (critFactor === 2 && addMessage) {
		addMessage({
			message: 'critical hit!',
			icon: <strong>x{critFactor}</strong>,
		});
	}

	const statFactor = getStatFactor(
		attacker,
		target,
		attack,
		battleFieldEffects,
		critFactor
	);

	const pureDamage = (levelFactor * power * statFactor) / 50 + 2;

	const randomFactor = 0.85 + Math.random() * 0.15;
	const stabFactor = determineStabFactor(attacker, attack);

	const otherFactors = getOtherFactors(
		attacker,
		target,
		attack,
		weather,
		battleFieldEffects,
		terrain,
		targetIsFlying,
		targetIsUnderground,
		targetIsDiving,
		attackType,
		typeFactor,
		power
	);

	const savingBerryFactor =
		(typeFactor > 1 || attackType === 'normal') &&
		superEffectiveSaveTable[attackType] &&
		superEffectiveSaveTable[attackType] === getHeldItem(target)
			? 0.5
			: 1;

	const res = Math.max(
		Math.floor(
			pureDamage *
				targetsFactor *
				critFactor *
				randomFactor *
				stabFactor *
				typeFactor *
				otherFactors *
				savingBerryFactor
		),
		1
	);

	const consumedHeldItem = savingBerryFactor === 0.5;

	//hanging on
	if (
		target.ability === 'sturdy' &&
		target.damage === 0 &&
		res > target.stats.hp
	) {
		if (addMessage) {
			addMessage({ message: `${target.data.name} hung on with sturdy` });
		}
		return {
			damage: target.stats.hp - 1,
			criticalHit: critFactor === 2,
			consumedHeldItem,
			wasSuperEffective: typeFactor > 1,
		};
	}
	if (
		getHeldItem(target) === 'focus-band' &&
		Math.random() < 0.1 &&
		res > target.stats.hp - target.damage
	) {
		if (addMessage) {
			addMessage({ message: `${target.data.name} hung on with focus band` });
		}
		return {
			damage: target.stats.hp - 1,
			criticalHit: critFactor === 2,
			consumedHeldItem,
			wasSuperEffective: typeFactor > 1,
		};
	}
	if (
		getHeldItem(target) === 'focus-sash' &&
		target.damage === 0 &&
		res > target.stats.hp - target.damage
	) {
		if (addMessage) {
			addMessage({ message: `${target.data.name} hung on with focus sash` });
		}
		return {
			damage: target.stats.hp - 1,
			criticalHit: critFactor === 2,
			consumedHeldItem: true,
			wasSuperEffective: typeFactor > 1,
		};
	}
	//false swipe never defeats
	if (
		(attack.name === 'false-swipe' || attack.name === 'hold-back') &&
		res > target.stats.hp - target.damage
	) {
		return {
			damage: target.stats.hp - 1,
			criticalHit: critFactor === 2,
			consumedHeldItem,
			wasSuperEffective: typeFactor > 1,
		};
	}

	return {
		damage: res,
		criticalHit: critFactor === 2,
		consumedHeldItem,
		wasSuperEffective: typeFactor > 1,
	};
};
