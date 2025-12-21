import { filterItemsByType } from '../../../functions/filterItemsByType';
import { Inventory } from '../../../interfaces/Inventory';
import { ItemType } from '../../../interfaces/Item';
import {
	ItemsFilterType,
	itemfilterNames,
} from '../../../interfaces/ItemsFilterType';
import { SelectionBar } from '../../../uiComponents/SelectionBar/SelectionBar';

export const ItemsFilterButtons = ({
	itemsFilter,
	setFilter,
	onlyShowButtonsForFilledCategories,
	itemsToFilter,
}: {
	itemsFilter: ItemsFilterType | undefined;
	setFilter: React.Dispatch<React.SetStateAction<ItemsFilterType | undefined>>;
	onlyShowButtonsForFilledCategories?: boolean;
	itemsToFilter: Inventory;
}) => {
	const availableCategories = [
		...itemfilterNames
			.filter((category) => {
				if (!onlyShowButtonsForFilledCategories) {
					return true;
				}
				return (
					Object.entries(itemsToFilter).filter(
						([item, amount]) =>
							filterItemsByType(item as ItemType, category) && amount > 0
					).length > 0
				);
			})
			.map((i) => ({ key: i, label: i })),
	];

	return (
		<SelectionBar
			allowUndefined
			options={availableCategories}
			selected={itemsFilter}
			select={(x) => setFilter(x as ItemsFilterType)}
		/>
	);
};
