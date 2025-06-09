import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { ItemType } from '../../../interfaces/Item';
import { Modal } from '../../../uiComponents/Modal/Modal';
import { Stack } from '../../../uiComponents/Stack/Stack';
import { ItemSprite } from '../../ItemSprite/ItemSprite';
import './ThrowAwayAction.css';
export const ThrowAwayAction = ({
	item,
	amount,
	discardItem,
}: {
	item: ItemType;
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
				<Stack mode="column" alignItems="center">
					<ItemSprite sizeFactor={2} item={item} />
					<h3>Are you sure you want throw to away {item}?</h3>
					<Stack mode="row">
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
					</Stack>
				</Stack>
			</Modal>
			<FaTrash onClick={() => setConfirmationNeeded(true)} />
		</div>
	);
};
