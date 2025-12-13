import { isItem, isKeyItem, ItemType, itemTypes } from '../interfaces/Item';
import { PokemonData } from '../interfaces/PokemonData';
import { SettingsObject } from '../interfaces/SettingsObject';
import { ArrayHelpers } from './ArrayHelpers';

export const maybeGetHeldItemFromData = (
	data: PokemonData,
	settings: SettingsObject | undefined
): ItemType | undefined => {
	const { randomHeldItems } = settings ?? {};
	const { held_items } = data;

	if (randomHeldItems) {
		const r = itemTypes[ArrayHelpers.getRandomIndex(itemTypes.length)];

		if (isKeyItem(r)) {
			return maybeGetHeldItemFromData(data, settings);
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

	const filteredItems = possibleItems.filter(
		(p) => Math.random() <= p.chance / 100
	);

	if (filteredItems.length > 0) {
		const chosen = filteredItems[0].name;
		if (isItem(chosen)) return chosen;
	}
};
