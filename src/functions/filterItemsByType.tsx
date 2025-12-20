import {
	ItemType,
	canCauseEvolution,
	expCandyTable,
	isApricorn,
	isBerry,
	isCooked,
	isFossil,
	isHealingItem,
	isHeldItem,
	isIngredient,
	isKeyItem,
	isMulch,
	isPokeball,
} from '../interfaces/Item';
import { ItemsFilterType } from '../interfaces/ItemsFilterType';

export const filterItemsByType = (
	item: ItemType,
	itemsFilter: ItemsFilterType | undefined
): boolean => {
	const isExp = !!expCandyTable[item] || item == 'rare-candy';
	if (itemsFilter === 'poke-balls') {
		return isPokeball(item);
	}
	if (itemsFilter === 'repel+escape') {
		return item.includes('repel') || item === 'escape-rope';
	}
	if (itemsFilter === 'healing') {
		return isHealingItem(item);
	}
	if (itemsFilter === 'berries') {
		return isBerry(item);
	}
	if (itemsFilter === 'apricorns') {
		return isApricorn(item);
	}
	if (itemsFilter === 'mulch') {
		return isMulch(item);
	}
	if (itemsFilter === 'ingredient') {
		return isIngredient(item);
	}
	if (itemsFilter === 'cooked') {
		return isCooked(item);
	}
	if (itemsFilter === 'evolution') {
		return canCauseEvolution(item);
	}
	if (itemsFilter === 'exp') {
		return isExp;
	}
	if (itemsFilter === 'fossil') {
		return isFossil(item);
	}
	if (itemsFilter === 'held item') {
		return isHeldItem(item);
	}
	if (itemsFilter === 'key') {
		return isKeyItem(item);
	}
	if (itemsFilter === 'other') {
		return (
			!isPokeball(item) &&
			!isHealingItem(item) &&
			!isBerry(item) &&
			!isApricorn(item) &&
			!isMulch(item) &&
			!isIngredient(item) &&
			!isCooked(item) &&
			!canCauseEvolution(item) &&
			!isExp &&
			!isHeldItem(item) &&
			!isKeyItem(item) &&
			!isFossil(item)
		);
	}
	return true;
};
