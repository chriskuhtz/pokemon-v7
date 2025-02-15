import { BattleAttack } from '../interfaces/BattleActions';
import { getMiddleOfThree } from './getMiddleOfThree';

export const determineMultiHits = (
	attack: BattleAttack
): number | undefined => {
	if (!attack.data.meta.min_hits || !attack.data.meta.max_hits) {
		return;
	}
	const random = Math.random();

	let res = attack.data.meta.min_hits;

	if (random > 7 / 8) {
		res = 5;
	}
	if (random > 6 / 8) {
		res = 4;
	}
	if (random > 3 / 8) {
		res = 3;
	}

	return getMiddleOfThree([
		attack.data.meta.min_hits,
		res,
		attack.data.meta.max_hits,
	]);
};
