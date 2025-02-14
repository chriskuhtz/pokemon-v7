import { isEqual } from 'lodash';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { HealingItemType } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { applyItemToPokemon } from './applyItemToPokemon';

export function canBenefitFromItem<T extends OwnedPokemon | BattlePokemon>(
	pokemon: T,
	item: HealingItemType
): boolean {
	return !isEqual(pokemon, applyItemToPokemon(pokemon, item));
}
