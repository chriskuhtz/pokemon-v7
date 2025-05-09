import { AbilityName } from '../constants/checkLists/abilityCheckList';
import { danceMoves } from '../constants/punchBasedMoves';
import { MoveDto } from '../interfaces/Move';
import { getMiddleOfThree } from './getMiddleOfThree';

export const determineMultiHits = (
	attack: MoveDto,
	userAbility: AbilityName
): number => {
	if (userAbility === 'dancer' && danceMoves.includes(attack.name)) {
		return 2;
	}
	if (!attack.meta.min_hits || !attack.meta.max_hits) {
		return 0;
	}
	if (userAbility === 'skill-link') {
		return attack.meta.max_hits;
	}
	const random = Math.random();

	let res = attack.meta.min_hits;

	if (random > 7 / 8) {
		res = 5;
	}
	if (random > 6 / 8) {
		res = 4;
	}
	if (random > 3 / 8) {
		res = 3;
	}

	return getMiddleOfThree([attack.meta.min_hits, res, attack.meta.max_hits]);
};
