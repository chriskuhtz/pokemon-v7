import React from 'react';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { SellCard } from './components/SellCard';

export const SellMarket = ({
	goBack,
	inventory,
	sellItem,
}: {
	goBack: () => void;
	inventory: Inventory;

	sellItem: (item: ItemType, number: number, pricePerItem: number) => void;
}): JSX.Element => {
	return (
		<Page goBack={goBack} headline="What do you want to sell:">
			<Stack mode="column">
				{Object.entries(inventory).map(([item, amount]) => {
					if (amount <= 0) {
						return <React.Fragment key={item}></React.Fragment>;
					}
					return (
						<SellCard
							key={item}
							sellItem={(x, pricePerItem) =>
								sellItem(item as ItemType, x, pricePerItem)
							}
							item={item as ItemType}
							amount={amount}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};
