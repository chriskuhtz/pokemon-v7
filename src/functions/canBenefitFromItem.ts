import { isEqual } from 'lodash';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	EvBoostItemType,
	HealingItemType,
	isPPRestorationItem,
	PPRestoringItemType,
} from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { applyItemToPokemon } from './applyItemToPokemon';
import { getMovesArray } from './getMovesArray';

export function canBenefitFromItem<T extends OwnedPokemon | BattlePokemon>(
	pokemon: T,
	item: HealingItemType | PPRestoringItemType | EvBoostItemType
): boolean {
	if (
		isPPRestorationItem(item) &&
		getMovesArray(pokemon).some((m) => m.usedPP > 0)
	) {
		return true;
	}
	return !isEqual(pokemon, applyItemToPokemon(pokemon, item));
}
