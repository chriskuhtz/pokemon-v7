import React from 'react';
import { ItemType } from '../../interfaces/Item';
import { Card } from '../../uiComponents/Card/Card';

export const ItemCard = ({
	item,
	amount,
	actionElements,
}: {
	item: ItemType;
	amount: number;
	actionElements: React.JSX.Element[];
}): JSX.Element => {
	return (
		<Card
			icon={
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item}.png`}
				/>
			}
			content={
				<h4>
					{item} : {amount}
				</h4>
			}
			actionElements={actionElements}
		/>
	);
};
