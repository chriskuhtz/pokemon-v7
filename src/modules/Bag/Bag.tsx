import React from 'react';
import { ThrowAwayAction } from '../../components/ItemCard/components/ThrowAwayAction';
import { ItemCard } from '../../components/ItemCard/ItemCard';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { Page } from '../../uiComponents/Page/Page';

export const Bag = ({
	inventory,
	discardItem,
	goBack,
}: {
	inventory: Inventory;
	discardItem: (item: ItemType, number: number) => void;
	goBack: () => void;
}): JSX.Element => {
	return (
		<Page goBack={goBack} headline="Inventory:">
			<React.Fragment>
				{Object.entries(inventory).map(([item, amount]) => {
					if (amount === 0) {
						return <React.Fragment key={item}></React.Fragment>;
					}

					return (
						<ItemCard
							key={item}
							item={item as ItemType}
							amount={amount}
							actionElements={[
								<ThrowAwayAction
									amount={amount}
									discardItem={(x: number) => discardItem(item as ItemType, x)}
								/>,
							]}
						/>
					);
				})}
			</React.Fragment>
		</Page>
	);
};
