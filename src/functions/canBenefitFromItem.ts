import { isEqual } from 'lodash';
import { MoveName } from '../constants/checkLists/movesCheckList';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	isPPBoostItem,
	isPPRestorationItem,
	ItemType,
} from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { applyItemToPokemon } from './applyItemToPokemon';
import { getMovesArray } from './getMovesArray';

export function canBenefitFromItem<T extends OwnedPokemon | BattlePokemon>(
	pokemon: T,
	item: ItemType,
	move?: MoveName
): boolean {
	if (
		isPPRestorationItem(item) &&
		getMovesArray(pokemon).some((m) => m.usedPP > 0)
	) {
		return true;
	}
	if (!move && isPPBoostItem(item)) {
		return true;
	}
	return !isEqual(pokemon, applyItemToPokemon(pokemon, item, undefined, move));
}
