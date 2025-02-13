import React from 'react';
import { HealAction } from '../../components/ItemCard/components/HealAction';
import { ThrowAwayAction } from '../../components/ItemCard/components/ThrowAwayAction';
import { ItemCard } from '../../components/ItemCard/ItemCard';
import { Inventory } from '../../interfaces/Inventory';
import {
	HealingItemType,
	isHealingItem,
	ItemType,
} from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Bag = ({
	inventory,
	discardItem,
	goBack,
	applyItem,
	healablePokemon,
}: {
	inventory: Inventory;
	discardItem: (item: ItemType, number: number) => void;
	goBack: () => void;
	healablePokemon: OwnedPokemon[];
	applyItem: (pokemon: OwnedPokemon, item: HealingItemType) => void;
}): JSX.Element => {
	return (
		<Page goBack={goBack} headline="Inventory:">
			<Stack mode="column">
				{Object.entries(inventory).map(([item, amount]) => {
					if (amount <= 0) {
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
								isHealingItem(item) ? (
									<HealAction
										item={item}
										healPokemon={applyItem}
										healablePokemon={healablePokemon}
									/>
								) : (
									<></>
								),
							]}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};
