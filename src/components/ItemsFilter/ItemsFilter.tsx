import { useMemo, useState } from 'react';
import { Inventory } from '../../interfaces/Inventory';
import {
	ItemType,
	canCauseEvolution,
	isApricorn,
	isBerry,
	isCooked,
	isHealingItem,
	isIngredient,
	isMulch,
	isPokeball,
} from '../../interfaces/Item';

export const itemfilterNames = [
	'poke-balls',
	'repel+escape',
	'heal-items',
	'berries',
	'apricorns',
	'mulch',
	'ingredient',
	'cooked',
	'evolution',
	'other',
] as const;
export type ItemsFilterType = (typeof itemfilterNames)[number];

export const filterItemsByType = (
	item: ItemType,
	itemsFilter: ItemsFilterType | undefined
): boolean => {
	if (itemsFilter === 'poke-balls') {
		return isPokeball(item);
	}
	if (itemsFilter === 'repel+escape') {
		return item.includes('repel') || item === 'escape-rope';
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
	if (itemsFilter === 'other') {
		return (
			!isPokeball(item) &&
			!isHealingItem(item) &&
			!isBerry(item) &&
			!isApricorn(item) &&
			!isMulch(item) &&
			!isIngredient(item) &&
			!isCooked(item) &&
			!canCauseEvolution(item)
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
		<div
			style={{
				display: 'flex',
				gap: '.5rem',
				maxWidth: '96dvw',
				flexWrap: 'wrap',
			}}
		>
			{itemfilterNames.map((f) => (
				<button
					key={f}
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
			<ItemsFilterButtons itemsFilter={itemsFilter} setFilter={setFilter} />
		),
		[itemsFilter]
	);

	return { filteredInventory, buttons, currentFilter: itemsFilter };
};
