import { BattlePokemon } from '../interfaces/BattlePokemon';
import { ArrayHelpers } from './ArrayHelpers';
import { FilterTargetsPayload, filterTargets } from './filterTargets';

export const getRandomTarget = (x: FilterTargetsPayload): BattlePokemon => {
	const possibleTargets = filterTargets(x);

	return ArrayHelpers.getRandomEntry(possibleTargets);
};
