import { useState } from 'react';
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
	const [confirmationNeeded, setConfirmationNeeded] = useState<boolean>(false);
	return (
		<div className="throwAwayAction">
			<Modal
				close={() => setConfirmationNeeded(false)}
				open={confirmationNeeded}
			>
				<div>
					<h3>Are you sure you want to throw this away?</h3>
					<button
						onClick={() => {
							discardItem(1);
							setConfirmationNeeded(false);
						}}
					>
						Throw away 1
					</button>
					<button
						onClick={() => {
							discardItem(amount);
							setConfirmationNeeded(false);
						}}
					>
						Throw away all
					</button>
					<button onClick={() => setConfirmationNeeded(false)}>
						No, keep it
					</button>
				</div>
			</Modal>
			<FaTrash onClick={() => setConfirmationNeeded(true)} />
		</div>
	);
};
