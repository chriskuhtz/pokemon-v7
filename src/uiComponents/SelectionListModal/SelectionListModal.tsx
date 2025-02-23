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
	if (!open) {
		return <></>;
	}
	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: 'calc(100dvw - 4rem)',
				height: '100dvh',
				backgroundColor: 'rgba(0,0,0,.8)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 9000,
				padding: '2rem',
			}}
		>
			<div
				style={{
					padding: '2rem',
					borderRadius: '1rem',
					border: '2px solid black',
					backgroundColor: 'white',
					maxHeight: '80%',
					overflow: 'scroll',
				}}
			>
				<strong onClick={close}>X</strong>
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
			</div>
		</div>
	);
};
