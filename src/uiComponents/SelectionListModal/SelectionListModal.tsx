import { Modal } from '../Modal/Modal';

export const SelectionListModal = ({
	options,
	selected,
	toggle,
	min,
	max,
	onConfirm,
	open,
	close,
}: {
	options: string[];
	selected: string[];
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
					gridTemplateColumns: '1fr 1fr 1fr',
				}}
			>
				{options.map((o) => (
					<button
						key={o}
						style={
							selected.includes(o)
								? { color: 'white', backgroundColor: 'black' }
								: undefined
						}
						onClick={() => toggle(o)}
					>
						{o}
					</button>
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
