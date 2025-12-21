import React from 'react';
import { useFilteredInventory } from '../../components/ItemsFilter/ItemsFilter';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { BuyCard } from './components/BuyCard';

export const BuyMarket = ({
	goBack,
	inventory,
	buyItem,
	money,
	owned,
}: {
	goBack: () => void;
	inventory: Inventory;
	buyItem: (item: ItemType, number: number, pricePerItem: number) => void;
	money: number;
	owned: Inventory;
}): JSX.Element => {
	const { filteredInventory, buttons } = useFilteredInventory(inventory, true);
	return (
		<Page goBack={goBack} headline="What would you like to buy:">
			<Stack mode="column">
				{buttons}
				{Object.entries(filteredInventory).map(([item, amount]) => {
					if (amount <= 0) {
						return <React.Fragment key={item}></React.Fragment>;
					}
					return (
						<BuyCard
							money={money}
							key={item}
							buyItem={(x, pricePerItem) =>
								buyItem(item as ItemType, x, pricePerItem)
							}
							item={item as ItemType}
							amount={owned[item as ItemType]}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};
