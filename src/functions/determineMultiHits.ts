import { AbilityName } from '../constants/abilityCheckList';
import { ItemType } from '../interfaces/Item';
import { MoveDto } from '../interfaces/Move';
import { getMiddleOfThree } from './getMiddleOfThree';

export const determineMultiHits = (
	attack: MoveDto,
	userAbility: AbilityName,
	userHeldItem: ItemType | undefined
): number => {
	if (!attack.meta.min_hits || !attack.meta.max_hits) {
		return 0;
	}
	if (userAbility === 'skill-link' || userHeldItem === 'loaded-dice') {
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
