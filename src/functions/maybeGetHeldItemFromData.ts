import { isItem, isKeyItem, ItemType, itemTypes } from '../interfaces/Item';
import { PokemonData } from '../interfaces/PokemonData';
import { getRandomIndex } from './filterTargets';
import { getSettings } from './getPlayerId';

export const maybeGetHeldItemFromData = (
	data: PokemonData
): ItemType | undefined => {
	const { randomHeldItems } = getSettings() ?? {};
	const { held_items } = data;

	if (randomHeldItems) {
		const r = itemTypes[getRandomIndex(itemTypes.length)];

		if (isKeyItem(r)) {
			return maybeGetHeldItemFromData(data);
		}

		return r;
	}
	if (held_items.length === 0) {
		return undefined;
	}

	const possibleItems = held_items.map((h) => ({
		name: h.item.name,
		chance: h.version_details[0].rarity,
	}));

	const filteredItems = possibleItems.filter((p) => Math.random() <= p.chance);

	if (filteredItems.length > 0) {
		const chosen = filteredItems[0].name;
		if (isItem(chosen)) return chosen;
	}
};
