import { AbilityName } from '../constants/checkLists/abilityCheckList';
import { isContactMove } from '../constants/contactMoves';
import {
	fixedDamageMoves,
	levelDamageMoves,
} from '../constants/fixedDamageMoves';
import {
	diveDoubleDamageMoves,
	flyDoubleDamageMoves,
	ohkoMoves,
} from '../constants/ohkoMoves';
import {
	auraAndPulseMoves,
	bitingMoves,
	punchBasedMoves,
} from '../constants/punchBasedMoves';
import { Message } from '../hooks/useMessageQueue';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	gemTable,
	isBerry,
	ItemType,
	superEffectiveSaveTable,
} from '../interfaces/Item';
import { PokemonType } from '../interfaces/PokemonType';
import { StatObject } from '../interfaces/StatObject';
import { WeatherType } from '../interfaces/Weather';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { BattleTerrain } from '../modules/Battle/hooks/useBattleWeather';
import { calculateLevelData } from './calculateLevelData';
import { calculateModifiedStat } from './calculateModifiedStat';
import { determineCrit } from './determineCrit';
import { determineStabFactor } from './determineStabFactor';
import { determineTypeFactor } from './determineTypeFactor';
import { determineWeatherFactor } from './determineWeatherFactor';
import { getHeldItem } from './getHeldItem';
import { getHeldItemFactor } from './getHeldItemFactor';
import { getMiddleOfThree } from './getMiddleOfThree';
import { getRivalryFactor } from './getRivalryFactor';

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

export const getLowKickPower = (weight: number): number => {
	if (weight > 200) return 120;
	if (weight > 100) return 100;
	if (weight > 50) return 80;
	if (weight > 25) return 60;
	if (weight > 10) return 40;
	return 20;
};

export const getFlailPower = (hp: number, damage: number): number => {
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

	// {
	// 	"effect": "Inflicts regular damage.
	// 	Power varies inversely with the user's
	// 	proportional remaining HP.\n\n64 * current HP / max HP | Power\n-----------------------: | ----:\n 0– 1                    |  200\n 2– 5                    |  150\n 6–12                    |  100\n13–21                    |   80\n22–42                    |   40\n43–64                    |   20\n",
	// 	"language": {
	// 		"name": "en",
	// 		"url": "https://pokeapi.co/api/v2/language/9/"
	// 	},
	// 	"short_effect": "Inflicts more damage when the user has less HP remaining, with a maximum of 200 power."
	// }
};

