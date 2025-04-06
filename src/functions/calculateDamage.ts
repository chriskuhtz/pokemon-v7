import { AbilityName } from '../constants/checkLists/abilityCheckList';
import {
	fixedDamageMoves,
	levelDamageMoves,
} from '../constants/fixedDamageMoves';
import { flyDoubleDamageMoves, ohkoMoves } from '../constants/ohkoMoves';
import { punchBasedMoves } from '../constants/punchBasedMoves';
import { Message } from '../hooks/useMessageQueue';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { superEffectiveSaveTable } from '../interfaces/Item';
import { PokemonType } from '../interfaces/PokemonType';
import { WeatherType } from '../interfaces/Weather';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
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

export const getRolloutFactor = (turn: number, defenseCurled: boolean) => {
	return turn * (defenseCurled ? 2 : 1);
};

export const getPower = (
	attacker: BattlePokemon,
	attack: BattleAttack,
	targetWeight: number,
	attackerLevel: number
) => {
	if (attack.name === 'fury-cutter') {
		return (attack.data.power ?? 0) * (attacker.furyCutterStack ?? 1);
	}
	if (attack.name === 'low-kick') {
		return getLowKickPower(targetWeight);
	}
	if (attack.name === 'flail' || attack.name === 'reversal') {
		return getFlailPower(attacker.stats.hp, attacker.damage);
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
	if (attack.name === 'return') {
		return (attacker.happiness * 2) / 5;
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
	calculateCrits: boolean,
	targetIsFlying: boolean,
	targetIsUnderground: boolean,
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
	const attackType = attack.data.type.name;
	if (damageClass === 'status') {
		return { damage: 0 };
	}
	const typeFactor = determineTypeFactor(
		target,
		attack,
		attacker.ability === 'normalize',
		addMessage
	);
	if (typeFactor === 0) {
		return { damage: 0 };
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
		return { damage: calculateLevelData(attacker.xp).level };
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
		const res = Math.max(-Math.floor(target.stats.hp / 4), -target.damage);

		if (addMessage && res < 0) {
			addMessage({
				message: `${target.data.name} was healed by ${target.ability}`,
			});
		}
		return { damage: res };
	}

	const { level } = calculateLevelData(attacker.xp);

	const levelFactor = (2 * level) / 5 + 2;
	const power = getPower(
		attacker,
		attack,
		target.data.weight,
		calculateLevelData(attacker.xp).level
	);

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
			getHeldItem(attacker)
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
					attacker.name,
					battleFieldEffects.some(
						(e) => e.type === 'flower-gift' && e.ownerId === attacker.ownerId
					),
					getHeldItem(attacker)
			  )
			: calculateModifiedStat(
					attacker.stats['special-attack'],
					attacker.statBoosts['special-attack'],
					'special-attack',
					attacker.name,
					battleFieldEffects.some(
						(e) => e.type === 'flower-gift' && e.ownerId === attacker.ownerId
					),
					getHeldItem(attacker)
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
					target.name,
					battleFieldEffects.some(
						(e) => e.type === 'flower-gift' && e.ownerId === target.ownerId
					),
					getHeldItem(target)
			  )
			: calculateModifiedStat(
					target.stats['special-defense'],
					spdefBoost(),
					'special-defense',
					target.name,
					battleFieldEffects.some(
						(e) => e.type === 'flower-gift' && e.ownerId === target.ownerId
					),
					getHeldItem(target)
			  );

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
	const undergroundFactor =
		targetIsUnderground && attack.name === 'earthquake' ? 2 : 1;
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
	const choiceBandFactor = attack.name === attacker.choiceBandedMove ? 1.5 : 1;
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
				sheerForceFactor
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
