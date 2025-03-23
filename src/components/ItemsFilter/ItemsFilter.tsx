import { useMemo, useState } from 'react';
import { Inventory } from '../../interfaces/Inventory';
import {
	ItemType,
	isApricorn,
	isBerry,
	isHealingItem,
	isPokeball,
} from '../../interfaces/Item';

export const itemfilterNames = [
	'poke-balls',
	'heal-items',
	'berries',
	'apricorns',
	'other',
] as const;
export type ItemsFilterType = (typeof itemfilterNames)[number];

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
	if (itemsFilter === 'berries') {
		return isBerry(item);
	}
	if (itemsFilter === 'apricorns') {
		return isApricorn(item);
	}
	if (itemsFilter === 'other') {
		return (
			!isPokeball(item) &&
			!isHealingItem(item) &&
			!isBerry(item) &&
			!isApricorn(item)
		);
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
			{itemfilterNames.map((f) => (
				<button
					style={{
						backgroundColor: itemsFilter === f ? 'black' : 'white',
						color: itemsFilter === f ? 'white' : 'black',
					}}
					onClick={() => {
						if (itemsFilter === f) {
							setFilter(undefined);
							return;
						}
						setFilter(f);
					}}
				>
					{f}
				</button>
			))}
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