export const getMagnitudePower = () => {
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
export const getHiddenPowerPower = (ivs: StatObject) => {
	const v = ivs['special-defense'] > 8 ? 1 : 0;
	const w = ivs['speed'] > 8 ? 1 : 0;
	const x = ivs['defense'] > 8 ? 1 : 0;
	const y = ivs['attack'] > 8 ? 1 : 0;
	const z = ivs['special-defense'] % 4;
	return 31 + (5 * (v + 2 * w + 4 * x + 8 * y) + z) / 2;
};

export const getRolloutFactor = (turn: number, defenseCurled: boolean) => {
	return turn * (defenseCurled ? 2 : 1);
};
export const getGyroBallPower = (
	targetSpeed: number,
	attackerSpeed: number
) => {
	return 1 + 25 * (targetSpeed / attackerSpeed);
};

export const getPower = (
	attacker: BattlePokemon,
	attack: BattleAttack,
	target: BattlePokemon,
	attackerLevel: number,
	weather: WeatherType | undefined
) => {
	if (attack.name === 'gyro-ball') {
		return getGyroBallPower(
			calculateModifiedStat(
				target.stats.speed,
				target.statBoosts.speed,
				'speed',
				target,
				false
			),
			calculateModifiedStat(
				attacker.stats.speed,
				attacker.statBoosts.speed,
				'speed',
				attacker,
				false
			)
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
	if (attack.name === 'eruption' || attack.name === 'water-spout') {
		const remainingHp = attacker.stats.hp - attacker.damage;
		const percentage = remainingHp / attacker.stats.hp;

		return (attack.data.power ?? 0) * percentage;
	}
	if (attack.name === 'fury-cutter') {
		return (attack.data.power ?? 0) * (attacker.furyCutterStack ?? 1);
	}
	if (attack.name === 'low-kick') {
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
			attack.data.power ??
			0 * getRolloutFactor(attack.multiTurn ?? 1, !!attacker.defenseCurled)
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
	return attack.data.power ?? 0;
};

export const DamageAbsorbAbilityMap: Partial<Record<AbilityName, PokemonType>> =
	{
		'volt-absorb': 'electric',
		'water-absorb': 'water',
		'dry-skin': 'water',
	};

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

	if (damageClass === 'status') {
		return { damage: 0 };
	}
	const typeFactor = determineTypeFactor(
		target,
		attacker,
		attack,
		weather,
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
	if (attack.name === 'super-fang') {
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
		weather
	);

	if (attack.name === 'present' && power < 0) {
		return {
			damage: -Math.floor(target.stats.hp / 4),
		};
	}
	const critRate =
		attack.data.meta.crit_rate +
		(attacker.secondaryAilments.some((a) => a.type === 'dire-hit') ? 1 : 0);
	const critFactor =
		calculateCrits &&
		determineCrit(
			attack.name,
			critRate,
			target.ability,
			attacker.ability,
			attacker.secondaryAilments.some((s) => s.type === 'focused'),
			attacker.name,
			getHeldItem(attacker),
			target.primaryAilment
		)
			? attacker.ability === 'sniper'
				? 3
				: 2
			: 1;
	if (critFactor === 2 && addMessage) {
		addMessage({ message: 'critical hit!' });
	}

	const atk =
		damageClass === 'physical'
			? calculateModifiedStat(
					attacker.stats.attack,
					attacker.statBoosts.attack,
					'attack',
					attacker,
					battleFieldEffects.some(
						(e) => e.type === 'flower-gift' && e.ownerId === attacker.ownerId
					)
			  )
			: calculateModifiedStat(
					attacker.stats['special-attack'],
					attacker.statBoosts['special-attack'],
					'special-attack',
					attacker,
					battleFieldEffects.some(
						(e) => e.type === 'flower-gift' && e.ownerId === attacker.ownerId
					)
			  );

	//Crits ignore boosted defense
	const defBoost = () => {
		if (critFactor === 2 || attacker.ability === 'unaware') {
			return 0;
		}

		return target.statBoosts.defense;
	};
	const spdefBoost = () => {
		if (critFactor === 2 || attacker.ability === 'unaware') {
			return 0;
		}

		return target.statBoosts['special-defense'];
	};

	const def =
		damageClass === 'physical'
			? calculateModifiedStat(
					target.stats.defense,
					defBoost(),
					'defense',
					target,
					battleFieldEffects.some(
						(e) => e.type === 'flower-gift' && e.ownerId === target.ownerId
					)
			  )
			: calculateModifiedStat(
					target.stats['special-defense'],
					spdefBoost(),
					'special-defense',
					target,
					battleFieldEffects.some(
						(e) => e.type === 'flower-gift' && e.ownerId === target.ownerId
					)
			  );

	const statFactor = atk / def;

	const pureDamage = (levelFactor * power * statFactor) / 50 + 2;

	const parentalBondFactor = attacker.ability === 'parental-bond' ? 1.5 : 1;
	const weatherFactor = determineWeatherFactor(
		attack,
		weather,
		attacker.ability,
		target.ability
	);
	const glaiveRushFactor = 1;

	const randomFactor = 0.85 + Math.random() * 0.15;
	const stabFactor = determineStabFactor(attacker, attack);
	const burnFactor =
		damageClass === 'physical' &&
		attacker.primaryAilment?.type === 'burn' &&
		attacker.ability !== 'guts'
			? 0.5
			: 1;
	const otherFactor = 1;
	const zMoveFactor = 1;
	const teraShieldFactor = 1;
	const flyingFactor =
		targetIsFlying && flyDoubleDamageMoves.includes(attack.name) ? 2 : 1;
	const diveFactor =
		targetIsDiving && diveDoubleDamageMoves.includes(attack.name) ? 2 : 1;
	const undergroundFactor =
		targetIsUnderground &&
		(attack.name === 'earthquake' || attack.name === 'magnitude')
			? 2
			: 1;
	const flashFireFactor =
		attacker.secondaryAilments.some((a) => a.type === 'flash-fire') &&
		attackType === 'fire'
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
		attackType,
		getHeldItem(attacker)
	);
	const lightScreenFactor =
		attacker.ability !== 'infiltrator' &&
		damageClass === 'special' &&
		battleFieldEffects.some(
			(b) => b.type == 'light-screen' && b.ownerId !== attacker.ownerId
		)
			? 0.66
			: 1;
	const reflectFactor =
		attacker.ability !== 'infiltrator' &&
		damageClass === 'physical' &&
		battleFieldEffects.some(
			(b) => b.type == 'reflect' && b.ownerId !== attacker.ownerId
		)
			? 0.66
			: 1;
	const rivalryFactor = getRivalryFactor(attacker, target.gender);
	const hustleFactor =
		attacker.ability === 'hustle' && damageClass === 'physical' ? 1.5 : 1;
	const selfDestructFactor = ['self-destruct', 'explosion'].includes(
		attack.name
	)
		? 2
		: 1;
	const plusFactor =
		attacker.ability === 'plus' &&
		battleFieldEffects.some(
			(b) => b.ownerId === attacker.ownerId && b.type === 'minus'
		) &&
		damageClass === 'special'
			? 1.5
			: 1;
	const minusFactor =
		attacker.ability === 'minus' &&
		battleFieldEffects.some(
			(b) => b.ownerId === attacker.ownerId && b.type === 'plus'
		) &&
		damageClass === 'special'
			? 1.5
			: 1;
	const gutsFactor =
		attacker.primaryAilment &&
		attacker.ability === 'guts' &&
		damageClass === 'physical'
			? 1.5
			: 1;
	const marvelScaleFactor =
		target.primaryAilment &&
		target.ability === 'marvel-scale' &&
		damageClass === 'physical'
			? 0.66
			: 1;
	const overgrowFactor =
		attacker.ability === 'overgrow' &&
		attacker.damage > attacker.stats.hp * 0.66 &&
		attackType === 'grass'
			? 1.5
			: 1;
	const blazeFactor =
		attacker.ability === 'blaze' &&
		attacker.damage > attacker.stats.hp * 0.66 &&
		attackType === 'fire'
			? 1.5
			: 1;
	const torrentFactor =
		attacker.ability === 'torrent' &&
		attacker.damage > attacker.stats.hp * 0.66 &&
		attackType === 'water'
			? 1.5
			: 1;
	const swarmFactor =
		attacker.ability === 'swarm' &&
		attacker.damage > attacker.stats.hp * 0.66 &&
		attackType === 'bug'
			? 1.5
			: 1;
	const heatProofFactor =
		target.ability === 'heatproof' && attackType === 'fire' ? 0.5 : 1;
	const drySkinFactor =
		target.ability === 'dry-skin' && attackType === 'fire' ? 1.25 : 1;
	const ironfistFactor =
		attacker.ability === 'iron-fist' && punchBasedMoves.includes(attack.name)
			? 1.2
			: 1;
	const savingBerryFactor =
		(typeFactor > 1 || attackType === 'normal') &&
		superEffectiveSaveTable[attackType] &&
		superEffectiveSaveTable[attackType] === getHeldItem(target)
			? 0.5
			: 1;
	const solarPowerFactor =
		damageClass === 'special' &&
		attacker.ability === 'solar-power' &&
		weather === 'sun'
			? 1.5
			: 1;
	const choiceBandFactor =
		attack.name === attacker.choiceBandedMove &&
		getHeldItem(attacker) === 'choice-band' &&
		damageClass === 'physical'
			? 1.5
			: 1;
	const choiceSpecsFactor =
		attack.name === attacker.choiceBandedMove &&
		getHeldItem(attacker) === 'choice-specs' &&
		damageClass === 'special'
			? 1.5
			: 1;
	const technicianFactor =
		attacker.ability === 'technician' && power <= 60 ? 1.5 : 1;
	const tintedLensFactor =
		attacker.ability === 'tinted-lens' && typeFactor < 1 ? 2 : 1;
	const filterFactor =
		(target.ability === 'filter' || target.ability === 'solid-rock') &&
		typeFactor > 1
			? 0.75
			: 1;
	const recklessFactor =
		attacker.ability === 'reckless' && attack.data.meta.drain < 0 ? 1.2 : 1;
	const sheerForceFactor =
		attacker.ability === 'sheer-force' &&
		(attack.data.meta.flinch_chance > 0 ||
			attack.data.stat_changes.length > 0 ||
			attack.data.meta.ailment)
			? 1.3
			: 1;
	const defeatistFactor =
		attacker.ability === 'defeatist' && attacker.damage > attacker.stats.hp / 2
			? 0.5
			: 1;
	const friendGuardFactor = battleFieldEffects.some(
		(b) =>
			b.type === 'friend-guard' &&
			b.ownerId === target.ownerId &&
			b.applicatorId !== target.id
	)
		? 0.75
		: 1;
	const muscleBandFactor =
		getHeldItem(attacker) === 'muscle-band' && damageClass === 'physical'
			? 1.1
			: 1;
	const wiseGlassesFactor =
		getHeldItem(attacker) === 'wise-glasses' && damageClass === 'special'
			? 1.1
			: 1;
	const pursuitFactor =
		target.moveQueue.length > 0 && target.moveQueue[0].type === 'Switch'
			? 2
			: 1;
	const multiscaleFactor =
		target.ability === 'multiscale' && target.damage === 0 ? 0.5 : 1;
	const expertBeltFactor =
		getHeldItem(attacker) === 'expert-belt' && typeFactor > 1 ? 1.2 : 1;
	const lifeOrbFactor = getHeldItem(attacker) === 'life-orb' ? 1.3 : 1;
	const toxicBoostFactor =
		(attacker.primaryAilment?.type === 'poison' ||
			attacker.primaryAilment?.type === 'toxic') &&
		attacker.ability === 'toxic-boost' &&
		damageClass === 'physical'
			? 1.5
			: 1;
	const flareBoostFactor =
		attacker.primaryAilment?.type === 'burn' &&
		attacker.ability === 'flare-boost' &&
		damageClass === 'special'
			? 1.5
			: 1;
	const telepathyFactor =
		target.ownerId === attacker.ownerId && target.ability === 'telepathy'
			? 0
			: 1;
	const metronomeFactor = Math.min(2, 1 + (attacker.metronomeStack ?? 0 * 0.1));
	const chargeFactor =
		attacker.secondaryAilments.some((s) => s.type === 'charge') &&
		attackType === 'electric'
			? 2
			: 1;
	const helpingHandFactor = attacker.helpingHanded ? 1.5 : 1;
	const sandForceFactor =
		attacker.ability === 'sand-force' &&
		weather === 'sandstorm' &&
		['ground', 'rock', 'steel'].includes(attackType)
			? 1.3
			: 1;
	const furCoatFactor =
		target.ability === 'fur-coat' && damageClass === 'physical' ? 0.5 : 1;
	const revengeFactor =
		attack.name === 'revenge' &&
		attacker.lastReceivedDamage?.applicatorId === target.id
			? 2
			: 1;
	const strongJawFactor =
		attacker.ability === 'strong-jaw' && bitingMoves.includes(attack.name)
			? 1.5
			: 1;
	const refrigerateFactor =
		attacker.ability === 'refrigerate' && attackType === 'normal' ? 1.3 : 1;
	const pixilateFactor =
		attacker.ability === 'pixilate' && attackType === 'normal' ? 1.3 : 1;
	const aerilateFactor =
		attacker.ability === 'aerilate' && attackType === 'normal' ? 1.3 : 1;
	const galvanizeFactor =
		attacker.ability === 'galvanize' && attackType === 'normal' ? 1.2 : 1;
	const megaLauncherFactor =
		attacker.ability === 'mega-launcher' &&
		auraAndPulseMoves.includes(attack.name)
			? 1.5
			: 1;
	const grassPeltFactor =
		terrain === 'grassy' &&
		target.ability === 'grass-pelt' &&
		damageClass === 'physical'
			? 0.66
			: 1;
	const toughClawsFactor =
		attacker.ability === 'tough-claws' && isContactMove(attack.name, attacker)
			? 1.33
			: 1;

	const item = getHeldItem(attacker);
	const gemFactor = item && gemTable[item] === attackType ? 1.5 : 1;
	const darkAuraFactor =
		battleFieldEffects.some((b) => b.type === 'dark-aura') &&
		!battleFieldEffects.some((b) => b.type === 'aura-break') &&
		attackType === 'dark'
			? 1.33
			: 1;
	const fairyAuraFactor =
		battleFieldEffects.some((b) => b.type === 'fairy-aura') &&
		!battleFieldEffects.some((b) => b.type === 'aura-break') &&
		attackType === 'fairy'
			? 1.33
			: 1;

	const aurabreakFactor =
		battleFieldEffects.some(
			(b) => b.type === 'fairy-aura' || b.type === 'dark-aura'
		) &&
		battleFieldEffects.some((b) => b.type === 'aura-break') &&
		(attackType === 'fairy' || attackType == 'dark')
			? 0.66
			: 1;
	const waterBubbleTargetFactor =
		target.ability === 'water-bubble' && attackType === 'fire' ? 0.5 : 1;
	const waterBubbleAttackerFactor =
		target.ability === 'water-bubble' && attackType === 'water' ? 2 : 1;
	const steelWorkerFactor =
		target.ability === 'steelworker' && attackType === 'steel' ? 1.5 : 1;
	const wakeUpSlapFactor =
		target.primaryAilment?.type === 'sleep' && attack.name === 'wake-up-slap'
			? 2
			: 1;
	const brineFactor =
		attack.name === 'brine' && target.damage / target.stats.hp > 0.5 ? 2 : 1;
	const pluckFactor =
		attack.name === 'pluck' && isBerry(target.heldItemName) ? 2 : 1;
	const paybackFactor =
		attack.name === 'payback' && target.moveQueue.length === 0 ? 2 : 1;
	const assuranceFactor =
		attack.name === 'assurance' && target.lastReceivedDamage ? 2 : 1;
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
				reflectFactor *
				rivalryFactor *
				hustleFactor *
				selfDestructFactor *
				plusFactor *
				minusFactor *
				gutsFactor *
				marvelScaleFactor *
				overgrowFactor *
				blazeFactor *
				torrentFactor *
				swarmFactor *
				heatProofFactor *
				drySkinFactor *
				savingBerryFactor *
				ironfistFactor *
				solarPowerFactor *
				choiceBandFactor *
				technicianFactor *
				tintedLensFactor *
				filterFactor *
				recklessFactor *
				sheerForceFactor *
				defeatistFactor *
				friendGuardFactor *
				muscleBandFactor *
				pursuitFactor *
				wiseGlassesFactor *
				multiscaleFactor *
				expertBeltFactor *
				toxicBoostFactor *
				flareBoostFactor *
				lifeOrbFactor *
				telepathyFactor *
				metronomeFactor *
				chargeFactor *
				helpingHandFactor *
				sandForceFactor *
				choiceSpecsFactor *
				furCoatFactor *
				revengeFactor *
				strongJawFactor *
				refrigerateFactor *
				megaLauncherFactor *
				grassPeltFactor *
				toughClawsFactor *
				pixilateFactor *
				diveFactor *
				aerilateFactor *
				gemFactor *
				darkAuraFactor *
				fairyAuraFactor *
				aurabreakFactor *
				waterBubbleAttackerFactor *
				waterBubbleTargetFactor *
				steelWorkerFactor *
				wakeUpSlapFactor *
				brineFactor *
				pluckFactor *
				galvanizeFactor *
				paybackFactor *
				assuranceFactor
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
	if (attack.name === 'false-swipe' && res > target.stats.hp - target.damage) {
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
