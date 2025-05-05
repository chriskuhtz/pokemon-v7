import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import './ThrowAwayAction.css';
export const ThrowAwayAction = ({
	amount,
	discardItem,
}: {
	amount: number;
	discardItem: (x: number) => void;
}) => {
	const [numberToDiscard, setNumberToDiscard] = useState<number>(amount);
	useEffect(() => setNumberToDiscard(amount), [amount]);
	return (
		<div className="throwAwayAction">
			<input
				type="number"
				value={numberToDiscard}
				onChange={(e) => setNumberToDiscard(e.target.valueAsNumber)}
				min={1}
				max={amount}
				onKeyDown={(e) => {
					e.stopPropagation();
					if (e.key === 'Enter') {
						discardItem(numberToDiscard);
					}
				}}
			/>
			<FaTrash onClick={() => discardItem(numberToDiscard)} />
		</div>
	);
};
