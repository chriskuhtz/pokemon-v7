import { Inventory, joinInventories } from '../interfaces/Inventory';
import { ItemType } from '../interfaces/Item';

export const updateItemFunction = (
	item: ItemType,
	amount: number,
	inventory: Inventory
): Inventory => {
	return joinInventories(inventory, {
		[item]: amount,
	});
};
