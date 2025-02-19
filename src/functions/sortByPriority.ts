import { PARA_SPEED_FACTOR } from '../interfaces/Ailment';

import { BattlePokemon } from '../interfaces/BattlePokemon';
import { calculateModifiedStat } from './calculateModifiedStat';

export const sortByPriority = (
	a: BattlePokemon,
	b: BattlePokemon,
	battleRound: number
): number => {
	const aMove = a.moveQueue.find((m) => m.round === battleRound);
	const bMove = b.moveQueue.find((m) => m.round === battleRound);

	if (aMove && !bMove) {
		return -1;
	}
	if (bMove && !aMove) {
		return 1;
	}
	if (aMove?.type === 'CatchProcessInfo' || aMove?.type === 'InBattleItem') {
		return -1;
	}
	if (bMove?.type === 'CatchProcessInfo' || bMove?.type === 'InBattleItem') {
		return 1;
	}

	const aSpeed =
		calculateModifiedStat(a.stats.speed, a.statBoosts.speed) *
		(a.primaryAilment?.type === 'paralysis' ? PARA_SPEED_FACTOR : 1);
	const bSpeed =
		calculateModifiedStat(b.stats.speed, b.statBoosts.speed) *
		(b.primaryAilment?.type === 'paralysis' ? PARA_SPEED_FACTOR : 1);

	if (bSpeed > aSpeed) {
		return 1;
	}
	if (bSpeed === aSpeed && Math.random() > 0.5) {
		return 1;
	}

	return -1;
};
