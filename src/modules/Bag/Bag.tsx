import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';

export const Bag = ({
	inventory,
	discardItem,
}: {
	inventory: Inventory;
	discardItem: (item: ItemType, number: number) => void;
}): JSX.Element => {
	return <div></div>;
};
