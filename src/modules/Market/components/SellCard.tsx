import { SellAction } from '../../../components/ItemCard/components/SellAction';
import { ItemCard } from '../../../components/ItemCard/ItemCard';
import { useGetItemData } from '../../../hooks/useGetItemData';
import { ItemType } from '../../../interfaces/Item';

export const SellCard = ({
	item,
	sellItem,
	amount,
}: {
	item: ItemType;
	amount: number;
	sellItem: (x: number, price: number) => void;
}) => {
	const { res } = useGetItemData(item);

	if (!res) {
		return;
	}

	const { cost } = res;

	if (cost === 0) {
		return <></>;
	}
	return (
		<ItemCard
			key={item}
			item={item as ItemType}
			amount={`${amount} in Bag`}
			actionElements={[
				<SellAction
					amount={amount}
					price={cost / 2}
					sellItem={(x: number) => sellItem(x, cost / 2)}
				/>,
			]}
		/>
	);
};
