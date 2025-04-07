import React, { ReactNode } from 'react';
import { ItemType } from '../../interfaces/Item';
import { Card } from '../../uiComponents/Card/Card';
import { ItemSprite } from '../ItemSprite/ItemSprite';

export const ItemCard = ({
	item,
	amount,
	actionElements,
	onClick,
}: {
	item: ItemType;
	amount: ReactNode;
	actionElements: React.JSX.Element[];
	onClick?: () => void;
}): JSX.Element => {
	return (
		<Card
			icon={<ItemSprite item={item} />}
			content={
				<h4>
					{item} : {amount}
				</h4>
			}
			onClick={onClick}
			actionElements={actionElements}
		/>
	);
};
