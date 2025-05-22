import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Modal } from '../../../uiComponents/Modal/Modal';
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

	const [confirmationNeeded, setConfirmationNeeded] = useState<boolean>(false);
	return (
		<div className="throwAwayAction">
			<Modal
				close={() => setConfirmationNeeded(false)}
				open={confirmationNeeded}
			>
				<div>
					Are you sure you want to throw this away?
					<button
						onClick={() => {
							discardItem(amount);
							setConfirmationNeeded(false);
						}}
					>
						Yes
					</button>
					<button onClick={() => setConfirmationNeeded(false)}>No</button>
				</div>
			</Modal>
			<input
				type="number"
				value={numberToDiscard}
				onChange={(e) => setNumberToDiscard(e.target.valueAsNumber)}
				min={1}
				max={amount}
				onKeyDown={(e) => {
					e.stopPropagation();
					if (e.key === 'Enter') {
						setConfirmationNeeded(true);
					}
				}}
			/>
			<FaTrash onClick={() => setConfirmationNeeded(true)} />
		</div>
	);
};
