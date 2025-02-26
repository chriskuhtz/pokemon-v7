import { BuyAction } from '../../../components/ItemCard/components/BuyAction';
import { ItemCard } from '../../../components/ItemCard/ItemCard';
import { useGetItemData } from '../../../hooks/useGetItemData';
import { ItemType } from '../../../interfaces/Item';

export const BuyCard = ({
	item,
	buyItem,
	amount,
	money,
}: {
	item: ItemType;
	amount: number;
	buyItem: (x: number, price: number) => void;
	money: number;
}) => {
	const { res } = useGetItemData(item);

	if (!res) {
		return;
	}

	const { cost } = res;

	const max = Math.floor(money / cost);

	if (cost === 0) {
		console.error('cant buy this item', item);
		return <></>;
	}

	return (
		<ItemCard
			key={item}
			item={item as ItemType}
			amount={`${amount} in Bag`}
			actionElements={[
				<BuyAction
					price={cost}
					buyItem={(x: number) => buyItem(x, cost)}
					max={max}
				/>,
			]}
		/>
	);
};
