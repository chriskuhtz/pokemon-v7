import React from 'react';
import { ItemType } from '../../interfaces/Item';
import './ItemCard.css';

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
		<div className="itemCard">
			<img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item}.png`}
			/>
			<h4>
				{item} : {amount}
			</h4>
			{actionElements.map((a, i) => (
				<React.Fragment key={i}>{a}</React.Fragment>
			))}
		</div>
	);
};
