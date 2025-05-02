import { PARA_SPEED_FACTOR } from '../interfaces/Ailment';

import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { BattleTerrain } from '../modules/Battle/hooks/useBattleWeather';
import { calculateModifiedStat } from './calculateModifiedStat';
import { getHeldItem } from './getHeldItem';

const calculateTotalSpeed = (
	a: BattlePokemon,
	battleWeather: WeatherType | undefined,
	battlefieldEffects: BattleFieldEffect[],
	battleTerrain: BattleTerrain | undefined
): number => {
	const paraFactor =
		a.primaryAilment?.type === 'paralysis' && a.ability !== 'quick-feet'
			? PARA_SPEED_FACTOR
			: 1;
	const swiftSwimFactor =
		a.ability === 'swift-swim' && battleWeather === 'rain' ? 2 : 1;
	const chlorophyllFactor =
		a.ability === 'chlorophyll' && battleWeather === 'sun' ? 2 : 1;
	const sandrushFactor =
		a.ability === 'sand-rush' && battleWeather === 'sandstorm' ? 2 : 1;
	const slushrushFactor =
		a.ability === 'slush-rush' && battleWeather === 'hail' ? 2 : 1;
	const unburdenFactorA = a.secondaryAilments.some(
		(ail) => ail.type === 'unburdened'
	)
		? 2
		: 1;
	const machoBraceFactor = getHeldItem(a) === 'macho-brace' ? 0.5 : 1;
	const choiceScarfFactor = getHeldItem(a) === 'choice-scarf' ? 2 : 1;
	const tailwindFactor = battlefieldEffects.some(
		(effect) => effect.ownerId === a.ownerId && effect.type === 'tailwind'
	)
		? 2
		: 1;
	const surgeSurferFactor = battleTerrain === 'electric' ? 2 : 1;

	const quickfeetFactor =
		a.primaryAilment && a.ability === 'quick-feet' ? 1.5 : 1;

	const stallFactor = a.ability === 'stall' ? 0 : 1;
	const laggingTailFactor =
		getHeldItem(a) === 'lagging-tail' || getHeldItem(a) === 'full-incense'
			? -1
			: 1;

	const ironBallFactor = getHeldItem(a) === 'iron-ball' ? 0.5 : 1;

	return (
		calculateModifiedStat(
			a.stats.speed,
			a.statBoosts.speed,
			'speed',
			a,
			false
		) *
		paraFactor *
		swiftSwimFactor *
		chlorophyllFactor *
		unburdenFactorA *
		machoBraceFactor *
		quickfeetFactor *
		stallFactor *
		sandrushFactor *
		slushrushFactor *
		ironBallFactor *
		laggingTailFactor *
		choiceScarfFactor *
		tailwindFactor *
		surgeSurferFactor
	);
};
export const sortByPriority = (
	a: BattlePokemon,
	b: BattlePokemon,
	battleRound: number,
	battleWeather: WeatherType | undefined,
	battleFieldEffects: BattleFieldEffect[],
	battleTerrain: BattleTerrain | undefined
): number => {
	const aMove = a.moveQueue.find((m) => m.round === battleRound);
	const bMove = b.moveQueue.find((m) => m.round === battleRound);

	if (aMove && !bMove) {
		return -1;
	}
	if (bMove && !aMove) {
		return 1;
	}
	//Pursuit goes before switch
	if (
		aMove?.type === 'BattleAttack' &&
		aMove.name === 'pursuit' &&
		bMove?.type === 'Switch'
	) {
		return -1;
	}

	if (
		aMove?.type === 'CatchProcessInfo' ||
		aMove?.type === 'InBattleItem' ||
		aMove?.type === 'RunAway' ||
		aMove?.type === 'Switch'
	) {
		return -1;
	}
	if (
		bMove?.type === 'CatchProcessInfo' ||
		bMove?.type === 'InBattleItem' ||
		bMove?.type === 'RunAway' ||
		bMove?.type === 'Switch'
	) {
		return 1;
	}

	let aPriority = aMove?.data.priority ?? 0;

	if (getHeldItem(a) === 'quick-claw' && Math.random() > 0.5) {
		aPriority = 10;
	}
	if (
		a.ability === 'prankster' &&
		aMove?.type === 'BattleAttack' &&
		aMove.data.damage_class.name === 'status'
	) {
		aPriority += 1;
	}
	if (
		a.ability === 'triage' &&
		aMove?.type === 'BattleAttack' &&
		aMove.data.meta.category.name === 'heal'
	) {
		aPriority += 3;
	}
	if (
		a.ability === 'gale-wings' &&
		aMove?.type === 'BattleAttack' &&
		aMove.data.type.name === 'flying'
	) {
		aPriority += 1;
	}

	let bPriority = bMove?.data.priority ?? 0;

	if (getHeldItem(b) === 'quick-claw' && Math.random() > 0.5) {
		bPriority = 10;
	}
	if (
		b.ability === 'prankster' &&
		bMove?.type === 'BattleAttack' &&
		bMove.data.damage_class.name === 'status'
	) {
		bPriority += 1;
	}

	if (aPriority > bPriority) {
		return -1;
	}
	if (aPriority < bPriority) {
		return 1;
	}

	const aSpeed = calculateTotalSpeed(
		a,
		battleWeather,
		battleFieldEffects,
		battleTerrain
	);
	const bSpeed = calculateTotalSpeed(
		b,
		battleWeather,
		battleFieldEffects,
		battleTerrain
	);

	if (bSpeed > aSpeed) {
		return 1;
	}
	if (bSpeed === aSpeed && Math.random() > 0.5) {
		return 1;
	}

	return -1;
};
