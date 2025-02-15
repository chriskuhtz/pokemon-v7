import { useEffect, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import './BuyAction.css';

export const BuyAction = ({
	price,
	buyItem,
	max,
}: {
	price: number;
	buyItem: (x: number) => void;
	max: number;
}) => {
	const [numberToBuy, setNumberToBuy] = useState<number>(max);
	useEffect(() => setNumberToBuy(max), [max]);

	if (max === 0) {
		return <></>;
	}
	return (
		<div className="buyAction">
			<strong>{price}$</strong>
			<input
				type="number"
				value={numberToBuy}
				onChange={(e) => setNumberToBuy(e.target.valueAsNumber)}
				min={1}
				max={max}
				onKeyDown={(e) => {
					e.stopPropagation();
					if (e.key === 'Enter') {
						buyItem(numberToBuy);
					}
				}}
			/>
			<FaCartPlus onClick={() => buyItem(numberToBuy)} />
		</div>
	);
};
