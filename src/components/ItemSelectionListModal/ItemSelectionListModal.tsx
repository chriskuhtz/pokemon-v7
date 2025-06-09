import { ItemType } from '../../interfaces/Item';
import { Modal } from '../../uiComponents/Modal/Modal';
import { ItemInfoButton } from '../ItemInfoButton/ItemInfoButton';
import { ItemSprite } from '../ItemSprite/ItemSprite';

export const ItemSelectionListModal = ({
	options,
	selected,
	toggle,
	min,
	max,
	onConfirm,
	open,
	close,
}: {
	options: ItemType[];
	selected: ItemType[];
	toggle: (x: string) => void;
	min: number;
	max: number;
	onConfirm?: () => void;
	open: boolean;
	close: () => void;
}) => {
	const disabled = selected.length < min || selected.length > max;

	return (
		<Modal open={open} close={close}>
			<div
				style={{
					display: 'grid',
					gap: '1rem',
					gridTemplateColumns: '1fr 1fr',
				}}
			>
				{options.map((o) => (
					<div
						key={o}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: '.5rem',
						}}
					>
						<button
							style={{
								flexGrow: 1,
								display: 'flex',
								alignItems: 'center',
								color: selected.includes(o) ? 'white' : 'black',
								backgroundColor: selected.includes(o) ? 'black' : 'white',
							}}
							onClick={() => toggle(o)}
						>
							<ItemSprite item={o} />
							{o}
						</button>
						<ItemInfoButton itemName={o} />
					</div>
				))}
				{onConfirm && (
					<button
						style={{ backgroundColor: disabled ? 'red' : 'green' }}
						onClick={onConfirm}
						disabled={disabled}
					>
						Confirm
					</button>
				)}
			</div>
		</Modal>
	);
};
