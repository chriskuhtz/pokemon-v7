import { PARA_SPEED_FACTOR } from '../interfaces/Ailment';

import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { calculateModifiedStat } from './calculateModifiedStat';
import { getHeldItem } from './getHeldItem';

const calculateTotalSpeed = (
	a: BattlePokemon,
	battleWeather: WeatherType | undefined
): number => {
	const paraFactorA =
		a.primaryAilment?.type === 'paralysis' && a.ability !== 'quick-feet'
			? PARA_SPEED_FACTOR
			: 1;
	const swiftSwimFactorA =
		a.ability === 'swift-swim' && battleWeather === 'rain' ? 2 : 1;
	const chlorophyllFactorA =
		a.ability === 'chlorophyll' && battleWeather === 'sun' ? 2 : 1;
	const unburdenFactorA = a.secondaryAilments.some(
		(ail) => ail.type === 'unburdened'
	)
		? 2
		: 1;
	const machoBraceFactor = getHeldItem(a) === 'macho-brace' ? 0.5 : 1;

	const quickfeetFactor =
		a.primaryAilment && a.ability === 'quick-feet' ? 1.5 : 1;

	const stallFactor = a.ability === 'stall' ? 0 : 1;

	return (
		calculateModifiedStat(
			a.stats.speed,
			a.statBoosts.speed,
			'speed',
			a,
			false
		) *
		paraFactorA *
		swiftSwimFactorA *
		chlorophyllFactorA *
		unburdenFactorA *
		machoBraceFactor *
		quickfeetFactor *
		stallFactor
	);
};
export const sortByPriority = (
	a: BattlePokemon,
	b: BattlePokemon,
	battleRound: number,
	battleWeather: WeatherType | undefined
): number => {
	const aMove = a.moveQueue.find((m) => m.round === battleRound);
	const bMove = b.moveQueue.find((m) => m.round === battleRound);

	if (aMove && !bMove) {
		return -1;
	}
	if (bMove && !aMove) {
		return 1;
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

	const aPriority =
		getHeldItem(a) === 'quick-claw' && Math.random() > 0.5
			? 10
			: aMove?.data.priority ?? 0;
	const bPriority =
		getHeldItem(b) === 'quick-claw' && Math.random() > 0.5
			? 10
			: bMove?.data.priority ?? 0;

	if (aPriority > bPriority) {
		return -1;
	}
	if (aPriority < bPriority) {
		return 1;
	}

	const aSpeed = calculateTotalSpeed(a, battleWeather);
	const bSpeed = calculateTotalSpeed(b, battleWeather);

	if (bSpeed > aSpeed) {
		return 1;
	}
	if (bSpeed === aSpeed && Math.random() > 0.5) {
		return 1;
	}

	return -1;
};
