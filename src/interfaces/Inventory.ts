import { isItem, ItemType, itemTypes } from './Item';

export type Inventory = Record<ItemType, number>;

export const EmptyInventory: Inventory = Object.fromEntries(
	itemTypes.map((item: ItemType) => [item, 0])
) as Inventory;
export const generateInventory = (wanted: Partial<Inventory>): Inventory => {
	return joinInventories(EmptyInventory, wanted);
};

export const joinInventories = (
	existing: Inventory,
	update: Partial<Inventory>,
	subtract?: boolean
): Inventory => {
	const joined = { ...existing };

	Object.entries(update).forEach((updateEntry) => {
		const key = updateEntry[0];
		const value = updateEntry[1];

		if (isItem(key)) {
			//amount cant fall under 0
			joined[key] = Math.max(joined[key] + (subtract ? -value : value), 0);
		}
	});

	return joined;
};
