import React from 'react';
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
}: {
	goBack: () => void;
	inventory: Inventory;
	buyItem: (item: ItemType, number: number, pricePerItem: number) => void;
	money: number;
}): JSX.Element => {
	return (
		<Page goBack={goBack} headline="What do you want to buy:">
			<Stack mode="column">
				{Object.entries(inventory).map(([item, amount]) => {
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
							amount={amount}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};
