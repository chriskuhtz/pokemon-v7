import { PARA_SPEED_FACTOR } from '../interfaces/Ailment';

import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { calculateModifiedStat } from './calculateModifiedStat';

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
		aMove?.type === 'RunAway'
	) {
		return -1;
	}
	if (
		bMove?.type === 'CatchProcessInfo' ||
		bMove?.type === 'InBattleItem' ||
		bMove?.type === 'RunAway'
	) {
		return 1;
	}

	const aPriority = aMove?.data.priority ?? 0;
	const bPriority = bMove?.data.priority ?? 0;

	if (aPriority > bPriority) {
		return -1;
	}
	if (aPriority < bPriority) {
		return 1;
	}

	const paraFactorA =
		a.primaryAilment?.type === 'paralysis' ? PARA_SPEED_FACTOR : 1;
	const swiftSwimFactorA =
		a.ability === 'swift-swim' && battleWeather === 'rain' ? 2 : 1;
	const aSpeed =
		calculateModifiedStat(a.stats.speed, a.statBoosts.speed) *
		paraFactorA *
		swiftSwimFactorA;

	const paraFactorB =
		b.primaryAilment?.type === 'paralysis' ? PARA_SPEED_FACTOR : 1;
	const swiftSwimFactorB =
		b.ability === 'swift-swim' && battleWeather === 'rain' ? 2 : 1;
	const bSpeed =
		calculateModifiedStat(b.stats.speed, b.statBoosts.speed) *
		paraFactorB *
		swiftSwimFactorB;

	if (bSpeed > aSpeed) {
		return 1;
	}
	if (bSpeed === aSpeed && Math.random() > 0.5) {
		return 1;
	}

	return -1;
};
