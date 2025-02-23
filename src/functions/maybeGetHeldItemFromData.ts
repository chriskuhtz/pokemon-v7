import { ItemType } from '../interfaces/Item';
import { PokemonData } from '../interfaces/PokemonData';
import { getRandomIndex } from './filterTargets';

export const maybeGetHeldItemFromData = (
	data: PokemonData
): ItemType | undefined => {
	//const { randomHeldItems } = getSettings() ?? {};
	const { held_items } = data;

	// if (randomHeldItems) {
	// 	return itemTypes[getRandomIndex(itemTypes.length)];
	// }
	if (held_items.length === 0) {
		return undefined;
	}
	return held_items[getRandomIndex(held_items.length)].item.name as ItemType;
};
