import { BattleAttack } from '../interfaces/BattleActions';

export const determineMultiHits = (
	attack: BattleAttack
): number | undefined => {
	if (!attack.data.meta.min_hits) {
		return;
	}
	const random = Math.random();

	if (random > 7 / 8) {
		return 5;
	}
	if (random > 6 / 8) {
		return 4;
	}
	if (random > 3 / 8) {
		return 3;
	}
	return 2;
};
