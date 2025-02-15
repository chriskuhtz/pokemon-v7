import { useEffect, useState } from 'react';
import { BsCashCoin } from 'react-icons/bs';
import './SellAction.css';

export const SellAction = ({
	amount,
	price,
	sellItem,
}: {
	amount: number;
	price: number;
	sellItem: (x: number) => void;
}) => {
	const [numberToSell, setNumberToSell] = useState<number>(amount);
	useEffect(() => setNumberToSell(amount), [amount]);
	return (
		<div className="sellAction">
			<strong>{price}$</strong>
			<input
				type="number"
				value={numberToSell}
				onChange={(e) => setNumberToSell(e.target.valueAsNumber)}
				min={1}
				max={amount}
				onKeyDown={(e) => {
					e.stopPropagation();
					if (e.key === 'Enter') {
						sellItem(numberToSell);
					}
				}}
			/>
			<BsCashCoin onClick={() => sellItem(numberToSell)} />
		</div>
	);
};
