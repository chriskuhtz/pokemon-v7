import { useMemo, useState } from 'react';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType, isHealingItem, isPokeball } from '../../interfaces/Item';

export type ItemsFilterType = 'poke-balls' | 'heal-items' | 'other';

const filterItemsByType = (
	item: ItemType,
	itemsFilter: ItemsFilterType | undefined
): boolean => {
	if (itemsFilter === 'poke-balls') {
		return isPokeball(item);
	}
	if (itemsFilter === 'heal-items') {
		return isHealingItem(item);
	}
	if (itemsFilter === 'other') {
		return !isPokeball(item) && !isHealingItem(item);
	}
	return true;
};
const ItemsFilterButtons = ({
	itemsFilter,
	setFilter,
}: {
	itemsFilter: ItemsFilterType | undefined;
	setFilter: React.Dispatch<React.SetStateAction<ItemsFilterType | undefined>>;
}) => {
	return (
		<div style={{ display: 'flex', gap: '.5rem' }}>
			<button
				style={{
					backgroundColor: itemsFilter === 'poke-balls' ? 'black' : 'white',
					color: itemsFilter === 'poke-balls' ? 'white' : 'black',
				}}
				onClick={() => {
					if (itemsFilter === 'poke-balls') {
						setFilter(undefined);
						return;
					}
					setFilter('poke-balls');
				}}
			>
				Poke Balls
			</button>
			<button
				style={{
					backgroundColor: itemsFilter === 'heal-items' ? 'black' : 'white',
					color: itemsFilter === 'heal-items' ? 'white' : 'black',
				}}
				onClick={() => {
					if (itemsFilter === 'heal-items') {
						setFilter(undefined);
						return;
					}
					setFilter('heal-items');
				}}
			>
				Healing Items
			</button>
			<button
				style={{
					backgroundColor: itemsFilter === 'other' ? 'black' : 'white',
					color: itemsFilter === 'other' ? 'white' : 'black',
				}}
				onClick={() => {
					if (itemsFilter === 'other') {
						setFilter(undefined);
						return;
					}
					setFilter('other');
				}}
			>
				Other
			</button>
		</div>
	);
};

export const useFilteredInventory = (
	inventory: Inventory
): { filteredInventory: Partial<Inventory>; buttons: React.JSX.Element } => {
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
			<ItemsFilterButtons itemsFilter={itemsFilter} setFilter={setFilter} />
		),
		[itemsFilter]
	);

	return { filteredInventory, buttons };
};
