import { BattlePokemon } from '../interfaces/BattlePokemon';
import { getHeldItem } from './getHeldItem';
import { hasAilment } from './hasAilment';
import { hasType } from './hasType';

export const isOnGround = (mon: BattlePokemon): boolean => {
	if (hasAilment(mon, 'landed')) {
		return true;
	}
	if (getHeldItem(mon) === 'iron-ball') {
		return true;
	}
	if (getHeldItem(mon) === 'air-balloon') {
		return false;
	}
	if (hasType(mon, 'flying')) {
		return false;
	}
	if (mon.ability === 'levitate') {
		return false;
	}
	return true;
};
