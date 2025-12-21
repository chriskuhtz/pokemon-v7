import { useMemo, useState } from 'react';
import { filterItemsByType } from '../../functions/filterItemsByType';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { ItemsFilterType } from '../../interfaces/ItemsFilterType';
import { ItemsFilterButtons } from './components/ItemsFilterButton';

export const useFilteredInventory = (
	inventory: Inventory,
	onlyShowButtonsForFilledCategories?: boolean
): {
	filteredInventory: Partial<Inventory>;
	buttons: React.JSX.Element;
	currentFilter: ItemsFilterType | undefined;
} => {
	const [itemsFilter, setFilter] = useState<ItemsFilterType | undefined>();

	const filteredInventory: Partial<Inventory> = useMemo(
		() =>
			Object.fromEntries(
				Object.entries(inventory).filter(([item]) =>
					filterItemsByType(item as ItemType, itemsFilter)
				)
			),
		[inventory, itemsFilter]
	);

	const buttons = useMemo(
		() => (
			<ItemsFilterButtons
				itemsFilter={itemsFilter}
				setFilter={setFilter}
				onlyShowButtonsForFilledCategories={onlyShowButtonsForFilledCategories}
				itemsToFilter={inventory}
			/>
		),
		[inventory, itemsFilter, onlyShowButtonsForFilledCategories]
	);

	return { filteredInventory, buttons, currentFilter: itemsFilter };
};
