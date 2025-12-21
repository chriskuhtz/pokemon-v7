import {
	auraAndPulseMoves,
	bitingMoves,
	diveDoubleDamageMoves,
	flyDoubleDamageMoves,
	isContactMove,
	punchBasedMoves,
	slicingMoves,
	soundBasedMoves,
	windMoves,
} from '../../constants/groupedMoves';
import { BattleAttack } from '../../interfaces/BattleActions';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { gemTable, isBerry } from '../../interfaces/Item';
import { PokemonType } from '../../interfaces/PokemonType';
import { WeatherType } from '../../interfaces/Weather';
import { BattleFieldEffect } from '../../modules/Battle/BattleField';
import { BattleTerrain } from '../../modules/Battle/hooks/useBattleTerrain';
import { determineWeatherFactor } from '../determineWeatherFactor';
import { getHeldItem } from '../getHeldItem';
import { getHeldItemFactor } from '../getHeldItemFactor';
import { getRivalryFactor } from '../getRivalryFactor';
import { hasAilment } from '../hasAilment';

export const getOtherFactors = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	attack: BattleAttack,
	weather: WeatherType | undefined,
	battleFieldEffects: BattleFieldEffect[],
	terrain: BattleTerrain | undefined,
	targetIsFlying: boolean,
	targetIsUnderground: boolean,
	targetIsDiving: boolean,
	attackType: PokemonType,
	typeFactor: number,
	power: number
): number => {
	const damageClass = attack.data.damage_class.name;
	const parentalBondFactor = attacker.ability === 'parental-bond' ? 1.5 : 1;
	const weatherFactor = determineWeatherFactor(
		attack,
		weather,
		attacker.ability,
		target.ability
	);
	const glaiveRushFactor = 1;

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
		hasAilment(attacker, 'flash-fire') && attackType === 'fire' ? 1.5 : 1;
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
	const transistorFactor =
		attacker.ability === 'transistor' && attackType === 'electric' ? 1.5 : 1;
	const dragonsMawFactor =
		attacker.ability === 'dragons-maw' && attackType === 'dragon' ? 1.5 : 1;
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
	const punchingGloveFactor =
		getHeldItem(attacker) === 'punching-glove' &&
		punchBasedMoves.includes(attack.name)
			? 1.1
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
	const gorillaTacticsFactor =
		attack.name === attacker.choiceBandedMove &&
		attacker.ability === 'gorilla-tactics'
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
	const powerSpotFactor = battleFieldEffects.some(
		(b) =>
			b.type === 'power-spot' &&
			b.ownerId === attacker.ownerId &&
			b.applicatorId !== attacker.id
	)
		? 1.3
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
		hasAilment(attacker, 'charge') && attackType === 'electric' ? 2 : 1;
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
		(attack.name === 'revenge' || attack.name === 'avalanche') &&
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
		(attack.name === 'pluck' || attack.name === 'bug-bite') &&
		isBerry(target.heldItemName)
			? 2
			: 1;
	const paybackFactor =
		attack.name === 'payback' && target.moveQueue.length === 0 ? 2 : 1;
	const assuranceFactor =
		attack.name === 'assurance' && target.lastReceivedDamage ? 2 : 1;
	const batteryFactor =
		battleFieldEffects.some(
			(b) => b.type === 'battery' && b.ownerId === attacker.id
		) &&
		attacker.ability !== 'battery' &&
		damageClass === 'special'
			? 1.3
			: 1;
	const fluffyContactFactor =
		target.ability === 'fluffy' && isContactMove(attack.name, attacker)
			? 0.5
			: 1;
	const fluffyFireFactor =
		target.ability === 'fluffy' && attackType === 'fire' ? 2 : 1;

	const electricTerrainFactor =
		attackType === 'electric' && terrain === 'electric' ? 1.3 : 1;
	const psychicTerrainFactor =
		attackType === 'psychic' && terrain === 'psychic' ? 1.3 : 1;
	const grassyTerrainFactor =
		attackType === 'grass' && terrain === 'grassy' ? 1.3 : 1;
	const mistyTerrainFactor =
		attackType === 'dragon' && terrain === 'misty' ? 0.5 : 1;
	const shadowShieldFactor =
		target.ability === 'shadow-shield' && target.damage === 0 ? 0.5 : 1;
	const neuroforceFactor =
		attacker.ability === 'neuroforce' && typeFactor > 1 ? 1.25 : 1;
	const prismArmorFactor =
		target.ability === 'prism-armor' && typeFactor > 1 ? 0.75 : 1;
	const punkRockAttacker =
		attacker.ability === 'punk-rock' && soundBasedMoves.includes(attack.name)
			? 2
			: 1;
	const punkRockDefender =
		target.ability === 'punk-rock' && soundBasedMoves.includes(attack.name)
			? 0.5
			: 1;
	const iceScalesFactor =
		target.ability === 'ice-scales' && damageClass === 'special' ? 0.5 : 1;
	const steelySpiritFactor =
		attackType === 'steel' &&
		battleFieldEffects.some(
			(b) => b.type === 'steely-spirit' && b.ownerId === attacker.ownerId
		)
			? 1.5
			: 1;
	const hexFactor = attack.name === 'hex' && target.primaryAilment ? 2 : 1;
	const puriSaltFactor =
		target.ability === 'purifying-salt' && attackType === 'ghost' ? 0.5 : 1;
	const windRiderFactor =
		target.ability === 'wind-rider' && windMoves.includes(attack.name) ? 0 : 1;
	const rockyPayloadFactor =
		attacker.ability === 'rocky-payload' && attackType === 'rock' ? 1.5 : 1;
	const sharpnessFactor =
		attacker.ability === 'sharpness' && slicingMoves.includes(attack.name)
			? 1.5
			: 1;
	const earlyMoverFactor =
		(attack.name === 'bolt-beak' || attack.name === 'fishious-rend') &&
		target.moveQueue.length !== 0
			? 2
			: 1;

	return (
		parentalBondFactor *
		weatherFactor *
		glaiveRushFactor *
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
		assuranceFactor *
		batteryFactor *
		fluffyFireFactor *
		fluffyContactFactor *
		electricTerrainFactor *
		punchingGloveFactor *
		psychicTerrainFactor *
		grassyTerrainFactor *
		mistyTerrainFactor *
		shadowShieldFactor *
		neuroforceFactor *
		prismArmorFactor *
		punkRockAttacker *
		punkRockDefender *
		iceScalesFactor *
		powerSpotFactor *
		steelySpiritFactor *
		gorillaTacticsFactor *
		transistorFactor *
		dragonsMawFactor *
		hexFactor *
		puriSaltFactor *
		windRiderFactor *
		rockyPayloadFactor *
		sharpnessFactor *
		earlyMoverFactor
	);
};
