import React from 'react';
import { baseSize } from '../../constants/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
import { ItemType } from '../../interfaces/Item';
import { Card } from '../../uiComponents/Card/Card';

export const ItemCard = ({
	item,
	amount,
	actionElements,
	onClick,
}: {
	item: ItemType;
	amount: number;
	actionElements: React.JSX.Element[];
	onClick?: () => void;
}): JSX.Element => {
	return (
		<Card
			icon={<img height={baseSize / 2} src={getItemUrl(item)} />}
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
