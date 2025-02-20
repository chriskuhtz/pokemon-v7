import { isEqual } from 'lodash';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	HealingItemType,
	isPPRestorationItem,
	PPRestoringItemType,
} from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { applyItemToPokemon } from './applyItemToPokemon';
import { getMoveNamesArray } from './changeMovePP';

export function canBenefitFromItem<T extends OwnedPokemon | BattlePokemon>(
	pokemon: T,
	item: HealingItemType | PPRestoringItemType
): boolean {
	console.log(pokemon, getMoveNamesArray(pokemon));
	if (
		isPPRestorationItem(item) &&
		getMoveNamesArray(pokemon).some((m) => m.usedPP > 0)
	) {
		return true;
	}
	return !isEqual(pokemon, applyItemToPokemon(pokemon, item));
}
